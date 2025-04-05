// src/components/Card.js
import React from 'react';

const Card = ({ card, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(card)}>
      {card.suit} {card.number}
    </div>
  );
};

export default Card;