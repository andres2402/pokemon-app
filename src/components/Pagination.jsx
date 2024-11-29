import React from "react";

const Pagination = ({ currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8 space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="px-4 py-2 rounded bg-gray-200">Page {currentPage}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded bg-blue-500 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
