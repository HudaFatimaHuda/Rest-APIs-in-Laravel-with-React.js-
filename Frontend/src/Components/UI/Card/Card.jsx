import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from 'react'

function Card(props) {
  return (
    <div className="col-lg-4 col-md-6 mx-auto my-4">
              <div className="service-item  position-relative">
                <div className="icon">
                  <FontAwesomeIcon icon={["bi", "bi-activity"]} />
                  <i className="bi bi-activity"></i>
                </div>
                <h3>{props.title}</h3>
                <p>
                  {props.description}
                </p>
                <a href="Servicie.html" className="readmore stretched-link">
                  Read more <FontAwesomeIcon icon={["bi", "bi-arrow-right"]} />{" "}
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
  )
}

export default Card
