import React from 'react'

const GameHistory = ({ history }) => {
  return (
    <div
      id="collapseAllGame"
      className="collapse history show"
      aria-labelledby="headingAllGame"
      data-parent="#accordionTreasureHuntTbl"
    >
      <div className="row card-body">
        <div className="col-12">
          <p className="justify-content-center">
            All Games History Contents...
          </p>
        </div>
      </div>
    </div>
  )
}

export default GameHistory;
