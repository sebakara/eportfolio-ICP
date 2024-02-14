import React, { useEffect, useState } from "react";
import "./DashboardStyle.scss";
import "./DashboardResponsive.scss";
import { Link } from "react-router-dom";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import { backend } from "../declarations/backend";

interface NavigationProps {
  isLoggedIn: boolean;
  handleLoginStatus: (status: boolean) => void;
}

function Dashboard({ isLoggedIn, handleLoginStatus }: NavigationProps) {
  const [principal, setPrincipal] = useState<Principal | undefined>(undefined);
  const [needLogin, setNeedLogin] = useState(true);

  const authClientPromise = AuthClient.create();

  const signIn = async () => {
    const authClient = await authClientPromise;

    const internetIdentityUrl = import.meta.env.PROD
      ? undefined
      : `http://localhost:4943/?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}`;

    await new Promise((resolve) => {
      authClient.login({
        identityProvider: internetIdentityUrl,
        onSuccess: () => resolve(undefined),
      });
    });

    const identity = authClient.getIdentity();
    updateIdentity(identity);
    setNeedLogin(false);
    handleLoginStatus(true);
  };
  const signOut = async () => {
    const authClient = await authClientPromise;
    await authClient.logout();
    const identity = authClient.getIdentity();
    updateIdentity(identity);
    setNeedLogin(true);
    handleLoginStatus(false);
  };

  const updateIdentity = (identity: Identity) => {
    setPrincipal(identity.getPrincipal());
    (Actor.agentOf(backend) as HttpAgent).replaceIdentity(identity);
  };

  const setInitialIdentity = async () => {
    try {
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      updateIdentity(identity);
      setNeedLogin(!(await authClient.isAuthenticated()));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setInitialIdentity();
  }, []);
  return (
    <>
      <div className="main-container">
        <div className="navcontainer">
          <nav className="nav">
            <div className="nav-upper-options">
              <div className="nav-option option1">
                <h3> Dashboard</h3>
              </div>
              <div className="nav-option option1">
                {" "}
                <Link to="/NewProfile">Create Profile</Link>{" "}
              </div>
              <div className="nav-option option1">
                {" "}
                <Link to="/RecordExperience">Record Experience</Link>{" "}
              </div>
              <div className="nav-option option1">
                <Link to="/AssignCertificate">Assign Certificate</Link>{" "}
              </div>{" "}
            </div>
          </nav>
        </div>
        <div className="main">
          <div className="box-container">
            <div className="box box1">
              <div className="text">
                <h2 className="topic-heading">5</h2>
                <h2 className="topic">Registered Institutions</h2>
              </div>
            </div>

            <div className="box box2">
              <div className="text">
                <h2 className="topic-heading">10</h2>
                <h2 className="topic">Registered Profiles</h2>
              </div>
            </div>

            <div className="box box3">
              <div className="text">
                <h2 className="topic-heading">4</h2>
                <h2 className="topic">Registered Certificates</h2>
              </div>
            </div>

            <div className="box box4">
              <div className="text">
                <h2 className="topic-heading">2</h2>
                <h2 className="topic">Registered Work Experiences</h2>
              </div>
            </div>
          </div>

          <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">Recent created profiles</h1>
            </div>

            <div className="report-body">
              <div className="report-topic-heading">
                <h3 className="t-op">Image</h3>
                <h3 className="t-op">Name</h3>
                <h3 className="t-op">Phone</h3>
                <h3 className="t-op">More</h3>
                <h3 className="t-op">Documents</h3>
              </div>

              <div className="items">
                <div className="item1">
                  <h3 className="t-op-nextlvl">Image Here </h3>
                  <h3 className="t-op-nextlvl">Kwizera Emmanuel</h3>
                  <h3 className="t-op-nextlvl">+250 788 </h3>
                  <h3 className="t-op-nextlvl label-tag">Get Details</h3>
                  <h3 className="view">Get Doc</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
