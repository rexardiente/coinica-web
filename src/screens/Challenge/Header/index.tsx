import React from "react";
import { icon_challenge, clock } from "../Assets";
import { translate } from "helpers/translate";
import "./Header.scss";

const Header = () => {
  return (
    <div className="challenge-title d-flex flex-column flex-md-row justify-content-between px-3 px-md-5">
      <h3>
        <img
          src={icon_challenge}
          height="25px"
          width="25px"
          className="mr-2"
          alt="icon-challenge"
        />
        {translate("challenge.title")}
      </h3>
      <h3>
        <img
          src={clock}
          height="25px"
          width="25px"
          className="mr-2"
          alt="clock"
        />
        21:02:24
      </h3>
    </div>
  );
};

export default Header;
