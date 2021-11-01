import React, { useState } from "react";
import { toast } from "react-toastify";
import useSound from "use-sound";
import MapModal from "./MapModal";
import { STEPS } from "../config";
import classes from "../TreasurehuntAutoplayV2.module.scss";
import { translate } from "helpers/translate";
import {
  SetOrderImage,
  AudioTHsysNo,
} from "../Assets";

// steps
const STEP3 = 3;
const STEP4 = 4;

const IndexToLetter = (index) => {
  const isCapital = true;
  return String.fromCharCode(index + (isCapital ? 65 : 97));
};

type Step2Props = {
  firstScreenState: any;
  secondScreenState: any;
  setSecondScreenState: Function;
};

/**
 *
 * @param { secondScreenState } object => {
 *    returns object with data: {
 *      numOfPanelsToOpen: '',
 *      selectedOption: null,
 *      panelsToOpen: ''
 *    }
 *
 * @param { setSecondScreenState } function => {
 *    data to be passed should follow structure of @param { secondScreenState }
 *
 */

const SecondScreen = ({
  firstScreenState,
  secondScreenState,
  setSecondScreenState,
}: Step2Props) => {
  const [modalState, setModal] = useState(false);
  const [randomArr, setRandomArr] = useState<string[]>([]);
  const [playSysNo] = useSound(AudioTHsysNo, { volume: 0.5 });
  const {
    // destination,
    rivals,
  } = firstScreenState;
  const {
    numOfPanelsToOpen,
    selectedOption,
    orderOfPanelsToOpen,
  } = secondScreenState;
  const { title: step3title } = STEPS[STEP3];
  const { title: step4title } = STEPS[STEP4];
  const maxPanelToOpen = 16 - rivals;

  const _setCustomNumberOfRivals = (event) => {
    const panelsToOpen = +event.target.value;

    if (panelsToOpen <= 0) {
      playSysNo();
      toast.warn("You need to open at least 1 panel");
      setSecondScreenState({
        ...secondScreenState,
        numOfPanelsToOpen: "",
        orderOfPanelsToOpen: [],
      });
      return;
    }

    if (panelsToOpen > maxPanelToOpen) {
      playSysNo();
      toast.warn(`Maximum of ${maxPanelToOpen} panels to open`);
      setSecondScreenState({
        ...secondScreenState,
        numOfPanelsToOpen: maxPanelToOpen,
        orderOfPanelsToOpen: [],
      });
      return;
    }

    setSecondScreenState({
      numOfPanelsToOpen: panelsToOpen,
      selectedOption: null, // 0 => Set order panels || 1 => Set random panels
      orderOfPanelsToOpen: [],
    });
  };

  const getRandomIndex = () => {
    const min = Math.ceil(0);
    const max = Math.floor(15);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomArr = (num) => {
    if (numOfPanelsToOpen === "" || numOfPanelsToOpen === 0) {
      toast.warn("Please set number of panels to open in step 3");
      playSysNo();
      setSecondScreenState({
        ...secondScreenState,
        selectedOption: 1,
      });
      return;
    }

    const arr: number[] = [];
    const arrLetter: string[] = [];
    while (arr.length < num) {
      let index = getRandomIndex();
      while (arr.includes(index)) {
        index = getRandomIndex();
      }
      arr.push(index);
      arrLetter.push(IndexToLetter(index));
    }

    setRandomArr(arrLetter);
    setSecondScreenState({
      ...secondScreenState,
      selectedOption: 1,
      orderOfPanelsToOpen: arr,
    });
  };

  const _setSelectedOption = (event) => {
    // if map is clicked, check Set Order option
    if (event === 0) {
      setSecondScreenState({
        ...secondScreenState,
        selectedOption: event,
      });
      return;
    }

    const selected = +event.target.value;
    setSecondScreenState({
      ...secondScreenState,
      selectedOption: selected,
    });
  };

  const _setPanelsArray = (panels) => {
    if (panels.length < 1) return;
    setSecondScreenState({
      ...secondScreenState,
      orderOfPanelsToOpen: panels,
    });
  };

  return (
    <div className={`${classes.step2_container} container-fluid px-0 row`}>
      <MapModal
        modalState={modalState}
        setModal={setModal}
        selectedMap={firstScreenState.destination}
        numOfPanelsToOpen={numOfPanelsToOpen}
        orderOfPanelsToOpen={orderOfPanelsToOpen}
        setPanelsArray={(panels) => _setPanelsArray(panels)}
      />
      <div className="col-12 mt-2 text-center">
        <div className="row flex-column justify-content-center align-items-center my-5">
          <div className="row text-center align-items-center mb-3">
            <div className="text_th_primary mr-1">
              {translate("th.autoplay.step")}
            </div>
            <div
              className="text_th_primary mr-3"
              style={{ fontSize: "1.5rem", paddingBottom: "5px" }}
            >
              {STEP3}
            </div>
            <div className={classes.message}>
              {step3title}{` (1-${maxPanelToOpen})`}
            </div>
          </div>
          <div className="row justify-content-center">
            <input
              type="number"
              style={{
                minHeight: "50px",
                background: "transparent",
                border: "1px solid #D8A764",
                borderRadius: "4px",
                color: "white",
              }}
              value={numOfPanelsToOpen}
              onChange={(e) => _setCustomNumberOfRivals(e)}
            />
          </div>
        </div>
        <div className="row flex-column justify-content-center align-items-center my-5">
          <div className="row text-center align-items-center mb-4">
            <div className="text_th_primary mr-1">
              {translate("th.autoplay.step")}
            </div>
            <div
              className="text_th_primary mr-3"
              style={{ fontSize: "1.5rem", paddingBottom: "5px" }}
            >
              {STEP4}
            </div>
            <div className={classes.message}>{step4title}</div>
          </div>
          <div className="row justify-content-center">
            <div className="row align-items-center">
              <div className={classes.step3_options}>
                <div className={classes.step3_option1}>
                  <span className="mr-4">
                    <input
                      className="mr-2"
                      type="radio"
                      id="set_order"
                      name="order_option"
                      value={0}
                      checked={selectedOption === 0}
                      onChange={(e) => {
                        _setSelectedOption(e);
                        setModal(true);
                      }}
                      onClick={() => setModal(true)}
                    />
                    <label htmlFor="set_order">
                      {translate("th.autoplay.set_order")}
                    </label>
                  </span>
                  <div
                    className="hover-cursor"
                    onClick={() => {
                      _setSelectedOption(0);
                      setModal(true);
                    }}
                  >
                    <img
                      className="w-auto img-fluid"
                      src={SetOrderImage}
                      alt="Set order map"
                      style={{
                        opacity: selectedOption === 0 ? 1 : 0.5,
                      }}
                    />
                    <p
                      className="my-2"
                      style={{ maxWidth: "200px", fontSize: "0.9rem" }}
                    >
                      {translate("th.autoplay.set_order.message")}
                    </p>
                  </div>
                </div>
                <div
                  title="Click again to generate another random set of numbers"
                  className={classes.step3_option2}
                >
                  <span>
                    <input
                      className="mr-2"
                      type="radio"
                      id="random"
                      name="order_option"
                      value={1}
                      checked={selectedOption === 1}
                      onClick={() => {
                        if (selectedOption === 1) {
                          getRandomArr(numOfPanelsToOpen);
                        }
                      }}
                      onChange={() => getRandomArr(numOfPanelsToOpen)}
                    />
                    <label htmlFor="random">
                      {translate("th.autoplay.random_option")}
                    </label>
                    <br />
                  </span>
                  <p
                    className={`${classes.step3_message} ${classes.step3_random}`}
                  >
                    {translate("th.autoplay.random_option.message")}
                  </p>
                  <p
                    className={`${classes.step3_message} ${classes.step3_random}`}
                    style={{ top: "60px" }}
                  >
                    {
                      selectedOption === 1 &&
                      randomArr.length > 0 &&
                      JSON.stringify(randomArr).replace(/"/g, " ")
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondScreen;
