import React from 'react';
import { STEPS } from '../config';
import classes from '../TreasurehuntAutoplayV2.module.scss';
import { translate } from "helpers/translate";
import { OPTIONS_STEP_4 as OPTIONS } from '../config';

// steps
const STEP5 = 5

type ThirdScreenProps = {
  thirdScreenState: any;
  setThirdScreenState: Function;
}

const ThirdScreen = ({ thirdScreenState, setThirdScreenState}:ThirdScreenProps) => {
  const { title: step5title  } = STEPS[STEP5]
  const { message: step5message } = STEPS[STEP5]

  const _checkboxHandler = (name) => {
    setThirdScreenState({
      ...thirdScreenState,
      [name]: {
        selected: !thirdScreenState[name].selected,
        value: ''
      }
    })
  }

  const _changeValueHandler = (e, name) => {
    const value = +e.target.value

    if (value <= 0) {
      setThirdScreenState({
        ...thirdScreenState,
        [name]: {
          selected: thirdScreenState[name].selected,
          value: 1
        }
      })
      return
    }

    setThirdScreenState({
      ...thirdScreenState,
      [name]: {
        selected: thirdScreenState[name].selected,
        value: value
      }
    })
  }

  return (
    <div className={classes.step2_container}>
      <div className="row flex-column justify-content-center align-items-center my-3">
        <div className="row text-center align-items-center mb-3">
          <div className="col-12 mt-2 text-center">
            <span className="text_th_primary mr-1" style={{ paddingRight: '15px'}}>
              {translate("th.autoplay.step")} {STEP5}
            </span>
            <span className={classes.message}>
              {step5title}
            </span>
            <br/>
            <small className="px-1"> {step5message} </small>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column w-100">
        <span className="text_th_primary">
          {translate("th.autoplay.stop_parameters")}
        </span>
        {
          OPTIONS.map(option => (
            <div
              key={option.id}
              className="d-flex flex-column"
              style={option.id !== 2 ? { borderBottom: '1px solid #ccc' } : {}}
            >
              <div className="d-flex justify-content-between align-items-center p-3">
                <div className="pr-4">
                  <input
                    id={`strat_${option.id}`}
                    type="checkbox"
                    name={option.name}
                    checked={thirdScreenState[option.name].selected}
                    onChange={() => {
                      _checkboxHandler(option.name)
                    }}
                  />
                  <label className={classes.step2_label} htmlFor={`strat_${option.id}`} style={{ paddingLeft: '15px' }}>
                    {option.title}
                  </label>
                  <br />
                  <small className={classes.step2_small}>{option.message}</small>
                </div>
                <div style={{ width: '175px' }}>
                  {
                    option.id === 0 &&  (
                      <>
                        <input
                          type="number"
                          min="1"
                          disabled={!thirdScreenState[option.name].selected}
                          value={thirdScreenState[option.name].value} 
                          style={{ width: '88px', height: '25px', position: 'relative', top: '-15px', right: '-35px'}}
                          onChange={(e) => _changeValueHandler(e, option.name)}
                        />
                        <small className="px-1" style={{ position: 'relative', top: '-15px', right: '-35px'}}>
                          {translate("th.autoplay.game_label")}
                        </small>
                      </>
                    )
                  }
                  { 
                    option.id === 1 &&  (
                      <>
                        <input
                          type="number"
                          min="0"
                          disabled={!thirdScreenState[option.name].selected}
                          value={thirdScreenState[option.name].value} 
                          style={{ width: '88px', height: '25px', position: 'relative', top: '-15px', right: '-35px'}}
                          onChange={(e) => _changeValueHandler(e, option.name)}
                        />
                        <small className="px-1" style={{ position: 'relative', top: '-15px', right: '-35px' }}>
                          {translate("th.autoplay.token_label")}
                        </small>
                      </>
                    )
                  }
                  {
                    option.id === 2 &&  (
                      <>
                        <input
                          type="number"
                          min="1"
                          disabled={!thirdScreenState[option.name].selected}
                          value={thirdScreenState[option.name].value} 
                          style={{ width: '88px', height: '25px', position: 'relative', top: '-15px', right: '-35px' }}
                          onChange={(e) => _changeValueHandler(e, option.name)}
                        />
                        <small className="px-1" style={{ position: 'relative', top: '-15px', right: '-35px' }}>
                          {translate("th.autoplay.token_label")}
                        </small>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          ))
        }
        <div className="col-12 mt-2 text-center" style={{ paddingTop: '10px',paddingBottom: '15px'}} >
        <small className="px-1" >{translate("th.autoplay.notice.message")}</small>
        </div>
      </div>
    </div>
  )
}

export default ThirdScreen;