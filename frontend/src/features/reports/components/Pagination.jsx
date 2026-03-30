const Pagination = ({ page, setPage, pagination }) => {
  const total = pagination?.pages || 1;

  return (
    <div className="pagination">
      <button
        className="nav-btn"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      <div className="pages">
        {[...Array(total)].slice(0, 5).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              className={`page-btn ${page === p ? "active" : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        className="nav-btn"
        disabled={page === total}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
