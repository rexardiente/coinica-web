import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import styles from "./DropdownCurrency.module.scss";

type Currency = {
  name: string;
  symbol: string;
};

type Props = {
  onSelectCurrency: (selectedKey: string | null) => void;
  selectedCurrency: string | null;
  listCurrency: Array<Currency>;
  containerClass?: string;
};

const DropdownCurrency = ({
  onSelectCurrency,
  selectedCurrency,
  listCurrency,
  containerClass,
}: Props) => {
  return (
    <DropdownButton
      id="dropdown-currency"
      drop="down"
      variant="secondary"
      title={selectedCurrency}
      onSelect={(selectedKey) => onSelectCurrency(selectedKey)}
      className={`${styles.container} ${containerClass || ""}`}
    >
      {listCurrency.length &&
        listCurrency.map((curr, index) => (
          <Dropdown.Item key={index} eventKey={curr.symbol}>
            {curr.symbol}
          </Dropdown.Item>
        ))}
    </DropdownButton>
  );
};

export default DropdownCurrency;
