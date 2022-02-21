import { useNavigate } from "react-router-dom";
import logo from "../img/SLM_logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
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
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search. . ." title="enter to search" />
              <button className="btn btn-outline-info" type="submit" title="search by [ tags, starred, result status, recently created]">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
