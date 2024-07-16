import { getCurrentNews } from "@/src/services/apiNews";
import { useEffect, useState } from "react";

export const useFetchCurrentNews = (newsID) => {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getCurrentNews(newsID);
        console.log(res);
        setNewsData(res);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [newsID]);

  return { newsData };
};
