import React, { Component } from "react";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translate } from "../../helpers/translate";
import "./Footer.scss";

class Footer extends Component {
  render = () => {
    return (
      <footer className="footer py-3 mt-auto bottom-relative" id="fixed-bottom">
        <div className="container-fluid pl-5 pr-5">
          <div className="row">
            <div className="col-md-6 col-12 text-center text-white">
              <div className="row float-md-left">
                <div className="col-md-auto col-12">
                  <small data-toggle="modal" data-target="#termsOfUse">
                    {translate("footer.termsOfUse")}
                  </small>
                </div>
                <div className="col-md-auto col-12">
                  <small data-toggle="modal" data-target="#privacyPolicy">
                    {translate("footer.privacyPolicy")}
                  </small>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 text-center text-white">
              <span className="float-md-right">
                <FontAwesomeIcon icon={faCopyright} />
                <small className="ml-2">
                  2020-2021 Coinica, {translate("footer.allRightsReserved")}
                </small>
              </span>
            </div>
          </div>
        </div>
      </footer>
    );
  };
}

export default Footer;
