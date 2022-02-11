import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="row d-flex flew-column align-items-center justify-content-center p-5 mt-5">
      <h2 className="col-10 mb-3 mt-5 text-white text-center">Error 404! Page Not Found</h2>
      <em className=" col-10 mb-3 text-light text-center">
        The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to go back to the homepage.
      </em>

      <button
        className="btn btn-dark col-3 mb-5 text-center"
        onClick={() => {
          navigate("/home");
        }}>
        Home
      </button>
    </div>
  );
};

export default PageNotFound;
