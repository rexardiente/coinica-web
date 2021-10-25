import React, { useState } from 'react';
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import useSound from "use-sound";
import classes from './TreasurehuntAutoplayV2.module.scss';
import { translate } from "helpers/translate";
// components
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';
import FourthScreen from './FourthScreen';
import { STEPS } from './config';
// assets
import { MainpageBtn, NextBtn, BackBtn, StartBtn} from "./Assets/SvgAssets";
import {
  Title,
  ProgressStep1,
  ProgressStep2,
  ProgressStep3,
  ProgressStep4,
  AudioTHsys1,
  AudioTHsysNo,
  AudioSelect,
} from "./Assets";

/**
 * 
 * @param currentStep
 * step should start at 1
 * 0 is for dummy data
 * 
 */
const TreasurehuntAutoplayV2 = (props) => {
  const { intl } = props;
  const { language } = props.platform
  const [currentStep, setStep] = useState(1)
  const [firstScreenState, setFirstScreenState] = useState({
    destination: 0,
    rivals: '',
  })

  const [secondScreenState, setSecondScreenState] = useState({
    numOfPanelsToOpen: '',
    selectedOption: null, // 0 => Set order panels || 1 => Set random panels
    orderOfPanelsToOpen: []
  })

  const [thirdScreenState, setThirdScreenState] = useState({
    gamesPlayed: {
      selected: false,
      value: ''
    },
    minBalance: {
      selected: false,
      value: ''
    },
    maxBalance: {
      selected: false,
      value: ''
    }
  })

  const [playSelect] = useSound(AudioSelect, { volume: 0.5 })
  const [playTHsys1] = useSound(AudioTHsys1, { volume: 0.5 })
  const [playSysNo] = useSound(AudioTHsysNo, { volume: 0.5 })

  const goBack = () => {
    playSelect()
    if (currentStep === 1) {
      const confirmationMessage = intl.formatMessage({
        id: "th.autoplay.confirm_to_home",
        defaultMessage: 'Are you sure you want to go home?'
      })
      const bool = window.confirm(confirmationMessage)
      if (bool) {
        props.history.push('/game/treasurehunt')
      }
      return
    }
    setStep(prevState => prevState - 1)
  }

  const goNext = () => {
    switch(currentStep) {
      case 1:
        const { destination, rivals } = firstScreenState

        if (+destination === 0) {
          playSysNo()
          toast.warn('Please select your destination')
          return
        }
        if (+rivals === 0) {
          playSysNo()
          toast.warn('Please input number of rivals')
          return  
        }

        playTHsys1()
        setStep(currentStep + 1)
        break
      case 2:
        const { numOfPanelsToOpen, selectedOption, orderOfPanelsToOpen } = secondScreenState

        if (+numOfPanelsToOpen === 0) {
          playSysNo()
          toast.warn('Please input number of panels to open in step 3')
          return
        }
        if (selectedOption === null) {
          playSysNo()
          toast.warn('Please select option how you would open the panels in step 4')
          return
        }
        if (selectedOption === 0 && orderOfPanelsToOpen.length === 0) {
          playSysNo()
          toast.warn(`Please specify the order of panels to be opened, remaining panels: ${+numOfPanelsToOpen - orderOfPanelsToOpen.length}`)
          return
        }
        if (selectedOption === 0 && orderOfPanelsToOpen.length < +numOfPanelsToOpen) {
          playSysNo()
          toast.warn(`Please set panels to be opened, remaining panels: ${+numOfPanelsToOpen - orderOfPanelsToOpen.length}`)
          return
        }

        playTHsys1()
        setStep(currentStep + 1)
        break

      case 3:
        const { gamesPlayed, minBalance, maxBalance } = thirdScreenState
        if (!gamesPlayed.selected && !minBalance.selected && !maxBalance.selected) {
          playSysNo()
          toast.warn('Please set at least 1 stop parameter')
          return
        }
        if (gamesPlayed.selected && gamesPlayed.value === '') {
          playSysNo()
          toast.warn('Please set maximum games number')
          return
        }
        if (minBalance.selected && minBalance.value === '') {
          playSysNo()
          toast.warn('Please set minimum balance')
          return
        }
        if (maxBalance.selected && maxBalance.value === '') {
          playSysNo()
          toast.warn('Please set maximum balance')
          return
        }

        playTHsys1()
        setStep(currentStep + 1)
        break
        
      case 4:
        playTHsys1()
        const confirmationMessage = intl.formatMessage({
          id: "th.autoplay.confirm_to_start",
          defaultMessage: 'Are you sure you want to proceed?'
        })
        const bool = window.confirm(confirmationMessage)
        if (bool) {
          props.history.push("/game/treasurehunt/autoplay-gameplay", {
            autoplayParameters: {
              firstScreenState,
              secondScreenState,
              thirdScreenState,
            }
          })
        }
        break
      default:
        break
    }
  }

  let ProgressBar:any = null
  switch(currentStep) {
    case 1: ProgressBar = <img src={ProgressStep1} alt="" className="w-auto img-fluid" />
      break
    case 2: ProgressBar = <img src={ProgressStep2} alt="" className="w-auto img-fluid" />
      break
    case 3: ProgressBar = <img src={ProgressStep3} alt="" className="w-auto img-fluid" />
      break
    case 4: ProgressBar = <img src={ProgressStep4} alt="" className="w-auto img-fluid" />
      break
    default: ProgressBar = null
      break
  }

  return (
    <div className={`${classes.main} container-fluid`}>
      <div className="d-flex flex-column">
        <img src={Title} alt="Autoplay" className="mt-5 mb-4 w-auto img-fluid" />
        {ProgressBar}
      </div>
      <div className={classes.content}>
        { currentStep === 1 && (
            <FirstScreen
              firstScreenState={firstScreenState}
              setFirstScreenState={setFirstScreenState}
              setSecondScreenState={setSecondScreenState}
            />
          )
        }
        { currentStep === 2 && (
            <SecondScreen
              firstScreenState={firstScreenState}
              secondScreenState={secondScreenState}
              setSecondScreenState={setSecondScreenState}
            />
          )
        }
        { currentStep === 3 && (
            <ThirdScreen
              thirdScreenState={thirdScreenState}
              setThirdScreenState={setThirdScreenState}
            />
          )
        }
        { currentStep === 4 &&(
            <FourthScreen
              language={language}
              steps={STEPS}
              setStep={setStep}
              firstScreenState={firstScreenState}
              secondScreenState={secondScreenState}
              thirdScreenState={thirdScreenState}
            />
          )
        }
      </div>

      <div className={`${classes.navigateBtns} d-flex`}>
        {
          currentStep === 1 && (
            <div className={classes.mainPageBtn} onClick={() => goBack()}>
              <MainpageBtn language={language} />
            </div>
          )
        }
        {
          currentStep !== 1 && (
            <div className={classes.backBtn} onClick={() => goBack()}>
              <BackBtn language={language} />
            </div>
          )
        }
        {
          currentStep !== 4 ? (
            <div className={classes.nextBtn} onClick={() => goNext()}>
              <NextBtn language={language} />
            </div>
          ) : (
            <div className={classes.startBtn} onClick={() => goNext()}>
              <StartBtn language={language} />
            </div>
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({ platform }) => ({ platform });
export default injectIntl(connect(mapStateToProps)(TreasurehuntAutoplayV2));
