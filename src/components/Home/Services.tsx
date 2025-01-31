'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Grid } from 'swiper/modules';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from "framer-motion"

// component
export default function Services({ services }: { services: any[] }) {

    const [servicesDataChunk, setServicesDataChunk] = useState<any>([])

    useEffect(() => {
        if (services) {
            const chunked = splitArrayIntoChunks(services, 6)
            setServicesDataChunk(chunked)
        }
    }, [services])



    function splitArrayIntoChunks(array: any, chunkSize: number) {
        return Array.from({ length: Math.ceil(array.length / chunkSize) }, (v, index) =>
            array.slice(index * chunkSize, index * chunkSize + chunkSize)
        );
    }



    return (
        <section className="pt-12">
            <div className="max-w-screen-2xl mx-auto px-2 lg:px-12  md:px-8">
                <div className="relative max-w-2xl mx-auto sm:text-center">
                    <div className="relative z-10 ">
                        <h3 className=" text-3xl font-semibold text-center  sm:text-4xl mb-3">
                            Popular Services
                        </h3>

                        <p className="mx-auto max-w-screen-md text-center text-dimText dark:text-darkDimText ">We’re India’s leading quality consciousness and test service providers, perhaps we are first in the domain to bring these services for manufacturers in India connecting global quality standards and labs</p>
                    </div>

                </div>
                <div className="relative mt-12">

                    <ul className="w-full ">
                        <Swiper
                            className="w-full  "
                            modules={[Navigation, A11y, Autoplay]}
                            spaceBetween={10}
                            loop={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            // navigation={true}
                            slidesPerView={1}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                900: {
                                    slidesPerView: 1,
                                    spaceBetween: 18,
                                },
                            }}
                        >

                            {
                                servicesDataChunk.map((item: any, idx: number) =>
                                    <SwiperSlide key={idx} >
                                        <div className='grid mt-8 grid-cols-1 lg:grid-cols-3 gap-6  lg:mx-12 '>
                                            {
                                                item?.map((item: any, idx: number) => (

                                                    <Link href={`/services/${item?.slug}`} key={idx} className="card h-full relative">
                                                        <div className="content">
                                                            <p className="heading uppercase">{item?.title}
                                                            </p>
                                                            <p className="para mb-16">
                                                                {item?.description.slice(0, 200) || 'N/A'}..
                                                            </p>
                                                            <button className="btn absolute bottom-6">Read more
                                                            </button>
                                                        </div>
                                                    </Link>

                                                ))
                                            }
                                        </div>
                                    </SwiperSlide>

                                )
                            }





                        </Swiper>
                    </ul>
                </div>
            </div>
        </section>
    )
}