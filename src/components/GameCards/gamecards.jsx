import React, { useState } from "react";
import { products } from "../data";
import "./gamecards.css";
import Cart from "../Cart/cart";
import { useCart } from "../../context/CartContext";

export default function GameCards() {
  /* 
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === id);
      if (existing.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== id);
      }
    });
  }; */
  const { cart, addToCart, removeFromCart } = useCart();
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <ShoppingCartApp addToCart={addToCart} />
        </div>
        <div className="w-full md:w-1/3">
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
          />
        </div>
      </div>
    </div>
  );
}

function ShoppingCartApp({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const categories = [...new Set(products.map((product) => product.category))];

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
      <div className="inputframe">
        <input
          className="input"
          type="text"
          placeholder="Iskanje po imenu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="input"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="" className="text-gray-500">
            Vse kategorije
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          className="input"
          type="number"
          placeholder="Najvišja cena"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Najvišja ocena"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        />
      </div>

      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="gameframe">
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
