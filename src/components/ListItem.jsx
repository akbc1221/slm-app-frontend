const ListItem = ({ item, getId }) => {
  const { id, createdAt, outcome, inputs } = { ...item };
  const result = JSON.parse(outcome);
  const user_input = JSON.parse(inputs);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading${id}`}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`}>
          Created on {createdAt.split(" ").slice(1, 4).join(" ")} &nbsp; <span className="text-secondary">at {createdAt.split(" ")[4]}</span>
          &nbsp;&nbsp;{result.status === "success" ? <span className="badge text-success">{result.status}</span> : <span className="badge text-danger">{result.status}</span>}
        </button>
      </h2>
      <div id={`collapse${id}`} className="accordion-collapse collapse" data-bs-parent="#list">
        <div className="accordion-body">
          <div className="row">
            <h6 className="col-5">Densification</h6>
            <p className="col-5 text-secondary">{result.value * 100}&#37;</p>

            <span
              onClick={() => {
                getId(id);
              }}
              className="col-2"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              data-bs-placement="top"
              title="delete item"
              style={{ cursor: "pointer" }}>
              <i className="fas fa-trash-alt text-danger"></i>
            </span>
          </div>
          <h4 className="text-center">Input Parameters</h4>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Properties</th>
                <th scope="col">Values</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Hatch Distance</td>
                <td>{user_input["hatchDistance"]}</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Layer Thickness</td>
                <td>{user_input["layerThickness"]}</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Laser Power</td>
                <td>{user_input["laserPower"]}</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Scan Speed</td>
                <td>{user_input["scanSpeed"]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
