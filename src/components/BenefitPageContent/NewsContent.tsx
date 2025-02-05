'use client'

// import React from 'react';


// const NewsContent = ({ title, sectionHeader, mainImage, mainHeading, mainDate, mainDescription, articles }) => {
//   return (
//     <div className="container w-full pr-10">
//       <div className="flex items-center mb-4">
//         <h2 className="text-lg text-black font-semibold whitespace-nowrap">
//           {title}
//         </h2>
//         <div className="flex-1 h-[4px] bg-gray-300 ml-4"></div>
//       </div>
      
//       <div className="w-full flex flex-wrap">
//         {/* Left Section */}
//         <div className="w-[50%] lg:w-1/2 pr-5">
//           <img src={mainImage} alt="Main" className="w-96 h-64 object-cover rounded-lg mb-4" />
//           <div>
//             <div className="text-sm text-gray-600 mb-2">{sectionHeader}</div>
//             <h3 className="text-2xl font-semibold text-gray-800 leading-snug">
//               {mainHeading}
//             </h3>
//             <div className="text-sm text-gray-500 mt-2">{mainDate}</div>
//             <p className="text-gray-700 mt-4">
//               {mainDescription}
//             </p>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="w-full lg:w-1/2">
//         <div className="space-y-11">
//   {articles.map((article, index) => (
//     <div key={index} className="flex space-x-4 w-full">
//       <img 
//         src={article.image} 
//         alt={article.altText} 
//         className="w-24 h-20 object-cover rounded-md flex-shrink-0" 
//       />
//       <div>
//         <h4 className="text-sm font-semibold text-gray-800">{article.heading}</h4>
//         <p className="text-xs text-gray-500">{article.date}</p>
//       </div>
//     </div>
//   ))}
// </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsContent;









import React from 'react';
import Image from 'next/image';



  
interface Article {
  id?: string; 
  heading: string;
  image: string;
  startAt?: string;
  endAt?: string;
  description: string;
  location: string;
  createdAt?: string;
}

interface NewsContentProps {
  id?:string;
  title: string;
  sectionHeader: string;
  mainImage: string;
  mainHeading: string;
  mainDate: string;
  mainDescription: string;
  articles: Article[];
  onImageClick: (id: string, type: string) => void;
}

const NewsContent: React.FC<NewsContentProps> = ({
  id,
  title,
  sectionHeader,
  mainImage,
  mainHeading,
  mainDate,
  mainDescription,
  articles,
  onImageClick,
}) => {




  return (
    <div className="w-full h-full mb-8 md:pr-10 xs:h-screen md:h-full p-6">
      <div className="flex items-center mb-4">
        <h2 className="text-lg text-black font-semibold whitespace-nowrap">
          {title}
        </h2>
        <div className="flex-1 h-[4px] bg-gray-300 ml-4"></div>
      </div>

      <div className="w-full h-full flex flex-col justify-between items-center md:items-start  md:flex-row ">
        {/* Left Section */}
        
        <div className="w-full md:w-1/2 md:pr-5 md:h-[240px] h-[150px]"> {/* Adjust the height as needed */}
    <Image 
      src={mainImage} 
      alt="Main" 
      width={384}  // Adjust width as needed
      height={256} // Adjust height as needed
      className="object-fill rounded-lg mb-4 h-full cursor-pointer"
      onClick={() => id && onImageClick(id,'newscontent')} // Ensure image covers the full height
    />
    <div className="h-[calc(100%-256px)]"> {/* Adjust based on the image height */}
      <div className="text-sm text-gray-600 mb-2">{sectionHeader}</div>
      <h3 className="text-lg md:text-2xl font-semibold text-gray-800 leading-snug">
        {mainHeading}
      </h3>
      <div className="text-sm text-gray-500 mt-2">{mainDate}</div>
      <p className="text-gray-700 mt-4 line-clamp-3">
        {mainDescription}
      </p>
    </div>
  </div>

    {/* Right Section */}
    <div className="w-full md:w-1/2 md:pl-4 h-1/2"> {/* Added pl-5 for left padding */}
  <div className="space-y-7 md:space-y-11">
    {articles.map((article, index) => (
      <div key={index} className="flex space-x-4 w-full md:h-[90px] h-[80px] items-start"> {/* Set a fixed height here */}
        <Image 
          src={article.image} 
          alt='ArticleImage' 
          width={96}  // Adjust width as needed
          height={80} // Adjust height as needed
          className="object-fill rounded-md flex-shrink-0 h-full cursor-pointer" 
          onClick={() => article.id && onImageClick(article.id,'article')}// Ensure the image takes full height
        />
        <div > {/* Added flex to align content */}
          <h4 className="text-sm font-semibold text-gray-800 line-clamp-3">{article.heading}</h4>
          <p className="text-xs text-gray-500">{article.createdAt}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  </div>
</div>
  );
};

export default NewsContent;