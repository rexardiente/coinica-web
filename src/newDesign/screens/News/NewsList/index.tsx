import Recent from "./Recent";
import History from "./History";

type NewsData = {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  author: string;
  url: string;
  createdAt: string;
};
type Props = {
  data: NewsData[];
};
const NewsList = ({ data }: Props) => {
  const recent = data.length ? data.slice(0, 3) : [];

  const groupHistoryByDate = (history: NewsData[]) => {
    return history.reduce(
      (result, news) => ({
        ...result,
        [news.createdAt.split("T")[0]]: [
          ...(result[news.createdAt.split("T")[0]] || []),
          news,
        ],
      }),
      {}
    );
  };

  const renderHistory = () => {
    if (data.length > 3) {
      const history = data.length ? data.slice(3) : [];
      return <History news={groupHistoryByDate(history)} />;
    }
    return null;
  };
  return (
    <div>
      <Recent news={recent} />
      {renderHistory()}
    </div>
  );
};

export default NewsList;
