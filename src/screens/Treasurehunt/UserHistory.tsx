import React from 'react'

const wrapperStyle = {
  maxHeight: '400px',
  overflow: 'auto',
  maxWidth: '400px',
  margin: '20px auto',
}

const cardStyle = {
  maxWidth: '400px',
}

const headerStyle = {
  background: '#23272A'
}

const bodyStyle = {
  background: '#33373A'
}

const UserHistory = ({ history }) => {
  return (
    <div
      id="collapseMyGame"
      className="collapse history"
      aria-labelledby="headingPayout"
      data-parent="#accordionTreasureHuntTbl"
      style={wrapperStyle}
    >
      {
        history.length && (
          history.map((data, idx) => (
            <div key={idx} className="row card-body" style={cardStyle}>
              <div className="col-12" style={headerStyle}>
                {/* Header test */}
              </div>
              <div className="col-12" style={bodyStyle}>
                <p className="justify-content-center">
                  {data.username}
                </p>
              </div>
            </div>
          ))
        )
      }
    </div>
  )
}

export default UserHistory;
