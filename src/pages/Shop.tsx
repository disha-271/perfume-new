import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const Shop = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<Product[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Midnight Bloom",
      category: "floral",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80",
      description:
        "A captivating floral fragrance with notes of jasmine and rose.",
    },
    {
      id: 2,
      name: "Ocean Breeze",
      category: "fresh",
      price: 95,
      image:
        "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=500&q=80",
      description:
        "A refreshing scent inspired by the sea with citrus undertones.",
    },
    {
      id: 3,
      name: "Amber Woods",
      category: "woody",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=500&q=80",
      description: "A warm, woody fragrance with amber and sandalwood notes.",
    },
    {
      id: 4,
      name: "Velvet Oud",
      category: "oriental",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1592945403407-9caf930b7505?w=500&q=80",
      description: "A rich oriental scent with deep oud and vanilla accords.",
    },
    {
      id: 5,
      name: "Citrus Splash",
      category: "fresh",
      price: 85,
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80",
      description: "A vibrant blend of lemon, bergamot, and grapefruit.",
    },
    {
      id: 6,
      name: "Rose Petal",
      category: "floral",
      price: 110,
      image:
        "https://images.unsplash.com/photo-1557682250-81f14a41e907?w=500&q=80",
      description: "A delicate rose fragrance with hints of peony and lily.",
    },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "floral", label: "Floral" },
    { value: "fresh", label: "Fresh" },
    { value: "woody", label: "Woody" },
    { value: "oriental", label: "Oriental" },
  ];

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="bg-white min-h-screen">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-serif font-medium text-gray-900 mb-8 text-center">
          Shop Our Collection
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-1/4 bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-serif font-medium text-gray-900 mb-4">
              Filters
            </h2>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Category
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => handleCategoryChange(category.value)}
                    className={`flex items-center text-sm ${selectedCategory === category.value ? "text-gray-900 font-medium" : "text-gray-500"}`}
                  >
                    <span
                      className={`w-4 h-4 mr-2 rounded-full border ${selectedCategory === category.value ? "bg-gray-900 border-gray-900" : "border-gray-300"} flex items-center justify-center`}
                    >
                      {selectedCategory === category.value && (
                        <Check size={12} className="text-white" />
                      )}
                    </span>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Price Range
              </h3>
              <Slider
                defaultValue={[0, 300]}
                max={300}
                step={5}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Reset Filters */}
            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={() => {
                setSelectedCategory("all");
                setPriceRange([0, 300]);
              }}
            >
              Reset Filters
            </Button>

            {/* Cart Summary */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Cart</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {cart.length} items
                </span>
                <span className="text-sm font-medium">
                  ${cart.reduce((sum, item) => sum + item.price, 0)}
                </span>
              </div>
              <Button className="w-full mt-4" disabled={cart.length === 0}>
                <ShoppingCart size={16} className="mr-2" />
                Checkout
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full md:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-serif font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.category.charAt(0).toUpperCase() +
                          product.category.slice(1)}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">
                          ${product.price}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="text-xs"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
