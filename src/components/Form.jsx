import { useState, useEffect, useRef } from "react";
import FormAlert from "./FormAlert";

const Form = ({ predictResult, formRefill }) => {
  let prevData;
  if (formRefill) {
    const parsed = JSON.parse(formRefill.inputs);
    prevData = {
      scanSpeed: parsed.scanSpeed,
      hatchDistance: parsed.hatchDistance,
      laserPower: parsed.laserPower,
      layerThickness: parsed.layerThickness,
      tags: formRefill.tags,
      save: true,
    };
  } else {
    prevData = {
      scanSpeed: "",
      hatchDistance: "",
      laserPower: "",
      layerThickness: "",
      tags: "",
      save: false,
    };
  }

  const [formVal, setFormVal] = useState(prevData);
  const closeRef = useRef(null);

  useEffect(() => {
    setFormVal(prevData);
  }, [formRefill]);

  const clearForm = () => {
    setFormVal({
      scanSpeed: "",
      hatchDistance: "",
      laserPower: "",
      layerThickness: "",
      tags: "",
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
      tags: formVal["tags"].trim(),
      save: formVal["save"],
    });
    closeRef.current.click();
  };

  const isValidInput = (value, lower, higher) => {
    return !(isNaN(value) || value <= lower || value > higher);
  };
  return (
    <div className="modal fade" tabIndex={-1} id="formModal">
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
              ref={closeRef}
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
                  tabIndex={1}
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
                  tabIndex={2}
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
                  tabIndex={3}
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
                  tabIndex={4}
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
              <div className="mb-3">
                <label htmlFor="tagsInput" className="form-label">
                  Add tags
                </label>
                <input
                  onChange={(e) => {
                    setFormVal({ ...formVal, tags: e.target.value });
                  }}
                  value={formVal["tags"]}
                  type="text"
                  className="form-control"
                  id="tagsInput"
                  name="tagsInput"
                  tabIndex={5}
                  autoComplete="off"
                  placeholder="use a comma(,) for multi tags"
                />
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
