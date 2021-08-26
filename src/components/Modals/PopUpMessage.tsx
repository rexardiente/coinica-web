import React from "react";
import { XCircle } from "react-bootstrap-icons";

const PopUpMessage = () => (
  <div
    className="modal fade"
    id="popUpMessage"
    data-backdrop="static"
    data-keyboard="false"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="popUpMessageLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content round-5">
        <button
          type="button"
          className="close text-white ml-auto mr-3 mt-3"
          data-dismiss="modal"
          aria-label="Close"
        >
          <XCircle className="fa fa-lg" />
        </button>
        <div className="modal-body text-white">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-12 m-auto pt-5">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
                  className="game-img img-fluid w-100 m-autO"
                  alt="coming-soon"
                />
              </div>
              <div className="col-md-6 col-12 pt-5">
                <h4 className="font-weight-bold text-success text-md-left text-center">
                  Gemstar Arrival!
                </h4>
                <h5 className="mt-4">Launching soon!</h5>
                <p className="small font-weight-light pr-md-4 text-justify">
                  Lorem Ipsum has been the industry's standard dummy text
                  ever since the 1500s when an unknown printer took a galley
                  of type and scrambled it to make a type specimen book. It
                  has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially
                  unchanged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PopUpMessage;
