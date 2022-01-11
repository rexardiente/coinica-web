import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { GetNewsById } from "services/api/server/platform";
import { setPageLoading } from "redux/page/page_action";

const Post = () => {
  const dispatch = useDispatch();
  const { postId } = useParams<{ postId: string }>();

  const [newsData, setNewsData] = useState("<div>Error, no post id</div>");
  const [error, setError] = useState("");

  const getPost = async (id: string) => {
    dispatch(setPageLoading(true));

    try {
      const response = await GetNewsById(id);

      setNewsData(response.data.content.rendered);
    } catch (error: any) {
      setError(error.message);
    } finally {
      dispatch(setPageLoading(false));
    }
  };

  useEffect(() => {
    if (postId) {
      getPost(postId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const createMarkup = (elem: string) => {
    return { __html: elem };
  };

  if (error) {
    return (
      <Typography component="p" align="center">
        {error}
      </Typography>
    );
  }

  return <div dangerouslySetInnerHTML={createMarkup(newsData)} />;
};

export default Post;
