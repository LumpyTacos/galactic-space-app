// app.js

const axios = require("axios");
const cheerio = require("cheerio");
const XLSX = require("xlsx");
const stopword = require("stopword");
const fs = require("fs");
const stringSimilarity = require("string-similarity");

const dataJson = JSON.parse(fs.readFileSync("dataJson.json", "utf-8"));
//const excelFile = "SB_publication_PMC.xlsx"
//const regex = /Keywords:\s*([\s\S]*?)(?=\r?\n|1\.\s*[A-Z]|$)/i;

// Read file
//const raw = fs.readFileSync("dataJson.json", "utf-8");

// Parse JSON into a JS object
//const data = JSON.parse(raw);

/*
const workbook = XLSX.readFile(excelFile);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
*/
console.log(608);


async function checkSites() {
  console.log("🔍 Checking websites...");

  // Skip the header row 
  // rows.length
  rows[0][2] = "keywords"

  for (let i = 1; i < rows.length; i++) {
    const [title, link] = rows[i];
    if (!link) continue;

    console.log(`\n➡️ Checking: ${title} (${link})`);

    try {
      // === STEP 2: Fetch page ===
      const response = await axios.get(link, {
        headers: { "User-Agent": "Mozilla/5.0" },
        timeout: 10000,
      });

      // === STEP 3: Parse text ===
      const $ = cheerio.load(response.data);

        // --- STEP 3: Extract raw text ---
        const text = $("body").text();

        // --- STEP 4: Try to find "Keywords:" explicitly first ---
        const match = text.match(regex);
        let foundKeywords = [];

        if (match) {
          // Normal explicit Keywords section found
          const keywordText = match[1];
          foundKeywords = keywordText
            .split(/[,;]+/)
            .map(k => k.trim())
            .filter(k => k.length > 0);

        } else {
          // --- Fallback: Title + Meta + Frequency Combo ---

          // Collect title + meta fields




            const title = $("title").text() || "";
            const metaKeywords = $('meta[name="keywords"]').attr("content") || "";
            const metaDesc = $('meta[name="description"]').attr("content") || "";
            const combined = `${title} ${metaDesc} ${text}`;

            // Tokenize
            const words = combined.toLowerCase().match(/\b[a-z-]{3,}\b/g) || [];
            const filtered = stopword.removeStopwords(words);

            // Build n-grams
            const ngrams = [];
            for (let i = 0; i < filtered.length; i++) {
              ngrams.push(filtered[i]);
              if (i < filtered.length - 1)
                ngrams.push(`${filtered[i]} ${filtered[i + 1]}`);
              if (i < filtered.length - 2)
                ngrams.push(`${filtered[i]} ${filtered[i + 1]} ${filtered[i + 2]}`);
            }

            // Frequency count
            const freq = {};
            ngrams.forEach(p => (freq[p] = (freq[p] || 0) + 1));

            // Sort by frequency
            const sorted = Object.entries(freq)
              .sort((a, b) => b[1] - a[1])
              .map(([phrase]) => phrase);

            // === Filtering logic ===
            const blacklist = [
              "google", "login", "copyright", "doi", "license",
              "journal", "abstract", "introduction", "figure", "table",
              "download", "click", "email", "author", "issue", "terms",
              "university", "press", "elsevier", "wiley", "springer",
              "researchgate", "bioone", "sage", "pubmed", "root", "article",
              "NASA", "cell", "plant", "cells", "united", "america", "scholar",
              "during", "search"
            ];

            const strongRoots = [
              "cell", "network", "protein", "gene", "factor", "signal",
              "system", "growth", "root", "tissue", "movement", "rotation",
              "microtubule", "cytoskeleton", "plant", "bacteria", "disease",
              "development", "organism", "metabolism"
            ];

            const clean = sorted
              .filter(p => !blacklist.some(b => p.includes(b))) // remove junk
              .filter(p => {
                const words = p.split(" ");
                const hasStrong = words.some(w =>
                  w.length > 5 || strongRoots.some(r => w.includes(r))
                );
                return hasStrong;
              })
              .filter(p => p.split(" ").length <= 4) // limit phrase length
              .slice(0, 10);

            // Merge with meta keywords
            const metaList = metaKeywords
              .split(/[,;]+/)
              .map(k => k.trim().toLowerCase())
              .filter(k => k.length > 0);

            foundKeywords = [...new Set([...metaList, ...clean])];





        }

        // --- Save / Print results ---
        if (foundKeywords.length > 0) {
          console.log("✅ Keywords:", foundKeywords);
          rows[i][2] = foundKeywords.join(", ");
        } else {
          console.log("❌ No keywords found.");
          rows[i][2] = "None";
        }

        // === Format result ===

        console.log("Found ${totalMatches} matches");
      //console.log(found.join(", "))
    } catch (err) {
      rows[i][2] = `Error: ${err.message}`;
    }

    const delay = 500 + Math.random() * 500; // 500–1000 ms
    console.log(`⏳ Waiting ${(delay / 1000).toFixed(2)}s before next site...`);
    await sleep(delay);



  }
  // === STEP 5: Write back to Excel ===
  const newSheet = XLSX.utils.aoa_to_sheet(rows);
const newWorkbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Results");
XLSX.writeFile(newWorkbook, "websites_results.xlsx");

console.log("\n✅ Done! Results saved to websites_results.xlsx");
}

async function OtherDataInsert(column, dataKey){ //int, str
  // rows.length
  
  rows[0][column] = dataKey;
  for (let i = 1; i < rows.length; i++) {
    //console.log(data[i]["publication_date"]);
    if(column >= 6)
    {
      rows[i][column] = data[column][dataKey].join(", ");
    }else{
      rows[i][column] = data[column][dataKey];
    }
  }

  
  

  const newSheet = XLSX.utils.aoa_to_sheet(rows);
  const newWorkbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Results");
  XLSX.writeFile(newWorkbook, "websites_results.xlsx");

  console.log("\n✅ Done! Results saved to websites_results.xlsx");
}



async function ToJSON() {

  await checkSites()
  OtherDataInsert(3, "publication_date");
  OtherDataInsert(4, "pmcid");
  OtherDataInsert(5, "abstract");
  OtherDataInsert(6, "authors");
  OtherDataInsert(7, "content");


  // 1️⃣ Read Excel file
  const workbookTranslate = XLSX.readFile("websites_results.xlsx");

  // 2️⃣ Get the first sheet
  const sheetName = workbookTranslate.SheetNames[0];
  const sheetTranslate = workbookTranslate.Sheets[sheetName];

  // 3️⃣ Convert to JSON using headers as keys
  const dataMake = XLSX.utils.sheet_to_json(sheetTranslate);

  // 4️⃣ Save as JSON file
  fs.writeFileSync("output.json", JSON.stringify(dataMake, null, 2));

  console.log("✅ Excel converted to output.json");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function guessWord(input, list) {
  const { bestMatch } = stringSimilarity.findBestMatch(
    input.toLowerCase(),
    list.map(w => w.toLowerCase())
  );

  if (bestMatch.rating >= 0.7) { // threshold for good match
    return {
      match: list[bestMatch.bestMatchIndex],
      confidence: bestMatch.rating
    };
  } else {
    return { match: null, confidence: bestMatch.rating };
  }
}

function findClosestKeyword(input) {
  const matches = stringSimilarity.findBestMatch(input.toLowerCase(), allKeywords.map(k => k.toLowerCase()));
  const bestMatch = matches.bestMatch;

  console.log("🟢 Input:", input);
  console.log("🔹 Closest match:", bestMatch.target);
  console.log("🔸 Similarity score:", bestMatch.rating.toFixed(3));

  return bestMatch;
}



function search(input, category) {
  const terms = [];
  const indexMap = [];

  // === 1️⃣ Collect all terms for this category ===
  let categoryIsList = false; // detect type

  dataJson.forEach((row, rowIndex) => {
    const value = row[category];
    if (!value) return; // skip empty

    if (Array.isArray(value)) {
      categoryIsList = true;
      value.forEach(v => {
        terms.push(String(v).trim());
        indexMap.push(rowIndex);
      });
    } else if (typeof value === "string") {
      String(value)
        .split(/[,;]+/)
        .map(v => v.trim())
        .filter(v => v.length > 0)
        .forEach(v => {
          terms.push(v);
          indexMap.push(rowIndex);
        });
    }
  });

  if (terms.length === 0) {
    console.log(`⚠️ No terms found for category "${category}".`);
    return [];
  }

  // === 2️⃣ Find similarities ===
  const matches = stringSimilarity.findBestMatch(
    input.toLowerCase(),
    terms.map(t => t.toLowerCase())
  );

  const results = matches.ratings
    .map((r, i) => ({
      match: terms[i],
      score: r.rating,
      rowIndex: indexMap[i],
    }))
    .sort((a, b) => b.score - a.score);

  if (results.length === 0) {
    console.log(`No matches found for "${input}" in ${category}`);
    return [];
  }

  // === 3️⃣ Find all rows where best match appears ===
  const bestMatch = results[0];
  const bestWord = bestMatch.match.toLowerCase();
  const allRowsWithBest = results
    .filter(r => r.match.toLowerCase() === bestWord)
    .map(r => r.rowIndex);

  // === 4️⃣ (Optional) Next 3 unique closest words if category is list ===
  let nextThree = [];
  if (categoryIsList) {
    const seen = new Set([bestWord]);
    for (const r of results.slice(1)) {
      const m = r.match.toLowerCase();
      if (!seen.has(m)) {
        nextThree.push({ match: r.match, score: r.score });
        seen.add(m);
      }
      if (nextThree.length >= 3) break;
    }
  }

  // === 5️⃣ Output ===
  console.log(`\n🔍 Searching "${category}" for "${input}"`);
  console.log(`✅ Best match: "${bestMatch.match}" (score: ${bestMatch.score.toFixed(3)})`);
  console.log(`📄 Appears in rows: ${allRowsWithBest.join(", ")}`);

  if (categoryIsList && nextThree.length > 0) {
    console.log("\n📋 Next closest unique words:");
    nextThree.forEach((r, i) => {
      console.log(`   ${i + 1}. "${r.match}" (score: ${r.score.toFixed(3)})`);
    });
  }

  return {
    bestWord: bestMatch.match,
    bestScore: bestMatch.score,
    rowIndices: allRowsWithBest,
    nextThree: categoryIsList ? nextThree : [],
  };
}



search("ISS", "keywords");

// Load your JSON



