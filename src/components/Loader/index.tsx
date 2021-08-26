import React from 'react';

const Loading = () => (
  <div className="container-fluid" id="loading-content">
    <div className="row m-auto">
      <div className="spinner-grow" role="status"></div>
      <span className="pl-3 text-black">Loading...</span>
    </div>
  </div>
);

export default Loading;
