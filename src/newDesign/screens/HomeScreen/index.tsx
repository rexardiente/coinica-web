import React from "react";
import Container from "@material-ui/core/Container";
import styles from "./Dashboard.module.scss";
import Typography from "@material-ui/core/Typography";
import Carousel from "react-material-ui-carousel";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid , { GridSpacing } from "@material-ui/core/Grid";
import * as assets from "./Assets";

const HomeScreen = () => {
    return (
      <>
        <div className={`${styles.carousel}`}>
          <img src={assets.referral} width="100%" />
        </div>

        <Typography variant="h4" className={`${styles.games_title}`}>Games</Typography>

        <Grid justifyContent="flex-start" container className={`${styles.game_list}`} spacing={4}>
          <Grid item>
            <Card className={`${styles.card}`}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={assets.ghostQuest}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    Ghost Quest
                  </Typography>
                  <Typography variant="caption" component="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vitae dolor convallis, euismod velit quis, commodo
                    massa....
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card className={`${styles.card}`}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={assets.treasureHunt}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    Treasure Hunt
                  </Typography>
                  <Typography variant="caption" component="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vitae dolor convallis, euismod velit quis, commodo
                    massa....
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card className={`${styles.card}`}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={assets.mahjongHilo}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    Mahjong Hi-Lo
                  </Typography>
                  <Typography variant="caption" component="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vitae dolor convallis, euismod velit quis, commodo
                    massa....
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </>
    );
};

export default HomeScreen;