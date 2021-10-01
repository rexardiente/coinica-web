import React from "react";
import Header from "./Header";
import Sidebar from "./SibebarMini";

interface Props {
    handleDrawerToggle : Function;
    handleNavHidden : Function;
    open : boolean;
    name : string;
    mini : boolean;
    language : string;
    handleSelectLanguage : Function;
    handleSignUpModalOpen: Function;
}

export default function Navigation({handleDrawerToggle, open, mini, handleNavHidden, language, handleSelectLanguage, handleSignUpModalOpen}:Props){
    return (
      <>
        <Header
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          mini={mini}
          handleNavHidden={handleNavHidden}
          handleSignUpModalOpen={handleSignUpModalOpen}
        />
        <Sidebar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          language={language}
          handleSelectLanguage={handleSelectLanguage}
        />
      </>
    );
};