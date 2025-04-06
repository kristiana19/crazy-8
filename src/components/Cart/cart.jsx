import React from "react";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart, addToCart, removeFromCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Košarica</h2>
      {cart.length === 0 ? (
        <p>Košarica je prazna</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-2"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>
                  {item.quantity} x {item.price} € ={" "}
                  {item.quantity * item.price} €
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  −
                </button>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-green-500 text-white px-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <hr className="my-2" />
          <p className="font-bold">Skupaj: {total.toFixed(2)} €</p>
        </>
      )}
    </div>
  );
}
