import React, { useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    console.log("Shranjeni podatki:", { firstName, lastName, email });
    // Tukaj lahko dodaš API klic za shranjevanje
  };

  return (
    <div className="profile-container">
      <img
        src="/user.png"
        alt="Uporabnik"
        className="w-24 h-24 rounded-full mb-4 border-4 border-cyan-400 shadow-lg"
      />

      {editing ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Ime"
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-inner w-full max-w-xs"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Priimek"
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-inner w-full max-w-xs"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email naslov"
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-inner w-full max-w-xs"
          />
          <button
            type="submit"
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
          >
            Shrani
          </button>
        </form>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-cyan-500">Vaš profil</h2>
          <p className="text-xl text-cyan-500 font-bold tracking-wide profile-text">
            {firstName} {lastName}
          </p>
          <p className="text-xl text-cyan-500 font-bold tracking-wide profile-text">{email}</p>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
          >
            Uredi profil
          </button>
        </>
      )}
    </div>
  );
}
