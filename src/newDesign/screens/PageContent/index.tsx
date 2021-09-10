import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEntryModalState } from "redux/platform/platform_action";
import Container from "@material-ui/core/Container";
import styles from "./PageContent.module.scss";
import Typography from "@material-ui/core/Typography";
import NotFound from "../NotFound";
import routes from "../routes";
import HomeScreen from "../Dashboard";

// const HomeScreen = React.lazy(() => import("../Dashboard"));

type ReduxState = {
  platform: any
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ isGame, renderComponentFunc, ...rest }) => {
  const platform = useSelector((state: ReduxState) => state.platform);
  const dispatch = useDispatch();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (platform?.account) {
          return (
            renderComponentFunc(props)
          )
        } else if (isGame) {
          if (typeof dispatch === "function" && !platform?.entryModalState) {
            dispatch(setEntryModalState(true))
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location }
                }}
              />
            )
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      }}
    />
  );
};

const RouteComponent = ({ props, route }) => {
  // FOR GAME SCREENS
  // if (route.game) {
  //   if (route.game === "Treasurehunt") {
  //     return (
  //       <div className="w-100">
  //         <div id={route.key}>
  //           <route.component {...props} />
  //         </div>
  //       </div>
  //     );
  //   } else if (route.game === "GhostQuest" && route.showHistory) {
  //     return (
  //       <div id={route.key}>
  //         <route.component {...props} />
  //         {/* <GameHistory game="ghostquest" /> */}
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div id={route.key}>
  //         <route.component {...props} />
  //       </div>
  //     );
  //   }
  //   // FOR PLATFORM SCREENS
  // } else {
    return (
      <div id={route.key}>
        <route.component {...props} />
      </div>
    );
  // }
};

const PageContent = (props) =>{
    return (
      <Container className={`${styles.page_content}`} maxWidth="lg">
        <Switch>
          {routes.map((route) => {
            // if (route?.isPrivate) {
            //   return (
            //     <PrivateRoute
            //       exact={route.exact}
            //       key={route.key}
            //       path={route.path}
            //       isGame={route?.game || false}
            //       renderComponentFunc={(props) => (<RouteComponent props={props} route={route} />)}
            //     />
            //   )
            // }
            return (
              <Route
                exact={route.exact}
                key={route.key}
                path={route.path}
                render={(props) => (
                  <RouteComponent props={props} route={route} />
                )}
              />
            );
          })}
          <Route
            path={["/home", "/"]}
            render={() => (
              <div id={"Home"}>
                <HomeScreen />
              </div>
            )}
          />
          <Route path="*" render={(props) => <NotFound />} />
        </Switch>
      </Container>
    );
};

export default PageContent;