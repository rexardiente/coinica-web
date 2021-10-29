import React, { useState } from "react";
import * as assets from "./Assets";
import styles from "./Carousel.module.scss";
import Carousel from "react-material-ui-carousel";
import { Paper, Grid, CardContent, CardMedia, Card } from "@material-ui/core";

const Banner = (props) => {

    const content = (
        <Grid item xs={12} key="content">
            <CardContent className={`${styles.Content}`}>
                <CardMedia
                    className={`${styles.Media}`}
                    image={props.item.image}
                    title={props.item.name}
                >
                </CardMedia>
            </CardContent>
        </Grid>
    );

    return(
        <Card raised className={`${styles.Banner}`}>
            <Grid container spacing={0} className={`${styles.BannerGrid}`} >
                {content}
            </Grid>
        </Card>
    );
};

const items = [
    {
        name:'VIP',
        description:'VIP',
        image: assets.eosVIP,
    },
    {
        name:'Referral',
        description:'Referral',
        image: assets.referral,
    },
    {
        name:'Mahjong',
        description:'Mahjong',
        image: assets.mahjong,
    },
]

const HomeCarousel = () => {
    return(
        <Carousel
         className={`${styles.Carousel}`}
         autoPlay={false}
         animation={'slide'}
         indicators={true}
         timeout={200}
         cycleNavigation={true}
         navButtonsAlwaysInvisible={false}
         navButtonsAlwaysVisible={false}
        >
            {
                items.map((item,index) => {
                    return <Banner item={item} key={index} />
                })
            }
        </Carousel>
    );
};

export default HomeCarousel;