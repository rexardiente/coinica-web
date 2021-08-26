import React from "react";
import { toast } from "react-toastify";
import styles from "./Autoplay.module.scss";
import {
  BTN_BACK,
  BTN_NEXT,
  CHECKBOX_ON,
  CHECKBOX_OFF,
} from "../Assets";

type Step3Props = {
  setStep: Function;
  stopParameters: any
  setStopParameters: Function;
}

const Step3 = ({ setStep, stopParameters, setStopParameters }:Step3Props) => {
  const { max_number_of_ghosts, reach_max_balance, reach_min_balance } = stopParameters

  const proceedToConfirmation = () => {
    if (
      max_number_of_ghosts.isSelected === false &&
      reach_max_balance.isSelected === false &&
      reach_min_balance.isSelected === false
    ) {
      toast.warn('Please set at least one stop parameter')
      return
    }

    if (max_number_of_ghosts.isSelected && max_number_of_ghosts.value === 0) {
      toast.warn('Please set value for maximum number of ghosts')
      return
    }
    if (reach_max_balance.isSelected && reach_max_balance.value === 0) {
      toast.warn('Please set value for maximum balance')
      return
    }
    if (reach_min_balance.isSelected && reach_min_balance.value === 0) {
      toast.warn('Please set value for minimum balance')
      return
    }

    setStep(4)
  }

  const setSelected = (parameter, state) => {
    switch(parameter) {
      case 'max_number_of_ghosts':
        setStopParameters({
          ...stopParameters,
          max_number_of_ghosts: { 
            isSelected: state,
            value: max_number_of_ghosts.value
          },
        })
        break
      case 'reach_max_balance':
        setStopParameters({
          ...stopParameters,
          reach_max_balance: { 
            isSelected: state,
            value: reach_max_balance.value
          },
        })
        break
      case 'reach_min_balance':
        setStopParameters({
          ...stopParameters,
          reach_min_balance: { 
            isSelected: state,
            value: reach_min_balance.value
          },
        })
        break
      default: break
    }
  }

  const setSelectedValue = (parameter, event) => {
    const inputVal = +event.target.value
    switch(parameter) {
      case 'max_number_of_ghosts':
        if (inputVal <= 0) {
          setStopParameters({
            ...stopParameters,
            max_number_of_ghosts: { 
              isSelected: max_number_of_ghosts.isSelected,
              value: 0
            },
          })
          return
        }

        setStopParameters({
          ...stopParameters,
          max_number_of_ghosts: { 
            isSelected: max_number_of_ghosts.isSelected,
            value: inputVal
          },
        })
        break
      case 'reach_max_balance':
        if (inputVal <= 0) {
          setStopParameters({
            ...stopParameters,
            reach_max_balance: { 
              isSelected: reach_max_balance.isSelected,
              value: 0
            },
          })
          return
        }

        setStopParameters({
          ...stopParameters,
          reach_max_balance: { 
            isSelected: reach_max_balance.isSelected,
            value: inputVal
          },
        })
        break
      case 'reach_min_balance':
        if (inputVal <= 0) {
          setStopParameters({
            ...stopParameters,
            reach_min_balance: { 
              isSelected: reach_min_balance.isSelected,
              value: 0
            },
          })
          return
        }

        setStopParameters({
          ...stopParameters,
          reach_min_balance: { 
            isSelected: reach_min_balance.isSelected,
            value: inputVal
          },
        })
        break
      default: break
    }
  }

  return (
    <div className={styles.settingContent}>
      <div className={styles.battleLimit}>
        <div className="w-100">
          <h4>
            Step 3: Stop Points
          </h4>
        </div>
        <div className="w-100 mt-4 mb-2" style={{ fontSize: '1.3rem' }}>
          Select parameters to stop Autoplay.
          <br />
          You can set multiple conditions
        </div>
        <div className={styles.stopParameter}>
          {/* MAX NUMBER OF GHOSTS */}
          <div className="d-flex mb-2">
            <div style={{ transform: 'scale(0.8)', marginTop: '-5px' }}>
              {
                max_number_of_ghosts.isSelected ? (
                  <img src={CHECKBOX_ON} alt="On" className="hover-cursor" onClick={() => setSelected('max_number_of_ghosts', false)} />
                ) : (
                  <img src={CHECKBOX_OFF} alt="Off" className="hover-cursor" onClick={() => setSelected('max_number_of_ghosts', true)} />
                )
              }
            </div>
            <div className="text-left">
              <div>
                <div>Max number of ghosts</div>
              </div>
              <div>
                <input
                  className={`ml-0 mt-2 ${styles.inputStyle}`}
                  type="number"
                  min="1"
                  max="50"
                  value={max_number_of_ghosts.value === 0 ? '' : max_number_of_ghosts.value}
                  onChange={(event) => setSelectedValue('max_number_of_ghosts', event)}
                />
                Ghosts
              </div>
            </div>
          </div>
        </div>
        {/* REACH MAX BALANCE */}
        <div className="d-flex mb-2">
          <div style={{ transform: 'scale(0.8)', marginTop: '-5px' }}>
            {
              reach_max_balance.isSelected ? (
                <img src={CHECKBOX_ON} alt="On" className="hover-cursor" onClick={() => setSelected('reach_max_balance', false)} />
              ) : (
                <img src={CHECKBOX_OFF} alt="Off" className="hover-cursor" onClick={() => setSelected('reach_max_balance', true)} />
              )
            }
          </div>
          <div className="text-left">
            <div>
              <div>Reach max balance</div>
            </div>
            <div>
              <input
                className={`ml-0 mt-2 ${styles.inputStyle}`}
                type="number"
                min="1"
                max="50"
                value={reach_max_balance.value === 0 ? '' : reach_max_balance.value}
                onChange={(event) => setSelectedValue('reach_max_balance', event)}
              />
              EOS
            </div>
          </div>
        </div>
        {/* REACH MIN BALANCE */}
        <div className="d-flex mb-2">
          <div style={{ transform: 'scale(0.8)', marginTop: '-5px' }}>
            {
              reach_min_balance.isSelected ? (
                <img src={CHECKBOX_ON} alt="On" className="hover-cursor" onClick={() => setSelected('reach_min_balance', false)} />
              ) : (
                <img src={CHECKBOX_OFF} alt="Off" className="hover-cursor" onClick={() => setSelected('reach_min_balance', true)} />
              )
            }
          </div>
          <div className="text-left">
            <div>
              <div>Reach min balance</div>
            </div>
            <div>
              <input
                className={`ml-0 mt-2 ${styles.inputStyle}`}
                type="number"
                min="1"
                max="50"
                value={reach_min_balance.value === 0 ? '' : reach_min_balance.value}
                onChange={(event) => setSelectedValue('reach_min_balance', event)}
              />
              EOS
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btnBack}>
        <img src={BTN_BACK} alt="Back" className="hover-cursor" onClick={() => setStep(2)} />
      </div>
      <div className={styles.btnNext}>
        <img src={BTN_NEXT} alt="Next" className="hover-cursor" onClick={() => proceedToConfirmation()} />
      </div>
    </div>
  )
}

export default Step3;
