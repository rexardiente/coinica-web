import NewsCard from "../NewsCard";

type Props = {
  news: {
    title: { rendered: string };
    excerpt: { rendered: string };
    link: string;
    id: number;
  }[];
};
const Recent = ({ news }: Props) => {
  return <NewsCard data={news} />;
};

export default Recent;
