import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Layout.module.scss";
import { setLanguage } from "redux/platform/platform_action";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";
import SwitchComponent from "newDesign/components/SwitchComponent";
import NavigationHidden from "newDesign/components/NavigationHidden";
import NavigationMini from "newDesign/components/NavigationMini";
import Footer from "newDesign/components/Footer";
import theme from "newDesign/theme";
import Loading from "../../components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ReduxState = {
  platform: any;
  page: any;
};

const Layout = (props) => {
  const dispatch = useDispatch();
  const [openSidebar, seOpenSidebar] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState("navigationHidden");
  const [mini, setMini] = useState(false);
  const { language } = useSelector((state: ReduxState) => state.platform);
  const { isLoading } = useSelector((state: ReduxState) => state.page);

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
          <SwitchComponent active={activeSidebar}>
            <NavigationHidden
              name="navigationHidden"
              open={openSidebar}
              handleDrawerToggle={handleDrawerToggle}
              handleNavType={handleNavMini}
              mini={mini}
              language={language}
              handleSelectLanguage={handleSelectLanguage}
            />
            <NavigationMini
              name="navigationMini"
              open={openSidebar}
              handleDrawerToggle={handleDrawerToggle}
              handleNavType={handleNavHidden}
              mini={mini}
              language={language}
              handleSelectLanguage={handleSelectLanguage}
            />
          </SwitchComponent>
          {/* page content */}
          <Container className={`${styles.page_content}`} maxWidth="xl">
            <Loading isLoading={isLoading} sideBarOpen={openSidebar} />
            {props.children}
          </Container>
          <Footer />
          <ToastContainer autoClose={4000} />
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Layout;
