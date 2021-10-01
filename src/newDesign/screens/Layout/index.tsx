import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Layout.module.scss";
import PageContent from "../PageContent";
import { setLanguage } from "redux/platform/platform_action";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SwitchComponent from "newDesign/components/SwitchComponent";
import Navigation from "newDesign/components/NavigationHidden";
import NavigationMini from "newDesign/components/NavigationMini";
import Footer from "newDesign/components/Footer";
import SignUpModal from "newDesign/components/Modals/SignUpModal";
import "newDesign/index.scss";
import theme from "newDesign/theme";

type ReduxState = {
  platform: any;
};

const Layout = () => {
  const [openSidebar, seOpenSidebar] = useState(true);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("navigationHidden");
  const [mini, setMini] = useState(false);
  const { language } = useSelector((state: ReduxState) => state.platform);
  const dispatch = useDispatch();

  const handleSelectLanguage = (val: string) => {
    dispatch(setLanguage(val));
  };

  const handleSwitchSidebar = (name: string) => {
    switch (name) {
      case "navigationHidden":
        setActiveSidebar(name);
        setMini(false);
        break;
      case "navigationMini":
        setActiveSidebar(name);
        setMini(true);
        break;

      default:
        break;
    }
  };

  const handleNavMini = () => {
    handleSwitchSidebar("navigationMini");
  };

  const handleNavHidden = () => {
    handleSwitchSidebar("navigationHidden");
  };

  const handleDrawerToggle = () => {
    seOpenSidebar(!openSidebar);
  };

  const handleSignUpModalOpen = () => {
    setOpenSignUpModal(true);
  }

  const handleSignUpModalClose = () => {
    setOpenSignUpModal(false);
  }

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`${styles.wrapper}`}>
          <SignUpModal
            openModal={openSignUpModal}
            handleSignUpModalOpen={handleSignUpModalOpen}
            handleSignUpModalClose={handleSignUpModalClose}
          />
          <SwitchComponent active={activeSidebar}>
            <Navigation
              name="navigationHidden"
              open={openSidebar}
              handleDrawerToggle={handleDrawerToggle}
              handleNavMini={handleNavMini}
              mini={mini}
              language={language}
              handleSelectLanguage={handleSelectLanguage}
              handleSignUpModalOpen={handleSignUpModalOpen}
            />
            <NavigationMini
              name="navigationMini"
              open={openSidebar}
              handleDrawerToggle={handleDrawerToggle}
              handleNavHidden={handleNavHidden}
              mini={mini}
              language={language}
              handleSelectLanguage={handleSelectLanguage}
              handleSignUpModalOpen={handleSignUpModalOpen}
            />
          </SwitchComponent>
          {/* <CurrentSidebar 
            collapsed={collapsed}
            language={language}
            toggled={toggled}
            handleCollapsedChange={handleCollapsedChange}
            handleSelectLanguage={handleSelectLanguage}
            handleToggleSidebar={handleToggleSidebar}
            /> */}
          <PageContent sideBarOpen={openSidebar} />
          <Footer />
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Layout;
