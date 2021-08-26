import React, { PureComponent } from "react";
import { translate } from "helpers/translate";
import "./ContentInstructions.scss";

class VIPInstructions extends PureComponent {
  render() {
    return (
      <div className="content-instructions">
        <p>{translate("vip.how_it_works.title")}</p>
        <div id="list-instructions" className="p-3">
          <p>{translate("vip.how_it_works.list.title")}</p>
          <ol>
            <li>
              {translate("vip.how_it_works.list.item.first")}
            </li>
            <li>              
              {translate("vip.how_it_works.list.item.second")}
            </li>
            <li>
              {translate("vip.how_it_works.list.item.third")}
            </li>
            <li>
              {translate("vip.how_it_works.list.item.fourth")}
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

class TaskInstructions extends PureComponent {
  render() {
    return (
      <div className="content-instructions">
        <p>{translate("misc.howItWorks")}</p>
        <div id="list-instructions" className="p-3">
          {/* <p>The planned benefit or VIP program: </p> */}
          <ol>
            <li>{translate("task.instruction.one")}</li>
            <li>{translate("task.instruction.two")}</li>
            <li>{translate("task.instruction.three")}</li>
          </ol>
        </div>
      </div>
    );
  }
}

export { TaskInstructions, VIPInstructions };
