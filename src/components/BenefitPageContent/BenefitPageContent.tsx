'use client'



import React, { useEffect, useState } from 'react';
import HealthImg from '../../../public/assets/popular/pop17.jpg'
import FoodImg from '../../../public/assets/hero/hero1.jpg'
import SafetyGadgetsImg from '../../../public/assets/hero/hero2.jpg'
import SmartGadgetsImg from '../../../public/assets/hero/hero3.jpg'
import TravelImg1 from '../../../public/assets/popular/pop2.jpg'
import FitnessImg1 from '../../../public/assets/popular/pop18.jpg'
import FitnessImg2 from '../../../public/assets/popular/pop23.jpg'
import FitnessImg3 from '../../../public/assets/popular/pop24.jpg'
import FitnessImg4 from '../../../public/assets/popular/pop25.jpg'
import SportsImg1 from '../../../public/assets/popular/pop19.jpg'
import SportsImg2 from '../../../public/assets/popular/pop30.jpg'
import SportsImg3 from '../../../public/assets/popular/pop27.jpg'
import SportsImg4 from '../../../public/assets/popular/pop28.jpg'
import SportsImg5 from '../../../public/assets/popular/pop29.jpg'
import network1 from '../../../public/assets/- Our upcoming networking events & meetings/-Industry-InsightsGain-access-to-c.jpeg'
import network2 from '../../../public/assets/- Our upcoming networking events & meetings/Collaborate for Innovation.jpg'
import network3 from '../../../public/assets/- Our upcoming networking events & meetings/Expand influ.png'
import network4 from '../../../public/assets/- Our upcoming networking events & meetings/Powerfull connection.png'
import network5 from '../../../public/assets/- Our upcoming networking events & meetings/Stay Ahead of the Curve.jpg'
import sp1 from '../../../public/assets/- Service providers/Buy Best Instruments at Good Prices in Our B2B.jpg'
import sp2 from '../../../public/assets/- Service providers/International standards.png'
import sp3 from '../../../public/assets/- Service providers/More Opportunities.jpg'
import sp4 from '../../../public/assets/- Service providers/We-got-better-Access-to-Manufacturers.jpeg'
import sp5 from '../../../public/assets/- Service providers/marketing magic.jpg'
import d1 from '../../../public/assets/Dealer & Distrubutors/Better grooming sessions.jpg'
import d2 from '../../../public/assets/Dealer & Distrubutors/Sell and buy.jpg'
import d3 from '../../../public/assets/Dealer & Distrubutors/Unlocking Top Strategies for Dealerships.jpg'
import d4 from '../../../public/assets/Dealer & Distrubutors/Work at Your Own Comfort.jpg'
import d5 from '../../../public/assets/Dealer & Distrubutors/2aa.jpg'
import g1 from '../../../public/assets/General/Boost Awareness.jpg'
import g2 from '../../../public/assets/General/Fair b2b.png'
import g3 from '../../../public/assets/General/No more lobbying.png'
import g4 from '../../../public/assets/General/hospital .png'
import g5 from '../../../public/assets/General/trace .png'
import m1 from '../../../public/assets/Manufact/1.jpg'
import m2 from '../../../public/assets/Manufact/2.jpg'
import m3 from '../../../public/assets/Manufact/3.jpg'
import m4 from '../../../public/assets/Manufact/4.jpg'
import m5 from '../../../public/assets/Manufact/5.jpg'
import Tech1 from '../../../public/assets/General/2024-08-30.png'
import TechnologyImg1 from '../../../public/assets/popular/pop41.jpg'
import TechnologyImg2 from '../../../public/assets/popular/pop42.jpg'
import TechnologyImg3 from '../../../public/assets/popular/pop43.jpg'
import TechnologyImg4 from '../../../public/assets/popular/pop44.jpg'
import Tech5 from '../../../public/assets/popular/technology.png'
import BusinessImg1 from '../../../public/assets/popular/pop36.jpg'
import BusinessImg2 from '../../../public/assets/popular/pop37.jpg'
import BusinessImg3 from '../../../public/assets/popular/pop38.jpg'
import BusinessImg4 from '../../../public/assets/popular/pop39.jpg'
import BusinessImg5 from '../../../public/assets/popular/pop40.jpg'
import NewsContent from './NewsContent';
import AdvertisementSection from './AdvertisementSection';
import NewsTicker from './NewsTicker';
import styles from './BenefitPageContent.module.css'; 
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SmallHeroSwiper from './SmallHeroSwiper';






interface BenefitPageContentProps {
  benefitData: any; // Adjust type based on the structure of your benefitData
}


interface NewsContentItem {
  id:string;
  category: string;
  mainImage: string;
  mainHeading: string;
  createdAt: string | null;
  mainDescription: string;
  hasArticles: Array<{
    id: string;
    heading: string;
    image: string;
    description: string;
    location: string;
    startAt: string;
    endAt: string;
    createdAt: string;
  }> | null;
}

  
  interface HeroItem {
    id: string;
    title: string;
    image: string;
    description: string;
    location: string;
    createdAt?: string; // Optional since it's not in small heroes
    createdBy?: string; // Optional since it's not in small heroes
  }


  function BenefitPageContent({ benefitData }: BenefitPageContentProps) {

     const router = useRouter();
     const [windowWidth, setWindowWidth] = useState(0);
     const [isMobile, setIsMobile] = useState(windowWidth < 768);


     useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
  //   useEffect(() => {
  //     if (benefitData) {
  //         console.log("Benefit data in content:", benefitData?.benefitPages[0]);  // Log benefit data after it's set
  //     }
  // }, [benefitData]);


  const benefitPage = benefitData?.benefitPages[0];

  // console.log('benefitpagedata',benefitPage)


  const taglineItems: string[] = benefitPage?.tagline || []; 

  const largehero: HeroItem[] = benefitPage?.hasHeroitems?.hasLargeHeros?.map((item: any) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    description: item.description,
    location: item.location,
    createdAt: item.createdAt,
    createdBy: item.createdBy,
  }));
  
  // Map small hero items from `hasSmallHeros`
  const smallhero: HeroItem[] = benefitPage?.hasHeroitems?.hasSmallHeros?.map((item: any) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    description: item.description,
    location: item.location,
  }));


      // const newsItems: string[] = [
      //   'Being our partners will give you more',
      //   'Enjoy greater discounts on your travel, food and health packages',
      //   'Buying electronics for your home or office is now more exciting with our integrated partner offers',
      // ];

    


  //     const Travelarticles: Article[] = [
  //       {
  //         image: m2,
  //         altText: 'emc3',
  //         heading: '100% Trusted Deals for Manufacturers!',
  //         date: '15th August 2024',
  //       },
  //       {
  //         image: m3,
  //         altText: 'Event 100 Club',
  //         heading: 'Introducing Extended Warranty Options!',
  //         date: '14th August 2024',
  //       },
  //       {
  //         image: m4,
  //         altText: 'RHC',
  //         heading: 'Unlock a World of End-to-End Testing Support',
  //         date: '12th August 2024',
  //       },
  //       {
  //         image: m5,
  //         altText: 'Bray Leino',
  //         heading: 'Support width design',
  //         date: '7th August 2024',
  //       },
  //     ];



  // const Healtharticles: Article[] = [
  //   {
  //     image: d2,
  //     altText: "emc3",
  //     heading: "We empower dealers and local networks with the tools and insights.",
  //     date: "15th August 2024"
  //   },
  //   {
  //     image: d3,
  //     altText: "Event 100 Club",
  //     heading: "We offer dealers and local networks a variety of options to sell and buy products seamlessly.",
  //     date: "14th August 2024"
  //   },
  //   {
  //     image: d4,
  //     altText: "RHC",
  //     heading: "Work at Your Own Comfort with Coveten Technologies!",
  //     date: "12th August 2024"
  //   },
  //   {
  //     image: d5,
  //     altText: "Bray Leino",
  //     heading: "Better grooming sessions",
  //     date: "7th August 2024"
  //   }
  // ];





  // const Fitnessarticles: Article[] = [
  //   {
  //     image: sp2,
  //     altText: "emc3",
  //     heading: "Empowering Testing Laboratories with More Opportunities!",
  //     date: "15th August 2024"
  //   },
  //   {
  //     image: sp3,
  //     altText: "Event 100 Club",
  //     heading: "Unlock Your Lab's Potential - Buy Best Instruments at Good Prices in Our B2B",
  //     date: "14th August 2024"
  //   },
  //   {
  //     image: sp4,
  //     altText: "RHC",
  //     heading: "Transform Your Labs Qualify for International Standards",
  //     date: "12th August 2024"
  //   },
  //   {
  //     image: sp5,
  //     altText: "Bray Leino",
  //     heading: "We got better Access to Manufacturers with Coveten Technologies",
  //     date: "7th August 2024"
  //   }
  // ];



  // const Sportsarticles : Article[] =[
  //   {
  //     image: network2,
  //     altText: "emc3",
  //     heading: "Forge Powerful Connections- Build valuable relationships with professionals and experts who can help accelerate your business growth.",
  //     date: "15th August 2024"
  //   },
  //   {
  //     image: network3,
  //     altText: "Event 100 Club",
  //     heading: "Expand Your Influence-Showcase your expertise and position yourself as a thought leader within your industry by joining our dynamic community.",
  //     date: "14th August 2024"
  //   },
  //   {
  //     image: network4,
  //     altText: "RHC",
  //     heading: "Collaborate for innovation",
  //     date: "12th August 2024"
  //   },
  //   {
  //     image: network5,
  //     altText: "Bray Leino",
  //     heading: "Stay Ahead of the Curve- Keep your business competitive by staying informed and inspired through our tailored events and meetings. ",
  //     date: "7th August 2024"
  //   }
  // ];


  // const Entertainmentarticles: Article[] =[
  //   {
  //     image: g2,
  //     altText: "emc3",
  //     heading: "Fair B2B Deals for all the partners",
  //     date: "15th August 2024"
  //   },
  //   {
  //     image:g3,
  //     altText: "Event 100 Club",
  //     heading: "No more lobbying",
  //     date: "14th August 2024"
  //   },
  //   {
  //     image: g4,
  //     altText: "RHC",
  //     heading: "Trace and track every activity with us",
  //     date: "12th August 2024"
  //   },
  //   {
  //     image: g5,
  //     altText: "Bray Leino",
  //     heading: " Hospitals can buy capital good on B2B prices",
  //     date: "7th August 2024"
  //   }
  // ];



  // const Technologyarticles : Article[] =[
  //   {
  //     image: TechnologyImg1,
  //     altText: "emc3",
  //     heading: "Unqiue Technology",
  //     date: "15th August 2024"
  //   },
  //   {
  //     image: TechnologyImg2,
  //     altText: "Event 100 Club",
  //     heading: "Top 2024 Technologies",
  //     date: "14th August 2024"
  //   },
  //   {
  //     image: TechnologyImg3,
  //     altText: "RHC",
  //     heading: "Idea into Reality ",
  //     date: "12th August 2024"
  //   },
  //   {
  //     image: Tech5,
  //     altText: "Bray Leino",
  //     heading: "Stimulate creativity",
  //     date: "7th August 2024"
  //   }
  // ];


  // const Businessarticles: Article[] = [
  //   {
  //     image: BusinessImg1,
  //     altText: "emc3",
  //     heading: "Elevate Your Business with Expert Consulting Services ",
  //     date: "15th August 2024"
  //   },
  //   {
  //     image: BusinessImg2,
  //     altText: "Event 100 Club",
  //     heading: "Specialised Marketing (B2B)",
  //     date: "14th August 2024"
  //   },
  //   {
  //     image: BusinessImg3,
  //     altText: "RHC",
  //     heading: "Strategic planning ",
  //     date: "12th August 2024"
  //   },
  //   {
  //     image: BusinessImg4,
  //     altText: "Bray Leino",
  //     heading: "Enable to setup your Startup",
  //     date: "7th August 2024"
  //   }
  // ];


  const getBase64FromUrl = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };


  function formatDateWithOrdinal(date: string) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' }); // Gets the full month name
    const year = dateObj.getFullYear();
    
    // Helper function to add the ordinal suffix to the day
    const ordinalSuffix = (day: number) => {
      if (day > 3 && day < 21) return 'th'; // Handle 4th to 20th
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    return `${day}${ordinalSuffix(day)} ${month} ${year}`;
  }



  const handleImageClick = (id: string, type: string) => {
    router.push(`/benefits/details/${id}?type=${type}`);
  };
  
  const primaryLargeHero = largehero?.[0]; // First largehero for mobile
  const secondaryLargeHeros = largehero?.slice(1, 3); // Remaining largeheros for smallhero section
  
  // Make sure smallhero is always an array, defaulting to an empty array if it's undefined
  const safeSmallHeros = smallhero || [];  // Safe fallback to an empty array
  
  const combinedSmallHeros = [...safeSmallHeros, ...(secondaryLargeHeros || [])];

  return (
    <div className="w-full h-auto lg:p-10 sm:p-6 xs:p-2">
      <NewsTicker newsItems={taglineItems} />
      {/* Mobile View: Display only 1 LargeHero */}
    

      {/* {largehero?.map((item) => (
        <div className={styles.imageWrap}
        key={item.id}
        onClick={() => handleImageClick(item.id , 'largehero')}
         > */}

         <div className="block md:hidden mb-2 md:mb-4">
        {primaryLargeHero && (
          <div
            className={styles.imageWrap}
            key={primaryLargeHero.id}
            onClick={() => handleImageClick(primaryLargeHero.id, "largehero")}
          >

        <div className="relative w-full h-60 cursor-pointer"> 
        <Image
  src={primaryLargeHero.image}
  alt="Image"
  fill // This replaces layout="fill" in Next.js 13
  sizes="100vw"
  style={{
    objectFit: 'cover', // Replaces objectFit="cover"
    transition: 'transform 0.6s ease-in-out',
  }}
  className="hover:scale-125" // Tailwind CSS hover effect
/>

       </div>
          <div className={`${styles.textContent} flex flex-col`}>
            <span className="text-white text-[20px] leading-[26px] font-bold">
              {primaryLargeHero.title}
            </span>
            <time className="text-white text-xs mt-2" dateTime={primaryLargeHero.createdAt}>
             {primaryLargeHero.createdBy} - {primaryLargeHero.createdAt ? formatDateWithOrdinal(primaryLargeHero.createdAt) : 'No Date'}
           </time>
           </div>
          </div>
      )}
      </div>


{/* Larger Screens: Display all 3 LargeHeros */}
<div className="hidden md:grid md:grid-cols-3 gap-4 w-full mb-2 md:mb-4">
        {largehero?.map((item) => (
          <div
            className={styles.imageWrap}
            key={item.id}
            onClick={() => handleImageClick(item.id, "largehero")}
          >
            <div className="relative w-full h-60 cursor-pointer">
              <Image
                src={item.image}
                alt="Image"
                fill
                style={{
                  objectFit: "cover",
                  transition: "transform 0.6s ease-in-out",
                }}
                className="hover:scale-125"
              />
            </div>
            <div className={`${styles.textContent} flex flex-col`}>
              <span className="text-white text-[20px] leading-[26px] font-bold">
                {item.title}
              </span>
              <time
                className="text-white text-xs mt-2"
                dateTime={item.createdAt}
              >
                {item.createdBy} -{" "}
                {item.createdAt
                  ? formatDateWithOrdinal(item.createdAt)
                  : "No Date"}
              </time>
            </div>
          </div>
        ))}
    </div>
  

      {/* Second row with 4 smaller items */}
      {/* <div className="grid grid-cols-6 md:grid-cols-4 gap-2 md:gap-4">
      {combinedSmallHeros
       .slice(0, windowWidth < 768 ? combinedSmallHeros.length : 4)
        .map((item, index) => (
          <div
            className={styles.imageWrap}
            key={item.id}
            onClick={() =>
              handleImageClick(
                item.id,
                index < safeSmallHeros.length ? "smallhero" : "largehero"
              )
            }
          >
            <div className="relative w-full h-56">
              <Image
                src={item.image}
                alt="Image"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  transition: "transform 0.6s ease-in-out",
                }}
                className="hover:scale-125"
              />
            </div>
            <div className={styles.textContent}>
              <span className="text-white text-[16px] leading-[21px] font-medium">
                {item.title}
              </span>
            </div>
          </div>
        ))}
    </div> */}



{isMobile ? (
        <SmallHeroSwiper
        smallHeroes={combinedSmallHeros}
        smallHeroCount={safeSmallHeros.length} // Pass the count of smallheroes
        onImageClick={(id, type) => handleImageClick(id, type)} // Pass the type dynamically
      />
      ) : (
        <div className="grid grid-cols-6 md:grid-cols-4 gap-4">
          {combinedSmallHeros.slice(0, 4).map((item, index) => (
            <div
              className={styles.imageWrap}
              key={item.id}
              onClick={() =>
                handleImageClick(
                  item.id,
                  index < safeSmallHeros.length ? "smallhero" : "largehero"
                )
              }
            >
              <div className="relative w-full h-56 cursor-pointer">
                <Image
                  src={item.image}
                  alt="Image"
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.6s ease-in-out",
                  }}
                  className="hover:scale-125"
                />
              </div>
              <div className={styles.textContent}>
                <span className="text-white text-[16px] leading-[21px] font-medium">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}



      {/* Container for NewsContent and AdvertisementSection */}
      <div className="flex flex-col md:flex-row items-center md:items-start w-full mt-24">
        <div className="w-full flex flex-col items-center justify-between gap-12">
        {benefitPage?.hasNewscontent?.map((newsContentItem: NewsContentItem, index: number) => (
            <NewsContent
              onImageClick={handleImageClick}
              key={index}
              id={newsContentItem.id}
              title={newsContentItem.category}
              sectionHeader={newsContentItem.category}
              mainImage={newsContentItem.mainImage}
              mainHeading={newsContentItem.mainHeading}
              mainDate={newsContentItem.createdAt ? formatDateWithOrdinal(newsContentItem.createdAt) : 'No Date'}
              mainDescription={newsContentItem.mainDescription}
              articles={newsContentItem.hasArticles ? newsContentItem.hasArticles.map((article: any) => ({
                id: article.id,
                heading: article.heading,
                image: article.image,
                description: article.description,
                location: article.location,
                startAt: article.startAt,
                endAt: article.endAt,
                createdAt: article.createdAt ? formatDateWithOrdinal(article.createdAt) : 'No Date',
              })) : []}
            />
          ))}

          {/* <NewsContent
            title="Manufacturing Partners"
            sectionHeader="Manufacturing Partners"
            mainImage={m1}
            mainHeading="Optimize Marketing your business with Coveten Technologies"
            mainDate="15th August 2024"
            mainDescription="Something extraordinary is on the horizon!"
            articles={Travelarticles}
          />

          <NewsContent
            title="Dealer & Distrubutors"
            sectionHeader="Dealer & Distrubutors"
            mainImage={d1}
            mainHeading="Unlocking Top Strategies for Dealerships"
            mainDate="15th August 2024"
            mainDescription="Something extraordinary is on the horizon!"
            articles={Healtharticles}
          />

          <NewsContent
            title="Service providers"
            sectionHeader="Service providers"
            mainImage={sp1}
            mainHeading="Let’s make marketing magic happen together."
            mainDate="15th August 2024"
            mainDescription="Something extraordinary is on the horizon!"
            articles={Fitnessarticles}
          />

          <NewsContent
            title="Our upcoming networking events & meetings"
            sectionHeader="Our upcoming networking events & meetings"
            mainImage={network1}
            mainHeading="Unlock Exclusive Industry Insights"
            mainDate="15th August 2024"
            mainDescription="Gain access to cutting-edge knowledge and trends from industry leaders at our networking events."
            articles={Sportsarticles}
          />

          <NewsContent
            title="General"
            sectionHeader="General"
            mainImage={g1}
            mainHeading="Boost More Awareness with Coveten Technologies"
            mainDate="15th August 2024"
            mainDescription="Something extraordinary is on the horizon!"
            articles={Entertainmentarticles}
          />
          <NewsContent
            title="TECHNOLOGY"
            sectionHeader="TECHNOLOGY"
            mainImage={Tech1}
            mainHeading="Being out trusted Technologies B2B member."
            mainDate="15th August 2024"
            mainDescription="Something extraordinary is on the horizon!"
            articles={Technologyarticles}
          />
          <NewsContent
            title="BUSINESS"
            sectionHeader="BUSINESS"
            mainImage={BusinessImg5}
            mainHeading="Elevate Your Business with Expert Consulting Services "
            mainDate="15th August 2024"
            mainDescription="Something extraordinary is on the horizon!"
            articles={Businessarticles}
          /> */}

        </div>

        <div className="w-full md:w-1/3 p-10 md:p-0">
          <AdvertisementSection ads={benefitPage?.hasAds || []}/>
        </div>
      </div>
    </div>
  );
}

export default BenefitPageContent;
