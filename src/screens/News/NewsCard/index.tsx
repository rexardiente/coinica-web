import React from "react";
import moment from "moment";
import "./NewsCard.scss";
import { translate } from "helpers/translate";

const NewsCard: React.FC<{ news: Array<any> }> = ({ news }) => {
  const recent = news.length ? news.slice(0, 3) : null;
  const history = news.length ? news.slice(3) : null;

  return (
    <>
      <div className="mb-4">
        <div className="col-xl-7 col-sm-12 bg-light rounded p-3 mt-2 shadow-sm">
          <div className="row no-gutters">
            <div className="col-2 d-flex justify-content-center border-right">
              <strong className="my-auto">{translate("news.news_card.recent_news.title")}</strong>
            </div>
            <div className="col-8 ml-5">
              {recent &&
                recent.map((news) => (
                  <p>
                    {news.description}{" "}
                    <small>
                      <a
                        href={news.url || "#"}
                        className="alert-link text-black-50"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {translate("news.news_card.click_to_view")}
                      </a>
                    </small>
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
      {history &&
        history.map((news) => {
          return (
            <div className="mb-4">
              <strong>{moment(news.createdAt).format("Do MMM, YYYY")}</strong>
              <div className="col-xl-7 col-sm-12 bg-light rounded p-3 mt-2 shadow-sm">
                {history?.map((news) => (
                  <p>
                    {news.description}{" "}
                    <small>
                      <a
                        href={news.url || "#"}
                        className="alert-link text-black-50"
                      >
                        {translate("news.news_card.click_to_view")}
                      </a>
                    </small>
                  </p>
                ))}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default NewsCard;
