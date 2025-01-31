import React from 'react';
import styles from './NewsComponent.module.css';

const NewsComponent = () => {
  const newsItems = [
    {
      title: "We're at ISNT",
      content: 'The Annual Conference of Indian Society for Non-Destructive Testing (ISNT), the Official Technical Society for NDT/NDE in India, NDE 2023, is organized every year. This year the annual flagship event will be held at Hotel Orchid in PUNE during 7th – 9th Dec 2023. This Conference is an event that promises to be a highlight of the year for anyone interested in the field of Non-Destructive Evaluation and associated domains.'
    },
    {
      title: 'Shaping up with Semiconductors',
      content: 'Content for the second news item. This is a brief description or summary of the news article.'
    },
    {
      title: 'Food to poison',
      content: 'Content for the third news item. This is a brief description or summary of the news article.'
    }
  ];

  return (
    <div className={styles.newsContainer}>
      {newsItems.map((news, index) => (
        <div className={`${styles.card} ${styles.card1}`} key={index}>
          <h2>{news.title}</h2>
          <p>{news.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsComponent;
