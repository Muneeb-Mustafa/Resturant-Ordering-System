import React from "react";
import Logo1 from "../../../src/Images/Logo1.png"
import Logo2 from "../../../src/Images/Logo2.png"

const Section3 = () => {
  return (
    <div
      className="section3 text-center"
      style={{
        backgroundColor: "#F5F3F2", 
      }}
    >
      <div className="mb-5 pt-5  mob">
        <p>
          “We are community-led, with a continued commitment to be the most
          responsible <br /> version of ourselves – and we never rest on our
          laurels.”
        </p>
      </div>
      <div className="row justify-content-center mt-4 pb-lg-5 pb-md-5"> 
        <div className="col-md-2 col-6 ">
          <img
            src={Logo1}
            alt="Company Logo 1"
            className="img-fluid" 
            style={{ maxWidth: "100%", height: "auto" }} 
            />
        </div>
        <div className="col-md-2 col-6  ">
          <img
            src={Logo2}
            alt="Company Logo 2"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
            />
        </div>
        <div className="col-md-2 col-6 ">
          <img
            src={Logo1}
            alt="Company Logo 3"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
            />
        </div>
        <div className="col-md-2 col-6 ">
          <img
            src={Logo2}
            alt="Company Logo 4"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Section3;
