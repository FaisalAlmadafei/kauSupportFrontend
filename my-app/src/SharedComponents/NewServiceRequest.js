import React, {useState} from "react";
import { useContext } from "react";
import { LoginContext } from "../App";
import { Alert } from "antd";
import FmNavigationBar from "./NavigationBar";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "../SharedCSS/NewServiceRequest.css";

function NewServiceRequest() {
const [search, setSearch] = useState("");
const [ReqDescription, setReqDescription] = useState(""); 
const [userID] = useContext(LoginContext);
const [ShowSuccessAlert, setShowSuccessAlert] = useState(false);
const navigate = useNavigate();

async function addRequest () {
  if (ReqDescription.length > 0){
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    
    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/FacultyMember_/RequestService?Request_=${ReqDescription}&Requested_By=${userID}`,
        requestOptions
      );
      if (response.status === 400) {
        alert("Somehting happened, try again")
      } else if (response.ok) {
        setShowSuccessAlert(true);  
        setReqDescription("") ;    
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert(
        "An error occurred. Please check your connection and try again."
      );
    }
  } else {
    alert("Please Enter request description ..");
  }
}

  return (

    <div>
      <FmNavigationBar setSearch={setSearch} placeholderValue={"search"}/>
      <div onClick={()=>{navigate("/Home")}} className="back-icon">
        <IoIosArrowBack/>


        </div>

      {ShowSuccessAlert && (
        <Alert
          className="request-alert-success"
          message="Service requested Successfully!"
          description="Thank you!"
          type="success"
          showIcon
          closable
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
      <div>
        <div className="request-form">
          <h3 style={{color: "white"}}>Please enter a brief description of the request</h3> 
          <textarea
          value={ReqDescription}
          required
          className="request-input"
          onChange={(e) => {setReqDescription(e.target.value)}}
          ></textarea>
          <br></br>
          <button className="request-button" onClick={addRequest}> 
           Send Request
          </button>
          </div>                
      </div>
      <Footer/>
    </div>
  )
}

export default NewServiceRequest;