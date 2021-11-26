import React, { useState } from "react";
import { LoseResult, WinResult } from "../../Assets";
import styles from "../ModalStyles.module.scss";

/**
 *  @param (results)
 *  {Object}:
 *  {
 *    state: [Boolean]
 *    isWin: [Boolean]
 *    player: [String]
 *    enemy: [String]
 *  }
 */
type ResultsProps = {
  results: any;
  showResults: Function;
}

const Results = ({ results, showResults }:ResultsProps) => {
  const [isClosing, setClosing] = useState(false)
  if (!results.state) return null
  return (
    <div
      className={`${styles.outer}`}
      onClick={() => {
        setClosing(true)
        setTimeout(() => {
          showResults({...results, state: false})
          setClosing(false)
        }, 500)
      }}
    >
      <div className={`${isClosing ? styles.container_closed : styles.container}`}>
        {
          results.isWin ? (
            <img src={WinResult} alt="" style={{ marginTop: '80px', transform: `scale(1.25)` }} />
          ) : (  
            <img src={LoseResult} alt="" style={{ marginTop: '80px', transform: `scale(1.25)` }} />
          )
        }
        <div className={styles.contentsResult}>
          <div className={styles.textsContainerResults}>
            <h4>Your ghost {results.player}</h4>
            <h4>
              {results.isWin ? 'has won against' : 'has lost against'}
            </h4>
            <h4>enemy's ghost {results.enemy}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results;
