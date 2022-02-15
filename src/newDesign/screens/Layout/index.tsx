import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetTotalRegisteredUser } from "services/api/server/platform";
import styles from "./Layout.module.scss";
import { setLanguage } from "redux/platform/platform_action";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Container } from "@material-ui/core";
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
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("navigationMini");
  const [mini, setMini] = useState(true);
  const [registeredUser, setRegisteredUser] = useState(0);
  const { language, account } = useSelector(
    (state: ReduxState) => state.platform
  );
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
    setOpenSidebar(!openSidebar);
  };

  const handleDrawerClose = () => {
    setOpenSidebar(false);
  };

  const handleDrawerOpen = () => {
    setOpenSidebar(true);
  };

  const countRegisteredUser = async () => {
    try {
      const totalUsers = await GetTotalRegisteredUser();
      setRegisteredUser(totalUsers.data);
    } catch {}
  };

  useEffect(() => {
    countRegisteredUser();
  }, []);

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`${styles.wrapper}`}>
          <Loading isLoading={isLoading} sideBarOpen={openSidebar} />

          {/* <SwitchComponent active={activeSidebar}>
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
          </SwitchComponent> */}
          <NavigationMini
            name="navigationMini"
            open={openSidebar}
            totalRegisteredUser={registeredUser}
            handleDrawerToggle={handleDrawerToggle}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
            handleNavType={handleNavHidden}
            mini={mini}
            language={language}
            handleSelectLanguage={handleSelectLanguage}
          />
          {/* page content */}
          <div className={`${styles.page_content}`}>
            <div className={`${styles.container}`}>{props.children}</div>
            <Footer />
          </div>
          <ToastContainer autoClose={4000} />
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Layout;
