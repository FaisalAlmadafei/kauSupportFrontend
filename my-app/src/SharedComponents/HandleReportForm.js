import React from "react";
import "../SharedCSS/HandleReportForm.css";

function HandleReportForm({closeForm}) {
  return (

    <div>
        <div className="report-handle-form">
            <div onClick={closeForm} className="close-icon">x</div>
            <textarea
            required
            className="handel-report-input"
           
          ></textarea>

        </div>
    </div>
  );
}

export default HandleReportForm;
