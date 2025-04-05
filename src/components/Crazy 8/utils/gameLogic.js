// src/utils/gameLogic.js

// Generate and shuffle deck
export const shuffleDeck = () => {
    const suits = ['♠', '♥', '♦', '♣'];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let deck = [];
  
    suits.forEach(suit => {
      numbers.forEach(number => {
        deck.push({ suit, number });
      });
    });
  
    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  
    return deck;
  };
  
  // Deal cards to players
  export const dealCards = (deck, numPlayers = 2, cardsPerPlayer = 5) => {
    const hands = Array.from({ length: numPlayers }, () => []);
    for (let i = 0; i < cardsPerPlayer; i++) {
      for (let j = 0; j < numPlayers; j++) {
        hands[j].push(deck.pop());
      }
    }
    return hands;
  };
  
  // Check if a move is valid
  export const isValidMove = (card, topCard) => {
    return (
      card.number === topCard.number ||
      card.suit === topCard.suit ||
      card.number === 8
    );
  };
  
  // AI move logic
  export const getComputerMove = (hand, topCard) => {
    const validCard = hand.find(card => isValidMove(card, topCard));
    return validCard || 'draw';
  };
  