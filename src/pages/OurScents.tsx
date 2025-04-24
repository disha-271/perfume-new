import React, { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";

interface Scent {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

const scents: Scent[] = [
  {
    id: 1,
    name: "Ethereal Bloom",
    description: "A delicate floral bouquet with notes of jasmine and lily",
    category: "Floral",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80",
  },
  {
    id: 2,
    name: "Midnight Velvet",
    description: "Rich and mysterious with amber and sandalwood undertones",
    category: "Woody",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=500&q=80",
  },
  {
    id: 3,
    name: "Citrus Whisper",
    description:
      "Refreshing blend of bergamot and mandarin with a hint of vanilla",
    category: "Citrus",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=500&q=80",
  },
  {
    id: 4,
    name: "Ocean Breeze",
    description: "Fresh aquatic notes with a touch of sea salt and driftwood",
    category: "Fresh",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1595425964071-2c1b7eda0101?w=500&q=80",
  },
  {
    id: 5,
    name: "Amber Mystique",
    description: "Warm amber and vanilla with exotic spices",
    category: "Oriental",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=500&q=80",
  },
  {
    id: 6,
    name: "Lavender Dreams",
    description: "Calming lavender with hints of chamomile and bergamot",
    category: "Floral",
    price: 125,
    image:
      "https://images.unsplash.com/photo-1612968379066-74617f6cfb44?w=500&q=80",
  },
];

const categories = ["All", "Floral", "Woody", "Citrus", "Fresh", "Oriental"];
const priceRanges = ["All", "$100-$125", "$126-$150"];

const OurScents = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");

  const filteredScents = scents.filter((scent) => {
    // Filter by category
    const categoryMatch =
      selectedCategory === "All" || scent.category === selectedCategory;

    // Filter by price range
    let priceMatch = true;
    if (selectedPriceRange === "$100-$125") {
      priceMatch = scent.price >= 100 && scent.price <= 125;
    } else if (selectedPriceRange === "$126-$150") {
      priceMatch = scent.price >= 126 && scent.price <= 150;
    }

    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-serif mb-8 text-center">Our Scents</h1>

          {/* Filters */}
          <div className="mb-12 flex flex-col md:flex-row justify-center gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Price Range</h3>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <Button
                    key={range}
                    variant={
                      selectedPriceRange === range ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedPriceRange(range)}
                    className="rounded-full"
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Scents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredScents.map((scent) => (
              <div
                key={scent.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="aspect-square overflow-hidden rounded-md mb-4">
                  <img
                    src={scent.image}
                    alt={scent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif mb-2">{scent.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{scent.category}</p>
                <p className="text-muted-foreground mb-4">
                  {scent.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium">${scent.price}</span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredScents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                No scents match your filters.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedPriceRange("All");
                }}
                className="mt-2"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default OurScents;
