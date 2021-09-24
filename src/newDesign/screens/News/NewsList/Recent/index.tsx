import NewsCard from "../NewsCard";

type Props = {
  news: { title: string }[];
};
const Recent = ({ news }: Props) => {
  return <NewsCard data={news} />;
};

export default Recent;
