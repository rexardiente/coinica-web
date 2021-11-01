import React, { useState } from "react";
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText ,Collapse } from '@material-ui/core';
import { Language, ExpandLess, PlayCircleFilled } from "@material-ui/icons";
import * as assets from "./Assets";
import { translate } from "helpers";
import styles from "./Sidebar.module.scss";
import DropdownLanguage from "newDesign/components/DropdownLanguage";
import locale from "translation/locales";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      zIndex: 1210,
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      zIndex: 1210,
      backgroundColor: '#242D41',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerMini: {
      zIndex: 1210,
      backgroundColor: '#242D41',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(5),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7),
      },
    },
    drawerHide:{
      top: "65px",
      backgroundColor: "#242D41",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: 0,
      [theme.breakpoints.down("sm")]: {
        top: "57px",
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      color: '#1785EB'
    },
    list: {
        color: "#1785EB"
    }
  }),
);

const sidebarItems = [
  {
    name: translate("sidebar.vip"),
    image: assets.vip,
    url: '/vip'

  },
  {
    name: translate("sidebar.referral"),
    image: assets.referral,
    url: '/referral'
  },
  {
    name: translate("sidebar.task"),
    image: assets.tasks,
    url: '/tasks'
  },
  {
    name: translate("sidebar.challenge"),
    image: assets.challenge,
    url: '/challenge'
  },
  {
    name: translate("sidebar.rank"),
    image: assets.rank,
    url: '/ranking'
  },
  {
    name: translate("sidebar.news"),
    image: assets.news,
    url: '/news'
  },
];

const sidebarGames = [
  {
    name: translate("sidebar.games.gq"),
    image: assets.ghostquest,
    url: "/game/ghostquest",
  },
  {
    name: translate("sidebar.games.th"),
    image: assets.treasurehunt,
    url: "/game/treasurehunt",
  },
  {
    name: translate("sidebar.games.mj"),
    image: assets.mahjong,
    url: "/game/mahjong",
  },
];

type props = {
  open: boolean;
  mini?:boolean;
  // handleDrawerClose: Function;
  handleDrawerToggle: Function;
  handleDrawerClose: Function;
  language: string;
  handleSelectLanguage: Function;
}

const SidebarFooter = ({language, handleSelectLanguage, handleDrawerToggle, handleDrawerClose, open, mini} : props) => {  
  return(
    <div className={`${styles.sidebar_footer} ${mini ? styles.sidebar_footer_close : ''} ${!open ? styles.sidebar_footer_hide : ''}`}>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <Language style={{ color: "#1785EB" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <DropdownLanguage
                  selectedLang={language}
                  onSelectLang={handleSelectLanguage}
                />
              }
            />
          </ListItem>
          <ListItem button onClick={() => handleDrawerToggle()}>
            <ListItemIcon>
              <PlayCircleFilled className={`${styles.toggle_mini_icon} ${open ? styles.toggle_mini_icon_open : ''}`} />
            </ListItemIcon>
            <ListItemText primary={translate('sidebar.collapse')} style={{ color: "#1785EB" }}/>
          </ListItem>
        </List>
      </div>
  );
};

const Sidebar = ({ open, handleDrawerToggle, language, handleSelectLanguage, handleDrawerClose } : props) => {
  const classes = useStyles();
  const theme = useTheme();
  const langToArray = Object.entries(locale);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [collapse, setCollapse] = useState(false);
  const [mini, setMini] = useState(false);

  const handleCollapse = () =>{
    setCollapse(!collapse);
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMini = () => {
    setMini(!mini);
  };

  const toggleDrawer = () => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    handleDrawerClose();
  };
 
  return (
    <React.Fragment>
      <Drawer
        open={open}
        onClose={toggleDrawer()}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerHide]: !open,
          [classes.drawerMini]: mini,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerHide]: !open,
            [classes.drawerMini]: mini,
          }),
        }}
      >
        <Link to="/">
          <img
            className={`${styles.sidebar_logo} ${
              mini ? styles.sidebar_logo_closed : ""
            }`}
            src={!mini ? assets.logo : assets.coinLogo}
          />
        </Link>
        <List className={`${styles.sidebar_items}`}>
          <ListItem
            className={`${styles.links}`}
            button
            onClick={handleCollapse}
          >
            <ListItemIcon style={{ color: "#1785EB" }}>
              <img src={assets.games} width={"20px"} />
            </ListItemIcon>
            <ListItemText
              primary={translate("sidebar.games")}
              style={{ color: "#1785EB" }}
            />
            <ExpandLess
              className={`${styles.collapse_icon} ${
                collapse ? styles.collapse_icon_collapsed : ""
              }`}
            />
          </ListItem>
          <Collapse in={collapse} unmountOnExit>
            <List component="div" disablePadding>
              {sidebarGames.map((item, index) => (
                <ListItem
                  className={`${styles.links}`}
                  component={Link}
                  to={item.url}
                  key={"sidebar-item" + index}
                >
                  <ListItemIcon style={{ color: "#1785EB" }}>
                    <img src={item.image} width={open ? "40px" : "30px"} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    style={{ color: "#1785EB" }}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>

          {sidebarItems.map((item, index) => (
            <ListItem
              className={`${styles.links}`}
              component={Link}
              to={item.url}
              key={"sidebar-item" + index}
            >
              <ListItemIcon style={{ color: "#1785EB" }}>
                <img src={item.image} width={"20px"} />
              </ListItemIcon>
              <ListItemText primary={item.name} style={{ color: "#1785EB" }} />
            </ListItem>
          ))}
        </List>
        <SidebarFooter
          language={language}
          handleSelectLanguage={handleSelectLanguage}
          handleDrawerClose={handleDrawerClose}
          handleDrawerToggle={handleMini}
          open={open}
          mini={mini}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default Sidebar;
