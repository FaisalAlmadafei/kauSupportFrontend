import React, { useEffect, useState } from "react";
import "../SharedCSS/SuggestSolution.css";
function SuggestedSolution({
  closeForm,
  problemDescription,
}) {
  const [suggestionsArray, setsuggestionsArray] = useState([]);
  
useEffect(() => {
  async function getSuggestedSolution() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalMember_/SuggestSolution?problem=${problemDescription}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.text(); // Use response.text() instead of response.json()
        console.log(result);

        // Split the result string into an array of suggestions using the line breaks
         setsuggestionsArray(result.split(".").map((suggestion) => suggestion.trim()));

        // Set the suggestions array in the state
        
      } else if (response.status === 400) {
        console.log("this 400");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }

  getSuggestedSolution();
}, []);

  return (
    <div>
      {" "}
      <div className="suggested-solution-form">
      <div onClick={closeForm} className="close-icon-form">
          x
        </div>
        <h4 className="suggested-solution-lable">
        Suggested Solution:{" "}
        </h4>
        <div className="suggested-solution-description">
      {suggestionsArray && suggestionsArray.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}> 
          {suggestionsArray.map((suggestion, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>{`${suggestion}`}</li>
          ))}
        </ul>
      ) : (
        <p>Waiting for AI response.</p>
      )}
    </div>
      </div>


    </div>
  )
}

export default SuggestedSolution