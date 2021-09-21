import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Layout.module.scss";
import Footer from "../../components/Footer";
import PageContent from "../PageContent";
import ModalContainer from "../../components/ModalContainer";
import { setLanguage } from "redux/platform/platform_action";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SwitchComponent from "../../components/SwitchComponent";
import Navigation from "../../components/NavigationHidden";
import NavigationMini from "../../components/NavigationMini";
import "newDesign/index.scss";
import theme from "newDesign/theme";

type ReduxState = {
  platform: any;
};

const Layout = () => {
  const [openSidebar, seOpenSidebar] = useState(true);
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

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`${styles.wrapper}`}>
          <ModalContainer />
          <SwitchComponent active={activeSidebar}>
            <Navigation
              name="navigationHidden"
              open={openSidebar}
              handleDrawerToggle={handleDrawerToggle}
              handleNavMini={handleNavMini}
              mini={mini}
              language={language}
              handleSelectLanguage={handleSelectLanguage}
            />
            <NavigationMini
              name="navigationMini"
              open={openSidebar}
              handleDrawerToggle={handleDrawerToggle}
              handleNavHidden={handleNavHidden}
              mini={mini}
              language={language}
              handleSelectLanguage={handleSelectLanguage}
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
