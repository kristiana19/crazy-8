import Header from "./components/header";
import React, { useState } from "react";
import Head from "./components/Head";
import Home from "./components/Home/Home";
import TicTacToe from "./components/TicTacToe/TicTacToe";
import GameCards from "./components/GameCards/gamecards";
import ContactUs from "./components/Contacts/contacts";

export default function App() {
  const [activeContent, setActiveContent] = useState(null);

  // Function to set the active content
  const handleContentChange = (content) => {
    setActiveContent(content);
  };
  return (
    <div className="Home">
      <Head />
      <header>
        <Header onContentChange={handleContentChange} />
      </header>

      <main className="p-8">
        {activeContent === "one" && <Home />}
        {activeContent === null && <Home />}
        {activeContent === "two" && <GameCards />}
        {activeContent === "three" && <TicTacToe />}
        {activeContent === "four" && <ContactUs />}
      </main>

      <footer>
        <p>
          Pokličite nas: <a href="tel:+1234567890">+1 (234) 567-890</a>
        </p>
      </footer>
    </div>
  );
}
