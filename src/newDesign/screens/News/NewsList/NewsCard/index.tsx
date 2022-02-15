import { Link, useRouteMatch } from "react-router-dom";
import { Card, CardContent, Typography } from "@material-ui/core";
import { translate } from "helpers/translate";
import styles from "./NewsCard.module.scss";

type Props = {
  data: {
    title: { rendered: string };
    excerpt: { rendered: string };
    link: string;
    id: number;
  }[];
};

const NewsCard = ({ data }: Props) => {
  console.log(data);
  const match = useRouteMatch();

  const createMarkup = (elem: string) => {
    return { __html: elem };
  };

  return (
    <>
      {data.length ? (
        data.map((news, index) => (
          <Card className={styles.container} key={index}>
            <CardContent>
              <a
                // to={`${match.url}/${news.id}`}
                href={news.link}
                // target="_blank"
                // rel="noreferrer"
                // variant="body1"
                color="secondary"
                className={styles.title}
                dangerouslySetInnerHTML={createMarkup(news.title.rendered)}
                target='_blank'
              />
              <Typography
                className={styles.description}
                color="textPrimary"
                gutterBottom
              >
                <span
                  dangerouslySetInnerHTML={createMarkup(news.excerpt.rendered)}
                />
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className={styles.container}>
          <CardContent>
            <Typography
              className={styles.title}
              color="primary"
              variant="body2"
            >
              {translate("news.noRecent")}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default NewsCard;
