'use client'

import React from 'react';

const Banner = () => (
  <div className="w-full h-20 bg-red-500 flex justify-start overflow-hidden shadow-lg cursor-pointer rounded-md hover:scale-105 hover:shadow-2xl transition-transform duration-1000">
    <div className="w-1/2 h-full">
      <img
        src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80"
        alt="shopping"
        className="h-full w-full object-cover rounded-r-full shadow-xl"
      />
    </div>
    <div className="w-1/2 h-full flex justify-center items-center text-center">
      <h4 className="text-sm">HOLIDAY SUPERSALE</h4>
    </div>
  </div>
);

export default Banner;
