import { useEffect, useState } from "react";

export const useFetchLatestPost = ({ newsList, accsesstoken }) => {
  const [latestPosts, setLatestPosts] = useState([]);

  console.log(newsList);

  useEffect(() => {
    const getNews = async () => {
      try {
        const sortedNews = newsList.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestPosts(sortedNews.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };
    getNews();
  }, [accsesstoken]);

  return { latestPosts };
};
