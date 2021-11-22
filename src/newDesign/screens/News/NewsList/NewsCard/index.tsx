import { Fragment } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { translate } from "helpers/translate";
import styles from "./NewsCard.module.scss";

type Props = {
  data: { title: string, description: string }[];
};

const NewsCard = ({ data }: Props) => {
  return (
    <Card className={styles.container}>
      <CardContent>
        {data.length ? (
          data.map((news, index) => (
            <Fragment key={index}>
              <Typography className={styles.title} color="secondary">
                {news.title}
              </Typography>
              <Typography className={styles.description} color="textPrimary" gutterBottom>
                {news.description}
              </Typography>
            </Fragment>
          ))
        ) : (
          <Typography className={styles.title} color="primary" variant="body2">
            {translate("news.noRecent")}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsCard;
