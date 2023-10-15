import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="mt-2 mb-8 w-[90%] flex gap-2 justify-end">
        {pageNumbers.map((number, i) => (
          <li key={number} className="">
            <button
              onClick={() => paginate(number)}
              className={`${
                i + 1 === currentPage ? `bg-blue-500 ` : `bg-gray-300`
              } h-[30px] w-[30px] flex justify-center items-center  rounded-full text-white`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
