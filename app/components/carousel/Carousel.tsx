'use client'


import React, { useRef, useState } from 'react';
import Card from './CarouselCard';


const Carousel: React.FC = () => {

    const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentScrollPos, setCurrentScrollPos] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos(e.clientX);
    if (carouselRef.current) {
      setCurrentScrollPos(carouselRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const newPos = currentScrollPos - (e.clientX - startPos);
    carouselRef.current.scrollLeft = newPos;
  };

  return (
    <div 
      className="carousel"
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onDragStart={(e) => e.preventDefault()}
    >
      {Array.from({ length: 10 }).map((_, idx) => (
        <Card key={idx} imageUrl={`https://via.placeholder.com/200`} />
      ))}
      <style jsx>{`
        .carousel {
          white-space: nowrap;
          overflow-x: auto;
          padding: 16px;
          -webkit-overflow-scrolling: touch;
          width: calc(100% - 110px);
          scroll-snap-type: x mandatory;
          
          // Hide scrollbar for Webkit browsers
          ::-webkit-scrollbar {
            display: none;
          }

          // Hide scrollbar for Firefox
          scrollbar-width: none;

          // Hide scrollbar for IE and Edge
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
};

export default Carousel;