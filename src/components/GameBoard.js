// src/components/GameBoard.js
import React, { useState, useEffect } from 'react';
import { shuffleDeck, dealCards, isValidMove, getComputerMove } from '../utils/gameLogic';
import Hand from './Hand';
import StatusBar from './StatusBar';

const GameBoard = () => {
  const [deck, setDeck] = useState([]);
  const [hands, setHands] = useState([[], []]);
  const [topCard, setTopCard] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [message, setMessage] = useState('');
  const [winner, setWinner] = useState(null);
  const [skipNext, setSkipNext] = useState(false);
  const [drawTwo, setDrawTwo] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pendingWildCard, setPendingWildCard] = useState(null);

  const startGame = () => {
    const newDeck = shuffleDeck();
    const newHands = dealCards([...newDeck], 2, 5);
    const starterCard = newDeck.pop();

    setDeck(newDeck);
    setHands(newHands);
    setTopCard(starterCard);
    setCurrentPlayer(0);
    setMessage('Game started!');
    setWinner(null);
    setSkipNext(false);
    setDrawTwo(false);
    setShowColorPicker(false);
    setPendingWildCard(null);
  };

  const handleSpecialEffects = (card, nextPlayerHand, currentHandIndex) => {
    let updatedHands = [...hands];

    if (card.number === 2) {
      if (deck.length >= 2) {
        nextPlayerHand.push(deck.pop(), deck.pop());
        setMessage('Draw 2 activated!');
        setDrawTwo(true);
      }
    } else if (card.number === 1) {
      setMessage('Skip turn activated!');
      setSkipNext(true);
    } else if (card.number === 8) {
      setShowColorPicker(true);
      setPendingWildCard(card);
      return hands;
    } else {
      setDrawTwo(false);
      setSkipNext(false);
    }

    updatedHands[currentHandIndex] = hands[currentHandIndex].filter(c => c !== card);
    return updatedHands;
  };

  const handleCardClick = (card) => {
    if (currentPlayer !== 0 || winner) return;
    if (!isValidMove(card, topCard)) {
      // Check if player has ANY valid move at all
      const hasValidMove = hands[0].some(c => isValidMove(c, topCard));
      if (!hasValidMove) {
        setWinner('Computer');
        setMessage('No valid moves. Computer wins!');
      } else {
        setMessage('Invalid move!');
      }
      return;
    }

    const updatedHands = handleSpecialEffects(card, hands[1], 0);

    if (card.number === 8) return;

    setHands(updatedHands);
    setTopCard(card);

    if (updatedHands[0].length === 0) {
      setWinner('You');
      setMessage('You won!');
    } else {
      setCurrentPlayer(skipNext ? 0 : 1);
      setSkipNext(false);
    }
  };

  const handleColorChoice = (color) => {
    if (!pendingWildCard) return;

    const coloredCard = { ...pendingWildCard, suit: color };
    const updatedHands = hands.map((hand, idx) =>
      idx === 0 ? hand.filter(c => c !== pendingWildCard) : hand
    );

    setTopCard(coloredCard);
    setHands(updatedHands);
    setShowColorPicker(false);
    setPendingWildCard(null);

    if (updatedHands[0].length === 0) {
      setWinner('You');
      setMessage('You won!');
    } else {
      setCurrentPlayer(1);
    }
  };

  useEffect(() => {
    if (currentPlayer === 1 && !winner) {
      const timer = setTimeout(() => {
        let computerHand = hands[1];

        if (drawTwo && deck.length >= 2) {
          computerHand = [...computerHand, deck.pop(), deck.pop()];
          setDrawTwo(false);
          setMessage('Computer drew 2 cards.');
          setHands([hands[0], computerHand]);
          setCurrentPlayer(0);
          return;
        }

        const move = getComputerMove(computerHand, topCard);

        if (move === 'draw') {
          if (deck.length > 0) {
            const newCard = deck.pop();
            const updatedComputerHand = [...computerHand, newCard];
            const newHands = [hands[0], updatedComputerHand];
            setDeck([...deck]);
            setHands(newHands);
            setMessage('Computer drew a card.');
          } else {
            setMessage('Deck is empty!');
          }
          setCurrentPlayer(0);
        } else {
          if (move.number === 8) {
            const randomColor = ['♠', '♥', '♦', '♣'][Math.floor(Math.random() * 4)];
            move.suit = randomColor;
          }

          const updatedHands = handleSpecialEffects(move, hands[0], 1);
          setHands(updatedHands);
          setTopCard(move);
          setMessage('Computer played a card.');

          if (updatedHands[1].length === 0) {
            setWinner('Computer');
            setMessage('Computer won!');
          } else {
            setCurrentPlayer(skipNext ? 1 : 0);
            setSkipNext(false);
          }
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, hands, topCard, deck, winner, skipNext, drawTwo]);

  return (
    <div className="game-board">
      <h2>Crazy 8</h2>
      <button onClick={startGame}>New Game</button>

      {topCard && (
        <div className="top-card">
          <h4>Card on table:</h4>
          <div>{topCard.suit} {topCard.number}</div>
        </div>
      )}

      <StatusBar currentPlayer={currentPlayer === 0 ? 'You' : 'Computer'} message={message} />

      <h3>Your Hand:</h3>
      <Hand cards={hands[0]} onCardClick={handleCardClick} />

      {showColorPicker && (
        <div className="color-picker">
          <p>Choose a color for the 8:</p>
          {['♠', '♥', '♦', '♣'].map((color, i) => (
            <button key={i} onClick={() => handleColorChoice(color)}>{color}</button>
          ))}
        </div>
      )}

      {winner && (
        <>
          <h3 className="winner-message">
            🏆 {winner === 'You' ? 'Congratulations, you won!' : 'Computer wins this round!'} 🏆
          </h3>
          <button onClick={startGame}>Play Again</button>
        </>
      )}
    </div>
  );
};

export default GameBoard;
