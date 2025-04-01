import "./Home.css";
import React, { useState } from "react";
import MainContent from "./maincontent";

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Logo on the left */}
      <div style={styles.logoContainer}>
        <img src="/LogoTrgovino.webp" alt="Логотип" style={styles.logo} />
      </div>

      {/* MainContent component on the right */}
      <div style={styles.contentContainer}>
        <MainContent />
      </div>
    </div>
  );
}
// Main page style
const styles = {
  container: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
    padding: "20px",
  },
  logoContainer: {
    flexShrink: 0,
  },
  logo: {
    width: "600px",
    height: "600px",
    cursor: "pointer",
  },
  contentContainer: {
    flexGrow: 1,
  },
};
