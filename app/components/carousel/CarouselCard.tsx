// components/Card.tsx
import React from 'react';

interface CardProps {
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ imageUrl }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt="Card Image" />
      <div>
        {Array.from({ length: 5 }).map((_, idx) => (
          <p key={idx}>{Math.floor(Math.random() * 100)}</p>
        ))}
      </div>
      <style jsx>{`
  .card {
    width: calc(100% - 110px); // Adjust this to show half of the next card.
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-right: 16px;
    padding: 16px;
    display: inline-block;
    scroll-snap-align: start; // This ensures the card will be the snap target.
  }
  .card img {
    width: 100%;
    height: 200px; // Adjust the height as per your requirement.
    object-fit: cover;
    border-radius: 8px;
  }
`}</style>
    </div>
  );
};

export default Card;