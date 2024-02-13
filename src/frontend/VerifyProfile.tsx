import { useState } from "react";
import "./newInstitution.scss";

function VerifyProfile() {
  const [saving, setSaving] = useState(false);

  function changeFile(arg0: File | undefined): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <h4 className="h">Verify Profile by ID</h4>

      <div className="form" style={{ opacity: saving ? 0.5 : 1 }}>
        <div className="form-row">
          <div className="form-label">
            Enter ID: <br />{" "}
          </div>
          <div className="form-input">
            <input type="text" placeholder="Enter profile ID" />
          </div>
        </div>

        <div className="form-footer">
          <button
            className="form-button"
            onClick={VerifyProfile}
            disabled={saving}
          >
            Verify
          </button>
        </div>
      </div>
    </>
  );
}

export default VerifyProfile;
