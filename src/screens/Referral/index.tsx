import React, { Component } from "react";
import { connect } from "react-redux";
import ReferralTable from "./Table";
import { toast } from "react-toastify";
import { ApplyReferral, GetUserAccountById } from "services/api/server/platform";
import { ServerAPI as api } from "Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { RouteComponentProps } from "react-router-dom";
import { parse } from "query-string";
import { Modal } from "react-bootstrap";
import { cup, icon_referral, coinica_coin } from "./Assets";
import { setPlatformAccountSuccess } from "redux/platform/platform_action";
import { translate } from "helpers/translate";
import "./Referral.scss";

interface Platform {
  platform: any;
  dispatch: Function;
}

type Props = Platform & RouteComponentProps;

type State = {
  response: any;
  userData: any;
  referralHistory: any;
  isLoading: boolean;
  error: any;
  applyCode: string;
  modalShow: boolean;
  alertShow: boolean;
};

const baseState: State = {
  response: {},
  userData: null,
  referralHistory: [],
  isLoading: false,
  error: "",
  applyCode: "",
  modalShow: false,
  alertShow: false,
}

class Referral extends Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);

    this.state = baseState;

    this.copyLink = this.copyLink.bind(this);

  }

  componentDidMount() {
    let code: any = '';

    if (this.props.location !== undefined) {
      //get query parameter
      const {
        location: { search },
      } = this.props;

      console.log("search", search);

      if (search) {
        const { referral_code } = parse(search)
        console.log("referral_code", referral_code);
        code = referral_code;
      }
    }

    if (this.props.platform.account && !this.state.userData) {
      this.setState({
        userData: this.props.platform.account,
        applyCode: code ? `${code}` : "",
        modalShow: code ? true : false,
      });
    }

  }

  componentDidUpdate(prevProps) {
    console.log('CDU');

    let code: any = '';

    if (this.props.location !== undefined) {
      //get query parameter
      const {
        location: { search },
      } = this.props;

      if (search) {
        const { referral_code } = parse(search);
        code = referral_code ? referral_code : '';
      }
    }

    if (this.props.platform.account) {
      if ((this.state.userData === null && this.props.platform.account !== null) || (this.state.userData.id !== this.props.platform.account.id)) {
        this.setState({
          userData: this.props.platform.account,
          applyCode: code ? `${code}` : "",
          modalShow: code ? true : false,
        });
      }
    } else {
      if (this.state.userData && !this.props.platform.account) {
        this.setState(baseState);
      }
    }
  }

  copyLink(type, text) {
    if (text !== "") {
      // navigator.clipboard.writeText(this.state.userData.referral_code); // only works on HTTPS or localhost
      var textArea = document.createElement("textarea");
      // Place in the top-left corner of screen regardless of scroll position.
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      // doesn't work as this gives a negative w/h on some browsers.
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      // We don't need padding, reducing the size if it does flash render.
      textArea.style.padding = "0";
      // Clean up any borders.
      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";
      // Avoid flash of the white box if rendered for any reason.
      textArea.style.background = "transparent";
      textArea.value = text;

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand("copy");
        // var msg = successful ? 'successful' : 'unsuccessful';
        // console.log('Copying text command was ' + msg);
        if (type === "code") {
          toast.success(translate("referral.copy.code"));
        } else {
          toast.success(translate("referral.copy.link"));
        }
      } catch (err) {
        console.log("Oops, unable to copy");
        toast.error("error getting code");
      }
    } else {
      toast.error("error getting code");
    }
  }

  applyLink() {
    const { userData } = this.state;

    if (userData) {
      ApplyReferral(this.state.applyCode, this.state.userData.id).then(res => {
        toast.success(translate("referral.code.apply"));
        GetUserAccountById(userData.id).then(res => {
          this.props.dispatch(setPlatformAccountSuccess(res.data));
          this.setState({ modalShow: false });
        })
          .catch(err => {
            console.log('error fetching user', err);
          })
      })
        .catch(err => {
          this.setState({
            alertShow: true,
            isLoading: false,
            modalShow: false,
            error: "error applying code",
          });
          console.log("error applying code", err);
        })
    }
  }

  handleChange(e) {
    this.setState({
      applyCode: e.target.value,
    });
  }

  referralHeader() {
    const { userData } = this.state;
    let link = "";
    let refCode = "";
    if (userData) {
      refCode = userData.referral_code;
      link =
        window.location.hostname === "localhost"
          ? `localhost:3000/referral?referral_code=${refCode}`
          : `${api.protocol}://${api.host}/referral?referral_code=${refCode}`;
      // console.log("link", link);
    }

    return (
      <div>
        <div className="row no-gutters">
          <div className="col-lg-2 col-sm-12">
            <h3>
              <img
                className="mr-4"
                src={icon_referral}
                alt="refer"
                width="40"
                height="30"
              />
              {translate("referral.title")}
            </h3>
          </div>
          {this.state.userData ? (
            <>
              <div className="col-lg-4 col-md-12">
                <div className="input-group mb-3">
                  <input
                    id="referral-link"
                    type="text"
                    className="form-control"
                    aria-describedby="button-addon2"
                    value={userData.referral_code}
                    disabled={true}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => this.copyLink("code", refCode)}
                    >
                      {translate("referral.copy.button")}
                    </button>
                    <button
                      className="btn btn-info"
                      type="button"
                      onClick={() => this.copyLink("link", link)}
                    >
                      <FontAwesomeIcon icon={faShare} /> {translate("referral.share.button")}
                    </button>
                  </div>
                </div>
              </div>
              {/* {!true ? */}
              {this.state.userData.referred_by ? (
                ""
              ) : (
                <div className="col-lg-4 col-md-12 ml-lg-3">
                  <div className="input-group mb-3">
                    <input
                      id="referral-link-apply"
                      type="text"
                      className="form-control"
                      aria-describedby="button-addon2"
                      value={this.state.applyCode}
                      onChange={this.handleChange.bind(this)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.applyLink.bind(this)}
                      >
                        {translate("referral.applyReferral.button")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  referralRateAndBonus() {
    const { userData } = this.state;

    return (
      <div className="row mt-5">
        <div className="col-lg-10 col-md-12 mx-auto">
          <div id="referral-rate-bonus" className="row rounded p-4">
            <div className="col-5 mx-auto text-light">
              <div className="row">
                <div className="mr-5">
                  <img src={cup} alt="cup" height="80" />
                </div>
                <div>
                  <h6 className="font-weight-light">{translate("referral.rate")}</h6>
                  <h2>{userData ? userData.referral_rate : 0}%</h2>
                </div>
              </div>
            </div>
            <div className="border"></div>
            <div className="col-5 mx-auto text-light">
              <div className="row">
                <div className="mr-5">
                  <img src={coinica_coin} alt="eos logo" height="80" />
                </div>
                <div>
                  <h6 className="font-weight-light">{translate("referral.bonus")}</h6>
                  <h2>{userData ? this.state.userData.referral : 0}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  referralHIW() {
    return (
      <div className="row mt-5">
        <h4 className="col-10 offset-1 text-black-50">{translate("misc.howItWorks")}</h4>
        <div className="gray-background col-lg-10 col-md-12 mt-2 p-4 rounded mx-auto">
          <h5 className="text-secondary pl-4">
            {translate("referral.instruction")}
          </h5>
          <ol id="referralProgram">
            <li>{translate("referral.instruction.one")}</li>
            <li>
              {translate("referral.instruction.two")}
            </li>
            <li>{translate("referral.instruction.three")}</li>
          </ol>
        </div>
      </div>
    );
  }

  referralTable() {
    const headers = ["Date", "Time", "Referent"];
    const code = this.state.userData ? this.state.userData.referral_code : '';

    return (
      <div className="row mt-5">
        <h4 className="col-10 offset-1 text-black-50">{translate("referral.history")}</h4>
        <div className="col-lg-10 col-sm-12 p-4 mx-auto">
          {/* table */}
          <ReferralTable
            thRowData={headers}
            code={code}
          />
        </div>
      </div>
    );
  }

  referralCheckModal() {
    return (
      <Modal
        show={this.state.modalShow}
        onHide={this.handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <small className="text-secondary">apply referral code</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row text-center">
            <div className="col-12">
              <h5 className="p-3 rounded">{this.state.applyCode}</h5>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-12">
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.applyLink.bind(this)}
              >
                Apply
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  errorModal() {
    return (
      <Modal show={this.state.alertShow} onHide={this.handleClose2}>
        <Modal.Header className="border-0" closeButton>
          {/* <Modal.Title>
            <small className="text-danger">
              Oops! Error applying referral code
            </small>
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="mx-auto alert alert-danger" role="alert">
            <h4>{translate("referral.code.error.header")}</h4>
            <span>{translate("referral.code.error.subHeader")}</span>
            <ol>
              <li>{translate("referral.code.error.reason.one")}</li>
              <li>{translate("referral.code.error.reason.two")}</li>
              <li>{translate("referral.code.error.reason.three")}</li>
            </ol>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  handleClose = () => {
    this.setState({ modalShow: false });
  };

  handleClose2 = () => {
    this.setState({ alertShow: false });
  };

  render(this) {
    return (
      <div className="p-5">
        {this.referralHeader()}
        {this.referralRateAndBonus()}
        {this.referralHIW()}
        {this.referralTable()}
        {this.referralCheckModal()}
        {this.errorModal()}
      </div>
    );
  }
}

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Referral);
