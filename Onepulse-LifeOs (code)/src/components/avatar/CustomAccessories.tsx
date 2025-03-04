import React from 'react';

interface CustomAccessoriesProps {
  accessories: string[];
  className?: string;
}

const CustomAccessories: React.FC<CustomAccessoriesProps> = ({ accessories, className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Glasses */}
      {accessories.includes('glasses') && (
        <g transform="translate(25, 40)">
          <path
            d="M2 10C2 6.68629 4.68629 4 8 4H12C15.3137 4 18 6.68629 18 10C18 13.3137 15.3137 16 12 16H8C4.68629 16 2 13.3137 2 10Z"
            fill="none"
            stroke="#374151"
            strokeWidth="2"
          />
          <path
            d="M32 10C32 6.68629 34.6863 4 38 4H42C45.3137 4 48 6.68629 48 10C48 13.3137 45.3137 16 42 16H38C34.6863 16 32 13.3137 32 10Z"
            fill="none"
            stroke="#374151"
            strokeWidth="2"
          />
          <path d="M18 10H32" stroke="#374151" strokeWidth="2" />
        </g>
      )}

      {/* Hat */}
      {accessories.includes('hat') && (
        <g transform="translate(25, 15)">
          <path
            d="M0 15C0 15 10 5 25 5C40 5 50 15 50 15C50 15 40 20 25 20C10 20 0 15 0 15Z"
            fill="#4B5563"
          />
          <path
            d="M15 5C15 5 20 0 25 0C30 0 35 5 35 5"
            fill="none"
            stroke="#374151"
            strokeWidth="2"
          />
        </g>
      )}

      {/* Necklace */}
      {accessories.includes('necklace') && (
        <g transform="translate(35, 65)">
          <path
            d="M0 0C0 0 15 10 30 0"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
          />
          <circle cx="15" cy="5" r="2" fill="#8B5CF6" />
        </g>
      )}

      {/* Earrings */}
      {accessories.includes('earrings') && (
        <g>
          <circle cx="20" cy="45" r="2" fill="#F59E0B" />
          <circle cx="80" cy="45" r="2" fill="#F59E0B" />
        </g>
      )}
    </svg>
  );
};

export default CustomAccessories;