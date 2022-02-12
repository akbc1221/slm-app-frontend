import { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [page, setPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {page > 1 ? (
          <li className="page-item">
            <button
              onClick={() => {
                paginate(Math.max(1, page - 1));
                setPage(Math.max(1, page - 1));
              }}
              className="page-link bg-dark"
              title="Go previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
        ) : (
          <li className="page-item">
            <button className="page-link bg-light" disabled>
              <span className="text-dark" aria-hidden="true">
                &laquo;
              </span>
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => {
                setPage(number);
                paginate(number);
              }}
              className="page-link">
              {number}
            </button>
          </li>
        ))}
        {page < pageNumbers.length ? (
          <li className="page-item">
            <button
              onClick={() => {
                paginate(Math.min(page + 1, pageNumbers.length));
                setPage(Math.min(page + 1, pageNumbers.length));
              }}
              className="page-link bg-dark"
              title="Go next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        ) : (
          <li className="page-item">
            <button className="page-link bg-light" disabled>
              <span className="text-dark" aria-hidden="true">
                &raquo;
              </span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
