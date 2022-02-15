import React from "react";
import Header from "../Header";
import Sidebar from "./SibebarMini";

interface Props {
    handleDrawerToggle : Function;
    handleDrawerClose: Function
    handleDrawerOpen: Function;
    handleNavType : Function;
    open : boolean;
    name : string;
    mini : boolean;
    language : string;
    totalRegisteredUser: number;
    handleSelectLanguage : Function;
}

export default function Navigation({handleDrawerToggle, open, mini, handleNavType, language, totalRegisteredUser, handleSelectLanguage, handleDrawerClose, handleDrawerOpen}:Props){
    return (
      <>
        <Header
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          mini={mini}
          totalRegisteredUser={totalRegisteredUser}
          handleNavType={handleNavType}
        />
        <Sidebar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          language={language}
          handleSelectLanguage={handleSelectLanguage}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
        />
      </>
    );
};