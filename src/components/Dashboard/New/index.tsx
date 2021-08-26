import React from "react";

class New extends React.Component {
  render(this) {
    return <h1>{this.props.params.toUpperCase()}</h1>;
  }
}

export default New;
