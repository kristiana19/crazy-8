// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [purchasedGames, setPurchasedGames] = useState([]);

  const addToCart = (gameId) => {
    if (!purchasedGames.includes(gameId)) {
      setPurchasedGames([...purchasedGames, gameId]);
    }
  };

  const isGamePurchased = (gameId) => purchasedGames.includes(gameId);

  return (
    <CartContext.Provider value={{ purchasedGames, addToCart, isGamePurchased }}>
      {children}
    </CartContext.Provider>
  );
};
