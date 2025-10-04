import type { PaperRecord } from "./loadCsv";

type SearchOptions = {
  fields?: (keyof PaperRecord)[];
  caseSensitive?: boolean;
};

function tokenize(input: string): string[] {
  return input
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .map((t) => t.toLowerCase());
}

export function searchRecords(
  records: PaperRecord[],
  query: string,
  options: SearchOptions = {}
): PaperRecord[] {
  const { fields = ["Title", "Link"], caseSensitive = false } = options;

  const q = caseSensitive ? query : query.toLowerCase();
  const tokens = tokenize(q);
  if (!tokens.length) return records;

  return records
    .map((r) => {
      let score = 0;
      for (const f of fields) {
        const val = (r[f] ?? "").toString();
        const hay = caseSensitive ? val : val.toLowerCase();
        for (const t of tokens) {
          if (hay === t) score += f === "Title" ? 4 : 2;
          else if (hay.includes(t)) score += f === "Title" ? 2 : 1;
        }
      }
      return { record: r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.record);
}

export default searchRecords;