import React from "react";
import { Link } from "react-router-dom";
import { eosVIP, mahjong, referral } from "./Assets";
import "./Carousel.scss";

class CarouselComponent extends React.Component {
  controlledCarousel = () => {
    return (
      <div
        id="carousel-controls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100 carousel-image" src={eosVIP} alt="First slide" />
            {/* <div className="carousel-caption d-none d-md-block">
              <Link to="/vip"><button className="carousel-vip">See More</button></Link>
            </div> */}
          </div>
          <div className="carousel-item">
            <img className="d-block w-100 carousel-image" src={referral} alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100 carousel-image" src={mahjong} alt="Third slide" />
            {/* <div className="carousel-caption d-none d-md-block text-left">
              <Link to="/game/mahjong"><button className="carousel-mahjong">See More</button></Link>
            </div> */}
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carousel-controls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carousel-controls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  };

  render = () => {
    return this.controlledCarousel();
  };
}

export default CarouselComponent;
