import React from "react";
import { useSelector } from "react-redux";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { translate } from "../../helpers";
import {
  SidebarCollapse,
} from "../../assets/js/main";
import "./Sidebar.scss";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarFooter } from "react-pro-sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import DropdownLanguage from "components/DropdownLanguage";
import * as assets from "./Assets";


const Sidebar = ({
  collapsed,
  toggled,
  language,
  handleSelectLanguage,
  handleToggleSidebar,
  handleCollapsedChange
}) => {
  const account = useSelector(state => state.platform.account);

  const helpMenu = () => {
    return (
      <div id="help-menu">
        <li className="list-group-item sidebar-separator menu-collapsed"></li>
        <Link
          to=""
          id="sidebar-colapse"
          data-toggle="sidebar-colapse"
          className="list-group-item list-group-item-action d-flex align-items-center"
          onClick={() => SidebarCollapse()}
        >
          <div className="d-flex w-100 justify-content-start align-items-center" id="fixed-bottom">
            <svg
              id="collapse-icon-left"
              className="bi bi-chevron-double-left mr-3"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
              <path
                fillRule="evenodd"
                d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>

            <svg
              id="collapse-icon-right"
              className="bi bi-chevron-double-right"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
              />
              <path
                fillRule="evenodd"
                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>

            <span id="collapse-text" className="menu-collapsed">
              {translate("sidebar.collapse")}
            </span>
          </div>
        </Link>
      </div>
    );
  };

  const fixedBottom = () => {

    return (
      <ul className="list-group mt-auto mb-0" id="fixed-bottom">
        {/* <button
          aria-expanded="false"
          aria-controls="telegram"
          className="btn list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-start align-items-center">
            <Icon.ChatDots />
            <span className="menu-collapsed ml-3">Telegram</span>
          </div>
        </button> */}
        <button
          aria-expanded="false"
          aria-controls="langauge"
          className="btn list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-start align-items-center">
            <Icon.Speaker />
            <span className="menu-collapsed ml-3">English</span>
          </div>
        </button>
        {/* <button
          aria-expanded="false"
          aria-controls="faqs"
          className="btn list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-start align-items-center">
            <Icon.QuestionCircle />
            <span className="menu-collapsed ml-3">
              {translate("sidebar.faqs")}
            </span>
          </div>
        </button> */}
      </ul>
    );
  }

  const proSidebar = () => {
    return (
      <ProSidebar
        breakPoint="lg"
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
      >
        {/* <SidebarHeader className="text-center">
          <div>
            <Logo width={55} height={55} className="w-auto" />
          </div>
          <div>
            {translate("header.brand")}
          </div>
        </SidebarHeader> */}
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem
              className={`text-center mt-3 mb-4 ${collapsed ? "ml-1" : "ml-3"}`}
              icon={
                collapsed ? (
                  <img
                    src={assets.coinLogo}
                    width={35}
                    height={35}
                    alt="coin-logo"
                  />
                ) : (
                  ""
                )
              }
            >
              <Link to="/">
                <div>
                  <img
                    src={assets.logo}
                    width={35}
                    height={35}
                    alt="logo"
                    className="w-auto"
                  />
                </div>
              </Link>
            </MenuItem>
            <SubMenu
              className="side-menu-item"
              title={(translate("sidebar.games") as unknown) as string}
              icon={<img src={assets.games} height="20px" alt=""></img>}
            >
              <MenuItem>
                <Link to="/game/ghostquest">
                  <img src={assets.ghostquest} height="20px" alt=""></img>
                  <span className="pl-2">{translate("sidebar.games.gq")}</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/game/treasurehunt">
                  <img src={assets.treasurehunt} height="35px" alt=""></img>
                  <span className="pl-2">{translate("sidebar.games.th")}</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/game/mahjong">
                  <img src={assets.mahjong} height="35px" alt=""></img>
                  <span className="pl-2">{translate("sidebar.games.mj")}</span>
                </Link>
              </MenuItem>
            </SubMenu>
            <MenuItem
              className={`side-menu-item ${!account ? "hide-menu-item" : ""}`}
              icon={<img src={assets.vip} height="20px" alt=""></img>}
            >
              <Link to="/vip" title="VIP">
                {translate("sidebar.vip")}
              </Link>
            </MenuItem>
            <MenuItem
              className={`side-menu-item ${!account ? "hide-menu-item" : ""}`}
              icon={<img src={assets.referral} height="20px" alt=""></img>}
            >
              <Link to="/referral">{translate("sidebar.referral")}</Link>
            </MenuItem>
            <MenuItem
              className={`side-menu-item ${!account ? "hide-menu-item" : ""}`}
              icon={<img src={assets.task} height="20px" alt=""></img>}
            >
              <Link to="/tasks">{translate("sidebar.task")}</Link>
            </MenuItem>
            <MenuItem
              className="side-menu-item"
              icon={<img src={assets.challenge} height="20px" alt=""></img>}
            >
              <Link to="/challenge">{translate("sidebar.challenge")}</Link>
            </MenuItem>
            <MenuItem
              className="side-menu-item"
              icon={<img src={assets.ranking} height="20px" alt=""></img>}
            >
              <Link to="/rankings">{translate("sidebar.rank")}</Link>
            </MenuItem>
            <MenuItem
              className="side-menu-item"
              icon={<img src={assets.news} height="20px" alt=""></img>}
            >
              <Link to="/news">{translate("sidebar.news")}</Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu>
            {/* <MenuItem>
              <Link to="">
                <Icon.ChatDots height="1.3em" width="2em" />
                <span className="menu-collapsed ml-3">Telegram</span>
              </Link>
            </MenuItem> */}
            <MenuItem className={!collapsed ? "menu-item-language" : ""}>
              <DropdownLanguage
                isSidebarCollapsed={collapsed}
                selectedLang={language}
                onSelectLang={handleSelectLanguage}
              />
            </MenuItem>
            {/* <MenuItem>
              <Link to="/faq">
                <Icon.QuestionCircle />
                <span className="menu-collapsed ml-3">
                  {translate("sidebar.faqs")}
                </span>
              </Link>
            </MenuItem> */}
            <MenuItem>
              <Link to="#" onClick={handleCollapsedChange}>
                <FontAwesomeIcon
                  icon={faChevronCircleLeft}
                  style={{
                    height: "1.3em",
                    width: "2em",
                    color: "#6c5ce7",
                    transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
                <span className="menu-collapsed ml-3 align-top">
                  {translate("sidebar.collapse")}
                </span>
              </Link>
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    );
  }


  return (
    proSidebar()
  );

}

export default (Sidebar);
