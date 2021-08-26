import React from 'react';
import { ServerAPI } from "Config";
import './destinationOption.scss';

const AnchorOff = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v3/main/destination/anchor_off.png`;
const AnchorOn = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v3/main/destination/anchor_on.png`;
const BtnSelect1 = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v3/main/destination/1EOS_brown.png`;
const BtnSelect2 = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v3/main/destination/10EOS_brown.png`;
const BtnSelect3 = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v3/main/destination/20EOS_brown.png`;
const BtnSelect1Hover = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v3/main/destination/1EOS_red.png`;
const BtnSelect2Hover = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v3/main/destination/10EOS_red.png`;
const BtnSelect3Hover = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v3/main/destination/20EOS_red.png`;

type DestinationButtonProps = {
  number: Number,
  active?: Number,
  optionHovered: Number,
  setOptionHovered: Function,
  func: Function,
}

/**
 * 
 * @param { active } (optional) -> display red version of the button
 */
const TreasurehuntDestinationButton = ({ number, active, optionHovered, setOptionHovered,  func }: DestinationButtonProps) => {
  let ButtonImage:any = null
  switch (number) {
    case 1 : ButtonImage = <img className="h-100 img-fluid hover-cursor" src={ optionHovered === number ? BtnSelect1Hover : BtnSelect1 } alt="1EOS" />
      break
    case 10: ButtonImage = <img className="h-100 img-fluid hover-cursor" src={ optionHovered === number ? BtnSelect2Hover : BtnSelect2 } alt="10EOS" />
      break
    case 20: ButtonImage = <img className="h-100 img-fluid hover-cursor" src={ optionHovered === number ? BtnSelect3Hover : BtnSelect3 } alt="20EOS" />
      break
  }

  if (active && active === number) {
    switch (active) {
      case 1 : ButtonImage = <img className="h-100 img-fluid hover-cursor" src={BtnSelect1Hover} alt="1EOS" />
        break
      case 10: ButtonImage = <img className="h-100 img-fluid hover-cursor" src={BtnSelect2Hover} alt="10EOS" />
        break
      case 20: ButtonImage = <img className="h-100 img-fluid hover-cursor" src={BtnSelect3Hover} alt="20EOS" />
        break
    }
  }

  return (
    <div id="TreasurehuntDestinationButton" className="mx-4">
      {
        active && active === number ? <img src={AnchorOn} alt="" className="w-auto img-fluid" /> :
        optionHovered === number
        ? <img src={AnchorOn} alt="" className="w-auto img-fluid" />
        : <img src={AnchorOff} alt="" className="w-auto img-fluid" />
      }
      <div
        className="mt-2 position-relative"
        onClick={() =>  func()}
        onMouseEnter={() => setOptionHovered(number)}
        onMouseLeave={() => setOptionHovered(0)}
      >
        { ButtonImage }
      </div>
    </div>
  )
}
export default TreasurehuntDestinationButton;
