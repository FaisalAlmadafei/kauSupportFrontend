import React, { useState } from "react";
import "../FacultyMemberCSS/FmNavigationBar.css";
import "../SharedCSS/HomePage.css";

function NavigationBar() {
let services = [
{serviceName: "New Report"},
{serviceName: "Previous Reports"}, 
{serviceName:"Request a Service"},
{serviceName: "My Requests"},
{serviceName: "Devices Availability"}, 
];

  return (    
      <div>
        <nav>
          <ul>
            {services.map((service, index) => (
              <React.Fragment key={services.serviceName}>
              <li className="nav-service">{service.serviceName}</li>
              {index < services.length - 1 && <li>|</li>}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        </div>

  )
}

export default NavigationBar;
