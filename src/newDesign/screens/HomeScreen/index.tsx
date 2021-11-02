import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./Dashboard.module.scss";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { games as gamesApi, genres as genresApi } from "services/api/server/index.js";
import { setGameList, setGenreList } from "redux/platform/platform_action";
import Carousel from "./HomeCarousel";
import { translate } from "helpers/translate";

const HomeScreen = ({platform, dispatch}) => {
  const { gameList, genreList } = platform;

  useEffect(() => {
    // Fetch Games
    gamesApi().then(res => {
      dispatch(setGameList(res.data));
    });

    // Fetch Genres
    genresApi().then(res => {
      dispatch(setGenreList(res.data));
    });
  }, []);

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
            <Card className={`${styles.card}`}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Avatar"
                  height="140"
                  image={game.imgURL}
                />
                <CardContent>
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
          : null
        }
        
      </Grid>
      </div>
      
    </>
  );
};

const mapStateToProps = ({ platform }) => ({ platform });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
