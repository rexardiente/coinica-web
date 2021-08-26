import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel'
import { ServerAPI } from "Config";
import { translate } from "helpers/translate";
import './TreasurehuntTutorial.scss';

const TUTORIAL_1 = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v2/tutorials/1.jpg`;
const TUTORIAL_2 = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v2/tutorials/2.jpg`;
const TUTORIAL_3 = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v2/tutorials/3.jpg`;
const TUTORIAL_4 = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v2/tutorials/4.jpg`;
const TUTORIAL_5 = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v2/tutorials/5.jpg`;
const TUTORIAL_6 = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v2/tutorials/6.jpg`;
const TUTORIAL_7 = `${ServerAPI.assets_url}/imgs/games/treasurehunt_v2/tutorials/7.jpg`;

type TutorialProps = {
  state: Boolean,
  setState: Function,
}

const STEPS = [
  translate("th.tutorial.step1"),
  translate("th.tutorial.step2"),
  translate("th.tutorial.step3"),
  translate("th.tutorial.step4"),
  translate("th.tutorial.step5"),
  translate("th.tutorial.step6"),
  translate("th.tutorial.step7"),
]

const Tutorial = ({ state, setState }: TutorialProps) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (state) return
    setIndex(0)
  }, [state])

  return (
    <Modal
      dialogClassName="treasurehunt-tutorial-modal"
      size="lg"
      show={state}
      onHide={() => setState(false)}
      aria-labelledby="treasurehunt-tutorial"
    >

      <Modal.Header closeButton>
        <Modal.Title id="treasurehunt-tutorial">
          {translate("th.tutorial")}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="body-content">
          <p>
            {STEPS[index]}
          </p>
          <Carousel
            interval={null}
            activeIndex={index}
            onSelect={handleSelect}
          >
            <Carousel.Item>
              <img className="d-block w-100" src={TUTORIAL_1} alt="Step 1" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={TUTORIAL_2} alt="Step 2" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={TUTORIAL_3} alt="Step 3" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={TUTORIAL_4} alt="Step 4" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={TUTORIAL_5} alt="Step 5" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={TUTORIAL_6} alt="Step 6" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={TUTORIAL_7} alt="Step 7" />
            </Carousel.Item>
          </Carousel>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Tutorial;
