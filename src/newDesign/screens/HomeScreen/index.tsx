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
      <Typography variant="h4" className={`${styles.games_title}`}>
        {translate('home.gameList.title')}
      </Typography>

      <Grid
        justifyContent="flex-start"
        container
        className={`${styles.game_list}`}
        spacing={4}
      >
        {
          gameList?.length ? 
          gameList.map((game, index) => (
          <Grid key={index} item>
            <Card
              className={`${styles.card}`}
              onClick={() => {
                history.push(game?.path)
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Avatar"
                  height="140"
                  image={game.imgURL}
                />
                <CardContent className={`${styles.card_content}`}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {game.name}
                  </Typography>
                  <Typography variant="caption" component="p">
                    {game.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          ))
          : <Skeleton variant='rect' height={300} width={300} />

        }
        
      </Grid>
      </div>
      
    </>
  );
};

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
