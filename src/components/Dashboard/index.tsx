import React from "react";
import All from "./All";
import "./dashboard.scss";

class Dashboard extends React.Component {
  render(this) {
    return (
      <div className="container-fluid" id="dashboard">
        <div className="row">
          <div className="col-md-12">
            <All />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
