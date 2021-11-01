import React from "react";
import Header from "../Header";
import Sidebar from "./SibebarMini";

interface Props {
    handleDrawerToggle : Function;
    handleDrawerClose: Function
    handleNavType : Function;
    open : boolean;
    name : string;
    mini : boolean;
    language : string;
    handleSelectLanguage : Function;
}

export default function Navigation({handleDrawerToggle, open, mini, handleNavType, language, handleSelectLanguage, handleDrawerClose}:Props){
    return (
      <>
        <Header
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          mini={mini}
          handleNavType={handleNavType}
        />
        <Sidebar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          language={language}
          handleSelectLanguage={handleSelectLanguage}
          handleDrawerClose={handleDrawerClose}
        />
      </>
    );
};