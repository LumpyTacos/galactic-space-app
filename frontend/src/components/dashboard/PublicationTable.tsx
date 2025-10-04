import { useState, useEffect, useMemo } from "react";
import type { ChangeEvent } from "react";
import Papa from "papaparse";
import type { PaperRecord } from "../../api/loadCsv";

interface PublicationTableProps {
  csvUrl: string; // e.g., "/papers.csv"
  itemsPerPage?: number;
}

export default function PublicationTable({
  csvUrl,
  itemsPerPage = 5,
}: PublicationTableProps) {
  const [allData, setAllData] = useState<PaperRecord[]>([]);
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<keyof PaperRecord>("Title");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Load CSV on mount
  useEffect(() => {
    fetch(csvUrl)
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse<PaperRecord>(text, {
          header: true,
          skipEmptyLines: true,
        });
        setAllData(parsed.data);
      });
  }, [csvUrl]);

  // Filtered + Sorted Data
  const filteredData = useMemo(() => {
    const filtered = allData.filter(
      (p) =>
        p.Title.toLowerCase().includes(query.toLowerCase()) ||
        p.Link.toLowerCase().includes(query.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aVal = a[sortField].toLowerCase();
      const bVal = b[sortField].toLowerCase();
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [allData, query, sortField, sortAsc]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Compact pagination (1 ... 4 5 6 ... N)
  const paginationRange = useMemo(() => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    const delta = 1;
    const range: (number | string)[] = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    for (let i = left; i <= right; i++) range.push(i);
    if (left > 2) range.unshift("...");
    if (right < totalPages - 1) range.push("...");
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return range;
  }, [currentPage, totalPages]);

  const handleSort = (field: keyof PaperRecord) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-semibold mb-0">Publication List</h5>
          <input
            type="text"
            placeholder="Search..."
            className="form-control w-auto"
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("Title")}
                >
                  Title {sortField === "Title" && (sortAsc ? "▲" : "▼")}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("Link")}
                >
                  Link {sortField === "Link" && (sortAsc ? "▲" : "▼")}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length ? (
                paginatedData.map((paper, i) => (
                  <tr key={i}>
                    <td>{paper.Title}</td>
                    <td>
                      <a
                        href={paper.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                      >
                        {paper.Link}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-4 text-muted">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="d-flex justify-content-center">
            <ul className="pagination mb-0">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>
              </li>

              {paginationRange.map((page, idx) =>
                page === "..." ? (
                  <li key={idx} className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                ) : (
                  <li
                    key={idx}
                    className={`page-item ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(Number(page))}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
