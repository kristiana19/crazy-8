import React, { useState } from "react";
import { products } from "../data";
import { useCart } from "../Cart/CartContext";
import "./gamecards.css";

export default function GameCards() {
  return <ShoppingCartApp />;
}

function ShoppingCartApp() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const categories = [...new Set(products.map((product) => product.category))];

  const { cart } = useCart();
console.log("Cart contents:", cart);

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
    
      {/* Search input field */}

      <div className="inputframe">
      <input className="input"
        type="text"
        placeholder="Iskanje po imenu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Category filter dropdown */}
      <select
        className="input"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="" className="text-gray-500">Vse kategorije</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      {/* Price filter input */}
      <input className="input"
        type="number"
        placeholder="Najvišja cena"
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
      />
      {/* Rating filter input */}
      <input className="input"
        type="number"
        placeholder="Najvišja ocena"
        value={ratingFilter}
        onChange={(e) => setRatingFilter(e.target.value)}
      />
    </div>

      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="gameframe"
            >
              {/* Image block */}
              <div className="image">
                <img
                  src={product.icon}
                  alt={product.name}
                  className="object-contain w-full h-full"
                  style={{
                    width: "300px",
                    height: "300px",
                    margin: "50px",
                  }}
                />
              </div>
              {/* Information block */}
              <div className="textframe">
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
      
    </div>
  );
}