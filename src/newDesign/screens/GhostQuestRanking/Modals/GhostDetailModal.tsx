import React, { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import { UnixMicroToDate } from "../../../helpers/date";
import { GetCharacterById } from "services/api/server/ghostquest_api";
import { SUMMON_STAR as  StarIcon } from "../../GhostQuest/Assets";
import styles from "../GhostQuestRanking.module.scss";

const GhostDetailModal = ({ earnings, winStreak, avatar, details, modalState, setModalState }) => {
  const [loadingState, setLoading] = useState(false)
  const [ghostAttributes, setGhostAttributes] = useState<any>(null)
  // const [ghostBattleHistory, setGhostBattleHistory] = useState<any[]>([])
  // const [winCount, setWinCount] = useState(0)
  // const [loseCount, setLoseCount] = useState(0)

  const ghostKey = details?.key
  // const ghostOwner = details?.owner

  useEffect(() => {
    if (modalState) {
      setLoading(true)
      if (ghostKey) {
        GetCharacterById(ghostKey).then(res => {
          const { data } = res
          if (data) {
            const value = data[0][0]?.value || null
            console.log({ data, value })
            setGhostAttributes(value)
            // setGhostBattleHistory(data[1])

            // if (Array.isArray(data[1]) && data[1].length) {
            //   const wins = data[1].filter(d => {
            //     const winner = d?.is_win?.find(obj => obj?.isWin)
            //     return winner?.player === ghostOwner
            //   })
            //   const loses = data[1].filter(d => {
            //     const loser = d?.is_win?.find(obj => obj?.isWin === false)
            //     return loser?.player === ghostOwner
            //   })

            //   setWinCount(wins.length)
            //   setLoseCount(loses.length)
            // }
          }
        }).catch(() => {
          // console.log({ GetCharacterByIdErr: err })
        }).finally(() => {
          setLoading(false)
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState])

  // const ghost_avatar:any = avatar || null
  let stars:any = null
  if (ghostAttributes) {
    stars = Array(ghostAttributes?.rarity).fill(null).map((_, idx) => (
      <img
        src={StarIcon}
        alt=""
        className={styles.starStyle}
        key={idx}
        style={{
          marginLeft: idx !== 0 ? '-30px' : '0px'
        }}
      />
    ))
  }

  return (
    <Modal
      show={modalState}
      contentClassName={styles.GhostDetailModalStyle}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      style={{ backgroundColor: `rgba(0,0,0,0.3)` }}
    >
      <Modal.Body>
        <h4>
          ID: { ghostKey ? (ghostKey + '').substr(ghostKey.length - 12) : 'No data' }
        </h4>
        {
          loadingState ? (
            <div className="my-3 w-100 d-flex justify-content-center">
              <Spinner animation="grow" />
            </div>
          ) : (
            <div className="my-3">
              {
                ghostAttributes && (
                  <div className={styles.charAttributesContainer}>
                    <div className="position-relative my-3">
                      {/* <img className={styles.ghostImage} src={ghost_obj?.image} alt="Ghost Avatar" /> */}
                      <div
                        className={styles.ghostImage}
                        style={{
                          backgroundImage: `url(${avatar})`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                      <div className="position-absolute" style={{ bottom: '-15px' }}>
                        {stars}
                      </div>
                    </div>
                    <div className={styles.charAttriData}>
                      <div className="mb-2">
                        Ghost: {ghostAttributes?.ghost_name || ''}
                      </div>
                      <div className="mb-2">
                        HP: {ghostAttributes?.hitpoints || ''}
                      </div>
                      <div className="mb-2">
                        ATK: {ghostAttributes?.attack || ''}
                      </div>
                    </div>
                    <div className={styles.charAttriData}>
                      <div className="mb-2">
                        DEF: {ghostAttributes?.defense || ''}
                      </div>
                      <div className="mb-2">
                        SPD: {ghostAttributes?.speed || ''}
                      </div>
                      <div className="mb-2">
                        LUK: {ghostAttributes?.luck || ''}
                      </div>
                    </div>
                  </div>
                )
              }
              <div className="d-flex ml-1 mb-2">
                <div className="d-flex justify-space-between" style={{ marginRight: '50px' }}>
                  {
                    earnings && (
                      <>
                        <span style={{ marginRight: '15px', fontWeight: 'bold' }}>
                          Earnings:
                        </span>
                        <span style={{ fontWeight: 'bold', color: `rgb(149, 255, 12)` }}>
                          {earnings + ' Token'}
                        </span>
                      </>
                    )
                  }
                  {
                    winStreak && (
                      <>
                        <span style={{ marginRight: '15px', fontWeight: 'bold' }}>
                          Win-streak:
                        </span>
                        <span style={{ fontWeight: 'bold' }}>
                          {winStreak}
                        </span>
                      </>
                    )
                  }
                </div>
                {/* <div className="d-flex justify-space-between" style={{ marginRight: '50px' }}>
                  <span style={{ marginRight: '15px' }}>
                    Win:
                  </span>
                  <span style={{ color: '#95ff0c' }}>
                    {winCount || 0}
                  </span>
                </div>
                <div className="d-flex justify-space-between">
                  <span style={{ marginRight: '15px' }}>
                    Lose:
                  </span>
                  <span style={{ color: 'red' }}>
                    {loseCount || 0}
                  </span>
                </div> */}
              </div>
              {/* <div className={styles.charBattlesContainer}>
                <h5 className="ml-1 mt-3 mb-2">BATTLES</h5>
                <div className={`${styles.charBattlesContent} ml-1`}>
                {
                  ghostBattleHistory.length ? ghostBattleHistory.map((history, idx) => {
                    const date = UnixMicroToDate((+history?.time_executed), "MM/DD/YYYY hh:mm:ss A ", null)
                    const enemyObj = history?.is_win?.find(obj => obj.char_id !== ghostKey)
                    const enemyWon = enemyObj?.isWin === true
                    const battleResult = (
                      <p>
                        {`
                          Battle Outcome : 
                          ${ghostKey ? (ghostKey + '').substr(ghostKey.length - 12) : ''}
                          ${enemyWon ? 'was defeated' : 'has won'}
                          against
                          ${enemyObj ? (enemyObj.char_id + '').substr(enemyObj.char_id.length - 12) : ''}
                        `}
                      </p>
                    )
                    return (
                      <div key={idx}>
                        <p style={{ margin: 0 }}>
                          Match date: {date
                        }</p>
                        {battleResult}
                      </div>
                    )
                  }) : (
                    <p>No battle found</p>
                  )
                }
                </div>
              </div> */}
            </div>
          )
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalState(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default GhostDetailModal;
