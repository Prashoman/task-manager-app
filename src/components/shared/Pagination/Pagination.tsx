import React from "react";

type TPaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  showPage: number;
};

const Pagination = ({ page, setPage, showPage }: TPaginationProps) => {
  return (
    <>
      <div className="flex justify-center mt-6 gap-2">
        {/* Previous Button */}
        <button
          disabled={page === 1}
          onClick={() => setPage((prev: number) => prev - 1)}
          className={`px-4 py-2 text-sm font-medium bg-gray-300 rounded-md ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex gap-1">
          {Array.from({ length: showPage }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`w-10 h-10 text-sm font-medium flex items-center justify-center rounded-md ${
                page === index + 1
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          disabled={page === showPage}
          onClick={() => setPage((prev: number) => prev + 1)}
          className={`px-4 py-2 text-sm font-medium bg-gray-300 rounded-md ${
            page === showPage
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-400"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
