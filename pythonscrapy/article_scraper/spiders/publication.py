import scrapy
import json


class PublicationSpider(scrapy.Spider):
    name = 'publication'
    allowed_domains = ['ncbi.nlm.nih.gov']

    # We start with the example URL. You can add more here.
    start_urls = [
        'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4136787/'
    ]

    # --- ALTERNATIVE START METHOD (Uncomment to read URLs from articles.json) ---
    # def start_requests(self):
    #     """Loads URLs from a JSON file named articles.json in the project root.
    #     Each object in the JSON should have a 'Link' key with the URL.
    #     """
    #     with open('articles.json', 'r', encoding='utf-8') as f:
    #         articles = json.load(f)
    #     for article in articles:
    #         url = article.get('Link') or article.get('link') or article.get('url')
    #         if url:
    #             yield scrapy.Request(url=url, callback=self.parse, meta={'source': article})

    def parse(self, response):
        """Process the downloaded page and extract structured article data."""

        # --- PRECISE SELECTORS BASED ON THE PROVIDED HTML ---
        title = response.css('h1::text').get()
        authors = response.css('div.cg a span.name::text').getall()

        pub_date_raw = response.css('section.pmc-layout__citation div::text').get()
        publication_date = pub_date_raw.split(';')[0].strip() if pub_date_raw else 'N/A'

        # --- Scrape the content separated by section ---
        article_content = {}
        current_section_title = None

        # Select section titles and paragraphs in document order
        content_elements = response.css('h2.pmc_sec_title, section.body p')

        for element in content_elements:
            # If element is an <h2>
            if element.xpath('self::h2'):
                current_section_title = element.css('::text').get()
                if current_section_title:
                    current_section_title = current_section_title.strip()
                    article_content[current_section_title] = []

            # If element is a <p> and we have a section to attach it to
            elif element.xpath('self::p') and current_section_title:
                paragraph_text = "".join(element.css('*::text').getall()).strip()
                if paragraph_text:
                    article_content[current_section_title].append(paragraph_text)

        # Join paragraphs into a single string per section
        for t, paras in list(article_content.items()):
            article_content[t] = ' '.join(paras)

        yield {
            'url': response.url,
            'title': title.strip() if title else 'N/A',
            'authors': [a.strip() for a in authors] if authors else [],
            'publication_date': publication_date,
            'content': article_content,
        }

