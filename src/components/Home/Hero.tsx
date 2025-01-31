'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Grid, EffectCreative } from 'swiper/modules';
import Link from 'next/link';
import HeroCard from './HeroCard';
import SearchInput from './SearchInput';
import Imagehero from '../../../public/assets/- Service providers/More Opportunities.jpg'
import Image from 'next/image';

export default function Hero({ videoData }: any) {
    const videoUrl = videoData?.[0]?.video;

    return (
        <div className='w-full h-full z-10'>
            {videoUrl ? (
                <div className="w-full h-full sm:h-screen sm:w-full xs:w-full">
                <video
                    className="w-full h-full  sm:h-screen xs:h-screen object-cover"
                    playsInline
                    autoPlay
                    loop
                    muted
                >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>            
            </div>
            ) : (
                <p>No video available</p>
            )}
        </div>
    );
}