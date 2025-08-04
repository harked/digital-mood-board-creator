import React from 'react';
import ImageCard from './ImageCard';

interface MoodBoardGridProps {
  images: string[];
  isLoading: boolean;
  onImageClick: (imageUrl: string) => void;
}

const SkeletonCard: React.FC = () => (
  <div className="bg-surface rounded-lg shadow-lg animate-pulse aspect-[4/3]"></div>
);

const MoodBoardGrid: React.FC<MoodBoardGridProps> = ({ images, isLoading, onImageClick }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {images.map((img, index) => (
        <ImageCard key={index} imageUrl={img} onClick={onImageClick} />
      ))}
    </div>
  );
};

export default MoodBoardGrid;