import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="row d-flex flew-column align-items-center justify-content-center p-5 mt-5">
      <h2 className="col-10 mb-3 mt-5 text-white text-center">Welcome to the Selective Laser Modeling app!</h2>
      <em className=" col-10 mb-3 text-light text-center">click to get started and start predicting densification</em>

      <button
        className="btn btn-dark col-3 mb-5 text-center"
        onClick={() => {
          navigate("/home");
        }}>
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
