// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>🎲 Izposojevalnica iger</h1>
      <p>Dobrodošli! Tukaj lahko izberete igro za igranje ali nakup.</p>

      {/* Gumb za Crazy 8 */}
      <Link to="/crazy8">
        <button style={{ marginTop: '30px', padding: '10px 20px', fontSize: '16px' }}>
          🎮 Zaženi Crazy 8
        </button>
      </Link>
    </div>
  );
};

export default Home;
