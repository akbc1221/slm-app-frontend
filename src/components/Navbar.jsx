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
            }}>
            <img src={logo} alt="logo" width={40} height={35} className="rounded" />
            &nbsp;&nbsp;SLM app
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
