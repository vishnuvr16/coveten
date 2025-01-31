// 'use client'


// import React, { useEffect, useRef, useState } from 'react';
// import Loading from '@/app/loading';
// import { useGqlClient } from '@/hooks/UseGqlClient';
// import { useManualQuery, useQuery } from 'graphql-hooks';
// import { useSearchParams } from 'next/navigation';
// import { useParams } from 'next/navigation';
// import { formatDateWithOrdinal } from '@/utlts/formatdatewithOrdinal';
// import AdvertisementSection from '@/components/BenefitPageContent/AdvertisementSection';
// import Link from 'next/link';
// import Modal from './Modal'
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';


// const GET_BENEFIT_PAGE = `query GetBenefitPage($where: BenefitPageWhere) {
//   benefitPages(where: $where) {
//     id
//     tagline
//     hasHeroitems {
//     id
//       hasLargeHeros {
//         id
//         title
//         image
//         createdBy
//         createdAt
//         description
//         location
//         registrationUrl
//         registrationLabel
//       }
//       hasSmallHeros {
//         id
//         title
//         image
//         location
//         description
//         createdBy
//         createdAt
//         registrationUrl
//         registrationLabel
//       }
//     }
//     hasNewscontent {
//       id
//       category
//       mainImage
//       mainHeading
//       mainDescription
//       createdAt
//       startAt
//       endAt
//       createdBy
//       registrationUrl
//       registrationLabel
//       location
//       hasArticles {
//         id
//         image
//         heading
//         location
//         description
//         createdAt
//         createdBy
//         startAt
//         endAt
//         registrationUrl
//         registrationLabel
//       }
//     }
//     hasAds {
//       id
//       title
//       images
//       isBanner
//       link
//     }
//   }
// }`;



// const GET_LARGE_HERO = `query LargeHeros($where: LargeHerosWhere) {
//   largeHeros(where: $where) {
//     image
//     location
//     title
//     id
//     description
//     createdBy
//     createdAt
//     registrationUrl
//     registrationLabel
//   }
// }`;


// const GET_SMALL_HERO = `query SmallHeros($where: SmallHerosWhere) {
//   smallHeros(where: $where) {
//     image
//     location
//     title
//     id
//     description
//     createdBy
//     createdAt
//     registrationUrl
//     registrationLabel
//   }
// }`;




// const GET_NEWS_CONTENT = `query NewsContents($where: NewsContentWhere) {
//   newsContents(where: $where) {
//     startAt
//     registrationUrl
//     registrationLabel
//     mainImage
//     mainHeading
//     mainDescription
//     location
//     id
//     createdBy
//     createdAt
//     category
//     endAt
//   }
// }`;



// const GET_ARTICLES = `
// query Articles($where: ArticlesWhere) {
//   articles(where: $where) {
//     id
//     heading
//     description
//     endAt
//     createdAt
//     image
//     location
//     startAt
//     createdBy
//     registrationUrl
//     registrationLabel
//   }
// }
// `





// const BenefitDetails = () => {
//     const [benefitData, setBenefitData] = useState<any>(null)
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const client = useGqlClient()
//     const searchParams = useSearchParams();
//     const modalRef = useRef(null);
//     const params = useParams();
//     const [getBenefitDataFn, state] = useManualQuery(GET_BENEFIT_PAGE, { client })
//     const type = searchParams.get('type');

//     const getQueryByType = (type: string | null): string => {
//       if (!type) {
//         console.log('Type is null or undefined, using default GET_LARGE_HERO');
//         return GET_LARGE_HERO;  // Default to GET_LARGE_HERO
//       }

//       console.log('Switching to query for type:', type);

//       switch (type) {
//         case 'largehero':
//           return GET_LARGE_HERO;
//         case 'smallhero':
//           return GET_SMALL_HERO;
//         case 'newscontent':
//           return GET_NEWS_CONTENT;
//         case 'article':
//           return GET_ARTICLES;
//         default:
//           console.log('No match for type, using default GET_LARGE_HERO');
//           return GET_LARGE_HERO; // Fallback to default
//       }
//     };


//     const query = getQueryByType(type);


//     const displayImage = (data: any, type: string) => {
//       console.log('Accessing image for type:', type);
      
//       switch (type) {
//         case 'largehero':
//           const largeHeroImage = data?.largeHeros?.[0]?.image;
//           console.log('Large Hero Image:', largeHeroImage); // Log the image URL
//           return largeHeroImage || '/path/to/fallback-image.jpg';
//         case 'smallhero':
//           const smallHeroImage = data?.smallHeros?.[0]?.image;
//           console.log('Small Hero Image:', smallHeroImage); // Log the image URL
//           return smallHeroImage || '/path/to/fallback-image.jpg';
//         case 'newscontent':
//           const newsImage = data?.newsContents?.[0]?.mainImage;
//           console.log('News Content Image:', newsImage); // Log the image URL
//           return newsImage || '/path/to/fallback-image.jpg';
//         case 'article':
//           const articleImage = data?.articles?.[0]?.image;
//           console.log('Article Image:', articleImage); // Log the image URL
//           return articleImage || '/path/to/fallback-image.jpg';
//         default:
//           console.log('Default Image Path');
//           return '/path/to/fallback-image.jpg'; // Return fallback if type is not found
//       }
//     };
    
//     console.log('type:', type);
//    console.log('id',params.id)
   

   

//     const getBenefits = async (where: any = {}) => {
//         const { data } = await getBenefitDataFn({
//             variables: {
//                 where: where,
//             }
//         })

//         if (data?.benefitPages) {
//             setBenefitData(data)
//         }
//     }



//     const { data, loading, error } = useQuery(query as string, {
//       client: useGqlClient(), // GraphQL client
//       variables: {
//         where: {
//           id: params.id, // Use the dynamic ID from the URL
//         },
//       },
//     });



//     useEffect(() => {
//         getBenefits();  // Fetch data on component mount
//     }, []);
    
//     useEffect(() => {
//         if (benefitData) {
//             console.log("Benefit data:", benefitData);  // Log benefit data after it's set
//         }
//     }, [benefitData]);


//     const benefitPage = benefitData?.benefitPages[0];

//   console.log('data',data)



//     console.log('largerhero data', benefitData)

//     const handleClickOutside = (event: MouseEvent) => {
//       if (modalRef.current && !(modalRef.current as HTMLElement).contains(event.target as Node)) {
//         setIsModalOpen(false);
//       }
//     };
    

//   useEffect(() => {
//       if (isModalOpen) {
//           document.addEventListener("mousedown", handleClickOutside);
//       } else {
//           document.removeEventListener("mousedown", handleClickOutside);
//       }
//       return () => {
//           document.removeEventListener("mousedown", handleClickOutside);
//       };
//   }, [isModalOpen]);


//     if (loading) return <Loading />



//     return (
//       <>
//         <div className='max-w-screen-xl mx-auto pt-28 pb-16 bg-white flex flex-col md:flex-row'>
//         <div className="w-full md:w-3/4 p-6 h-auto">
//         <div className="md:px-4 lg:px-0 mt-10">
//                     <h2 className="text-2xl md:text-4xl md:font-semibold text-gray-800 leading-tight">
//                     {(() => {
//   if (data) {
//      // Check if the type is 'largehero' or 'smallhero'
//      if (type === 'largehero' || type === 'smallhero') {
//       const heroData = data[type === 'largehero' ? 'largeHeros' : 'smallHeros'];

//       // Ensure heroData exists and is an array, then access the first element's title
//       return heroData && heroData.length > 0 ? heroData[0].title : 'No Title Available';
//     }  else if (type === 'newscontent') {
//       // For newsContent, use 'mainHeading'
//       return data.newsContents[0]?.mainHeading || 'No Title Available';
//     } else if (type === 'article') {
//       // For article, use 'heading'
//       return data.articles[0]?.heading || 'No Title Available';
//     } else {
//       return 'No Title Available'; // Fallback title
//     }
//   }
//   return null; // Return null if no data is available
// })()}

//                     </h2>
//                 </div> 
//                 <div className="text-sm text-gray-600 pl-2 pb-3">
//                 {(() => {
//     if (data) {
//       if (type === 'newscontent') {
//         const newsContent = data.newsContents[0];
//         return newsContent && newsContent.createdBy && newsContent.createdAt ? (
//           <span>
//             By {newsContent.createdBy} - {formatDateWithOrdinal(newsContent.createdAt)}
//           </span>
//         ) : null;
//       } else if (type === 'article') {
//         const article = data.articles[0];
//         return article && article.createdBy && article.createdAt ? (
//           <span>
//             By {article.createdBy} - {formatDateWithOrdinal(article.createdAt)}
//           </span>
//         ) : null;
//       } else if (type === 'largehero') {
//         const largeHero = data.largeHeros[0];
//         return largeHero && largeHero.createdBy && largeHero.createdAt ? (
//           <span>
//             By {largeHero.createdBy} - {formatDateWithOrdinal(largeHero.createdAt)}
//           </span>
//         ) : null;
//       }
//     }
//     return null;
//   })()}
//   </div>

//                 <div className="mb-4 md:mb-0 w-full mx-auto relative">
//                 <img
//   src={displayImage(data, type || 'default')} // Default to 'default' if type is null
//   alt="Image"
//   className='max-h-[450px] w-full '
// />
//                 </div>

//                 <div className="mt-6" style={{ whiteSpace: 'pre-wrap' }}>
//           {type === 'newscontent' ? (
//             // Display the 'mainDescription' for 'newscontent'
//             <p>{data?.newsContents?.[0]?.mainDescription}</p>
//           ) : type === 'largehero' || type === 'smallhero' ? (
//             // Display the 'description' for 'largehero' and 'smallhero'
//             <p>{data?.[type === 'largehero' ? 'largeHeros' : 'smallHeros']?.[0]?.description}</p>
//           ) : type === 'article' ? (
//             // Display the 'description' for 'article'
//             <p>{data?.articles?.[0]?.description}</p>
//           ) : null}
//         </div>
//         </div>

//          <div className="w-full md:w-1/3 p-6 h-auto">
//          <div className="w-full mt-2">
//                         <div className="col-span-1 lg:col-span-2 p-4">

//                             <div className="border-b border-gray-300 pb-1 mt-7 flex space-x-3">
//                                 <button onClick={() => setIsModalOpen(true)} className="relative group inline-block flex-shrink-0  py-2.5 px-5 text-sm font-semibold text-orange-50 bg-primary  overflow-hidden" type="submit">
//                                     <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
//                                     <div className="relative flex items-center justify-center">
//                                         <span className="">Interested</span>

//                                     </div>
//                                 </button>
//                                 {/* <Link href={data?.newsContents[0]?.registrationUrl || '#'} >
//                                     <button

//                                         className="relative group inline-block flex-shrink-0   py-2.5 px-5 text-sm font-semibold text-primary hover:text-white bg-transparent border border-primary  overflow-hidden" type="submit">
//                                         <div className="absolute top-0 right-full w-full h-full bg-primary transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
//                                         <div className="relative flex items-center justify-center">
//                                             <span className="">{data?.newsContents[0]?.registrationLabel || 'Register'}</span>
//                                         </div>
//                                     </button>
//                                 </Link> */}
//                                  {(() => {
//                                     let registrationUrl = '';
//                                     let registrationLabel = '';
//                                     if (type === 'newscontent') {
//                                         registrationUrl = data?.newsContents[0]?.registrationUrl || '#';
//                                         registrationLabel = data?.newsContents[0]?.registrationLabel || 'Register';
//                                     } else if (type === 'largehero') {
//                                         registrationUrl = data?.largeHeros[0]?.registrationUrl || '#';
//                                         registrationLabel = data?.largeHeros[0]?.registrationLabel || 'Register';
//                                     } else if (type === 'smallhero') {
//                                         registrationUrl = data?.smallHeros[0]?.registrationUrl || '#';
//                                         registrationLabel = data?.smallHeros[0]?.registrationLabel || 'Register';
//                                     } else if (type === 'article') {
//                                         registrationUrl = data?.articles[0]?.registrationUrl || '#';
//                                         registrationLabel = data?.articles[0]?.registrationLabel || 'Register';
//                                     }

//                                     return (
//                                         <Link href={registrationUrl}  target="_blank">
//                                             <button className="relative group inline-block flex-shrink-0 py-2.5 px-5 text-sm font-semibold text-primary hover:text-white bg-transparent border border-primary overflow-hidden" type="submit">
//                                                 <div className="absolute top-0 right-full w-full h-full bg-primary transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
//                                                 <div className="relative flex items-center justify-center">
//                                                     <span>{registrationLabel}</span>
//                                                 </div>
//                                             </button>
//                                         </Link>
//                                     );
//                                 })()}

//                             </div>
//                             <div className="border-b border-gray-300 pb-1 mt-7">
//                                 <p
//                                     className="text-primary font-semibold"

//                                 >
//                                     Start:
//                                 </p>
//                                 <p
//                                     className="text-dimText"


//                                 >
//                                   {/* {data?.newsContents[0]?.startAt?.slice(0, 10) || 'Coming Soon'} */}
//                                   {(() => {
//             if (data) {
//                 if (type === 'newscontent') {
//                     return data?.newsContents[0]?.startAt?.slice(0, 10) || 'Coming Soon';
//                 } else if (type === 'largehero' || type === 'smallhero') {
//                     return 'Coming Soon'; // Fallback to 'Coming Soon' for largeHeros and smallHeros
//                 } else if (type === 'article') {
//                     return data?.articles[0]?.startAt?.slice(0, 10) || 'Coming Soon';
//                 }
//             }
//             return 'Coming Soon'; // Default if no data available
//         })()}
//                                 </p>
//                             </div>
//                             <div className="border-b border-gray-300 pb-1">
//                                 <p
//                                     className="text-primary font-semibold"

//                                 >
//                                     End:
//                                 </p>
//                                 <p
//                                     className="text-dimText"


//                                 >
//                                     {/* {data?.newsContents[0]?.endAt?.slice(0, 10) || 'Coming Soon'} */}
//                                     {(() => {
//             if (data) {
//                 if (type === 'newscontent') {
//                     return data?.newsContents[0]?.endAt?.slice(0, 10) || 'Coming Soon';
//                 } else if (type === 'largehero' || type === 'smallhero') {
//                     return 'Coming Soon'; // Fallback to 'Coming Soon' for largeHeros and smallHeros
//                 } else if (type === 'article') {
//                     return data?.articles[0]?.endAt?.slice(0, 10) || 'Coming Soon';
//                 }
//             }
//             return 'Coming Soon'; // Default if no data available
//         })()}
//                                 </p>
//                             </div>
//                             <div className="border-b border-gray-300 pb-1">
//                                 <p
//                                     className="text-primary font-semibold"

//                                 >
//                                     Location:
//                                 </p>
//                                 <p
//                                     className="text-dimText"


//                                 >
//                                    {/* {data?.newsContents[0]?.location || 'Not Available'} */}
//                                    {(() => {
//             if (data) {
//                 if (type === 'newscontent') {
//                     return data?.newsContents[0]?.location || 'Not Available';
//                 } else if (type === 'largehero') {
//                     return data?.largeHeros[0]?.location || 'Not Available';
//                 } else if (type === 'smallhero') {
//                     return data?.smallHeros[0]?.location || 'Not Available';
//                 } else if (type === 'article') {
//                     return data?.articles[0]?.location || 'Not Available';
//                 }
//             }
//             return 'Not Available'; // Default if no data available
//         })()}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//          <AdvertisementSection ads={benefitPage?.hasAds || []}/>
//             </div>

       
//        <Modal 
//   isModalOpen={isModalOpen} 
//   setIsModalOpen={setIsModalOpen} 
//   event={(() => {
//     if (data) {
//       if (type === 'newscontent') {
//         return data?.newsContents[0]?.mainHeading || 'No Title Available'; // For news content
//       } else if (type === 'largehero') {
//         return data?.largeHeros[0]?.title || 'No Title Available'; // For large hero
//       } else if (type === 'smallhero') {
//         return data?.smallHeros[0]?.title || 'No Title Available'; // For small hero
//       } else if (type === 'article') {
//         return data?.articles[0]?.heading || 'No Title Available'; // For article
//       }
//     }
//     return 'No Title Available'; // Default if no data available
//   })()} 
// />
// </div>

// </>
//     );
// };

// export default BenefitDetails;








import React from 'react';

import Main from './Main';

const BenefitDetails = () => {
    return (
        <section>
            <Main />
        </section>
    );
};

export default BenefitDetails;
