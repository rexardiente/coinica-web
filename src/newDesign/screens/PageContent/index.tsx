import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEntryModalState } from "redux/platform/platform_action";
import Container from "@material-ui/core/Container";
import styles from "./PageContent.module.scss";
import Typography from "@material-ui/core/Typography";
import NotFound from "../NotFound";
import routes from "../routes";
import HomeScreen from "../HomeScreen";
import Loading from "../../components/Loading";

type ReduxState = {
  platform: any;
  page: any;
};

const PageContent = ({ sideBarOpen }, props) => {
  const { isLoading } = useSelector((state: ReduxState) => state.page);
  return (
    <Container className={`${styles.page_content}`} maxWidth="lg">
      <Loading isLoading={isLoading} sideBarOpen={sideBarOpen} />
    </Container>
  );
};

export default PageContent;
