// "use client"
// import React from 'react';
// import { AiOutlineEye } from 'react-icons/ai';
// import { MdDelete } from 'react-icons/md';

// const sampleBenefitInfo = {
//   tagline: ["Empowering communities", "Shaping the future"],
//   hasHeroitems: {
//     hasLargeHeros: [
//       { id: '1', title: 'Main Event Banner', image: 'large1.jpg' },
//       { id: '2', title: 'Seasonal Highlights', image: 'large2.jpg' }
//     ],
//     hasSmallHeros: [
//       { id: '3', title: 'Weekly Deals', image: 'small1.jpg' },
//       { id: '4', title: 'Exclusive Offers', image: 'small2.jpg' }
//     ]
//   },
//   hasNewscontent: [
//     {
//       id: '1',
//       category: 'Technology',
//       mainImage: 'tech.jpg',
//       mainHeading: 'AI Advances in 2024',
//       mainDescription: 'Exploring the impact of artificial intelligence.',
//       articles: [
//         { id: '1', heading: 'AI in Healthcare', image: 'ai_health.jpg' },
//         { id: '2', heading: 'AI in Education', image: 'ai_edu.jpg' }
//       ]
//     },
//     {
//       id: '2',
//       category: 'Environment',
//       mainImage: 'env.jpg',
//       mainHeading: 'Climate Change Actions',
//       mainDescription: 'Efforts to reduce carbon footprints.',
//       articles: []
//     }
//   ],
//   hasAds: [
//     { id: '1', title: 'Ad 1', images: 'ad1.jpg' },
//     { id: '2', title: 'Ad 2', images: 'ad2.jpg' }
//   ]
// };

// const sampleCategories = [
//   { id: '1', name: 'Technology' },
//   { id: '2', name: 'Environment' }
// ];

// const BenefitTable = () => {
//   const handleView = (tabIndex:any, categoryName:any) => {
//     alert(`View clicked for Tab ${tabIndex} - Category: ${categoryName}`);
//   };

//   const handleDelete = (section:any) => {
//     alert(`${section} deleted successfully!`);
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border border-gray-300 px-4 py-2">#</th>
//             <th className="border border-gray-300 px-4 py-2">Section</th>
//             <th className="border border-gray-300 px-4 py-2">Content</th>
//             <th className="border border-gray-300 px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Overview Section */}
//           <tr>
//             <td className="border border-gray-300 px-4 py-2">1</td>
//             <td className="border border-gray-300 px-4 py-2">Overview</td>
//             <td className="border border-gray-300 px-4 py-2">
//               {sampleBenefitInfo.tagline.map((tagline, index) => (
//                 <div key={index}>{tagline}</div>
//               ))}
//             </td>
//             <td className="border border-gray-300 px-4 py-2">
//               <button onClick={() => handleView(0, '')}>
//                 <AiOutlineEye className="text-green-500" />
//               </button>
//               <button onClick={() => handleDelete('Overview')}>
//                 <MdDelete className="text-red-500" />
//               </button>
//             </td>
//           </tr>

//           {/* Hero Banners Section */}
//           <tr>
//             <td className="border border-gray-300 px-4 py-2">2</td>
//             <td className="border border-gray-300 px-4 py-2">Hero Banners</td>
//             <td className="border border-gray-300 px-4 py-2">
//               <div>Large Banners:</div>
//               {sampleBenefitInfo.hasHeroitems.hasLargeHeros.map((hero) => (
//                 <div key={hero.id}>{hero.title}</div>
//               ))}
//               <div>Small Banners:</div>
//               {sampleBenefitInfo.hasHeroitems.hasSmallHeros.map((hero) => (
//                 <div key={hero.id}>{hero.title}</div>
//               ))}
//             </td>
//             <td className="border border-gray-300 px-4 py-2">
//               <button onClick={() => handleView(1, '')}>
//                 <AiOutlineEye className="text-green-500" />
//               </button>
//               <button onClick={() => handleDelete('Hero Banners')}>
//                 <MdDelete className="text-red-500" />
//               </button>
//             </td>
//           </tr>

//           {/* Trending News Section */}
//           <tr>
//             <td className="border border-gray-300 px-4 py-2">3</td>
//             <td className="border border-gray-300 px-4 py-2">Trending News</td>
//             <td className="border border-gray-300 px-4 py-2">
//               {sampleCategories.map((category) => (
//                 <div key={category.id}>
//                   <span>{category.name}</span> -{' '}
//                   {sampleBenefitInfo.hasNewscontent.some(
//                     (content) => content.category === category.name
//                   )
//                     ? 'Data exists'
//                     : 'Data not exists'}
//                 </div>
//               ))}
//             </td>
//             <td className="border border-gray-300 px-4 py-2">
//               {sampleCategories.map((category) => (
//                 <div key={category.id}>
//                   <button onClick={() => handleView(2, category.name)}>
//                     <AiOutlineEye className="text-green-500" />
//                   </button>
//                   <button onClick={() => handleDelete(`News for ${category.name}`)}>
//                     <MdDelete className="text-red-500" />
//                   </button>
//                 </div>
//               ))}
//             </td>
//           </tr>

//           {/* Advertisements Section */}
//           <tr>
//             <td className="border border-gray-300 px-4 py-2">4</td>
//             <td className="border border-gray-300 px-4 py-2">Advertisements</td>
//             <td className="border border-gray-300 px-4 py-2">
//               {sampleBenefitInfo.hasAds.map((ad) => (
//                 <div key={ad.id}>{ad.title}</div>
//               ))}
//             </td>
//             <td className="border border-gray-300 px-4 py-2">
//               <button onClick={() => handleView(3, '')}>
//                 <AiOutlineEye className="text-green-500" />
//               </button>
//               <button onClick={() => handleDelete('Advertisements')}>
//                 <MdDelete className="text-red-500" />
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BenefitTable;
