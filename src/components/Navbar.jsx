import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/SLM_logo.jpg";

const Navbar = ({ searchResult }) => {
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await searchResult(`?tag=${tagInput}`);
    setTagInput("");
  };
  return (
    <>
      <nav className="navbar navbar-dark bg-dark shadow mb-4 rounded-bottom">
        <div className="container-fluid align-text-center">
          <a
            className="navbar-brand"
            href="/home"
            role="button"
            onClick={() => {
              navigate("/home");
            }}
            title="Go to homepage">
            <img src={logo} alt="logo" width={40} height={35} className="rounded" />
            &nbsp;&nbsp;SLM app
          </a>
          <div className="me-4">
            <form className="d-flex" onSubmit={(e) => onSubmitHandler(e)}>
              <button className="btn me-1" type="button" data-bs-toggle="modal" data-bs-target="#searchModal" title="more search options">
                <i className="fas fa-sliders-h fa-md text-info"></i>
              </button>
              <input
                className="form-control me-2"
                type="search"
                onChange={(e) => setTagInput(e.target.value)}
                value={tagInput}
                name="tagInput"
                id="tagInput"
                placeholder="Search by tag"
                title="enter to search"
                autoComplete="off"
              />
              <button className="btn btn-outline-info" type="submit" title="search by tag">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
