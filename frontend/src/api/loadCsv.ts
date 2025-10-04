import Papa from "papaparse";

export interface PaperRecord {
    Title: string;
    Link: string;
}

/**
 * Loads a local CSV from the src/api folder and returns an array of PaperRecords.
 */
export async function loadCsv(): Promise<PaperRecord[]> {
    const response = await fetch("/SB_publication_PMC.csv");
    const csvText = await response.text();

    const { data } = Papa.parse<PaperRecord>(csvText, {
        header: true,
        skipEmptyLines: true,
    });

    return data;
}
