// src/components/Pagination.jsx

import "../styles/Pagination.css";

/**
 * Pagination component provides page navigation controls
 * for paged podcast results. It supports moving between pages
 * and highlights the currently active page.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {number} props.currentPage - The active page index (1-based).
 * @param {number} props.totalPages - Total number of pages available.
 * @param {function(number): void} props.onPageChange - Callback fired when the page changes.
 * @returns {JSX.Element} A pagination control UI.
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  /**
   * Safely navigates to a specific page number.
   * Prevents navigation beyond page bounds.
   *
   * @param {number} page - The page number to navigate to.
   */
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  /**
   * Generates an array of page numbers based on total pages.
   *
   * @type {number[]}
   */
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Previous
      </button>

      <div className="pagination-pages">
        {pages.map((page) => (
          <button
            key={page}
            className={`pagination-page ${
              page === currentPage ? "active" : ""
            }`}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
