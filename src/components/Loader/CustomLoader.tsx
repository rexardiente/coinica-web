import React from 'react';

type CustomLoaderProps = {
  visible: boolean;
  text?: string;
  style?: any;
}

const CustomLoader = ({ visible = false, text, style }: CustomLoaderProps) => (
  <div
    style={{
      display: visible ? 'flex' : 'none',
      marginLeft: '-15px',
      height: '92%',
      width: '100%',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 998, // lower than REACT TOASTIFY with zIndex of 999
      background: 'rgba(0, 0, 0, 0.5)',
      ...style
    }}
  >
    <div className="row m-auto" style={{ color: '#fff' }}>
      <div className="spinner-grow" role="status"></div>
      <span className="pl-3 text-black">
        {text || 'Loading...'}
      </span>
    </div>
  </div>
);

export default CustomLoader;
