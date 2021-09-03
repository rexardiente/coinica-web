import React , { useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import styles from "./Layout.module.scss";
import { Container } from "@material-ui/core";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageContent from "../../components/PageContent";
import ModalContainer from "../../components/ModalContainer";
import CurrentSidebar from "../../components/CurrentSidebar";
import { setLanguage } from "redux/platform/platform_action";
import { StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";



const Layout = () => {
  const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  

    return(
        <StylesProvider injectFirst>
          <CssBaseline />
          <div className={`${styles.wrapper}`}>
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <ModalContainer />
            <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
            {/* <CurrentSidebar 
            collapsed={collapsed}
            language={language}
            toggled={toggled}
            handleCollapsedChange={handleCollapsedChange}
            handleSelectLanguage={handleSelectLanguage}
            handleToggleSidebar={handleToggleSidebar}
            /> */}
            <PageContent />
            <Footer />
          </div>
        </StylesProvider>
    );
};

export default Layout;