import React, { PureComponent } from "react";

class Questions extends PureComponent {
  render() {
    return (
      <div className="questions col-12 mt-4 p-0">
        <div className="col-md-10 col-sm-12">
          <div>
            <p>Coinica Introduction</p>
            <p>
              Coinica is the Best Provably Fair decentralized DApp platform with
              team members from all around the world. The main goal is to bring
              you the greatest gambling experience ever with the high-end feature.
            </p>
          </div>
          <div className="mt-4">
            <p>House Edge</p>
            <p>Low House Edge provides a reasonable opportunity to win.</p>
          </div>
          <div className="mt-4">
            <p>Supported Tokens</p>
            <p>
              The platform currently supports TRX, ROCKET(TRC20) to be used on the
              platform, with other tokens coming soon.
            </p>
          </div>
          <div className="mt-4">
            <p>Community</p>
            <p>Telegram : https://t.me/eosgamestore</p>
          </div>
          <div className="mt-2">
            <p>What is Rocket</p>
            <p>
              By freezing ROCKET users will be able to receive daily dividends.
              <br />Dividends = Current platform earnings x amount of ROCKET frozen/
              Total ROCKET frozen across the network.
            </p>
          </div>
          <div className="mt-4">
            <p>House Edge</p>
            <p>
              Freezing for Dividends ROCKET gained from actions on RocketGame are
              locked in a smart contract. Users need to withdraw the ROCKET gained
              from the smart contract to their own wallet before it can be frozen
              for dividends.<br /> Minimum ROCKET for freezing = 1 ROCKET. rk.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Questions;
