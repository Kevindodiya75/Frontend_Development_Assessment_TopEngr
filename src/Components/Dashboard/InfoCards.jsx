import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const InfoCards = ({ data }) => {
  const keys = ["dp1", "dp2", "dp3"];

  return (
    <div className="row g-3 mb-4">
      {keys.map((key, index) => (
        <div key={index} className="col-12 col-md-6 col-lg-4">
          <div className="info-card card text-center shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-secondary">{`Data Point ${
                index + 1
              }`}</h5>
              <p className="card-text text-dark display-6">
                {data[key] || "Loading..."}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

InfoCards.propTypes = {
  data: PropTypes.shape({
    dp1: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dp2: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dp3: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default InfoCards;
