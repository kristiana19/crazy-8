import Header from "./components/header";
import React, { useState } from "react";
import Head from "./components/Head";
import Home from "./components/Home/Home";
import GameCards from "./components/GameCards/gamecards";
import Crazy from "./components/Crazy 8/Crazy";
import ContactUs from "./components/Contacts/contacts";
import Cart from "./components/Cart/cart";
import Profile from "./components/Profile/Profile";

export default function App() {
  const [activeContent, setActiveContent] = useState(null);

  // Function to set the active content
  const handleContentChange = (content) => {
    setActiveContent(content);
  };
  return (
    <div className="Home">
      <Head />
      <header
        style={{ display: "flex", flex: "justify-between", width: "full" }}
      >
        <Header onContentChange={handleContentChange} />
      </header>

      <main>
        {activeContent === "one" && <Home />}
        {activeContent === null && <Home />}
        {activeContent === "two" && <GameCards />}
        {activeContent === "three" && <Crazy />}
        {activeContent === "four" && <ContactUs />}
        {activeContent === "five" && <Cart />}
        {activeContent === "six" && <Profile />}
      </main>

      <footer style={{ width: "100%", position: "fixed", bottom: "0" }}>
        <div
          style={{
            margin: "auto",
            padding: "10px",
            backgroundColor: "rgba(0, 158, 158, 0.49)",
            borderRadius: "16px",
            boxShadow: "0 0 30px rgba(0, 0, 0, 0.4)",
            textAlign: "center",
          }}
        >
          <p>
            Pokličite nas: <a href="tel:+1234567890">+1 (234) 567-890</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
