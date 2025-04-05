
import React from 'react';
import Card from './Card';

const Hand = ({ cards, onCardClick }) => {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <Card key={index} card={card} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default Hand;
