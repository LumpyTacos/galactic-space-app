import { useState, useEffect, useMemo, ChangeEvent } from "react";
import SummaryCard from "../shared/SummaryCard";
import ChartSection from "./ChartSection";
import { loadCsv, type PaperRecord } from "../../api/loadCsv";

export default function Dashboard(): JSX.Element {
  const [papers, setPapers] = useState<PaperRecord[]>([]);
  const [query, setQuery] = useState<string>("");
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [sortField, setSortField] = useState<keyof PaperRecord>("Title");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 25;

  // Load CSV
  useEffect(() => {
    loadCsv().then((data) => setPapers(data));
  }, []);

  // Filtered + sorted data
  const filteredData = useMemo(() => {
    const filtered = papers.filter(
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
  }, [papers, query, sortField, sortAsc]);

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
    <div className="container my-5">
      {/* Header */}
      <header className="mb-4">
        <h2 className="fw-bold text-dark mb-2">
          NASA Bioscience Publications Overview
        </h2>
        <p className="text-secondary fs-5">
          Explore summarized insights from NASA’s biological experiments in
          space. Use AI to find trends, research gaps, and key results across
          hundreds of bioscience studies.
        </p>
      </header>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <SummaryCard
            title="Total Publications"
            value={papers.length.toString()}
          />
        </div>
        <div className="col-md-4">
          <SummaryCard title="AI Summaries" value="✔ Available" />
        </div>
        <div className="col-md-4">
          <SummaryCard title="Knowledge Gaps Identified" value="32" />
        </div>
      </div>

      {/* Table Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-semibold mb-0">Publication List</h5>

            {/* Search Bar */}
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
                {paginatedData.length > 0 ? (
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

          {/* Pagination Controls */}
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

      {/* Charts */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <ChartSection />
        </div>
      </div>
    </div>
  );
}
