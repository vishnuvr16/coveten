import React from 'react';
import Image from 'next/image'; // Use Next.js Image component
import Award1 from '../../public/assets/images/Award1.png';
import Award2 from "../../public/assets/images/Award2.png";
import Award3 from "../../public/assets/images/Award3.png";
import Award4 from "../../public/assets/images/Award4.png";
import Award5 from "../../public/assets/images/Award5.png";

const Awards = () => {
  const awards = [
    { id: 1, src: Award1, alt: 'Award 1' },
    { id: 2, src: Award2, alt: 'Award 2' },
    { id: 3, src: Award3, alt: 'Award 3' },
    { id: 4, src: Award4, alt: 'Award 4' },
    { id: 5, src: Award5, alt: 'Award 5' },
  ];

  return (
    <div className='md:p-5 md:flex md:flex-col md:gap-5 lg:flex-row  p-1 flex-col gap-1'>
      {awards.map((award) => (
        <Image
          key={award.id}
          src={award.src}
          alt={award.alt}
          className="md:w-52 md:h-52 lg:w-40 lg:h-40 w-24 h-24 object-contain" 
          style={{ objectFit: 'contain' }} // Optional inline style for better image fitting
        />
      ))}
    </div>
  );
};

export default Awards;
