import React from 'react';

const InfoCards = ({ title, value }: { title: string, value: string }) => {
    return (
        <div className="flex items-center p-4 bg-white  dark:bg-darkBgLight dark:text-white">
            <div className="flex flex-shrink-0 items-center justify-center bg-primary/10 h-16 w-16 ">
                <svg className="w-6 h-6 fill-current text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="flex-grow flex flex-col ml-4">
                <span className="text-3xl text-primary font-bold">{value}</span>
                <div className="flex items-center justify-between">
                    <span className="text-dimText dark:text-darkDimText">{title}</span>

                </div>
            </div>
        </div>
    );
};

export default InfoCards;