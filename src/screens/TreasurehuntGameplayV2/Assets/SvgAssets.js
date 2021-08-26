import React from "react";

export const RulesBtn = ({ language, isHovered }) => {
  let text = null;

  let fillColors = isHovered ? ["#6d594b", "#523d2d"] : ["#544336", "#39291D"]

  switch (language) {
    case 'ja':
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont2" font-size="18" letter-spacing="0em">
          <tspan x="57" y="36.066">&#x30eb;&#x30fc;&#x30eb;</tspan>
        </text>
      )
      break;
    default: // default to ENGLISH
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont2" font-size="36" letter-spacing="0em">
          <tspan x="50" y="43.632">rules</tspan>
        </text>
      )
      break;
  }
  return (
    <svg width="169" height="62" viewBox="0 0 169 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M156 7.5H12C9.51486 7.5 7.5 9.51486 7.5 12V49C7.5 51.4851 9.51486 53.5 12 53.5H156C158.485 53.5 160.5 51.4851 160.5 49V12C160.5 9.51486 158.485 7.5 156 7.5Z" fill="#544336" stroke="#987D58"/>
      <path d="M12 9.5H156C157.381 9.5 158.5 10.6194 158.5 12V49C158.5 50.3806 157.381 51.5 156 51.5H12C10.6194 51.5 9.5 50.3806 9.5 49V12C9.5 10.6194 10.6194 9.5 12 9.5Z" fill={fillColors[0]} stroke="#2F271B" stroke-width="3"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 29H155V48H13V29Z" fill={fillColors[1]} />
      {text}
    </svg>
  )
}

export const GameStartBtn = ({ language, isStarted }) => {
  let text = null;

  switch (language) {
    case 'ja':
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont2" font-size="35" letter-spacing="0em">
          <tspan x="41" y="55.795">&#x30b2;&#x30fc;&#x30e0;&#x958b;&#x59cb;</tspan>
        </text>
      )
      break;
    default: // default to ENGLISH
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont2" font-size="50.2328" letter-spacing="0em">
          <tspan x="30" y="61.4285">game start</tspan>
        </text>
      )
      break;
  }

  return (
    <svg width="257" height="87" viewBox="0 0 257 87" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect width="257" height="87" fill="url(#pattern0)"/>
      <rect x="13" y="43" width="230" height="30" fill="url(#pattern1)"/>
      {text}
      {isStarted ? (
        <rect width="257" height="87" fill="url(#pattern2)"/>
      ) : null}
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0" transform="scale(0.00390625 0.0116279)"/>
        </pattern>
        <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image1" transform="scale(0.00434783 0.0333333)"/>
        </pattern>
        {isStarted ? (
          <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image2" transform="scale(0.003861 0.011236)"/>
          </pattern>
        ) : null}
        <image id="image0" width="256" height="86" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABWCAMAAAAXDLgKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAt1BMVEWYfVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABqVz2Mc1GWfFeEbU2XfFeWfFeYfViJb09ROy81IB4vGxuIbk82IR+cRES+UFA0IB6Ibk7///9ud7A9AAAAMXRSTlMAAQIDBAUGBwgJCgsMDg8REhMUDRAVGBkbHB0XHiEkJicoKRofLTAyNDY3Yrz0mvX1Ou1h0wAAAAFiS0dEPKdqYc8AAAAHdElNRQflCAwSMwbyUWPzAAACMklEQVR42u3caXaiQBQFYCNVRVkgUjjhACrOUzqGaNJm//vqwiGaBTScw7t3BXU/8ee7lco1L5dUSeTatfKUS3XLYoxzLkoeU5Exy7owPPpXLcaFLWvKMXFLnKyfqklbcGZV7wJZf25L5da9hu9rHZQ4Wmu/4dVdJW1+FzD9mZCq2dLtTjfs9UueXtjttHWrqaRgVwHz+wvpeHoQDqN4NJ4kpc5kPIqjYTjQniOF+QYyAIub/sF0FifzxXK1Xq83pY0pt1ou5kk8mwZGgFsv2QfAbGX6R9vd/kAk+902MgLKNn8CA8BlU0+j1/f040gkH+n7azTVTckzAEuo1mC2PX0W/aw883nazgYtJawMwHZ1GO/Sot+Ub9JdHGrXzgCYrLeHyd58/19/ieTreDz/SYbtumQZQM3rRPODUSn6XfnFlD3Mo45XY9VKlatGN17QA1jE3YbiGYDjh6MlPYDlKPSdK4DujVf0AFbjnr4ACEf3J2t6AOtJXzviBpBQBEjuAG5AFSBwfwA29AA2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQNHPAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA/w1A+mCC/MkM9aMp8mdzOJwkfjpL/nga5/PkBxRuExrftCY0vh8TGvcRlVN6LvpZeeWcnp5GVB4zOm9Fz9vklbfnGR3yQ0qY0iI/pvZ7Tk/Tm9PDoCImNX9GVYteO811VfVW/B/NzUZ0zdQ0nAAAAABJRU5ErkJggg=="/>
        <image id="image1" width="230" height="30" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAAAeAQMAAAACZfCMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEWQFxf///+nsa0qAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+UIDBIzB4VWU2UAAAARSURBVCjPY2AYBaNgFAwkAAADhAABS9CSNwAAAABJRU5ErkJggg=="/>
        {isStarted ? (
          <image id="image2" width="259" height="89" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAABZCAMAAAANbbHcAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABLFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAc1aIeluMfl6PgGCPgGCPgGCPgGCNfl+Je1yEdlhkWkOSg2KSg2KSg2KBdFZlXEcsKyUtKyZ9cVQAAAAkJCEjIyBTTT17blN6bVKLiYdjYl94bFGUkpB4a1AAAAB3a1AAAAB3alCHeVuLfV2Nf1+PgGCNfl+Je1xuY0r///8zpBHqAAAAY3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFxkaGxgWHR8gIiQlIx4hKCssLi8wLSkmHDI1Nzk7PDo4NjQxjazAy83OzMa0nFTX2NmS2dnZkCfZ2dmSlNnZltmXM5cqmKG7xsnArmFnHDLWAAAAAWJLR0RjXL4tqgAAAAd0SU1FB+UIDBI1FFeytT0AAAL0SURBVHja7dxZd5pAAIZhFWEAWURRkbijJCSp2WPsmi6R2DTd13Tv//8RnQExJr2unsN836038pyBu3kzmdmyyXIp3/xBs5nFxU8ucLWZxqKAIORFUZIIkdM/QiRJzEcOCQIloAISkRW1oGl6+qcVVEWRGUOCwAjyIlFUzTCLVqlsp3zlcskqGnqBKtCzkIsNKIEkK5ph2ZVqzXHqaZ9Tc9fsctEoKEQU4oNADURZ1Yt21Wk0W+1ON+Xr9NpNr16rlAxNoSeBHQR2DIiiW7bj9bsDf30jCDbTvCDY8rfvdJpDt0xPgpQYSIpWtJ1m1w92dvf2Dw5TvYOj49HJeH3Qa1AEVRaFyCBPVIMS3L13/8HDR3zs9PGTp88a1ZLODgI1EET6JlS97tlkEvKzydl5u26bKmEvQ5a+CvQYtH36w/Q5J7uYhuGLy6ZraXI+NlDNSqMbhOHLV/zsdfjGbztlXREjA1Kw3OZgJwxX/b+Wa/B2ozu0DYV9FKmBVqr1/VFk8I6LvWcGH8aX3ppJP4rZTE6Q9bLT2zqODD5yscjg0+ftZrWoRgZ5WbfrneCIN4Mvu1ct17o2GHY3D3kz+Dry+zWrMDMwYBAZjPkz2IMBDGAAAxjAAAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMIABDGAAAxjAAAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMIABDGCwfAPca+P2fuPIn99vxD1X3HcW5vfet/m79x4s3HuXVHMt6h+s+n8t14D1D5jBzQ7G9GLVfYql7XYHQ1T0kst6KKtulCy1hzI579Vts0AiA9bFMW2n9e37j1Nuujg/f/3+4113ceI+UsVpsT7SaO8o9X2k/dHJeGvQ8WZ9pNx1J6vieO24k7XqktX/72RdXXZaQ9c2tVkn62Yvrd/joZfW8oZxL43k5wacdfOcxW5ebJD0E3U++ol23E/UWEUy6Sdm4pKoRBT+OppCEhOd91QlifDaU0VX93ZeOfV95dw/feW/oQfJYZ0hgMYAAAAASUVORK5CYII="/>
        ) : null}
      </defs>
    </svg>
  )
}

export const WithdrawBtn = ({ language, disabled }) => {
  let text = null;

  switch (language) {
    case 'ja':
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont2" font-size="36" letter-spacing="0em">
          <tspan x="93" y="55.632">&#x64a4;&#x9000;</tspan>
        </text>
      )
      break;
    default: // default to ENGLISH
      text = (
        <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont2" font-size="50.2328" letter-spacing="0em">
          <tspan x="43" y="60.4285">withdraw</tspan>
        </text>
      )
      break;
  }

  return (
    <svg width="257" height="87" viewBox="0 0 257 87" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H244C246.209 8 248 9.791 248 12V74C248 76.209 246.209 78 244 78H12C9.791 78 8 76.209 8 74V12C8 9.791 9.791 8 12 8Z" fill="#BE5050"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H244C246.209 8 248 9.791 248 12V74C248 76.209 246.209 78 244 78H12C9.791 78 8 76.209 8 74V12C8 9.791 9.791 8 12 8Z" fill="#BE5050"/>
      <path d="M244 7.5H12C9.51486 7.5 7.5 9.51486 7.5 12V74C7.5 76.4851 9.51486 78.5 12 78.5H244C246.485 78.5 248.5 76.4851 248.5 74V12C248.5 9.51486 246.485 7.5 244 7.5Z" fill="#BE5050" stroke="#987D58"/>
      <path d="M12 9.5H244C245.381 9.5 246.5 10.6194 246.5 12V74C246.5 75.3806 245.381 76.5 244 76.5H12C10.6194 76.5 9.5 75.3806 9.5 74V12C9.5 10.6194 10.6194 9.5 12 9.5Z" fill="#BE5050" stroke="#2F1B1B" stroke-width="3"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 43H243V73H13V43Z" fill="#901717"/>
      {text}
      {disabled ? (
        <rect width="257" height="86" fill="url(#pattern2)"/>
      ) : null}
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0" transform="scale(0.00390625 0.0116279)"/>
        </pattern>
        <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image1" transform="scale(0.00434783 0.0333333)"/>
        </pattern>
        {disabled ? (
          <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image2" transform="scale(0.003861 0.011236)"/>
          </pattern>
        ) : null}
        <image id="image0" width="256" height="86" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABWCAMAAAAXDLgKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAt1BMVEWYfVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABqVz2Mc1GWfFeEbU2XfFeWfFeYfViJb09ROy81IB4vGxuIbk82IR+cRES+UFA0IB6Ibk7///9ud7A9AAAAMXRSTlMAAQIDBAUGBwgJCgsMDg8REhMUDRAVGBkbHB0XHiEkJicoKRofLTAyNDY3Yrz0mvX1Ou1h0wAAAAFiS0dEPKdqYc8AAAAHdElNRQflCAwSMwbyUWPzAAACMklEQVR42u3caXaiQBQFYCNVRVkgUjjhACrOUzqGaNJm//vqwiGaBTScw7t3BXU/8ee7lco1L5dUSeTatfKUS3XLYoxzLkoeU5Exy7owPPpXLcaFLWvKMXFLnKyfqklbcGZV7wJZf25L5da9hu9rHZQ4Wmu/4dVdJW1+FzD9mZCq2dLtTjfs9UueXtjttHWrqaRgVwHz+wvpeHoQDqN4NJ4kpc5kPIqjYTjQniOF+QYyAIub/sF0FifzxXK1Xq83pY0pt1ou5kk8mwZGgFsv2QfAbGX6R9vd/kAk+902MgLKNn8CA8BlU0+j1/f040gkH+n7azTVTckzAEuo1mC2PX0W/aw883nazgYtJawMwHZ1GO/Sot+Ub9JdHGrXzgCYrLeHyd58/19/ieTreDz/SYbtumQZQM3rRPODUSn6XfnFlD3Mo45XY9VKlatGN17QA1jE3YbiGYDjh6MlPYDlKPSdK4DujVf0AFbjnr4ACEf3J2t6AOtJXzviBpBQBEjuAG5AFSBwfwA29AA2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQNHPAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA/w1A+mCC/MkM9aMp8mdzOJwkfjpL/nga5/PkBxRuExrftCY0vh8TGvcRlVN6LvpZeeWcnp5GVB4zOm9Fz9vklbfnGR3yQ0qY0iI/pvZ7Tk/Tm9PDoCImNX9GVYteO811VfVW/B/NzUZ0zdQ0nAAAAABJRU5ErkJggg=="/>
        <image id="image1" width="230" height="30" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAAAeAQMAAAACZfCMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEWQFxf///+nsa0qAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+UIDBIzB4VWU2UAAAARSURBVCjPY2AYBaNgFAwkAAADhAABS9CSNwAAAABJRU5ErkJggg=="/>
        {disabled ? (
          <image id="image2" width="259" height="89" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAABZCAMAAAANbbHcAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABLFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAc1aIeluMfl6PgGCPgGCPgGCPgGCNfl+Je1yEdlhkWkOSg2KSg2KSg2KBdFZlXEcsKyUtKyZ9cVQAAAAkJCEjIyBTTT17blN6bVKLiYdjYl94bFGUkpB4a1AAAAB3a1AAAAB3alCHeVuLfV2Nf1+PgGCNfl+Je1xuY0r///8zpBHqAAAAY3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFxkaGxgWHR8gIiQlIx4hKCssLi8wLSkmHDI1Nzk7PDo4NjQxjazAy83OzMa0nFTX2NmS2dnZkCfZ2dmSlNnZltmXM5cqmKG7xsnArmFnHDLWAAAAAWJLR0RjXL4tqgAAAAd0SU1FB+UIDBI1FFeytT0AAAL0SURBVHja7dxZd5pAAIZhFWEAWURRkbijJCSp2WPsmi6R2DTd13Tv//8RnQExJr2unsN836038pyBu3kzmdmyyXIp3/xBs5nFxU8ucLWZxqKAIORFUZIIkdM/QiRJzEcOCQIloAISkRW1oGl6+qcVVEWRGUOCwAjyIlFUzTCLVqlsp3zlcskqGnqBKtCzkIsNKIEkK5ph2ZVqzXHqaZ9Tc9fsctEoKEQU4oNADURZ1Yt21Wk0W+1ON+Xr9NpNr16rlAxNoSeBHQR2DIiiW7bj9bsDf30jCDbTvCDY8rfvdJpDt0xPgpQYSIpWtJ1m1w92dvf2Dw5TvYOj49HJeH3Qa1AEVRaFyCBPVIMS3L13/8HDR3zs9PGTp88a1ZLODgI1EET6JlS97tlkEvKzydl5u26bKmEvQ5a+CvQYtH36w/Q5J7uYhuGLy6ZraXI+NlDNSqMbhOHLV/zsdfjGbztlXREjA1Kw3OZgJwxX/b+Wa/B2ozu0DYV9FKmBVqr1/VFk8I6LvWcGH8aX3ppJP4rZTE6Q9bLT2zqODD5yscjg0+ftZrWoRgZ5WbfrneCIN4Mvu1ct17o2GHY3D3kz+Dry+zWrMDMwYBAZjPkz2IMBDGAAAxjAAAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMIABDGAAAxjAAAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMIABDGCwfAPca+P2fuPIn99vxD1X3HcW5vfet/m79x4s3HuXVHMt6h+s+n8t14D1D5jBzQ7G9GLVfYql7XYHQ1T0kst6KKtulCy1hzI579Vts0AiA9bFMW2n9e37j1Nuujg/f/3+4113ceI+UsVpsT7SaO8o9X2k/dHJeGvQ8WZ9pNx1J6vieO24k7XqktX/72RdXXZaQ9c2tVkn62Yvrd/joZfW8oZxL43k5wacdfOcxW5ebJD0E3U++ol23E/UWEUy6Sdm4pKoRBT+OppCEhOd91QlifDaU0VX93ZeOfV95dw/feW/oQfJYZ0hgMYAAAAASUVORK5CYII="/>
        ) : null}
      </defs>
    </svg>
    // <svg width="257" height="87" viewBox="0 0 257 87" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    //   <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H244C246.209 8 248 9.791 248 12V74C248 76.209 246.209 78 244 78H12C9.791 78 8 76.209 8 74V12C8 9.791 9.791 8 12 8Z" fill="#BE5050"/>
    //   <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H244C246.209 8 248 9.791 248 12V74C248 76.209 246.209 78 244 78H12C9.791 78 8 76.209 8 74V12C8 9.791 9.791 8 12 8Z" fill="#BE5050"/>
    //   <mask id="path-3-outside-1" maskUnits="userSpaceOnUse" x="7" y="7" width="242" height="72" fill="black">
    //   <rect fill="white" x="7" y="7" width="242" height="72"/>
    //   <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H244C246.209 8 248 9.791 248 12V74C248 76.209 246.209 78 244 78H12C9.791 78 8 76.209 8 74V12C8 9.791 9.791 8 12 8Z"/>
    //   </mask>
    //   <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H244C246.209 8 248 9.791 248 12V74C248 76.209 246.209 78 244 78H12C9.791 78 8 76.209 8 74V12C8 9.791 9.791 8 12 8Z" fill="#BE5050"/>
    //   <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H244C246.209 8 248 9.791 248 12V74C248 76.209 246.209 78 244 78H12C9.791 78 8 76.209 8 74V12C8 9.791 9.791 8 12 8Z" stroke="#987D58" stroke-width="2" mask="url(#path-3-outside-1)"/>
    //   <mask id="path-4-inside-2" fill="white">
    //   <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H244C246.209 8 248 9.791 248 12V74C248 76.209 246.209 78 244 78H12C9.791 78 8 76.209 8 74V12C8 9.791 9.791 8 12 8Z"/>
    //   </mask>
    //   <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8H244C246.209 8 248 9.791 248 12V74C248 76.209 246.209 78 244 78H12C9.791 78 8 76.209 8 74V12C8 9.791 9.791 8 12 8Z" fill="#BE5050" stroke="#2F1B1B" stroke-width="6" mask="url(#path-4-inside-2)"/>
    //   <path fill-rule="evenodd" clip-rule="evenodd" d="M13 43H243V73H13V43Z" fill="#901717"/>
    //   <text fill="#E6D9B0" xmlSpace="preserve" style={{ whiteSpace: "pre" }} font-family="Myfont2" font-size="50.2328" letter-spacing="0em"><tspan x="43" y="60.4285">withdraw</tspan></text>
    //   <rect width="257" height="85" fill="url(#pattern0)"/>
    //   <defs>
    //   <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    //   <use xlinkHref="#image0" transform="scale(0.003861 0.011236)"/>
    //   </pattern>
    //   <image id="image0" width="259" height="89" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAABZCAMAAAANbbHcAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABLFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAc1aIeluMfl6PgGCPgGCPgGCPgGCNfl+Je1yEdlhkWkOSg2KSg2KSg2KBdFZlXEcsKyUtKyZ9cVQAAAAkJCEjIyBTTT17blN6bVKLiYdjYl94bFGUkpB4a1AAAAB3a1AAAAB3alCHeVuLfV2Nf1+PgGCNfl+Je1xuY0r///8zpBHqAAAAY3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFxkaGxgWHR8gIiQlIx4hKCssLi8wLSkmHDI1Nzk7PDo4NjQxjazAy83OzMa0nFTX2NmS2dnZkCfZ2dmSlNnZltmXM5cqmKG7xsnArmFnHDLWAAAAAWJLR0RjXL4tqgAAAAd0SU1FB+UIEQ4iNjAepRkAAAL0SURBVHja7dxZd5pAAIZhFWEAWURRkbijJCSp2WPsmi6R2DTd13Tv//8RnQExJr2unsN836038pyBu3kzmdmyyXIp3/xBs5nFxU8ucLWZxqKAIORFUZIIkdM/QiRJzEcOCQIloAISkRW1oGl6+qcVVEWRGUOCwAjyIlFUzTCLVqlsp3zlcskqGnqBKtCzkIsNKIEkK5ph2ZVqzXHqaZ9Tc9fsctEoKEQU4oNADURZ1Yt21Wk0W+1ON+Xr9NpNr16rlAxNoSeBHQR2DIiiW7bj9bsDf30jCDbTvCDY8rfvdJpDt0xPgpQYSIpWtJ1m1w92dvf2Dw5TvYOj49HJeH3Qa1AEVRaFyCBPVIMS3L13/8HDR3zs9PGTp88a1ZLODgI1EET6JlS97tlkEvKzydl5u26bKmEvQ5a+CvQYtH36w/Q5J7uYhuGLy6ZraXI+NlDNSqMbhOHLV/zsdfjGbztlXREjA1Kw3OZgJwxX/b+Wa/B2ozu0DYV9FKmBVqr1/VFk8I6LvWcGH8aX3ppJP4rZTE6Q9bLT2zqODD5yscjg0+ftZrWoRgZ5WbfrneCIN4Mvu1ct17o2GHY3D3kz+Dry+zWrMDMwYBAZjPkz2IMBDGAAAxjAAAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMIABDGAAAxjAAAYwgAEMYAADGMAABjCAAQxgAAMYwAAGMIABDGCwfAPca+P2fuPIn99vxD1X3HcW5vfet/m79x4s3HuXVHMt6h+s+n8t14D1D5jBzQ7G9GLVfYql7XYHQ1T0kst6KKtulCy1hzI579Vts0AiA9bFMW2n9e37j1Nuujg/f/3+4113ceI+UsVpsT7SaO8o9X2k/dHJeGvQ8WZ9pNx1J6vieO24k7XqktX/72RdXXZaQ9c2tVkn62Yvrd/joZfW8oZxL43k5wacdfOcxW5ebJD0E3U++ol23E/UWEUy6Sdm4pKoRBT+OppCEhOd91QlifDaU0VX93ZeOfV95dw/feW/oQfJYZ0hgMYAAAAASUVORK5CYII="/>
    //   </defs>
    // </svg>
  )
}
