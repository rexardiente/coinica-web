import React, { useState } from 'react';
import { toast } from "react-toastify";
import useSound from "use-sound";
import TreasurehuntDestinationOption from '../../../components/TreasurehuntDestinationOption';
import classes from '../TreasurehuntAutoplayV2.module.scss';
import { translate } from "helpers/translate";
import { STEPS } from '../config'
import {
  ONE_RIVAL,
  FIVE_RIVALS,
  TEN_RIVALS,
  ONE_RIVAL_ACTIVE,
  FIVE_RIVALS_ACTIVE,
  TEN_RIVALS_ACTIVE,
} from "../../TreasurehuntGameplayV2/Assets";
import { AudioTHsysNo } from "../Assets";

// steps
const STEP1 = 1
const STEP2 = 2

type FirstScreenProps = {
  firstScreenState: any;
  setFirstScreenState: Function;
  setSecondScreenState: Function;
}

/**
 * 
 * @param { firstScreenState } object => {
 *    returns object with data: { destination: 0, rivals: '' }
 * 
 * @param { setFirstScreenState } function => {
 *    data to be passed should follow structure of @param { firstScreenState }
 * }
 * 
 */

const FirstScreen = ({ firstScreenState, setFirstScreenState, setSecondScreenState }: FirstScreenProps) => {
  const [optionHovered, setOptionHovered] = useState({
    destinationOption: 0,
    rivalsOption: 0
  })
  const [ playSysNo ] = useSound(AudioTHsysNo, { volume: 0.5 })
  const { destination, rivals } = firstScreenState
  const { title: step1title } = STEPS[STEP1]
  const { title: step2title  } = STEPS[STEP2]

  const setRivals = (numOfRivals) => {
    setFirstScreenState({
      ...firstScreenState,
      rivals: numOfRivals
    })
    setSecondScreenState({
      numOfPanelsToOpen: '',
      selectedOption: null, // 0 => Set order panels || 1 => Set random panels
      orderOfPanelsToOpen: []
    })
  }

  const setRivalsHovered = (rivalsOption) => {
    setOptionHovered({
      ...optionHovered,
      rivalsOption
    })
  }

  const _setCustomNumberOfRivals = (event) => {
    const numOfRivals = +event.target.value

    if (numOfRivals <= 0) {
      playSysNo()
      toast.warn('Please input a mininum number of 1 rival')
      setFirstScreenState({
        ...firstScreenState,
        rivals: ''
      })
      return
    }

    if (numOfRivals > 15) {
      playSysNo()
      toast.warn('Please input a maximum number of 15 rivals')
      setFirstScreenState({
        ...firstScreenState,
        rivals: 15
      })
      return
    }

    setFirstScreenState({
      ...firstScreenState,
      rivals: numOfRivals
    })
    setSecondScreenState({
      numOfPanelsToOpen: '',
      selectedOption: null, // 0 => Set order panels || 1 => Set random panels
      orderOfPanelsToOpen: []
    })
  }

  return (
    <div className={`${classes.step1_container} container-fluid px-0 row`}>
      <div className="col-12 mt-2 text-center">
        <div className="row flex-column justify-content-center align-items-center my-5">
          <div className="row text-center align-items-center mb-3">
            <div className="text_th_primary mr-1">
              {translate("th.autoplay.step")}
            </div>
            <div className="text_th_primary mr-3" style={{ fontSize: '1.5rem', paddingBottom: '5px' }}>
              {STEP1}              
            </div>
            <div className={classes.message}>
              {step1title}
            </div>
          </div>
          <div className="row justify-content-center">
            {[1, 10, 20].map((val) => (
              <TreasurehuntDestinationOption
                key={val}
                number={val}
                active={destination}
                optionHovered={optionHovered.destinationOption}
                setOptionHovered={(destinationOption) =>
                  setOptionHovered({
                    ...optionHovered,
                    destinationOption
                  })
                }
                func={() =>
                  setFirstScreenState({
                    ...firstScreenState,
                    destination: val
                  })
                }
              />
            ))}
          </div>
        </div>
        <div className="row flex-column justify-content-center align-items-center my-5">
          <div className="row text-center align-items-center mb-4">
            <div className="text_th_primary mr-1">
              {translate("th.autoplay.step")}
            </div>
            <div className="text_th_primary mr-3" style={{ fontSize: '1.5rem', paddingBottom: '5px' }}>
              {STEP2}              
            </div>
            <div className={classes.message}>
              {step2title}
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="row align-items-center">
              <div
                onClick={() => setRivals(1)}
                onMouseEnter={() => setRivalsHovered(1)}
                onMouseLeave={() => setRivalsHovered(0)}
              >
                {
                  rivals === 1 || optionHovered.rivalsOption === 1 ? (
                    <img src={ONE_RIVAL_ACTIVE} alt="1" className="hover-cursor" />
                  ) : (
                    <img src={ONE_RIVAL} alt="" className="hover-cursor" />
                  )
                }
              </div>
              <div
                className="mx-3"
                onClick={() => setRivals(5)}
                onMouseEnter={() => setRivalsHovered(5)}
                onMouseLeave={() => setRivalsHovered(0)}
              >
                {
                  rivals === 5 || optionHovered.rivalsOption === 5 ? (
                    <img src={FIVE_RIVALS_ACTIVE} alt="5" className="hover-cursor" />
                  ) : (
                    <img src={FIVE_RIVALS} alt="5" className="hover-cursor" />
                  )
                }
              </div>
              <div
                onClick={() => setRivals(10)}
                onMouseEnter={() => setRivalsHovered(10)}
                onMouseLeave={() => setRivalsHovered(0)}
              >
                {
                  rivals === 10 || optionHovered.rivalsOption === 10 ? (
                    <img src={TEN_RIVALS_ACTIVE} alt="10" className="hover-cursor" />
                  ) : (
                    <img src={TEN_RIVALS} alt="10" className="hover-cursor" />
                  )
                }
              </div>
              <div>
                <h3 className="text_th_primary mx-2">
                  OR
                </h3>
              </div>
              <div className="row flex-column mx-2">
                <label
                  className="text_th_primary"
                  htmlFor="customRivals"
                  style={{ fontSize: '1.5rem' }}
                >
                  {translate("th.autoplay.custom_rivals")}
                </label>
                <input
                  id="customRivals"
                  type="number"
                  style={{
                    minHeight: '50px',
                    background: 'transparent',
                    border: '1px solid #D8A764',
                    borderRadius: '4px',
                    color: 'white',
                  }}
                  value={rivals}
                  onChange={(e) => _setCustomNumberOfRivals(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FirstScreen;
