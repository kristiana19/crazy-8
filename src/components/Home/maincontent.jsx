import React, { useState } from "react";
import { About } from "../data";

const MainContent = () => {
  const [showComponents, setShowComponents] = useState(false);

  // Function to hide all components
  const hideComponents = () => {
    setShowComponents(true);
  };

  return (
    <main className="p-6 bg-gray-100 rounded-2xl shadow-lg width: 700px height: 700px">
      <h1
        style={{
          color: "lightblue",
          textShadow: "2px 2px 4px black",
          textAlign: "center",
        }}
      >
        Igralna Trgovina
      </h1>

      <p style={{ color: "white", textAlign: "center" }}>{About}</p>
    </main>
  );
};

export default MainContent;
