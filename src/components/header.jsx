import React from "react";

const buttons = [
  { id: "one", icon: "/home.svg" },
  { id: "two", icon: "/search.png" },
  { id: "three", icon: "/tictactoe.png" },
  { id: "four", icon: "/contactus.png" },
];
// Display four buttons in the header to toggle the visibility of components
export default function Header({ onContentChange }) {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between w-full">
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={() => onContentChange(button.id)}
          onm
          className={`${button.color} p-2 rounded flex justify-center items-center flex-1`} // Use flex-1 for even distribution
        >
          <img
            src={button.icon}
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              backgroundcolor: "transparent",
            }}
          />
        </button>
      ))}
    </header>
  );
}
