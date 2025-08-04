import React from 'react';
import { ExpandIcon } from './Icons';

interface ImageCardProps {
  imageUrl: string;
  onClick: (imageUrl: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, onClick }) => {
  return (
    <div 
      className="group relative bg-surface rounded-lg shadow-lg overflow-hidden cursor-pointer aspect-[4/3]"
      onClick={() => onClick(imageUrl)}
    >
      <img
        src={imageUrl}
        alt="Generated mood board"
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <ExpandIcon className="h-10 w-10 text-white transform scale-75 group-hover:scale-100 transition-transform duration-300" />
      </div>
    </div>
  );
};

export default ImageCard;