import React, { useState } from "react";
import locale from "translation/locales";
import { Menu, MenuItem, Button } from "@material-ui/core";
import { ArrowDropUp } from "@material-ui/icons";
import styles from "./DropdownLanguage.module.scss";

type Props = {
    selectedLang: string;
    onSelectLang: Function;
};

const DropdownLanguage = ({  
    onSelectLang,
    selectedLang,
  }: Props) => {

    const [visiblityDropdown, setVisiblityDropdown] = useState(false);
    const lang = selectedLang ? locale[selectedLang] : "";
    const langToArray = Object.entries(locale);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <React.Fragment>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={`${styles.language_dropdown}`}
        >
          {selectedLang} <ArrowDropUp />
        </Button>
        <Menu
          className={`${styles.menu}`}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {langToArray?.length
            ? langToArray.map((item) => (
                <MenuItem key={item[0]} onClick={() => onSelectLang(item[0])}>
                  {item[1]}
                </MenuItem>
              ))
            : null}
        </Menu>
      </React.Fragment>
    );
  };



export default DropdownLanguage;