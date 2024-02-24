import React from "react";
import { useEffect } from "react";

function SearchedResult({serialNumber}) {
    async function searchDevice() {
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
            console.log(result["device"]);
          } else if (response.status === 400) {
            alert("No device found");
          } else {
            alert("An error occurred. Please try again.");
          }
        } catch (error) {
          console.log("error", error);
          alert("An error occurred. Please check your connection and try again.");
        }
      }
    useEffect(() => {
        
    }, []);
  return (

    <div>




    </div>



  ) ;
}

export default SearchedResult;
