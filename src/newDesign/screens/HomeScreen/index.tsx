import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import { Typography, Card, CardActionArea, CardContent, CardMedia, Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { games as gamesApi, genres as genresApi } from "services/api/server/index.js";
import { setGameList, setGenreList } from "redux/platform/platform_action";
import Carousel from "./HomeCarousel";
import { translate } from "helpers/translate";

const HomeScreen = ({platform, dispatch}) => {
  const history = useHistory()
  const { gameList, genreList } = platform;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(genreList.length === 0){
      // Fetch Genres
      genresApi().then(res => {
        dispatch(setGenreList(res.data));
      });
    }
    
    if(gameList.length === 0){
      // Fetch Games
      gamesApi().then((res) => {
        dispatch(setGameList(res.data));
      });
    }
    
  }, [gameList]);

  return (
    <>
      <Carousel />

      <div className={`${styles.homescreen}`}>
        <Typography variant="h5" className={`${styles.games_title}`}>
          {translate("home.gameList.title")}
        </Typography>

        <Grid
          justifyContent="flex-start"
          container
          className={`${styles.game_list}`}
        >
          {gameList?.length ? (
            gameList.map((game, index) => (
              <Grid key={index} item>
                <Card
                  className={`${styles.game_card}`}
                  onClick={() => {
                    history.push(game?.path);
                  }}
                >
                  <div className={styles.image_button}>
                    {/* <span className={styles.play_button}>play</span> */}
                    <CardMedia
                      component="img"
                      alt="Avatar"
                      height="140"
                      image={game.logo}
                    />
                  </div>

                  <CardContent className={`${styles.card_content}`}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {game.displayName}
                    </Typography>
                    <Typography variant="caption" component="p">
                      {game.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Skeleton variant="rect" height={300} width={300} />
          )}
        </Grid>
      </div>
    </>
  );
};

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
