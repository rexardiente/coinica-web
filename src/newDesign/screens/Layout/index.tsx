import React , { useState } from "react";
// import { useSelector , useDispatch } from "react-redux";
// import { Switch, Route, Redirect } from "react-router-dom";
import styles from "./Layout.module.scss";
import Footer from "../../components/Footer";
import PageContent from "../PageContent";
import ModalContainer from "../../components/ModalContainer";
// import { setLanguage } from "redux/platform/platform_action";
import { StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SwitchComponent from "../../components/SwitchComponent";
import Navigation from "../../components/NavigationHidden";
import NavigationMini from "../../components/NavigationMini";

const Layout = () => {
  const [open, setOpen] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState('navigationHidden');
  const [mini, setMini] = useState(false);

    const handleSwitchSidebar = (name : string) => {
      switch (name) {
        case 'navigationHidden':
          setActiveSidebar(name);
          setMini(false);
          break;
        case 'navigationMini':
          setActiveSidebar(name);
          setMini(true);
          break;
      
        default:
          break;
      }
    };

    const handleNavMini = () => {
      handleSwitchSidebar('navigationMini');
    };

    const handleNavHidden = () => {
      handleSwitchSidebar('navigationHidden');
    };

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleDrawerToggle = () => {
      setOpen(!open);
    };
  

    return(
        <StylesProvider injectFirst>
          <CssBaseline />
          <div className={`${styles.wrapper}`}>
            <ModalContainer />
            <SwitchComponent active={activeSidebar}>
              <Navigation name='navigationHidden' open={open} handleDrawerToggle={handleDrawerToggle} handleNavMini={handleNavMini} mini={mini} />
              <NavigationMini name='navigationMini' open={open} handleDrawerToggle={handleDrawerToggle} handleNavHidden={handleNavHidden} mini={mini} />            
            </SwitchComponent>
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