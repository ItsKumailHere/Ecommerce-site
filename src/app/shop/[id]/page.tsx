"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";
import { Button } from '@/components/ui/button'
import { useCart } from "@/app/components/CardContext";

const products = [
  {
    id: "1",
    name: "Premium Leather Jacket",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400",
    description:
      "Crafted from premium leather, this jacket features a timeless design with modern details. Perfect for any occasion, it offers both style and durability.",
  },
  {
    id: "2",
    name: "Designer Sunglasses",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400",
    description:
      "These designer sunglasses combine style and functionality. With UV protection and a sleek design, they're perfect for any outdoor activity.",
  },
  {
    id: "3",
    name: "Classic Watch",
    price: 499.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400",
    description:
      "This classic watch features a timeless design with modern functionality. Water-resistant and built to last, it's the perfect accessory for any outfit.",
  },
];

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState("M");
  const { addToCart } = useCart();

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-96 md:h-full">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-50 rounded-full">
            <Heart className="w-6 h-6 text-gray-800" />
          </button>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-gray-400 fill-current" />
            <span className="ml-2 text-gray-400">(4.8) 124 reviews</span>
          </div>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-6">{product.description}</p>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Select Size</h3>
            <div className="flex space-x-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`w-10 h-10 rounded-full ${
                    selectedSize === size ? "bg-purple-600" : "bg-gray-700"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <Button variant={"secondary"} onClick={handleAddToCart} className="w-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
