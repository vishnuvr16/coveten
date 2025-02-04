import React from 'react';
import Main from './(components)/Main';

const page = () => {
    return (
        <div className="w-full bg-gray-800 min-h-screen rounded-lg py-4 md:py-7 px-4 md:px-8 xl:px-10 ">
            <div className=" py-4 md:py-7">
                <div className="flex items-center justify-between">
                    <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-black">Projects</p>

                </div>
            </div>
            <Main />

        </div>
    );
};

export default page;