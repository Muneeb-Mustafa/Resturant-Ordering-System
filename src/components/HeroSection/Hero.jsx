import React from "react";
import Carousel from "react-bootstrap/Carousel"; 
import ExampleCarouselImage from "./ExampleCarouselImage";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";  
import Slide1 from "../../../src/Images/Slide1.jpg";  
import Slide2 from "../../../src/Images/Slide2.jpg";
import Slide3 from "../../../src/Images/Slide3.jpg";
import Slide4 from "../../../src/Images/Slide4.jpg";

const slides = [
  {
    src: Slide1,
    subtitle: "Delicious Meals Await!",
    label: "Order Your Favorite Dish",
    description: "Get 20% off your first order. Fast delivery to your doorstep!",
  },
  {
    src: Slide2,
    subtitle: "Fresh Ingredients Daily",
    label: "Healthy & Tasty Options",
    description: "Explore our menu and enjoy a delightful dining experience!",
  },
  {
    src: Slide3,
    subtitle: "Craving Something Special?",
    label: "Weekly Specials Just for You",
    description: "Check out our special deals on your favorite meals!",
  }, 
  {
    src: Slide4,
    subtitle: "Satisfy Your Hunger",
    label: "Order Now and Enjoy!",
    description: "Delicious food delivered hot and fresh to your door!",
  },
];

function Hero() {
  return (
    <Carousel className="carousels">
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <ExampleCarouselImage imageSrc={slide.src} /> 
          <div className="carousel-overlay" />
          <Carousel.Caption className="carousel-caption-center">
            <p id="des">{slide.subtitle}</p>
            <h1>{slide.label}</h1>
            <p>{slide.description}</p>
            <Link to="/menu">
              <button className="btn btn-danger">
                Order Now<FaArrowRight style={{ paddingLeft: "5px" }} />
              </button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Hero;
