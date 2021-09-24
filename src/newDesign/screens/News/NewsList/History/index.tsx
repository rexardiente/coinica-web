import { Fragment } from "react";
import moment from "moment";
import NewsCard from "../NewsCard";

type Props = {
  news: { [key: string]: any[] };
};
const History = ({ news }: Props) => {
  const newsEntries = Object.entries(news);
  return (
    <Fragment>
      {newsEntries.map((data, index) => (
        <Fragment key={index}>
          <h3>{moment(data[0]).format("Do MMM, YYYY")}</h3>
          <NewsCard data={data[1]} />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default History;
