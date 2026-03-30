import { useState, useRef, useEffect } from "react";

const ReportsFilters = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const [search, setSearch] = useState(filters.search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((f) => ({ ...f, search }));
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, setFilters]);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="reports-toolbar">
      <input
        type="text"
        placeholder="Search reports..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="dropdown" ref={ref}>
        <div className="trigger" onClick={() => setOpen(!open)}>
          Sort: {filters.sort === "score" ? "Score" : "Date"} ▾
        </div>

        {open && (
          <div className="menu glass">
            <div onClick={() => setFilters((f) => ({ ...f, sort: "latest" }))}>
              Date
            </div>

            <div onClick={() => setFilters((f) => ({ ...f, sort: "score" }))}>
              Score
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsFilters;
