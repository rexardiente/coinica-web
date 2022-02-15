import React from "react";
import StarsIcon from "@material-ui/icons/Stars";

interface SymbolProps {
  width?: any;
  height?: any;
}

export const BTC = ({ width, height }:SymbolProps) => (
    <svg
    className="prefix__MuiSvgIcon-root prefix__jss325 prefix__jss807"
    viewBox="0 0 42 42"
    aria-hidden="true"
    width={width ? width : "15px"}
    height={height ? height : "15px"}
  >
    <g strokeWidth={0} fill="none" fillRule="evenodd">
      <path
        d="M24.666 6c.155.009 2.516.15 4.6 1.166 2.157 1.052 4.46 3.665 4.46 7.34 0 2.66-.908 4.45-2.384 5.756 1.988 1.3 3.707 3.762 3.707 7.324 0 3.767-2.795 6.385-5.255 7.385-2.306.938-4.803 1.022-5.106 1.028L11.605 36v-6.535H7v-4.228h4.605V6h13.06zm.083 16.702h-8.187v2.526h7.274v4.236h-7.274v2.326h8.095s1.51-.025 2.893-.578c1.382-.553 2.568-1.657 2.568-3.74 0-2.856-1.483-3.805-2.614-4.28-1.13-.476-2.763-.49-2.765-.49h.01zm.055-12.49h-8.242v8.248h8.211c.891 0 1.558-.18 2.158-.514.599-.334 1.865-1.361 1.865-3.404 0-2.157-.923-3.193-1.983-3.762a4.837 4.837 0 00-2.009-.567z"
        fill="#0a0f2d"
        fillRule="nonzero"
      />
      <path opacity={0.01} d="M1 1h40v40H1z" />
    </g>
  </svg>
)

export const ETH = ({ width, height }:SymbolProps) => (
  <svg
    className="prefix__MuiSvgIcon-root prefix__jss325 prefix__jss808"
    viewBox="0 0 42 42"
    aria-hidden="true"
    width={width ? width : "15px"}
    height={height ? height : "15px"}
  >
    <g strokeWidth={0} fill="none" fillRule="evenodd">
      <g fill="#0a0f2d" fillRule="nonzero">
        <path d="M19.968 28.598v-12.23L8.028 21.6zM19.73 15.526V1.165L8.175 20.59zM20.5 1.159v14.367l11.718 5.136zM20.5 16.367V28.6l11.948-6.995zM19.968 40.896V31.06L8.108 24.11zM20.738 40.896l11.86-16.785-11.86 6.948z" />
      </g>
      <path opacity={0.01} d="M1 1h40v40H1z" />
    </g>
  </svg>
)

export const USDC = ({ width, height }:SymbolProps) => (
  <svg
    width={width ? width : "15px"}
    height={height ? height : "15px"}
    viewBox="0 0 33 33" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{"color"}</title>
    <g fill="none" fillRule="evenodd">
      <circle fill="#0a0f2d" fillRule="nonzero" cx={16} cy={16} r={16} />
      <path
        d="M15.04 10.06v-1a.96.96 0 111.92 0v.996c1.737.261 2.928 1.249 3.246 2.656a.567.567 0 01-.553.692h-.519c-.42 0-.803-.243-.981-.623-.332-.704-1.117-1.11-2.162-1.11-1.308 0-2.19.642-2.19 1.604 0 .77.586 1.22 2.005 1.556l1.332.305c2.35.538 3.344 1.508 3.344 3.233 0 1.91-1.334 3.203-3.522 3.508v1.156a.96.96 0 11-1.92 0v-1.138c-1.938-.234-3.248-1.26-3.555-2.83a.477.477 0 01.468-.568h.788c.357 0 .682.205.835.528.363.763 1.292 1.236 2.455 1.236 1.396 0 2.366-.69 2.366-1.652 0-.834-.594-1.315-2.053-1.66l-1.5-.353c-2.134-.49-3.144-1.516-3.144-3.168 0-1.78 1.343-3.059 3.34-3.369zM4 16c0-5.295 3.456-9.786 8.244-11.356A.576.576 0 0113 5.19v.339c0 .515-.313.98-.79 1.173C8.525 8.194 5.928 11.795 5.928 16c0 4.203 2.594 7.803 6.275 9.296.481.195.796.662.796 1.181v.282a.612.612 0 01-.805.581C7.432 25.755 4 21.277 4 16zm24 0c0 5.265-3.416 9.734-8.16 11.329a.636.636 0 01-.84-.603V26.5c0-.532.322-1.01.814-1.212 3.671-1.497 6.257-5.092 6.257-9.288 0-4.192-2.58-7.784-6.246-9.284A1.327 1.327 0 0119 5.488v-.206a.642.642 0 01.847-.608C24.587 6.271 28 10.739 28 16z"
        fill="#FFF"
      />
    </g>
  </svg>
)

export const TOKEN = () => (
<span>
  <StarsIcon fontSize='small' />
</span>
)