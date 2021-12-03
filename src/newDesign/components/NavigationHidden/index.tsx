import { Language } from "@material-ui/icons";
import React from "react";
import Header from "../Header";
import Sidebar from "./Sidebar";

interface Props {
  handleDrawerToggle: Function;
  handleNavType: Function;
  open: boolean;
  mini: boolean;
  name: string;
  language: string;
  totalRegisteredUser: number;
  handleSelectLanguage: Function;
}

export default function NavigationHidden({handleDrawerToggle, open, mini, handleNavType, language, totalRegisteredUser, handleSelectLanguage}:Props){
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
        />
      </>
    );
};