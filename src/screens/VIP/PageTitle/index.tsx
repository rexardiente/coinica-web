import React, { PureComponent } from "react";
import { tie } from "../Assets";

class PageTitle extends PureComponent {
  render() {
    return (
      <>
        <div className="vip-page-title">
          <div className="tie mr-2">
            <img alt="tie" src={tie} width="26" height="36" />
          </div>
          VIP
        </div>
        <div className="vip-banner"></div>
      </>
    );
  }
}

export default PageTitle;
