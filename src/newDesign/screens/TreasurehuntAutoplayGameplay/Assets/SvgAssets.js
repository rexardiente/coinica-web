import React from "react";

export const StopBtn = ({ language, disabled }) => {
  let text = null;

  switch (language) {
    case 'ja':
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="TH Primary" font-size="30" letter-spacing="0em">
          <tspan x="84" y="54.11">&#x6b62;&#x307e;&#x308b;</tspan>
        </text>
      )
      break;
    case 'chinese':
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="TH Primary" font-size="30" letter-spacing="0em">
          <tspan x="67" y="54.11">终止条件</tspan>
        </text>
      )
      break;
    default: // default to ENGLISH
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="TH Primary" font-size="50" letter-spacing="0em">
          <tspan x="91" y="60.35">stop</tspan>
        </text>
      )
      break;
  }

  return (
    <svg width="257" height="87" viewBox="0 0 257 87" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M244 7.5H12C9.51486 7.5 7.5 9.51486 7.5 12V74C7.5 76.4851 9.51486 78.5 12 78.5H244C246.485 78.5 248.5 76.4851 248.5 74V12C248.5 9.51486 246.485 7.5 244 7.5Z" fill="#BE5050" stroke="#987D58"/>
      <path d="M12 9.5H244C245.381 9.5 246.5 10.6194 246.5 12V74C246.5 75.3806 245.381 76.5 244 76.5H12C10.6194 76.5 9.5 75.3806 9.5 74V12C9.5 10.6194 10.6194 9.5 12 9.5Z" fill="#BE5050" stroke="#2F1B1B" stroke-width="3"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 43H243V73H13V43Z" fill="#901717"/>
      {text}
      {disabled ? <rect x="11" y="11" width="234" height="65" fill="#9A8887" fill-opacity="0.9"/> : null}
    </svg>
  )
}
