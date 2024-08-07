"use client";
import React, { useEffect, useState } from "react";
import "./news.css";

const Newspage = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetchGET();
  }, []);

  const fetchGET = async () => {
    try {
      const response = await fetch("/api/rss", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="news__container">
      <></>
    </div>
  );
};

export default Newspage;
