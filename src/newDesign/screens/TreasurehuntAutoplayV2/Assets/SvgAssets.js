import React from "react";

export const NextBtn = ({ language }) => {
  let text = null;

  switch (language) {
    case 'ja':
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="TH Primary" font-size="24" letter-spacing="0em">
          <tspan x="73" y="14.088">&#10;</tspan>
          <tspan x="73" y="38.088">&#x6b21;&#10;</tspan>
        </text>
      )
      break;
    default: // default to ENGLISH
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="TH Primary" font-size="36" letter-spacing="0em">
          <tspan x="56" y="42.632">next</tspan>
        </text>
      )
      break;
  }

  return (
    <svg width="169" height="62" viewBox="0 0 169 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H156C158.209 8 160 9.791 160 12V49C160 51.209 158.209 53 156 53H12C9.791 53 8 51.209 8 49V12C8 9.791 9.791 8 12 8Z" fill="#BE5050"/>
      <path d="M156 7.5H12C9.51486 7.5 7.5 9.51486 7.5 12V49C7.5 51.4851 9.51486 53.5 12 53.5H156C158.485 53.5 160.5 51.4851 160.5 49V12C160.5 9.51486 158.485 7.5 156 7.5Z" fill="#BE5050" stroke="#987D58"/>
      <path d="M12 9.5H156C157.381 9.5 158.5 10.6194 158.5 12V49C158.5 50.3806 157.381 51.5 156 51.5H12C10.6194 51.5 9.5 50.3806 9.5 49V12C9.5 10.6194 10.6194 9.5 12 9.5Z" fill="#BE5050" stroke="#2F1B1B" stroke-width="3"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 29H155V48H13V29Z" fill="#901717"/>
      {text}
    </svg>
  )
}

export const BackBtn = ({ language }) => {
  let text = null;

  switch (language) {
    case 'ja':
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="TH Primary" font-size="24" letter-spacing="0em">
          <tspan x="61" y="40.088">&#x623b;&#x308b;</tspan>
        </text>
      )
      break;
    default: // default to ENGLISH
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="TH Primary" font-size="36" letter-spacing="0em">
          <tspan x="57" y="42.632">back</tspan>
        </text>
      )
      break;
  }

  return (
    <svg width="169" height="62" viewBox="0 0 169 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H156C158.209 8 160 9.791 160 12V49C160 51.209 158.209 53 156 53H12C9.791 53 8 51.209 8 49V12C8 9.791 9.791 8 12 8Z" fill="#363D44"/>
      <path d="M157 8.5H13C10.5149 8.5 8.5 10.5149 8.5 13V50C8.5 52.4851 10.5149 54.5 13 54.5H157C159.485 54.5 161.5 52.4851 161.5 50V13C161.5 10.5149 159.485 8.5 157 8.5Z" fill="#363D44" stroke="#987D58"/>
      <path d="M13 10.5H157C158.381 10.5 159.5 11.6194 159.5 13V50C159.5 51.3806 158.381 52.5 157 52.5H13C11.6194 52.5 10.5 51.3806 10.5 50V13C10.5 11.6194 11.6194 10.5 13 10.5Z" fill="#363D44" stroke="#211B2F" stroke-width="3"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 29H155V48H13V29Z" fill="#23272B"/>
      {text}
    </svg>
  )
}

export const MainpageBtn = ({ language }) => {
  let text = null;

  switch (language) {
    case 'ja':
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="TH Primary" font-size="20" letter-spacing="0em">
          <tspan x="25" y="37.74">&#x30e1;&#x30a4;&#x30f3;&#x30da;&#x30fc;&#x30b8;</tspan>
        </text>
      )
      break;
    default: // default to ENGLISH
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="TH Primary" font-size="36" letter-spacing="0em">
          <tspan x="25" y="42.632">main page</tspan>
        </text>
      )
      break;
  }

  return (
    <svg width="169" height="62" viewBox="0 0 169 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H156C158.209 8 160 9.791 160 12V49C160 51.209 158.209 53 156 53H12C9.791 53 8 51.209 8 49V12C8 9.791 9.791 8 12 8Z" fill="#363D44"/>
      <path d="M156 7.5H12C9.51486 7.5 7.5 9.51486 7.5 12V49C7.5 51.4851 9.51486 53.5 12 53.5H156C158.485 53.5 160.5 51.4851 160.5 49V12C160.5 9.51486 158.485 7.5 156 7.5Z" fill="#363D44" stroke="#987D58"/>
      <path d="M12 9.5H156C157.381 9.5 158.5 10.6194 158.5 12V49C158.5 50.3806 157.381 51.5 156 51.5H12C10.6194 51.5 9.5 50.3806 9.5 49V12C9.5 10.6194 10.6194 9.5 12 9.5Z" fill="#363D44" stroke="#211B2F" stroke-width="3"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 29H155V48H13V29Z" fill="#23272B"/>
      {text}
    </svg>
  )
}

export const StartBtn = ({ language }) => {
  let text = null;

  switch (language) {
    case 'ja':
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="TH Primary" font-size="24" letter-spacing="0em">
          <tspan x="49" y="39.088">&#x59cb;&#x3081;&#x308b;</tspan>
        </text>
      )
      break;
    default: // default to ENGLISH
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="TH Primary" font-size="36" letter-spacing="0em">
          <tspan x="49" y="42.632">start</tspan>
        </text>
      )
      break;
  }

  return (
    <svg width="169" height="62" viewBox="0 0 169 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H156C158.209 8 160 9.791 160 12V49C160 51.209 158.209 53 156 53H12C9.791 53 8 51.209 8 49V12C8 9.791 9.791 8 12 8Z" fill="#BE5050"/>
      <path d="M156 7.5H12C9.51486 7.5 7.5 9.51486 7.5 12V49C7.5 51.4851 9.51486 53.5 12 53.5H156C158.485 53.5 160.5 51.4851 160.5 49V12C160.5 9.51486 158.485 7.5 156 7.5Z" fill="#BE5050" stroke="#987D58"/>
      <path d="M12 9.5H156C157.381 9.5 158.5 10.6194 158.5 12V49C158.5 50.3806 157.381 51.5 156 51.5H12C10.6194 51.5 9.5 50.3806 9.5 49V12C9.5 10.6194 10.6194 9.5 12 9.5Z" fill="#BE5050" stroke="#2F1B1B" stroke-width="3"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 29H155V48H13V29Z" fill="#901717"/>
      {text}
    </svg>
  )
}

export const ChangeBtn = ({ language }) => {
  let text = null;

  switch (language) {
    case 'ja':
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="TH Primary" font-size="14" letter-spacing="0em">
          <tspan x="22" y="25.718">&#x5909;&#x5316;&#x3059;&#x308b;</tspan>
        </text>
      )
      break;
    default: // default to ENGLISH
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="TH Primary" font-size="26" letter-spacing="0em">
          <tspan x="20" y="29.762">change</tspan>
        </text>
      )
      break;
  }

  return (
    <svg width="99" height="42" viewBox="0 0 99 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H86C88.209 8 90 9.791 90 12V29C90 31.209 88.209 33 86 33H12C9.791 33 8 31.209 8 29V12C8 9.791 9.791 8 12 8Z" fill="#544336"/>
      <path d="M86 7.5H12C9.51486 7.5 7.5 9.51486 7.5 12V29C7.5 31.4851 9.51486 33.5 12 33.5H86C88.4851 33.5 90.5 31.4851 90.5 29V12C90.5 9.51486 88.4851 7.5 86 7.5Z" fill="#544336" stroke="#987D58"/>
      <path d="M12 9.5H86C87.3806 9.5 88.5 10.6194 88.5 12V29C88.5 30.3806 87.3806 31.5 86 31.5H12C10.6194 31.5 9.5 30.3806 9.5 29V12C9.5 10.6194 10.6194 9.5 12 9.5Z" fill="#544336" stroke="#2F271B" stroke-width="3"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 19H85V28H13V19Z" fill="#39291D"/>
      {text}
    </svg>
  )
}
