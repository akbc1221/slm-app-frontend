import logo from "../img/SLM_logo.jpg";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark shadow mb-4 rounded-bottom">
        <div className="container-fluid align-text-center">
          <a className="navbar-brand">
            <img src={logo} alt="logo" width={40} height={35} className="rounded" />
            &nbsp;&nbsp;SLM app
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
