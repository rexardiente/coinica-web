import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setLanguage } from "redux/platform/platform_action";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import Footer from "../Footer";
import { TermsOfUse , PrivacyPolicy } from "../Modals";

const HeaderContainer = React.lazy(() => import("../Header"));
const SidebarContainer = React.lazy(() => import("../Sidebar"));

const Layout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const { language } = useSelector((state) => state.platform);
  const dispatch = useDispatch();

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const handleSelectLanguage = (val: string) => {
    dispatch(setLanguage(val));
  };

  return (
    <>
      <HeaderContainer
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
      />

      <div id="wrapper" className={`${toggled ? "toggled" : ""}`}>
        {/* <PopUpMessage /> */}
        <SidebarContainer
          collapsed={collapsed}
          toggled={toggled}
          language={language}
          handleSelectLanguage={handleSelectLanguage}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        />
        <div id="content">{props.children}</div>
        <TermsOfUse />
        <PrivacyPolicy />
        <Footer />
        <ToastContainer autoClose={4000} />
      </div>
    </>
  );
};

export default Layout;
