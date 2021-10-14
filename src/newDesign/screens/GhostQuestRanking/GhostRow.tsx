import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import useSound from "use-sound";
import GhostDetailModal from "./Modals/GhostDetailModal";
import GET_GHOST_AVATAR from "helpers/ghostquest/getGhostAvatar";
import { ClickSound, BtnDetails } from "./Assets";
import { translate } from "helpers/translate";
import styles from "./GhostQuestRanking.module.scss";

const ordinalNumber = (number) => {
  let j = number % 10,
      k = number % 100;
  if (j === 1 && k !== 11) {
    return number + "st";
  }
  if (j === 2 && k !== 12) {
    return number + "nd";
  }
  if (j === 3 && k !== 13) {
    return number + "rd";
  }
  return number + "th";
}

const GhostRow = ({ place, data, selectedSort, ghost_quest }) => {
  const [modalState, setModalState] = useState(false)
  const [ghostImage, setGhostImage] = useState<any>(null)
  // sounds
  const GQ_VOLUME = ghost_quest?.volume
  const [playClick] = useSound(ClickSound, { volume: 0.5 * GQ_VOLUME })
  /**
   * sortOption = 0 (not set)
   * sortOption = 1 (earnings)
   * sortOption = 2 (win streak)
   */
  let sortOption = 0
  if (selectedSort !== null) {
    if (selectedSort.substr(0, 8) === 'earnings') {
      sortOption = 1
    } else if (selectedSort.substr(0, 3) === 'win') {
      sortOption = 2
    }
  }

  useEffect(() => {
    const getGhostImage = (ghost_id) => {
      const image = GET_GHOST_AVATAR({ ghost_id })  
      setGhostImage(image)
    }

    if (data != null) {
      const ghost_id = data?.ghost_id
      getGhostImage(ghost_id)
    }

  }, [data])

  return (
    <div className={styles.ghostRow}>
      <GhostDetailModal
        earnings={data?.earned || null}
        winStreak={data?.win_streak || null}
        avatar={ghostImage}
        details={data}
        modalState={modalState}
        setModalState={setModalState}
      />
      {/* <img className={styles.ghostImage} src={ghostImage} alt="Ghost Avatar" /> */}
      <div
        className={styles.ghostImage}
        style={{
          backgroundImage: `url(${ghostImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className={styles.ghostResults}>
        <div className={styles.ghostResultsLife}>
          <div>
            {translate("gq.ranking.place")}:
          </div>
          <div>
            {translate("gq.ranking.player")}:
          </div>
          {/* {
            data?.id
            ? (
                <div className="text-left">
                  {translate("gq.details.id")}: {`${(data.id + '').slice(-12)}`}
                </div>
              )
            : ''
          } */}
          <div className="text-left">
            {
              sortOption && sortOption === 1 && (
                `Earnings: ${data.earned}`
              )
            }
            {
              sortOption && sortOption === 2 && (
                `Win streak: ${data.win_streak}`
              )
            }
          </div>
        </div>
      </div>
      <div className={styles.ghostDetails}>
        <div>
          {ordinalNumber((+place) + 1)}
        </div>
        <div>
          {data.owner !== null ? (data.owner+"").slice(-12) : 'No data'}
        </div>
        <div className="hover-cursor">
          <img
            src={BtnDetails}
            alt="Details"
            className={styles.btnDetails}
            onClick={() => {
              playClick()
              setModalState(true)
            }}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest }) => ({ ghost_quest });
export default connect(mapStateToProps)(GhostRow);

