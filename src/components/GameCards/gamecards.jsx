import React, { useState } from "react";
import { products } from "../data";
import "./gamecards.css";

export default function GameCards() {
  return <ShoppingCartApp />;
}

function ShoppingCartApp() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const categories = [...new Set(products.map((product) => product.category))];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  // Filter products based on search term, category, price, and rating
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? product.category === categoryFilter
      : true;
    const matchesPrice = priceFilter
      ? product.price <= parseFloat(priceFilter)
      : true;
    const matchesRating = ratingFilter
      ? product.rating <= parseFloat(ratingFilter)
      : true;
    return matchesName && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="p-4">
      {/* Header with store title */}
      <h1
        style={{
          color: "orange",
          textShadow: "2px 2px 4px black",
          textAlign: "center",
        }}
      >
        Igralna Trgovina
      </h1>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Iskanje po imenu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-2 border rounded-md"
      />
      {/* Category filter dropdown */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md"
      >
        <option value="">Vse kategorije</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      {/* Price filter input */}
      <input
        type="number"
        placeholder="Najvišja cena"
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded-md"
      />
      {/* Rating filter input */}
      <input
        type="number"
        placeholder="Najvišja ocena"
        value={ratingFilter}
        onChange={(e) => setRatingFilter(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded-md"
      />

      <div className="space-y-6 flex flex-col items-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="max-w-lg w-full border-2 border-gray-300 rounded-lg shadow-lg p-4 flex items-center gap-4 bg-white"
            >
              {/* Image block */}
              <div className="w-32 h-32 flex-shrink-0 border border-gray-400 rounded-md overflow-hidden">
                <img
                  src={product.icon}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  style={{
                    width: "300px",
                    height: "300px",
                    cursor: "pointer",
                    backgroundcolor: "transparent",
                  }}
                />
              </div>
              {/* Information block */}
              <div className="flex-1">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-700">{product.description}</p>
                <p>
                  <strong>Kategorija:</strong> {product.category}
                </p>
                <p>
                  <strong>Ocena:</strong> {product.rating}
                </p>
                <p>
                  <strong>Cena:</strong> {product.price} € na dan
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 p-2 bg-blue-500 text-white rounded-lg w-full"
                >
                  Dodaj v košarico
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Nič ni bilo najdeno</p>
        )}
      </div>
      {/* Shopping cart section */}
      <h2 className="text-xl font-semibold mt-6">Košarica</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Košarica je prazna</p>
      ) : (
        <ul className="list-disc pl-6">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center mb-2"
            >
              {item.name} — {item.price} € na dan
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-2 p-1 bg-red-500 text-white rounded"
              >
                Izbriši
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
