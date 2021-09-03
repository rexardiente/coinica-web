import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import styles from "./Footer.module.scss";
import { Divider, Typography } from "@material-ui/core";

const Footer = () =>{
    return (
      <BottomNavigation className={`${styles.coinica_footer}`}>
        <Typography align='center' variant='subtitle2' paragraph>
          Term of Use | Privacy Policy
          <br/>
          <i>2020-2021 EOS game store, All rights reserved</i>
        </Typography>
        <Divider />
      </BottomNavigation>
    );
};

export default Footer;