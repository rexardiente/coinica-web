import React, { PureComponent } from "react";
import Header from "./Header";
import Questions from "./Questions";
import "./FAQ.scss";

class FAQ extends PureComponent {
  render() {
    return (
      <div id="faq-container" className="p-5">
        {/* <div className="bg-question"></div> */}
        <div className="faq-header">
          <Header />
        </div>
        <Questions />
      </div>
    );
  }
}

export default FAQ;
