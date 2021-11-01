import React from "react"
import { connect } from "react-redux";
import useSound from "use-sound";
import GHOST_LIFE_BAR from "helpers/ghostquest/getGhostLifeBar";
import GET_GHOST_AVATAR from "helpers/ghostquest/getGhostAvatar";
import { translate } from "helpers/translate";
import {
  ClickSound,
  BtnDetails,
  NewBadge,
  StarIcon,
} from "./Assets";
import styles from "./GhostList.module.scss";

const STATUS_DICT = {
  0: { type: 'GQ_DEFAULT', color: '#FFFFFF' },
  1: { type: 'SUMMONED', color: '#FFFFFF' },
  2: { type: 'STANDBY', color: '#FBFF00' },
  3: { type: 'INBATTLE', color: '#FBFF00' },
  4: { type: 'WINNER', color: '#0CFF00' },
  5: { type: 'LOSER', color: '#FF0000' },
  6: { type: 'ELIMINATED', color: '#FF0000' },
  7: { type: 'IDLE', color: '#FBFF00' },
}

const GET_GHOST_STATUS = (ghost_data) => {
  if (ghost_data) {
    if (ghost_data?.value?.character_life <= 0) {
      return { type: 'ELIMINATED', color: '#FF0000' }
    }
    else if (ghost_data?.IS_NEW) {
      return { type: 'SUMMONED', color: '#FFFFFF' }
    }
    else if (ghost_data?.value?.battle_count !== ghost_data?.value?.battle_limit) {
      return { type: 'STANDBY', color: '#FBFF00' }
    }
    else if (ghost_data?.value?.battle_count === ghost_data?.value?.battle_limit && ghost_data?.value?.character_life > 0) {
      return { type: 'WINNER', color: '#0CFF00' }
    }
  }
  return { type: 'IDLE', color: '#FBFF00' }
}

const GET_STARS = (number) => {
  let stars:any = []
  for (let i = 0; i < number; i++) {
    stars.push(
      <img
        key={i+'uniq_key'}
        src={StarIcon}
        alt="*"
        width="25px"
        // style={{ left: `${i*12}px` }}
        // className={styles.ghostRarity}
      />
    )
  }
  return stars;
}

const GhostRow = ({ username, dataProps, inBattle, navigation, ghost_quest, dispatch }) => {
  const GQ_VOLUME = ghost_quest?.volume
  const [playGQ_Click] = useSound(ClickSound, { volume: 0.5 * GQ_VOLUME })

  const goToGameplayScreen = (data, key = null, ghost_avatar) => {
    playGQ_Click()
    let params = {...data, ghost_avatar}
    if (key) {
      params = {
        ...data,
        key,
        ghost_avatar,
      }
    }
    navigation.history.push('/game/ghostquest/gameplay', { params, inBattle })
  }

  if (inBattle) {
    const ghost_data = dataProps?.[0] || null
    const ghost_history = dataProps?.[1] || []

    let isNewlyAddedChar = false
    // let result = 0
    let key:any = null
    let character_name = ""
    let character_life = null
    let character_hp = null
    let battle_count = null
    let battle_limit = null
    let ghostImage:any = null

    if (ghost_data != null) {
      key = ghost_data['key']
      character_name = ghost_data['value']?.ghost_name
      isNewlyAddedChar = ghost_data['IS_NEW'] || false
      character_life = ghost_data['value']?.character_life
      character_hp = ghost_data['value']?.hitpoints
      battle_count = ghost_data['value']?.battle_count
      battle_limit = ghost_data['value']?.battle_limit
      ghostImage = GET_GHOST_AVATAR({ ghost_id: ghost_data['value']?.ghost_id })
      // result = ghost_data?.STATUS
    }

    const ProgBar = GHOST_LIFE_BAR(character_hp, character_hp)
    const StarsRarity:any = ghost_data ? GET_STARS(ghost_data['value']?.rarity) : []
    const isWithdrawable = (
      character_life !== null &&
      battle_count !== null  &&
      battle_limit !== null &&
      character_life > 0 &&
      battle_count === battle_limit
    )

    return (
      <div className={styles.ghostRow}>
        <div className={styles.ghostImageContainer}>
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
          {
            character_life === 0 ? (
              <span className={styles.eliminatedBadge}>
                Eliminated
              </span>
            ) : isWithdrawable && (
              <span className={styles.withdrawBadge}>
                Withdrawable
              </span>
            )
          }
          {/* {
            StarsRarity.length && StarsRarity.map((star) => star)
          } */}
        </div>
        {/********* LABELS *********/}
        <div className={styles.ghostResults}>
          <div className={styles.ghostLabelValue}>
            {translate("gq.details.ghost_name")}:
          </div>
          <div className={styles.ghostLabelValue}>
            {translate("gq.details.id")}:
          </div>
          <div className={styles.ghostLabelValue}>
            {translate("gq.details.rarity")}:
          </div>
          <div className={styles.ghostLabelValue}>
            {translate("gq.details.current_life")}:
          </div>
          <div className={styles.ghostLabelValue}>
            {translate("gq.details.battle_limit")}:
          </div>
          <div className={styles.ghostLabelValue}>
            {translate("gq.details.status")}:
            {/* <span style={{ marginLeft: '10px', color: STATUS_DICT[result]['color'] }}> */}
            <span style={{ marginLeft: '10px', color: GET_GHOST_STATUS(ghost_data)?.color }}>
              {GET_GHOST_STATUS(ghost_data)?.type}
              {/* {result ? STATUS_DICT[result]['type'] : 'No data'} */}
            </span>
          </div>
          <div className={`${styles.progressBar} GhostQuestGhostList`}>
            {ProgBar}
          </div>
        </div>
        {/********* VALUES *********/}
        <div className={styles.ghostDetails}>
          <div className={styles.ghostLabelValue}>
            {character_name || 'No data'}
          </div>
          <div className={styles.ghostLabelValue}>
            {key ? `${(key + '').substr(key.length - 12)}` : 'No data'}
          </div>
          <div className={styles.ghostLabelValue} style={{ width: '100%', textAlign: 'right' }}>
            {
              StarsRarity.length && StarsRarity.map((star) => star)
            }
          </div>
          <div className={styles.ghostLabelValue}>
            {character_life ? `${character_life}` : '0'}
          </div>
          <div className={styles.ghostLabelValue}>
            {`${battle_count !== null && battle_limit !== null ? `${battle_count}/${battle_limit}` : 'No data'}`}
          </div>
          <div
            className="hover-cursor position-relative"
            style={{
              transform: `scale(0.9)`,
              marginRight: '-4px'
            }}
          >
            { isNewlyAddedChar && <img src={NewBadge} alt="New" className={styles.badgeStyle} />}
            <img
              src={BtnDetails}
              alt="Details"
              className={styles.btnDetails}
              onClick={() => goToGameplayScreen(({ ghost_data, ghost_history }), null, ghostImage)}
            />
          </div>
        </div>
      </div>
    )
  } else {
    const ghost_data = dataProps?.[0] || null
    const ghost_history = dataProps?.[1] || []

    let key:any = null
    let character_life = null
    let winCount = 0
    let loseCount = 0
    let ghostImage:any = null

    if (ghost_data != null) {
      key = ghost_data['key']
      character_life = ghost_data['value']?.character_life
      ghostImage = GET_GHOST_AVATAR({ ghost_id: ghost_data['value']?.ghost_id })
    }

    if (ghost_history.length > 0) {
      ghost_history.forEach((obj) => {
        const isWin = obj?.winnerID === key
        
        winCount += isWin ? 1 : 0
        loseCount += !isWin ? 1 : 0
      })
    }

    const StarsRarity:any = ghost_data ? GET_STARS(ghost_data['value']?.rarity) : []

    return (
      <div className={styles.ghostRow}>
        <div className={styles.ghostImageContainer}>
          <div
            className={styles.ghostImage}
            style={{
              backgroundImage: `url(${ghostImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* {
            StarsRarity.length && StarsRarity.map((star) => star)
          } */}
        </div>
        <div className={styles.ghostResults}>
          <div className={styles.ghostResultsLife}>
            <div>
              {translate("gq.details.id")}:
            </div>
            <div>
              {translate("gq.details.rarity")}:
            </div>
            <div>
              {translate("gq.details.status")}:
            </div>
            <div>
              {translate("gq.details.current_life")}:
            </div>
          </div>
          <div>
            <span style={{ marginRight: '30px' }}>
              {`Win: ${winCount}`}            
            </span>
            <span>
              {`Lose: ${loseCount}`}
            </span>
          </div>
        </div>
        <div className={styles.ghostDetails}>
          <div>
            {key ? `${(key + '').substr(key.length - 12)}` : 'No data'}
          </div>
          <div>
            {
              StarsRarity.length && StarsRarity.map((star) => star)
            }
          </div>
          <div style={{ color: STATUS_DICT[6]['color'] }}>
            {STATUS_DICT[6]['type']}
          </div>
          <div>
            {character_life ? `${character_life}` : '0'}
          </div>
          <div
            className="hover-cursor"
            style={{
              transform: `scale(0.9)`,
              marginRight: '-4px'
            }}
          >
            <img
              src={BtnDetails}
              alt="Details"
              className={styles.btnDetails}
              onClick={() => goToGameplayScreen(({ ghost_data, ghost_history }), null, ghostImage)}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ ghost_quest }) => ({ ghost_quest });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(GhostRow);
