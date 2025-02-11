'use client';
import Image from "next/image";
import React, { useState } from "react";

const ProductPage: React.FC = () => {
  const [size, setSize] = useState<string>("S");
  const [color, setColor] = useState<string>("Black");
  const [quantity, setQuantity] = useState<number>(1);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="container max-w-screen-lg mx-auto p-12 grid gap-12 grid-cols-1 lg:grid-cols-2">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
            alt="Armbet Zipped Hoodie"
            className="w-full max-w-md object-contain"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-800">Hoodie</h1>
          <p className="text-2xl text-gray-600">Rs. 100000</p>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sit
            neque iste veritatis eos cum velit laborum autem quidem facere,
            itaque rem officia, at ratione nobis esse. Iure, quis tenetur!
          </p>

          {/* Product Features */}
          <ul className="list-none p-0 m-0 text-gray-500 space-y-2">
            <li>:: 50% cotton, 50% polyester</li>
            <li>:: Medium-heavy fabric</li>
            <li>:: Classic fit</li>
            <li>:: Sewn in label</li>
            <li>:: Fits true to size</li>
          </ul>

          {/* Selection Section */}
          <div className="flex flex-col gap-4">
            {/* Size */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Size</label>
              <select
                value={size}
                onChange={handleSizeChange}
                className="w-full bg-white border border-gray-300 rounded px-4 py-2 text-gray-800"
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            {/* Color */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Color</label>
              <select
                value={color}
                onChange={handleColorChange}
                className="w-full bg-white border border-gray-300 rounded px-4 py-2 text-gray-800"
              >
                <option value="Black">Black</option>
                <option value="Gray">Gray</option>
              </select>
            </div>

            {/* Quantity */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Quantity</label>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="text-lg font-bold bg-gray-200 border border-gray-300 px-4 py-2 hover:bg-gray-300"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-16 text-center text-lg font-bold border-t border-b border-gray-300 px-4 py-2"
                />
                <button
                  type="button"
                  className="text-lg font-bold bg-gray-200 border border-gray-300 px-4 py-2 hover:bg-gray-300"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-gray-800 text-white px-6 py-3 rounded text-center text-lg hover:bg-gray-900">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
