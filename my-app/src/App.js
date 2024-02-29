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
import MyRequestsPage from "./FacultyMamber/MyRequestsPage";
import SearchDevicePage from "./SharedComponents/SearchDevicePage";
import MangeDevicesPage from "./SharedComponents/MangeDevicesPage";
import AddDevicePage from "./SharedComponents/AddDevicePage";
import DeleteDevicePage from "./SharedComponents/DeleteDevicePage";
import SupervisorReportsPage from "./TechnicalSupervisor/SupervisorReportsPage";
import SupervisorRequestsPage from "./TechnicalSupervisor/SupervisorRequestsPage";
export const LoginContext = React.createContext();
export const NewReportContext = React.createContext();
export const ServicesContext = React.createContext();

// This is my app file
function App() {
  const [userID, setUserID] = useState(localStorage.getItem("userID") || "");
  const [userPass, setuserPass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );

  const [LabNumber, setLabNumber] = useState("0");
  const [services, setServices] = useState([]);

  useEffect(() => {
    const servicesByRole = {
      "Faculty Member": [
        { serviceName: "Home", pageLink: "/Home" },
        { serviceName: "New Report", pageLink: "/LabsPage" },
        { serviceName: "Previous Reports", pageLink: "/PreviousReportsPage" },
        {
          serviceName: "Request a Service",

          pageLink: "/NewServiceRequest",
        },
        { serviceName: "My Requests", pageLink: "/LabsPage" },
        {
          serviceName: "Devices Availability",

          pageLink: "/DevicesAvailabilityPage",
        },
      ],
      "Technical Member": [
        // ...services for technical member
      ],
      Supervisor: [
        { serviceName: "Home", pageLink: "/Home" },
        {
          serviceName: "Reports",

          notification: "true",
          pageLink: "/SupervisorReportsPage",
        },

        {
          serviceName: "Requests",

          notification: "true",
          pageLink: "/SupervisorRequestsPage",
        },
        {
          serviceName: "Team Progress",

          notification: "false",
          pageLink: "/LabsPage",
        },
        {
          serviceName: "Search for a device",

          notification: "false",
          pageLink: "/SearchDevicePage",
        },
        {
          serviceName: "Manage Devices",

          notification: "false",
          pageLink: "/MangeDevicesPage",
        },
        {
          serviceName: "Devices Availability",

          notification: "false",
          pageLink: "/DevicesAvailabilityPage",
        },
      ],
      // ...other roles
    };
    setServices(servicesByRole[userRole] || []);
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userID", userID);
  }, [isLoggedIn, userRole, userID]);

  return (
    <div className="App">
      <ServicesContext.Provider value={{ services }}>
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
                <Route
                  path="/PreviousReportsPage"
                  element={<PreviousReportsPage />}
                />
                <Route
                  path="/NewServiceRequest"
                  element={<NewServiceRequest />}
                />
                <Route
                  path="/DevicesAvailabilityPage"
                  element={<DevicesAvailabilityPage />}
                />
                <Route path="/MyRequestsPage" element={<MyRequestsPage />} />
                <Route path="/SearchDevicePage" element={<SearchDevicePage />} />
                <Route path="/MangeDevicesPage" element={<MangeDevicesPage />} />
                <Route path="/AddDevicePage" element={<AddDevicePage />} />
                <Route path="/DeleteDevicePage" element={<DeleteDevicePage />} />
                <Route path="/SupervisorReportsPage" element={<SupervisorReportsPage />} />
                <Route path="/SupervisorRequestsPage" element={<SupervisorRequestsPage />} />



              </Routes>
            </Router>
          </LoginContext.Provider>
        </NewReportContext.Provider>
      </ServicesContext.Provider>
    </div>
  );
}

export default App;
