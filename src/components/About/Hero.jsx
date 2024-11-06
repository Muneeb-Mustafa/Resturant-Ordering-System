import React from "react";
import { Breadcrumb } from "react-bootstrap";  
import { Link } from "react-router-dom";  

const Hero = () => {
  return (
    <div className="sectionStyles">
      <h4
        style={{
          fontFamily: "Playfair-Display",
          color: "black"
        }}
      >
        About Us
      </h4>

      <Breadcrumb>
        <Breadcrumb.Item as={Link} to="/" style={{ textDecoration: "none" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>About Us</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Hero;
