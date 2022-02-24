import { useState, useRef } from "react";

const SearchForm = ({ searchResult }) => {
  const initialState = {
    tags: "",
    status: "default",
    recent: "default",
    isStarred: false,
  };
  const [searchQuery, setSearchQuery] = useState(initialState);
  const closeRef = useRef(null);

  const resetHandler = () => {
    setSearchQuery(initialState);
  };

  const generateQuery = () => {
    let query_string = "?";
    if (searchQuery["tags"]) {
      query_string += `&tag=${searchQuery["tags"]}`;
    }
    if (searchQuery["status"] !== "default" && searchQuery["recent"] !== "all") {
      query_string += `&status=${searchQuery["status"]}`;
    }
    if (searchQuery["recent"] !== "default" && searchQuery["recent"] !== "all") {
      query_string += `&recent=${searchQuery["recent"]}`;
    }
    if (searchQuery["isStarred"]) {
      query_string += `&starred=${searchQuery["isStarred"]}`;
    }

    return query_string;
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await searchResult(generateQuery());
    closeRef.current.click();
  };
  return (
    <div className="modal fade" tabIndex={-1} id="searchModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Advanced search options</h5>
            <button type="button" className="btn-close" onClick={() => resetHandler()} ref={closeRef} data-bs-dismiss="modal" id="closeSearchForm" />
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => onSubmitHandler(e)}>
              <div className="mb-3">
                <label htmlFor="tagInput" className="form-label">
                  Tags
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setSearchQuery({ ...searchQuery, tags: e.target.value });
                  }}
                  value={searchQuery["tags"]}
                  id="tagInput"
                  name="tagInput"
                  placeholder="eg., tag1, tag2, ..."
                  autoComplete="off"
                />
                <div id="tagInstructions" className="form-text">
                  Enter (,) separated for multiple tags
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="statusInput" className="form-label">
                  Result status
                </label>
                <select
                  className="form-select"
                  onChange={(e) => setSearchQuery({ ...searchQuery, status: e.target.value })}
                  value={searchQuery["status"]}
                  id="statusInput"
                  name="statusInput">
                  <option value="default" disabled>
                    -- Select result status --
                  </option>
                  <option value="success">success</option>
                  <option value="failed">failed</option>
                  <option value="all">all</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="recentInput" className="form-label">
                  Recently predicted
                </label>
                <select
                  className="form-select"
                  onChange={(e) => setSearchQuery({ ...searchQuery, recent: e.target.value })}
                  value={searchQuery["recent"]}
                  id="recentInput"
                  name="recentInput">
                  <option value="default" disabled>
                    -- Select days ago created --
                  </option>
                  <option value="0">Today</option>
                  <option value="1">Yesterday</option>
                  <option value="2">Last 2 days</option>
                  <option value="5">Last 5 days</option>
                  <option value="10">Last 10 days</option>
                  <option value="all">all</option>
                </select>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={() => {
                    setSearchQuery({ ...searchQuery, isStarred: !searchQuery["isStarred"] });
                  }}
                  checked={searchQuery["isStarred"]}
                  id="starCheck"
                  name="starCheck"
                />
                <label className="form-check-label" htmlFor="starCheck">
                  starred only
                </label>
              </div>
              <button type="button" className="btn btn-outline-dark me-3" onClick={() => resetHandler()}>
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
