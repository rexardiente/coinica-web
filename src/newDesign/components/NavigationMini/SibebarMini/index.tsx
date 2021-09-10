import React from "react";
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from "@material-ui/icons/Menu";
import * as assets from "./Assets";



const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      top: '65px',
      backgroundColor: '#242D41',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      top: '65px',
      backgroundColor: '#242D41',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      // width: theme.spacing(7) + 1,
      width: 0,
      // [theme.breakpoints.up('sm')]: {
      //   width: theme.spacing(9) + 1,
      // },
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
    name : 'Games',
    image : assets.games,
    url : '/'
  },
  {
    name : 'VIP',
    image : assets.vip,
    url : '/vip'

  },
  {
    name : 'Referral',
    image : assets.referral,
    url : '/referral'
  },
  {
    name : 'Tasks',
    image : assets.tasks,
    url : '/tasks'
  },
  {
    name : 'Challenge',
    image : assets.challenge,
    url : '/challenge'
  },
  {
    name : 'Rank',
    image : assets.rank,
    url : '/rankings'
  },
  {
    name : 'News',
    image : assets.news,
    url : '/news'
  },
]

type props = {
  open: boolean;
  // handleDrawerClose: Function;
  handleDrawerToggle: Function
}

const SidebarMini = ({ open, handleDrawerToggle } : props) => {
  const classes = useStyles();
  const theme = useTheme();

 
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <List>
        <ListItem>
          <ListItemText primary={"Mini sidebar"} style={{ color: "#1785EB" }} />
        </ListItem>
        {sidebarItems.map((item, index) => (
          <Link to={item.url}>
            <ListItem button key={item.name}>
              <ListItemIcon style={{ color: "#1785EB" }}>
                <img src={item.image} width={"20px"} />
              </ListItemIcon>
              <ListItemText primary={item.name} style={{ color: "#1785EB" }} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarMini;