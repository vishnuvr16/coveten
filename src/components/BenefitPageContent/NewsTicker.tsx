'use client'
import React from 'react';
import styles from './NewsTicker.module.css';


interface NewsTickerProps {
  newsItems: string[]; // Define the type for newsItems as an array of strings
}

const NewsTicker: React.FC<NewsTickerProps> = ({ newsItems }) => {
  return (
    // <section className="flex items-center news-ticker pb-5">
    //   <div>
    //     <h3 className="px-2 bg-red-600 w-48 text-white text-center text-lg">TRENDING NOW</h3>
    //   </div>
    //   <div className="news overflow-hidden h-12">
    //   <div className={`${styles.newsContent} ${styles.animateSlide}`}>
    //       {newsItems.map((item, index) => (
    //         <span key={index} className="block h-12 py-3 px-4 text-black">
    //           {item}
    //         </span>
    //       ))}
    //     </div>
    //   </div>
    // </section>

    <section className="flex items-center news-ticker pb-5">
    <div>
      <h3 className="bg-red-600 text-white text-center px-2 lg:w-48 lg:text-lg sm:w-32 sm:text-sm xs:w-19 xs:text-xs">
        TRENDING NOW
      </h3>
    </div>
    <div className="news overflow-hidden h-12">
      <div className={`${styles.newsContent} ${styles.animateSlide}`}>
        {newsItems.map((item, index) => (
          <span
            key={index}
            className="overflow-hidden block text-black lg:h-12 lg:py-3 lg:px-4 lg:text-lg  sm:h-8 sm:py-2 sm:px-3 sm:text-sm  xs:py-1 xs:px-2 xs:text-xs"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </section>
  );
};

export default NewsTicker;