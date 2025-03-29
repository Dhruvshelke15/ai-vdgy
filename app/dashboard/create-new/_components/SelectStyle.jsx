import Image from 'next/image';
import React, { useState } from 'react';

const SelectStyle = ({ onUserSelect }) => {
  const styleOptions = [
    {
      name: 'Realistic',
      image: '/realistic.png',
    },
    {
      name: 'Cartoon',
      image: '/cartoon.png',
    },
    {
      name: 'Comic',
      image: '/comic.png',
    },
    {
      name: 'Historic',
      image: '/historic.png',
    },
    {
      name: 'Watercolor',
      image: '/watercolor.png',
    },
    {
      name: 'GTA',
      image: '/GTA.png',
    },
  ];
  const [selectedOptions, setSelectedOptions] = useState();
  return (
    <div className="mt-7">
      <h2 className="font-bold text-xl text-primary">Style</h2>
      <p className="text-gray-600">Select your style of video</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((item, index) => (
          <div
            className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl ${selectedOptions == item.name && 'border-4 border-green-500'} `}
          >
            <Image
              src={item.image}
              alt="style"
              width={100}
              height={100}
              className="h-48 object-cover rounded-lg w-full"
              onClick={() => {
                setSelectedOptions(item.name);
                onUserSelect('style', item.name);
              }}
            />
            <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
