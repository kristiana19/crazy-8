import React from "react";
import { useCart } from './CartContext'
import './Cart.css';


export default function Cart() {
  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div>
      <div className="cart-container">
      <h2>🛒 Košarica</h2>
        {cart.length === 0 ? (
        <p>Vaša košarica je prazna.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} x{item.quantity} = {(item.price * item.quantity).toFixed(2)} €
            </li>
          ))}
        </ul>
      )}
      <div>Skupaj: {total} €</div>
      </div>
    </div>
  );
}
