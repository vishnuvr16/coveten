'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}
const AboutUs = ({ data }: any) => {

    return (
        <section className='pt-12'>
            <div className=" relative z-10">
                {/* <div className="absolute inset-0 max-w-xs mx-auto h-96 blur-[90px] bg-gradient-to-br from-primary/30 to-slate-400" ></div> */}

                <div className="max-w-screen-2xl m-auto px-2 lg:px-12  ">
                    <div
                        // style={{ background: "linear-gradient(-45deg, #0f62fe 0%, #0f9efe 100% )" }} 

                        className="bg-[#21618C]  lg:p-16 rounded-xl space-y-6 md:flex flex-row-reverse md:gap-6 justify-center md:space-y-0 lg:items-center dark:bg-darkBgLight">
                        <div className="md:5/12 lg:w-1/2 lg:h-96  text-white">
                            <Image
                                src={data?.imageUrl || '/assets/no_image.png'}
                                alt="image"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                className='rounded-xl h-full w-full object-cover object-center'
                            />
                        </div>
                        <div className="md:7/12 lg:w-1/2">
                            <h2 className="text-3xl font-bold md:text-4xl text-white">
                                {data?.title}
                            </h2>
                            {/* <p className="my-3 text-gray-600 dark:text-gray-300 md:text-sm">
                                We create best in class product designs, validation and manufacturing support for automotive, aerospace, electrical and electronics industries globally at present and more services are on its way to simplify your manufacturing needs
                            </p> */}
                            <p className="my-3 text-white/70 dark:text-darkDimText ">
                                {
                                    data?.description
                                }
                            </p>
                            <div className="divide-y space-y-4 divide-gray-100 dark:divide-gray-800">
                                {
                                    data?.hasPoints?.map((item: any) => (
                                        <div className="pt-4 flex gap-4 md:items-center" key={item?.id}>
                                            <div className="w-12 h-12 flex gap-4 rounded-full bg-gray-100 group overflow-hidden">
                                                <Image
                                                    src={item?.iconUrl || '/assets/no_image.png'}
                                                    alt="image"
                                                    loading="lazy"
                                                    width={1000}
                                                    height={1000}
                                                    className='w-12 h-12 flex  rounded-full object-cover object-center transition-all duration-500 group-hover:scale-125'
                                                />
                                            </div>
                                            <div className="w-5/6">
                                                <h4 className="font-semibold text-white text-lg  dark:text-teal-300">{item.title}</h4>
                                                <p className="text-white/70 dark:text-darkDimText">
                                                    {item?.description}
                                                    {
                                                        item?.url && <Link href={item?.url} className='text-white ml-2 hover:underline'>read more</Link>
                                                    }
                                                </p>


                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;