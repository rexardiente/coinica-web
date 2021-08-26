import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import styles from "./DropdownGasprice.module.scss";

type GasPrices = {
  LastBlock: string;
  FastGasPrice: string;
  ProposeGasPrice: string;
  SafeGasPrice: string;
};

type Props = {
  onSelectGasPrice: (selectedKey: string | null) => void;
  selectedGas: string | null;
  containerClass?: string;
  gasPrices: GasPrices;
};

const DropdownGasPrice = ({
  onSelectGasPrice,
  selectedGas,
  containerClass,
  gasPrices
}: Props) => {
  return (
    <DropdownButton
      id="dropdown-gasprice"
      title={selectedGas === "" ? `${gasPrices.FastGasPrice} (Fast)` : selectedGas}
      drop="down"
      variant="secondary"
      onSelect={(selectedKey) => onSelectGasPrice(selectedKey)}
      className={`${styles.container} ${containerClass || ""}`}
    >
     <Dropdown.Item eventKey={`${gasPrices.FastGasPrice} (Fast)`}>
        {`${gasPrices.FastGasPrice} (Fast)`}
      </Dropdown.Item>
      <Dropdown.Item eventKey={`${gasPrices.ProposeGasPrice} (Proposed)`}>
        {`${gasPrices.ProposeGasPrice} (Proposed)`}
      </Dropdown.Item>
      <Dropdown.Item eventKey={`${gasPrices.SafeGasPrice} (Safe)`}>
        {`${gasPrices.SafeGasPrice} (Safe)`}
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default DropdownGasPrice;
