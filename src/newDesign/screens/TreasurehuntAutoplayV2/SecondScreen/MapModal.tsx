import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import useSound from "use-sound";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  MapA_Image,
  MapB_Image,
  MapC_Image,
} from "../../TreasurehuntGameplayV2/Assets";
import { AudioTHsysNo } from "../Assets";
import "./MapModalStyle.scss"

interface MapOptions {
  id?: string;
  pattern?: any[];
  pirate_flag?: any[];
  treasure?: any[];
}

const MAP_A: MapOptions = {
  id: "MAP_A",
  // pattern are based on a 4x6 map
  // ("letter" corresponds to valid tiles while 0s are blank tiles)
  pattern: [
    ["A", "B",  0,   0 ],
    ["C", "D",  0,   0 ],
    ["E", "F", "G", "H"],
    [ 0 , "I", "J",  0 ],
    [ 0 , "K", "L", "M"],
    ["N", "O", "P",  0 ],
  ],
};

const MAP_B: MapOptions = {
  id: "MAP_B",
  // pattern are based on a 4x6 map
  // ("letter" corresponds to valid tiles while 0s are blank tiles)
  pattern: [
    ["A", "B",  0 ,  0 ],
    ["C",  0 ,  0 ,  0 ],
    ["D", "E", "F", "G"],
    ["H", "I", "J",  0 ],
    ["K", "L", "M", "N"],
    [ 0 , "O", "P",  0 ],
  ],
};

const MAP_C: MapOptions = {
  id: "MAP_C",
  // pattern are based on a 4x6 map
  // ("letter" corresponds to valid tiles while 0s are blank tiles)
  pattern: [
    ["A", "B",  0 ,  0 ],
    ["C", "D",  0 ,  0 ],
    ["E", "F", "G",  0 ],
    [ 0 , "H", "I",  0 ],
    ["J", "K", "L", "M"],
    ["N", "O", "P",  0 ],
  ]
};

const LetterToIndex = (letter) => {
  if (letter === 0) return
  const isCapital = true
  return letter.charCodeAt(0) - (isCapital ? 65 : 97);
}

type TileProps = {
  param: string | number;
  panels: any;
  panelsToOpen: number;
  setPanels: Function;
};

const Tile = ({
  param,
  panels,
  panelsToOpen,
  setPanels
}: TileProps) => {

  const selectTile = (param) => {
    if (param === 0) return
    const temp_panels = [...panels]
    const index_param = LetterToIndex(param)
    const indexOfParam = temp_panels.indexOf(index_param)

    if (indexOfParam === -1) { // if not selected yet
      if (panelsToOpen === 0) {
        toast.warn('You already reach maximum panels to open')
        return
      }
      setPanels([...panels, index_param ])
    } else {
      temp_panels.splice(indexOfParam, 1)
      setPanels([...temp_panels])
    }
  };

  let content: any = ''
  let customStyle = {}
  const isSelected = panels.includes(LetterToIndex(param))

  if (param) {
    if (isSelected) {
      content = <h1>{parseInt(panels.indexOf(LetterToIndex(param))) + 1}</h1>
      customStyle = {
        background: 'rgb(0 117 185 / 60%)',
        color: '#fff'
      }
    } else {
      content = <h1>{param}</h1>
    }
  }

  return (
    <Col
      id={`tiles-${param ? 1 : 0}`}
      style={{
        border: param ? '3px solid #4e2a1a' : '',
        ...customStyle
      }}
      xs={3}
      onClick={() => selectTile(param)}
      >
        { content }
    </Col>
  );
};

type MapModalProps = {
  modalState: boolean;
  setModal: Function;
  selectedMap: number;
  numOfPanelsToOpen: number | string;
  orderOfPanelsToOpen: number[];
  setPanelsArray: Function;
}

const MAP_OPTIONS = [MAP_A, MAP_B, MAP_C];

const MapModal = ({ modalState, setModal, selectedMap, numOfPanelsToOpen, orderOfPanelsToOpen, setPanelsArray }: MapModalProps) => {
  const [panels, setPanels] = useState([])
  const [panelsToOpen, setPanelsToOpen]: any = useState<string | number>(numOfPanelsToOpen)
  const [ playSysNo ] = useSound(AudioTHsysNo, { volume: 0.5 })

  const MAP_SELECTED = useMemo(() => {
    let map = 0
    switch (selectedMap) {
      case  1: map = 0; break;
      case 10: map = 1; break;
      case 20: map = 2; break;
      default: break
    }

    return MAP_OPTIONS[map];
  }, [selectedMap]) 
 
  useEffect(() => {
    if ( (numOfPanelsToOpen === '' || numOfPanelsToOpen === 0 ) && modalState) {
      toast.warn('Please set number of panels to open in step 3')
      playSysNo()
      setModal(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState])

  useEffect(() => {
    setPanelsToOpen(+numOfPanelsToOpen)
    setPanels([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfPanelsToOpen])

  useEffect(() => {
    setPanelsToOpen(+numOfPanelsToOpen - panels.length)
    setPanelsArray(panels)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panels])

  const _getMapImage = (selectedMap) => {
    if (selectedMap === 1) return MapA_Image;
    if (selectedMap === 10) return MapB_Image;
    if (selectedMap === 20) return MapC_Image;
  };
  
  return (
    <Modal
      show={modalState}
      size="lg"
      dialogClassName="TH_MAP_MODAL"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={() => setModal(false)}
    >
      <Modal.Header bsPrefix="modal-header col-md-8" closeButton>
        <Modal.Title as="h6">Select panels to open {`(${panelsToOpen})`}</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <div id="THMapModalStyle">
          <div className="map-container col-md-8">
            <div id="map-image-container">
              <Container
                id="tiles-container"
                className="container-fluid"
                style={{
                  position: "absolute",
                  top: 50,
                  left: 50,
                  width: "80%",
                  height: "90%",
                }}
              >
                {MAP_SELECTED?.pattern?.map((row, idx) => (
                  <Row id="tiles-row" key={idx} style={{ height: "15.5%" }}>
                    {row.map((col, idx) => (
                      <Tile
                        key={MAP_SELECTED?.id + idx}
                        param={col}
                        panels={panels}
                        panelsToOpen={panelsToOpen}
                        setPanels={setPanels}
                      />
                    ))}
                  </Row>
                ))}
              </Container>
              <img
                className="h-100 img-fluid"
                src={_getMapImage(selectedMap)}
                alt="Selected Map"
              />
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default MapModal
