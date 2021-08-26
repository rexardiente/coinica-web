import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="w-100 d-flex flex-column align-items-center">
          <h3 className="py-4">This route is under development</h3>
          <Link to="/">
            <h5>Redirect Home</h5>
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
