import "./newInstitution.scss";
import { useState } from "react";
import { backend } from "../declarations/backend";
import { useNavigate } from "react-router-dom";

function NewInstitution() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(Uint8Array.of());
  const [duration, setDuration] = useState(120);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const newInstitution = async () => {
    setSaving(true);
    try {
      let newInstitution = {
        title,
        description,
        image,
      };
      await backend.newInstitution(newInstitution);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const changeFile = async (file: File | undefined) => {
    let data = Uint8Array.of();
    if (file != null) {
      const stream = await file.stream();
      const reader = stream.getReader();
      while (true) {
        const part = await reader.read();
        const chunk = part.value;
        if (chunk == null) {
          break;
        }
        data = concatUint8Arrays(data, chunk);
      }
    }
    setImage(data);
  };

  // TODO: Faster way of concatenation
  const concatUint8Arrays = (
    left: Uint8Array,
    right: Uint8Array
  ): Uint8Array => {
    let temporary: number[] = [];
    for (let element of left) {
      temporary.push(element);
    }
    for (let element of right) {
      temporary.push(element);
    }
    return Uint8Array.from(temporary);
  };

  return (
    <>
      <h4 className="h">
        Request Accreditation of your Institution. Once you are approved, <br />
        you will be able to record Portfolios
      </h4>
      <div className="form" style={{ opacity: saving ? 0.5 : 1 }}>
        <div className="form-row">
          <div className="form-label">
            Institution / <br /> Company name:{" "}
          </div>
          <div className="form-input">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">
            full Description
            <br />
            of what you do:{" "}
          </div>
          <div className="form-input">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">
            Logo of your <br /> Institution (PNG only):{" "}
          </div>
          <div className="form-input">
            <input
              type="file"
              accept=".png"
              onChange={(e) => changeFile(e.target.files?.[0])}
            />
          </div>
        </div>

        <div className="form-footer">
          <button
            className="form-button"
            onClick={newInstitution}
            disabled={saving}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default NewInstitution;
