const FormAlert = ({ text, warning }) => {
  return (
    <>
      {warning ? (
        <div className="form-text text-danger">
          <span>
            <i className="fas fa-exclamation-circle"></i>
          </span>
          &nbsp;
          {text}
        </div>
      ) : (
        <div className="form-text text-success">
          <span>
            <i className="far fa-check-circle"></i>
          </span>
          &nbsp; Valid input
        </div>
      )}
    </>
  );
};

export default FormAlert;
