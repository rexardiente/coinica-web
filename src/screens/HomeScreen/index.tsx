import React, { Fragment } from "react";
import Dashboard from "../../components/Dashboard";
import Carousel from "../../components/CarouselComponent";
import "./Homescreen.scss";

const HomeScreen = () => {
  return (
    <Fragment>
      <Carousel />
      <div className="my-5" />
      <Dashboard />
    </Fragment>
  );
}

export default HomeScreen;
