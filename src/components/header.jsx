import React from "react";

const buttons = [
  { id: "one", icon: "/home.svg" },
  { id: "two", icon: "/search.png" },
  { id: "three", icon: "/tictactoe.png" },
  { id: "four", icon: "/contactus.png" },
  { id: "five", icon: "/trolley.png" },
  { id: "six", icon: "/user.png" },
];

export default function Header({ onContentChange }) {
  return (
    <header >
      {buttons.map((button) => (
        <button 
          key={button.id}
          onClick={() => onContentChange(button.id)}
          className="p-4 flex justify-between w-full"
        >
          <img
            src={button.icon}
            alt={button.id}
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
          />
        </button>
      ))}
    </header>
  );
}