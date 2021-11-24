import React, { Component } from "react";
import NewsCard from "../News/NewsCard";
import { GetNews } from "services/api/server/platform";
import { icon_news, background } from "./Assets";
import "./News.scss";
import { translate } from "helpers/translate";

type DataState = {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  author: string;
  url: string;
  createdAt: Date;
};
type State = {
  newsData: DataState[];
  isLoading: Boolean;
  error: any;
};

class News extends Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      newsData: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      this.getNews();
    });
  }

  async getNews() {
    try {
      const res = await GetNews(1);
      this.setState({
        newsData: [...res.data],
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error,
      });
    }
  }

  render() {
    const { newsData } = this.state;
    return (
      <div>
        <div className="p-5">
          <h4 className="mb-5 text-secondary">
            <img src={icon_news} alt="icon-news" /> {translate("news.header.title")}
          </h4>
          <NewsCard news={newsData} />
          <img id="news-background-image" src={background} alt="background" />
        </div>
      </div>
    );
  }
}

export default News;
