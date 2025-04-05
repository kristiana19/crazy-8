import "./Home.css";
import React from "react";
import MainContent from "./maincontent";

export default function Home() {
  return (
    <div style={styles.container}>
      {/* MainContent component on the right */}
      <div style={styles.contentContainer}>
        <MainContent />
      </div>

      {/* Logo on the left */}
      <div style={styles.logoContainer}>
        <img src="/LogoTrgovino.webp" alt="Логотип" style={styles.logo} />
      </div>

      
    </div>
  );
}
// Main page style
const styles = {
  container: {
    display: "grid",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
  },
  logoContainer: {
    
  },
  logo: {
    display: "flex",
    margin: "auto",
    width: "1200px",
    height: "600px",
    cursor: "pointer",
  },
  contentContainer: {
    
  },
};
