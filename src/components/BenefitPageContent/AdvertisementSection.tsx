'use client'


import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


// const ads = [
//   { id: 1, banner: true, image: require('../../../public/assets/Img3.jpg') },
//   { id: 2, banner: false, image: require('../../../public/assets/tpost/1.jpg') },
//   { id: 3, banner: false, image: require('../../../public/assets/tpost/2.png') },
//   { id: 4, banner: false, image: require('../../../public/assets/tpost/3.png') },
//   { id: 5, banner: false, image: require('../../../public/assets/tpost/4.png') },
//   { id: 6, banner: false, image: require('../../../public/assets/tpost/5.jpg') },
//   { id: 7, banner: false, image: require('../../../public/assets/tpost/6.png') },
//   { id: 8, banner: false, image: require('../../../public/assets/tpost/7.png') },
//   { id: 9, banner: false, image: require('../../../public/assets/popular/395-x-250.png') },
//   { id: 10, banner: false, image: require('../../../public/assets/popular/Advert-2-CTR-Ella-Henderson-395x250px.jpg') }, // small banner
//   { id: 11, banner: false, image: require('../../../public/assets/popular/Aggreko-Event-industry-news-banner-395-x-250-px.png') },
//   { id: 12, banner: false, image: require('../../../public/assets/popular/Award-Wiining-Event-Agency.png') },
//   { id: 13, banner: false, image: require('../../../public/assets/popular/Captello-PLC-Web-Banner-ETL.png') },
//   { id: 14, banner: false, image: require('../../../public/assets/popular/Event-Staffing-Software-Made-Simple-2.png') },
// ];




interface Ad {
  id: string;
  title: string;
  images: string;
  isBanner: boolean;
  link: string;
  blurDataURL?: string;
}


interface AdvertisementSectionProps {
  ads: Ad[];
}




const getBase64FromUrl = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise<string>((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}




function AdvertisementSection({ ads }: AdvertisementSectionProps) {
  const [adsWithBase64, setAdsWithBase64] = useState<any[]>([]);


  useEffect(() => {
    // Function to load the Base64 images dynamically
    const loadImages = async () => {
      const adsWithBlurDataURL = await Promise.all(
        ads.map(async (ad) => {
          const blurDataURL = await getBase64FromUrl(ad.images); // Fetch Base64 data for each ad image
          return { ...ad, blurDataURL };
        })
      );
      setAdsWithBase64(adsWithBlurDataURL); // Set the state with Base64 data for blur
    };

    loadImages(); // Load the images when the component is mounted
  }, [ads]);


  return (
    <div className="flex flex-col space-y-4">
     {adsWithBase64.map((ad) => (
        <div key={ad.id} className="w-full">
          <div
            className={`${
              ad.isBanner ? 'h-20' : 'h-60'
            } bg-white shadow-md overflow-hidden relative`}
          >
             <Link href={ad.link} target="_blank">
            <Image
              src={ad.images}  
              alt={ad.title}
              sizes="100vw"
              layout="fill" // Fill parent div
              objectFit="fill" // Ensure the entire image fits in the container
              placeholder="blur" // Enable blur effect while image is loading
              blurDataURL={ad.blurDataURL} // Use the dynamically created Base64 string for blur
              loading="lazy"
              className="transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
            />
            </Link>
          </div>
        </div>
      ))}
  </div>
  );
}

export default AdvertisementSection;
