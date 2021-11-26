import { Fragment } from "react";
import { Card, CardContent, Typography, Link } from "@material-ui/core";
import { translate } from "helpers/translate";
import styles from "./NewsCard.module.scss";

type Props = {
  data: {
    title: { rendered: string };
    excerpt: { rendered: string };
    link: string;
  }[];
};

const NewsCard = ({ data }: Props) => {
  const createMarkup = (elem: string) => {
    return { __html: elem };
  };

  return (
    <Card className={styles.container}>
      <CardContent>
        {data.length ? (
          data.map((news, index) => (
            <Fragment key={index}>
              <Link
                href={news.link}
                target="_blank"
                rel="noreferrer"
                variant="body1"
                color="secondary"
                underline="always"
                className={styles.title}
                dangerouslySetInnerHTML={createMarkup(news.title.rendered)}
              />
              <Typography
                className={styles.description}
                color="textPrimary"
                gutterBottom
              >
                <div
                  dangerouslySetInnerHTML={createMarkup(news.excerpt.rendered)}
                />
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
