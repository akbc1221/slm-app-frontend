const AlertBar = ({ alert }) => {
  return (
    <div className="alert alert-success alert-dismissible fade show container">
      <i className="fas fa-check-circle text-success"></i>&nbsp;The predicted densification for given parameters is <b>{Number(alert).toFixed(2)}</b>
      <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
    </div>
  );
};

export default AlertBar;
