import React, { useState } from "react";
import "./newInstitution.scss";
import profileData from "./profiledata.json";

interface Profile {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  // Add other profile properties
}

interface Certification {
  profile_id: string;
  id: string;
  description: string;
  start_date: string;
  end_date: string;
  // Add other certification properties
}

interface Education {
  profile_id: string;
  id: string;
  academic_level: string;
  school_name: string;
  start_date: string;
  end_date: string;
  // Add other education properties
}

interface Experience {
  profile_id: string;
  id: string;
  // Define experience properties
}

function VerifyProfile() {
  const [saving, setSaving] = useState(false);
  const [profile_id, setProfileId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [educationData, setEducationData] = useState<Education[]>([]);
  const [certificationData, setCertificationData] = useState<Certification[]>(
    []
  );
  const [experienceData, setExperienceData] = useState<Experience[]>([]);

  const closeModal = () => {
    setShowModal(false);
    // Clear data
    setProfileData(null);
    setEducationData([]);
    setCertificationData([]);
    setExperienceData([]);
  };

  return (
    <>
      <h4 className="h">Verify Profile by ID</h4>

      <div className="form" style={{ opacity: saving ? 0.5 : 1 }}>
        <div className="form-row">
          <div className="form-label">
            Enter ID: <br />{" "}
          </div>
          <div className="form-input">
            <input
              type="text"
              value={profile_id}
              onChange={(e) => setProfileId(e.target.value)}
              placeholder="Enter profile ID"
            />
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

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {profileData && (
              <div>
                <h2>Profile Information</h2>
                <h3>Profile</h3>
                <p>
                  {profileData.firstname} {profileData.lastname}
                </p>
                <p>Email: {profileData.email}</p>
                {/* Render other profile data */}
              </div>
            )}
            <div>
              <h3>Education</h3>
              {educationData.map((edu) => (
                <div key={edu.id}>
                  <p>
                    {edu.academic_level} - {edu.school_name}
                  </p>
                  {/* Render other education data */}
                </div>
              ))}
            </div>
            <div>
              <h3>Certifications</h3>
              {certificationData.map((cert) => (
                <div key={cert.id}>
                  <p>{cert.description}</p>
                  {/* Render other certification data */}
                </div>
              ))}
            </div>
            <div>
              <h3>Experience</h3>
              {experienceData.map((exp) => (
                <div key={exp.id}>{/* Render experience data */}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VerifyProfile;
