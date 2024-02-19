import React from "react";
import "./App.css";
import LoginPage from "./SharedComponents/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import FmHomePage from "./FacultyMamber/FmHomePage";
import TsvHomePage from "./TechnicalSupervisor/TsvHomePage";
import TsHomePage from "./TehcnicalMember/TsHomePage";
import LabsPage from "./SharedComponents/LabsPage";
import LabDevicesPage from "./SharedComponents/LabDevicesPage";
import PreviousReportsPage from "./FacultyMamber/PreviousReportsPage";
import NewServiceRequest from "./SharedComponents/NewServiceRequest";
import DevicesAvailabilityPage from "./SharedComponents/DevicesAvailabilityPage";
export const LoginContext = React.createContext();
export const NewReportContext = React.createContext();
export const ServicesContext = React.createContext();

// This is my app file
function App() {
  const [userID, setUserID] = useState(localStorage.getItem("UserID") || "");
  const [userPass, setuserPass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );

  const [LabNumber, setLabNumber] = useState("0");
  const [FmServices, setFmServices] = useState([]);
  const [TsServices, setTsServices] = useState([]);
  const [TsvServices, setTsvmServices] = useState([]);


  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userID", userID);
  }, [isLoggedIn, userRole, userID]);

  return (
    <div className="App">
       <ServicesContext.Provider value={{ FmServices , setFmServices , TsServices , setTsServices , TsvServices , setTsvmServices}}>
      <NewReportContext.Provider value={{ LabNumber, setLabNumber }}>
        <LoginContext.Provider
          value={[
            userID,
            setUserID,
            userPass,
            setuserPass,
            isLoggedIn,
            setIsLoggedIn,
            setUserRole,
            userRole,
          ]}
        >
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/Home"
                element={
                  userRole === "Faculty Member" ? (
                    <FmHomePage />
                  ) : userRole === "Supervisor" ? (
                    <TsvHomePage />
                  ) : userRole === "Technical Member" ? (
                    <TsHomePage />
                  ) : (
                    <LoginPage />
                  )
                }
              />

            <Route path="/LabsPage" element={<LabsPage />} />
            <Route path="/LabDevicesPage" element={<LabDevicesPage />} />
            <Route path="/PreviousReportsPage" element={<PreviousReportsPage />} />
            <Route path="/NewServiceRequest" element={<NewServiceRequest />} />
            <Route
                path="/DevicesAvailabilityPage"
                element={<DevicesAvailabilityPage />}
              />

          </Routes>
        </Router>
      </LoginContext.Provider>
      </NewReportContext.Provider>
      </ServicesContext.Provider>
    </div>
  );
}

export default App;
