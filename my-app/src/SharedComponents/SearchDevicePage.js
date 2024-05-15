import React, { useEffect } from "react";
import NavigationBar from "./NavigationBar";
import "../SharedCSS/SearchDevicePage.css";
import DeviceCard from "./DeviceCard";
import { useState } from "react";
import MyReportCard from "./MyReportCard";
import { Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Footer from "./Footer";
import BarChart from "../TechnicalSupervisor/BarChart";

function SearchDevicePage() {
  const [SerialNumber, setSerialNumber] = useState("");
  const [device, setdevice] = useState("");
  const [Reports, setReports] = useState([]);
  const [ShowData, setShowData] = useState(false);
  const [ShowWarningAlert, setShowWarningAlert] = useState(false);
  const [ShowEnterSerialNumberAlert, setShowEnterSerialNumberAlert] =
    useState(false);
  const [StatisticsChartData, setStatisticsChartData] = useState(null);
  const [reportsTotalCount, setreportsTotalCount] = useState("");
  const [ShowChart, setShowChart] = useState(false);

  const navigate = useNavigate();

  async function searchDevice() {
    if (SerialNumber.length > 0) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://kausupportapi.azurewebsites.net/api/TechnicalMember_/SearchForDevice?Serial_Number=${SerialNumber}`,
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
          setdevice(result["device"]);
          setReports(result["reports"]);

          setShowData(true);
        } else if (response.status === 400) {
          setShowWarningAlert(true);
        } else {
          alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.log("error", error);
        alert("An error occurred. Please check your connection and try again.");
      }
      getDeviceReportsStatistics();
    } else {
      setShowEnterSerialNumberAlert(true);
    }
  }

  async function getDeviceReportsStatistics() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalSupervisor_/GetDeviceReportStatistics?Serial_Number=${SerialNumber}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setreportsTotalCount(result.reportsTotalCount);
        setStatisticsChartData({
          labels: result.details.map((type) => type.problemType),

          datasets: [
            {
              label: "Number Of Reports",

              data: result.details.map((type) => type.count),
              backgroundColor: ["rgb(166, 152, 218)"],
            },
          ],
        });
        setShowChart(true);
      } else if (response.status === 400) {
        setShowChart(false);
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }

  return (
    <div>
      <NavigationBar showSearchBar={"No"} />

      <div
        onClick={() => {
          navigate("/Home");
        }}
        className="back-icon"
      >
        <IoIosArrowBack />
      </div>
      {ShowWarningAlert && (
        <Alert
          className="warning-alert"
          message="No device found"
          description="Please make sure serial number is correct."
          type="warning"
          showIcon
          closable
          onClose={() => setShowWarningAlert(false)}
        />
      )}

      {ShowEnterSerialNumberAlert && (
        <Alert
          className="warning-alert"
          message="Please enter serial number..."
          description="Please try again."
          type="warning"
          showIcon
          closable
          onClose={() => setShowEnterSerialNumberAlert(false)}
        />
      )}

      {ShowData == true ? (
        <>
          <div className="result-container">
            <DeviceCard
              deviceNumber={device.deviceNumber}
              type={device.type}
              deviceStatus={device.deviceStatus}
              serialNumber={device.serialNumber}
              deviceLocatedLab={device.deviceLocatedLab}
              arrivalDate={device.arrivalDate}
              nextPeriodicDate={device.nextPeriodicDate}
              setShowData={setShowData}
              serviceType={"searchDevice"}
              setSerialNumber={setSerialNumber}
              setShowChart={setShowChart}
            />

            {ShowChart && (
              <div className="device-reports-chart-container">
                {" "}
                <BarChart
                  className="bar-chart"
                  ChartData={StatisticsChartData}
                  reportsTotalCount={reportsTotalCount}
                  showTotalNumber={"true"}
                />
              </div>
            )}
            {Reports.map((Report) => (
              <MyReportCard
                reportID={Report.reportID}
                deviceNumber={Report.deviceNumber}
                deviceLocatedLab={Report.deviceLocatedLab}
                problemDescription={Report.problemDescription}
                actionTaken={Report.actionTaken}
                reportDate={Report.reportDate}
                repairDate={Report.repairDate}
                reportStatus={Report.reportStatus}
                problemType={Report.problemType}
                serviceType={"Search device"}
                assignedToFirstName={Report.assignedToFirstName}
                assignedToLastName={Report.assignedToLastName}
                reportedByFirstName={Report.reportedByFirstName}
                reportedByLastName={Report.reportedByLastName}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="serach-form-container">
            <lable className="serial-number-lable">
              Enter deivce serial number:
            </lable>
            <input
              onChange={(e) => {
                setSerialNumber(e.target.value);
              }}
              type="text"
              className="serial-number-input"
            />
            <button onClick={searchDevice} className="search-button">
              Search Device
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default SearchDevicePage;
