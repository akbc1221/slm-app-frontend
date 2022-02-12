import { useState } from "react";
import FormAlert from "./FormAlert";

const Form = ({ predictResult }) => {
  const [formVal, setFormVal] = useState({
    scanSpeed: "",
    hatchDistance: "",
    laserPower: "",
    layerThickness: "",
    save: false,
  });

  const clearForm = () => {
    setFormVal({
      scanSpeed: "",
      hatchDistance: "",
      laserPower: "",
      layerThickness: "",
      save: false,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await predictResult({
      scanSpeed: Number(formVal["scanSpeed"]),
      hatchDistance: Number(formVal["hatchDistance"]),
      laserPower: Number(formVal["laserPower"]),
      layerThickness: Number(formVal["layerThickness"]),
      save: formVal["save"],
    });
    clearForm();
  };

  const isValidInput = (value, lower, higher) => {
    return !(isNaN(value) || value <= lower || value > higher);
  };
  return (
    <div className="modal" tabIndex={-1} id="formModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enter SLM parameters</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => {
                clearForm();
              }}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="close"
            />
          </div>
          <div className="modal-body">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}>
              <div className="mb-3">
                <label htmlFor="speedInput" className="form-label">
                  Scan speed
                </label>
                <input
                  onChange={(e) => {
                    setFormVal({ ...formVal, scanSpeed: e.target.value });
                  }}
                  value={formVal["scanSpeed"]}
                  type="text"
                  className="form-control"
                  id="speedInput"
                  name="speedInput"
                  required
                  autoComplete="off"
                  placeholder="eg., 900 mm/sec"
                />
                {formVal["scanSpeed"] !== "" ? (
                  !isValidInput(Number(formVal["scanSpeed"]), 1, 10000) ? (
                    <FormAlert text={"Value should be between 1 and 10000"} warning={true} />
                  ) : (
                    <FormAlert warning={false} />
                  )
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="distanceInput" className="form-label">
                  Hatch distance
                </label>
                <input
                  onChange={(e) => {
                    setFormVal({ ...formVal, hatchDistance: e.target.value });
                  }}
                  value={formVal["hatchDistance"]}
                  type="text"
                  className="form-control"
                  id="distanceInput"
                  name="distanceInput"
                  required
                  autoComplete="off"
                  placeholder="eg., 0.2 mm"
                />
                {formVal["hatchDistance"] !== "" ? (
                  !isValidInput(Number(formVal["hatchDistance"]), 0.0000001, 100) ? (
                    <FormAlert text={"Value should be between 0(exclusive) and 100"} warning={true} />
                  ) : (
                    <FormAlert warning={false} />
                  )
                ) : (
                  <></>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="powerInput" className="form-label">
                  Laser power
                </label>
                <input
                  onChange={(e) => {
                    setFormVal({ ...formVal, laserPower: e.target.value });
                  }}
                  value={formVal["laserPower"]}
                  type="text"
                  className="form-control"
                  id="powerInput"
                  name="powerInput"
                  required
                  autoComplete="off"
                  placeholder="eg., 300 watts"
                />
                {formVal["laserPower"] !== "" ? (
                  !isValidInput(Number(formVal["laserPower"]), 1, 10000) ? (
                    <FormAlert text={"Value should be between 1 and 10000"} warning={true} />
                  ) : (
                    <FormAlert warning={false} />
                  )
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="thicknessInput" className="form-label">
                  Layer thickness
                </label>
                <input
                  onChange={(e) => {
                    setFormVal({ ...formVal, layerThickness: e.target.value });
                  }}
                  value={formVal["layerThickness"]}
                  type="text"
                  className="form-control"
                  id="thicknessInput"
                  name="thicknessInput"
                  required
                  autoComplete="off"
                  placeholder="eg., 0.08 mm"
                />
                {formVal["layerThickness"] !== "" ? (
                  !isValidInput(Number(formVal["layerThickness"]), 0.0000001, 100) ? (
                    <FormAlert text={"Value should be between 0(exclusive) and 100"} warning={true} />
                  ) : (
                    <FormAlert warning={false} />
                  )
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-3 form-check">
                <input
                  onChange={() => {
                    setFormVal({ ...formVal, save: !formVal["save"] });
                  }}
                  checked={formVal["save"]}
                  type="checkbox"
                  className="form-check-input"
                  id="check1"
                  name="check1"
                />
                <label className="form-check-label" htmlFor="check1">
                  Save results
                </label>
              </div>
              {isValidInput(
                Number(formVal["layerThickness"]),
                0.0000001,
                100 &&
                  isValidInput(Number(formVal["laserPower"]), 1, 10000) &&
                  isValidInput(Number(formVal["hatchDistance"]), 0.0000001, 100) &&
                  isValidInput(Number(formVal["laserPower"]), 1, 10000)
              ) ? (
                <button type="submit" className="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="predict">
                  Predict
                </button>
              ) : (
                <button type="submit" className="btn btn-primary" disabled data-bs-toggle="tooltip" data-bs-placement="top" title="disabled">
                  Predict
                </button>
              )}
            </form>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                clearForm();
              }}
              type="button"
              className="btn btn-outline-danger"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="clear form">
              Clear
            </button>
            <button
              onClick={() => {
                clearForm();
              }}
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="close form">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
