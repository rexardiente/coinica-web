import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageLoading } from "redux/page/page_action";
import { Grid, Typography } from "@material-ui/core";
import { GetNews } from "services/api/server/platform";
import Header from "./Header";
import NewsList from "./NewsList";
import styles from "./News.module.scss";

type NewsData = {
  id: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: string;
  link: string;
  date: string;
};

const News = () => {
  const dispatch = useDispatch();

  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [error, setError] = useState("");

  const getNews = async () => {
    dispatch(setPageLoading(true));
    try {
      const response = await GetNews(1);

      setNewsData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      dispatch(setPageLoading(false));
    }
  };

  useEffect(() => {
    // if (account) {
    getNews();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <Typography component="p" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Fragment>
      <Grid container className={styles.container}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <NewsList data={newsData} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default News;
