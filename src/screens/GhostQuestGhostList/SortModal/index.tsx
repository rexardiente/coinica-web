import React from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
import {
  ModalBtnCancel,
} from "../../GhostQuest/Assets";
import {
  Background,
  OldestBtn,
  NewestBtn,
  BLLowBtn,
  BLHighBtn,
  StarLowBtn,
  StarHighBtn,
  LifeLowBtn,
  LifeHighBtn,
  CancelSound,
} from "../Assets";
import styles from "./SortModal.module.scss";

type SortModalProps = {
  sortModalState: boolean;
  showSortModal: Function;
  setSort: Function;
  battleState: Number;
  ghost_quest: any;
}

const SortModal = ({ sortModalState, showSortModal, setSort, battleState, ghost_quest }:SortModalProps) => {
  const GQ_VOLUME = ghost_quest?.volume
  const [playGQ_BackCancel] = useSound(CancelSound, { volume: 0.5 * GQ_VOLUME })
  if (!sortModalState) return null
  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <div className={styles.sortButtonsContainer}>
          <h3 className="text-left">Sort by</h3>
          <div className="col" style={{ padding: '0px' }}>
            <div className="row">
              <img
                src={OldestBtn}
                alt="Oldest"
                className={`${styles.sortBtn} col hover-cursor`}
                onClick={() => setSort(0)}
              />
              <img
                src={NewestBtn}
                alt="Newest"
                className={`${styles.sortBtn} col hover-cursor`}
                onClick={() => setSort(1)}
              />
            </div>
            {
              !battleState && (
                <div className="row">
                  <img
                    src={BLLowBtn}
                    alt="Battle Limit: Low to High"
                    className={`${styles.sortBtn} col hover-cursor`}
                    onClick={() => setSort(2)}
                  />
                  <img
                    src={BLHighBtn}
                    alt="Battle Limit: High to Low"
                    className={`${styles.sortBtn} col hover-cursor`}
                    onClick={() => setSort(3)}
                  />
                </div>
              )
            }
            <div className="row">
              <img
                src={StarLowBtn}
                alt="Star: Low to High"
                className={`${styles.sortBtn} col hover-cursor`}
                onClick={() => setSort(4)}
              />
              <img
                src={StarHighBtn}
                alt="Star: High to Low"
                className={`${styles.sortBtn} col hover-cursor`}
                onClick={() => setSort(5)}
              />
            </div>
            <div className="row">
              <img
                src={LifeLowBtn}
                alt="Life: Low to High"
                className={`${styles.sortBtn} col hover-cursor`}
                onClick={() => setSort(6)}
              />
              <img
                src={LifeHighBtn}
                alt="Life: High to Low"
                className={`${styles.sortBtn} col hover-cursor`}
                onClick={() => setSort(7)}
              />
            </div>
          </div>
        </div>
        <img src={Background} alt="" />
        <img
          src={ModalBtnCancel}
          alt="Cancel"
          className={`hover-cursor ${styles.closeBtn} `}
          onClick={() => {
            playGQ_BackCancel()
            showSortModal(false)
          }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = ({ ghost_quest }) => ({ ghost_quest });
export default connect(mapStateToProps)(SortModal);
