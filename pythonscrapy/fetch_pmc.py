"""
fetch_pmc.py

Simple script to fetch PMC XML using NCBI EFetch and convert to JSON records.
Usage:
    python fetch_pmc.py PMC4136787
Or to load many IDs from a file (one per line):
    python fetch_pmc.py --file pmc_ids.txt

The script will save output to scraped_articles_api.json
"""
import argparse
import json
import re
import sys
import time
from xml.etree import ElementTree as ET

import requests

EFETCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"


def fetch_pmc_xml(pmcid, api_key=None, timeout=30):
    params = {"db": "pmc", "id": pmcid, "retmode": "xml"}
    if api_key:
        params["api_key"] = api_key
    r = requests.get(EFETCH_URL, params=params, timeout=timeout)
    r.raise_for_status()
    return r.content


def parse_article_xml(xml_bytes):
    root = ET.fromstring(xml_bytes)

    # Title
    title_el = root.find('.//article/front/article-meta/title-group/article-title')
    title = ''.join(title_el.itertext()).strip() if title_el is not None else 'N/A'

    # Authors
    authors = []
    for contrib in root.findall('.//article/front/article-meta/contrib-group/contrib[@contrib-type="author"]'):
        name_el = contrib.find('name')
        if name_el is not None:
            parts = []
            surname = name_el.find('surname')
            given_names = name_el.find('given-names')
            if given_names is not None:
                parts.append(given_names.text.strip())
            if surname is not None:
                parts.append(surname.text.strip())
            if parts:
                authors.append(' '.join(parts))

    # Publication date (simple concatenation of year/month/day if present)
    pub_date = 'N/A'
    pub_el = root.find('.//article/front/article-meta/pub-date')
    if pub_el is not None:
        parts = []
        for tag in ('year', 'month', 'day'):
            el = pub_el.find(tag)
            if el is not None and el.text:
                parts.append(el.text.strip())
        if parts:
            pub_date = '-'.join(parts)

    # Abstract
    abstract_el = root.find('.//article/front/article-meta/abstract')
    abstract = ''
    if abstract_el is not None:
        paras = []
        for p in abstract_el.findall('.//p'):
            text = ''.join(p.itertext()).strip()
            if text:
                paras.append(text)
        abstract = '\n\n'.join(paras)

    # Sections: collect sec titles and their paras
    sections = {}
    for sec in root.findall('.//body//sec'):
        sec_title_el = sec.find('title')
        sec_title = ''.join(sec_title_el.itertext()).strip() if sec_title_el is not None else None
        paras = []
        for p in sec.findall('.//p'):
            t = ''.join(p.itertext()).strip()
            if t:
                paras.append(t)
        if sec_title:
            sections[sec_title] = ' '.join(paras)

    return {
        'title': title,
        'authors': authors,
        'publication_date': pub_date,
        'abstract': abstract,
        'content': sections,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('pmcids', nargs='*', help='One or more PMC IDs (e.g. PMC4136787)')
    parser.add_argument('--file', '-f', help='File containing PMC IDs, one per line')
    parser.add_argument('--articles-json', help='Path to articles.json (list of objects with a Link field)')
    parser.add_argument('--api-key', help='NCBI API key (optional)')
    parser.add_argument('--output', '-o', default='scraped_articles_api.json')
    parser.add_argument('--delay', type=float, default=0.34, help='Seconds to wait between requests (default 0.34s => ~3 req/sec)')
    parser.add_argument('--flush-every', type=int, default=0, help='Persist output every N fetched records (0 = only at end)')
    parser.add_argument('--max', type=int, default=0, help='Stop after fetching this many new records (0 = no limit)')
    args = parser.parse_args()

    ids = []
    # If the user supplied an articles.json file, extract PMC IDs from Link fields.
    if args.articles_json:
        try:
            with open(args.articles_json, 'r', encoding='utf-8') as fh:
                articles = json.load(fh)
            for art in articles:
                link = art.get('Link') or art.get('link') or art.get('URL') or art.get('url')
                if not link:
                    continue
                m = re.search(r'(PMC\d+)', link)
                if m:
                    ids.append(m.group(1))
        except Exception as e:
            print('Error reading articles JSON:', e, file=sys.stderr)
            sys.exit(1)
    if args.file:
        with open(args.file, 'r', encoding='utf-8') as fh:
            for line in fh:
                s = line.strip()
                if s:
                    ids.append(s)
    ids.extend(args.pmcids)

    if not ids:
        print('No PMC IDs provided. Provide IDs as args or via --file', file=sys.stderr)
        sys.exit(1)

    # Resume support: load previously saved records and skip any pmcids already fetched.
    existing = {}
    try:
        with open(args.output, 'r', encoding='utf-8') as rfh:
            prev = json.load(rfh)
            for item in prev:
                if 'pmcid' in item:
                    existing[item['pmcid']] = item
    except FileNotFoundError:
        prev = []
    except Exception:
        # if output exists but can't be read, warn and abort to avoid overwrite
        print('Warning: could not read existing output file, aborting to avoid overwrite.', file=sys.stderr)
        sys.exit(1)

    results = list(prev) if isinstance(prev, list) else []

    fetched_count = 0
    processed_new = 0
    for idx, pmcid in enumerate(ids, start=1):
        if pmcid in existing:
            print(f'[{idx}/{len(ids)}] Skipping {pmcid} (already fetched)')
            continue

        print(f'[{idx}/{len(ids)}] Fetching {pmcid}')
        try:
            xml = fetch_pmc_xml(pmcid, api_key=args.api_key)
            parsed = parse_article_xml(xml)
            parsed['pmcid'] = pmcid
            results.append(parsed)
            fetched_count += 1
            processed_new += 1
            # If requested, flush partial results to disk periodically
            if args.flush_every and (processed_new % args.flush_every) == 0:
                with open(args.output, 'w', encoding='utf-8') as out:
                    json.dump(results, out, ensure_ascii=False, indent=2)
                print(f'Flushed {processed_new} new records to {args.output}')
            # If a max was specified, stop after fetching that many new records
            if args.max and processed_new >= args.max:
                print(f'Maximum new records ({args.max}) reached; stopping early.')
                break
        except Exception as e:
            print('Error fetching', pmcid, e, file=sys.stderr)

        # polite delay between requests
        if idx != len(ids):
            time.sleep(max(0.0, args.delay))

    # write output atomically
    with open(args.output, 'w', encoding='utf-8') as out:
        json.dump(results, out, ensure_ascii=False, indent=2)

    print('Saved', len(results), 'records to', args.output)


if __name__ == '__main__':
    main()
