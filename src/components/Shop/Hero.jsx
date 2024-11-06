import React from "react";
import { Breadcrumb } from "react-bootstrap";  
import { Link } from "react-router-dom";  

const Hero = () => {
  return (
    <div className="sectionStyle">
      <h4
        style={{
          fontFamily: "Playfair-Display", 
          color: "black", 
        }}
      >
        Shop
      </h4>

      <Breadcrumb>
        <Breadcrumb.Item as={Link} to="/" style={{ textDecoration: "none" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Shop</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Hero;
