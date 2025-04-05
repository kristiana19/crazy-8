
import React from 'react';

const StatusBar = ({ currentPlayer, message }) => {
  return (
    <div className="status-bar">
      <p>Current turn: <strong>{currentPlayer}</strong></p>
      <p>{message}</p>
    </div>
  );
};

export default StatusBar;
