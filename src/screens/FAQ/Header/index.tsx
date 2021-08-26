import React, { PureComponent } from "react";
import { QuestionCircle, ArrowRight } from "../Assets";

class Header extends PureComponent {

  renderIntro() {
    return (
      <div className="intro d-flex justify-content-between">
        Introduction <span className="arrow-right"> <img src={ArrowRight} /> </span>
      </div>
    )
  }

  render() {
    return (
      <div className="col-12 d-inline-flex px-0">
        <div className="icon-question d-flex align-items-center">
          <img src={QuestionCircle} /> <span>FAQs</span>
        </div>
        {this.renderIntro()}
      </div>
    )
  }
}

export default Header;