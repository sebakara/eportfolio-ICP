import { useState } from "react";
import "./newInstitution.scss";

function NewProfile() {
  const [saving, setSaving] = useState(false);

  function changeFile(arg0: File | undefined): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <h1 className="h">Profile registration form</h1>

      <div className="form" style={{ opacity: saving ? 0.5 : 1 }}>
        <div className="form-row">
          <div className="form-label">
            First Name: <br />{" "}
          </div>
          <div className="form-input">
            <input type="text" placeholder="Enter your First Name " />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Middle Name (Optional): <br />{" "}
          </div>
          <div className="form-input">
            <input
              type="text"
              placeholder="Enter your Middle Name (Optional)"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Last Name: <br />{" "}
          </div>
          <div className="form-input">
            <input type="text" placeholder="Enter your Last Name" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Email (Optional): <br />{" "}
          </div>
          <div className="form-input">
            <input type="text" placeholder="Enter your Email (Optional)" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Telephone (Optional): <br />{" "}
          </div>
          <div className="form-input">
            <input type="text" placeholder="Enter your Telephone (Optional)" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Date of birth: <br />{" "}
          </div>
          <div className="form-input">
            <input type="date" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Gender : <br />{" "}
          </div>
          <div className="form-input">
            <input type="radio" /> Male <input type="radio" /> Female{" "}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Country of birth: <br />{" "}
          </div>
          <div className="form-input">
            <input type="text" placeholder="Enter your Country of birth" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            Address: <br />{" "}
          </div>
          <div className="form-input">
            <input type="text" placeholder="Enter your Address" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            User Logo <br /> :{" "}
          </div>
          <div className="form-input">
            <input
              type="file"
              onChange={(e) => changeFile(e.target.files?.[0])}
            />
          </div>
        </div>

        <div className="form-footer">
          <button
            className="form-button"
            onClick={NewProfile}
            disabled={saving}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default NewProfile;
