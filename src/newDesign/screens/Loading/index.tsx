import React from "react";
import Container from "@material-ui/core/Container";
import styles from "./PageContent.module.scss";
import Typography from "@material-ui/core/Typography";
import Carousel from "react-material-ui-carousel";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const Loading = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
    return (
      <div>
        <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      </div>
    );
};

export default Loading;
;