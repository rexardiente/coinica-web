import React, { useState } from "react";
import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import styles from "./DropdownLanguage.module.scss";
import locale from "../../translation/locales";

type Props = {
  selectedLang: string;
  isSidebarCollapsed: boolean;
  onSelectLang: (selectedKey: string | null) => void;
};

const DropdownLanguage = ({
  onSelectLang,
  selectedLang,
  isSidebarCollapsed,
}: Props) => {
  const [visiblityDropdown, setVisiblityDropdown] = useState(false);
  const lang = selectedLang ? locale[selectedLang] : "";
  const langToArray = Object.entries(locale);


  const iconDropdown = () => {
    setVisiblityDropdown((prevState) => !prevState);
  };

  const toggleDropdown = (isOpen: boolean) => {
    setVisiblityDropdown(isOpen);
  };

  const fixedPosDropdown = () => {
    return isSidebarCollapsed ? styles.fixedPosWhenCollapsed : "";
  };

  const renderDropdownItem = () => {
    return langToArray?.length ? langToArray.map((item) => (
      <Dropdown.Item key={item[0]} as="button" eventKey={item[0]}>
        {item[1]}
      </Dropdown.Item>
    )) : null;
  }
  return (
    <React.Fragment>
      <Icon.Speaker onClick={iconDropdown} height="1.3em" width="2em" />

      <DropdownButton
        id="dropdown-language"
        drop="up"
        variant=""
        as={ButtonGroup}
        show={visiblityDropdown}
        title={lang}
        className={`${styles.buttonLang} ${fixedPosDropdown()}`}
        onToggle={toggleDropdown}
        onSelect={(selectedKey) => onSelectLang(selectedKey)}
      >
        {renderDropdownItem()}
      </DropdownButton>
    </React.Fragment>
  );
};

export default DropdownLanguage;
