import React from "react";

export const SelectDestinationText = ({ language }) => {
  let text = (
    <g clip-path="url(#clip0)">
      <text fill="url(#paint0_linear)" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont" font-size="35" letter-spacing="0em">
        <tspan x="0" y="27.325">SELECT DESTINATION</tspan>
      </text>
    </g>
  )

  switch (language) {
    case 'ja':
      text = (
        <g clip-path="url(#clip0)">
          <text fill="url(#paint0_linear)" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont" font-size="35" letter-spacing="0em">
            <tspan x="83" y="29.8975">&#x76ee;&#x7684;&#x5730;&#x3092;&#x9078;&#x629e;</tspan>
          </text>
        </g>
      )
      break;
    default:
      break;
  }
  return (
    <svg width="382" height="31" viewBox="0 0 382 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      {text}
      <defs>
        <linearGradient id="paint0_linear" x1="191" y1="0.42749" x2="191" y2="23.7608" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CCE3F5"/>
          <stop offset="1" stop-color="#4F5D6A"/>
        </linearGradient>
        <clipPath id="clip0">
          <rect width="382" height="30.5725" fill="white" transform="translate(0 0.42749)"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export const TutorialBtn = ({ language }) => {
  let text = (
    <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont2" font-size="36" letter-spacing="0em">
      <tspan x="31" y="41.632">tutorial</tspan>
    </text>
  )

  switch (language) {
    case 'ja':
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont2" font-size="18" letter-spacing="0em">
          <tspan x="21" y="36.066">チュートリアル</tspan>
        </text>
      )
      break;
    default:
      break;
  }
  return (
    <svg width="169" height="62" viewBox="0 0 169 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M156 7.5H12C9.51486 7.5 7.5 9.51486 7.5 12V49C7.5 51.4851 9.51486 53.5 12 53.5H156C158.485 53.5 160.5 51.4851 160.5 49V12C160.5 9.51486 158.485 7.5 156 7.5Z" fill="#544336" stroke="#987D58"/>
      <path d="M12 9.5H156C157.381 9.5 158.5 10.6194 158.5 12V49C158.5 50.3806 157.381 51.5 156 51.5H12C10.6194 51.5 9.5 50.3806 9.5 49V12C9.5 10.6194 10.6194 9.5 12 9.5Z" fill="#544336" stroke="#2F271B" stroke-width="3"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 29H155V48H13V29Z" fill="#39291D"/>
      {text}
    </svg>
  )
}

export const RulesBtn = ({ language }) => {
  let text = (
    <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont2" font-size="36" letter-spacing="0em">
      <tspan x="50" y="43.632">rules</tspan>
    </text>
  )

  switch (language) {
    case 'ja':
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont2" font-size="18" letter-spacing="0em">
          <tspan x="57" y="36.066">&#x30eb;&#x30fc;&#x30eb;</tspan>
        </text>
      )
      break;
    default:
      break;
  }
  return (
    <svg width="169" height="62" viewBox="0 0 169 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M156 7.5H12C9.51486 7.5 7.5 9.51486 7.5 12V49C7.5 51.4851 9.51486 53.5 12 53.5H156C158.485 53.5 160.5 51.4851 160.5 49V12C160.5 9.51486 158.485 7.5 156 7.5Z" fill="#544336" stroke="#987D58"/>
      <path d="M12 9.5H156C157.381 9.5 158.5 10.6194 158.5 12V49C158.5 50.3806 157.381 51.5 156 51.5H12C10.6194 51.5 9.5 50.3806 9.5 49V12C9.5 10.6194 10.6194 9.5 12 9.5Z" fill="#544336" stroke="#2F271B" stroke-width="3"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 29H155V48H13V29Z" fill="#39291D"/>
      {text}
    </svg>
  )
}

export const AutoplayBtn = ({ language }) => {
  let text = (
    <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont2" font-size="36" letter-spacing="0em">
      <tspan x="50" y="41.632">
        autoplay option
      </tspan>
    </text>
  )

  switch (language) {
    case 'ja':
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont2" font-size="22" letter-spacing="0em">
          <tspan x="50" y="36.632">
            自動再生オプション
          </tspan>
        </text>
      )
      break;
    default:
      break;
  }
  return (
    <svg width="276" height="62" viewBox="0 0 276 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M263 7.5H12C9.51486 7.5 7.5 9.51486 7.5 12V49C7.5 51.4851 9.51486 53.5 12 53.5H263C265.485 53.5 267.5 51.4851 267.5 49V12C267.5 9.51486 265.485 7.5 263 7.5Z" fill="#3F5C2D" stroke="#987D58"/>
      <path d="M12 9.5H263C264.381 9.5 265.5 10.6194 265.5 12V49C265.5 50.3806 264.381 51.5 263 51.5H12C10.6194 51.5 9.5 50.3806 9.5 49V12C9.5 10.6194 10.6194 9.5 12 9.5Z" fill="#3F5C2D" stroke="#252F1B" stroke-width="3"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 29H262V48H13V29Z" fill="#213A11"/>
      {text}
      <path fill-rule="evenodd" clip-rule="evenodd" d="M35.915 23.023C34.607 22.146 33.094 21.666 31.5 21.666C27.139 21.666 23.592 25.18 23.592 29.5H21C21 23.765 25.711 19.099 31.5 19.099C33.645 19.099 35.683 19.75 37.436 20.947L38.863 19L40.383 24.844L34.303 25.223L35.915 23.023ZM27.085 35.977C28.393 36.854 29.906 37.334 31.5 37.334C35.861 37.334 39.409 33.82 39.409 29.5H42C42 35.235 37.29 39.901 31.5 39.901C29.355 39.901 27.317 39.25 25.564 38.053L24.137 40L22.617 34.155L28.698 33.777L27.085 35.977Z" fill="#E6D9B0"/>
    </svg>
  )
}
