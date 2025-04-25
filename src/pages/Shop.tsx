import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart, Heart, Share2, RefreshCw } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";
import ProductDetail from "@/components/ProductDetail";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  details?: string;
  ingredients?: string[];
  reviews?: Review[];
}

const Shop = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDetailOpen, setProductDetailOpen] = useState(false);

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
      details: "Midnight Bloom is our signature floral fragrance, crafted to evoke the enchanting scent of a moonlit garden. This elegant perfume opens with delicate notes of jasmine and rose, complemented by subtle hints of lily and peony. The heart reveals a touch of fresh bergamot and green tea, while the base notes of white musk and sandalwood provide a soft, lingering finish that lasts throughout the day.",
      ingredients: ["Jasmine", "Rose", "Lily", "Peony", "Bergamot", "Green Tea", "White Musk", "Sandalwood"],
      reviews: [
        {
          id: 1,
          name: "Sophia Williams",
          rating: 5,
          date: "2023-11-15",
          comment: "This fragrance is absolutely divine! The floral notes are perfectly balanced and the scent lasts all day. I've received so many compliments when wearing it."
        },
        {
          id: 2,
          name: "Emma Thompson",
          rating: 4,
          date: "2023-10-28",
          comment: "Beautiful scent that evolves nicely throughout the day. The jasmine is prominent but not overwhelming. Taking off one star because I wish it lasted a bit longer."
        }
      ]
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
      details: "Ocean Breeze captures the invigorating essence of a coastal morning. This fresh, aquatic fragrance opens with bright notes of bergamot and mandarin, balanced by sea salt and ozonic accords. The heart reveals hints of lavender and rosemary, while base notes of driftwood and white musk create a clean, lasting finish that evokes the feeling of standing on a breezy shoreline.",
      ingredients: ["Bergamot", "Mandarin", "Sea Salt", "Lavender", "Rosemary", "Driftwood", "White Musk"],
      reviews: [
        {
          id: 1,
          name: "James Wilson",
          rating: 5,
          date: "2023-12-05",
          comment: "Perfect summer scent! Light, refreshing, and not overpowering. Reminds me of vacations by the ocean."
        },
        {
          id: 2,
          name: "Olivia Martinez",
          rating: 5,
          date: "2023-09-18",
          comment: "I've been searching for the perfect fresh scent for years, and I've finally found it. The citrus notes are perfectly balanced with the aquatic elements."
        }
      ]
    },
    {
      id: 3,
      name: "Amber Woods",
      category: "woody",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=500&q=80",
      description: "A warm, woody fragrance with amber and sandalwood notes.",
      details: "Amber Woods is a sophisticated woody fragrance that evokes the warmth and depth of a forest at sunset. This rich scent opens with subtle spice notes of cardamom and black pepper, leading to a heart of cedarwood and vetiver. The base reveals a luxurious blend of amber, sandalwood, and vanilla, creating a warm, enveloping aura that's perfect for evening wear or cooler seasons.",
      ingredients: ["Cardamom", "Black Pepper", "Cedarwood", "Vetiver", "Amber", "Sandalwood", "Vanilla"],
      reviews: [
        {
          id: 1,
          name: "Alexander Chen",
          rating: 5,
          date: "2023-10-30",
          comment: "This is now my signature scent. The woody notes are sophisticated without being overwhelming, and the amber gives it a wonderful warmth."
        },
        {
          id: 2,
          name: "Isabella Garcia",
          rating: 4,
          date: "2023-11-12",
          comment: "A beautiful woody fragrance that's perfect for fall and winter. The sandalwood and amber combination is divine. Lasts all day on me."
        }
      ]
    },
    {
      id: 4,
      name: "Velvet Oud",
      category: "oriental",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1592945403407-9caf930b7505?w=500&q=80",
      description: "A rich oriental scent with deep oud and vanilla accords.",
      details: "Velvet Oud is our most luxurious oriental fragrance, designed for those who appreciate complex, opulent scents. This rich perfume opens with saffron and rose, leading to a heart of rare oud and patchouli. The base reveals a sumptuous blend of vanilla, amber, and musk that creates a long-lasting, sophisticated trail. Velvet Oud is perfect for special occasions and evening wear.",
      ingredients: ["Saffron", "Rose", "Oud", "Patchouli", "Vanilla", "Amber", "Musk"],
      reviews: [
        {
          id: 1,
          name: "Michael Johnson",
          rating: 5,
          date: "2023-12-15",
          comment: "This is the most sophisticated fragrance I've ever owned. The oud is authentic and beautifully balanced with the vanilla. Worth every penny."
        },
        {
          id: 2,
          name: "Sophia Lee",
          rating: 5,
          date: "2023-11-28",
          comment: "An absolutely stunning oriental fragrance. Complex, mysterious, and long-lasting. I receive compliments every time I wear it."
        }
      ]
    },
    {
      id: 5,
      name: "Citrus Splash",
      category: "fresh",
      price: 85,
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80",
      description: "A vibrant blend of lemon, bergamot, and grapefruit.",
      details: "Citrus Splash is a vibrant, energizing fragrance that captures the essence of sun-ripened citrus fruits. This bright scent opens with zesty notes of Sicilian lemon, bergamot, and pink grapefruit, complemented by hints of mandarin and lime. The heart reveals subtle floral accents of neroli and petitgrain, while the base notes of white musk and cedarwood provide a clean, refreshing finish.",
      ingredients: ["Sicilian Lemon", "Bergamot", "Pink Grapefruit", "Mandarin", "Lime", "Neroli", "Petitgrain", "White Musk", "Cedarwood"],
      reviews: [
        {
          id: 1,
          name: "Emily Davis",
          rating: 4,
          date: "2023-08-20",
          comment: "Such a refreshing scent for summer! The citrus notes are bright and uplifting. My only wish is that it lasted a bit longer."
        },
        {
          id: 2,
          name: "Daniel Smith",
          rating: 5,
          date: "2023-07-15",
          comment: "This has become my go-to fragrance for work. It's fresh, clean, and not overpowering. The bergamot note is especially nice."
        }
      ]
    },
    {
      id: 6,
      name: "Rose Petal",
      category: "floral",
      price: 110,
      image:
        "https://images.unsplash.com/photo-1557682250-81f14a41e907?w=500&q=80",
      description: "A delicate rose fragrance with hints of peony and lily.",
      details: "Rose Petal is a modern interpretation of the classic rose fragrance, designed to capture the delicate beauty of a blooming rose garden. This elegant scent opens with fresh notes of Bulgarian rose and peony, complemented by subtle hints of lily of the valley and violet. The heart reveals touches of raspberry and pink pepper, while base notes of white amber and musk create a soft, feminine finish.",
      ingredients: ["Bulgarian Rose", "Peony", "Lily of the Valley", "Violet", "Raspberry", "Pink Pepper", "White Amber", "Musk"],
      reviews: [
        {
          id: 1,
          name: "Charlotte Brown",
          rating: 5,
          date: "2023-09-10",
          comment: "The most beautiful rose fragrance I've ever tried. It's not old-fashioned at all - very modern and fresh while still being unmistakably rosy."
        },
        {
          id: 2,
          name: "William Taylor",
          rating: 4,
          date: "2023-10-05",
          comment: "Bought this for my wife and she loves it. The rose scent is authentic but not overwhelming. Very elegant."
        }
      ]
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

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setProductDetailOpen(true);
  };

  const closeProductDetail = () => {
    setProductDetailOpen(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  useEffect(() => {
    // Add active class to staggered elements after component mounts
    const staggerElements = document.querySelectorAll('.stagger-fade-in');
    staggerElements.forEach(element => {
      element.classList.add('active');
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-5xl font-serif font-medium mb-4 tracking-tight gradient-text neon-glow" data-text="Shop Our Collection">
            Shop Our Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto typewriter">
            Discover our exquisite fragrances crafted with the finest ingredients from around the world.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-1/4 bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 h-fit sticky top-24 glow custom-scrollbar">
            <h2 className="text-xl font-serif font-medium text-gray-900 mb-6 flex items-center gradient-text">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary float" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Filters
            </h2>

            {/* Category Filter */}
            <div className="mb-8 stagger-fade-in">
              <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wider neon-glow">
                Category
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => handleCategoryChange(category.value)}
                    className={`flex items-center text-sm w-full transition-all duration-200 hover:translate-x-1 ${
                      selectedCategory === category.value
                        ? "text-primary font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 mr-3 rounded-full border-2 ${
                        selectedCategory === category.value
                          ? "border-primary bg-primary/10 pulse"
                          : "border-gray-300"
                      } flex items-center justify-center transition-all duration-200`}
                    >
                      {selectedCategory === category.value && (
                        <Check size={12} className="text-primary" />
                      )}
                    </span>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8 stagger-fade-in">
              <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wider neon-glow">
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
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-primary/10 rounded-md text-sm font-medium text-primary">
                  ${priceRange[0]}
                </span>
                <div className="h-[1px] flex-1 mx-2 bg-neutral-200 relative">
                  <div
                    className="absolute top-0 h-[3px] bg-primary rounded-full"
                    style={{
                      left: `${(priceRange[0] / 300) * 100}%`,
                      width: `${((priceRange[1] - priceRange[0]) / 300) * 100}%`
                    }}
                  ></div>
                </div>
                <span className="px-3 py-1 bg-primary/10 rounded-md text-sm font-medium text-primary">
                  ${priceRange[1]}
                </span>
              </div>
            </div>

            {/* Reset Filters */}
            <Button
              variant="outline"
              className="w-full mb-8 border-dashed hover:bg-neutral-50 transition-all duration-200 liquid-btn"
              onClick={() => {
                setSelectedCategory("all");
                setPriceRange([0, 300]);
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2 animate-spin-slow" />
              Reset Filters
            </Button>

            {/* Cart Summary */}
            <div className="pt-6 border-t border-neutral-200 stagger-fade-in">
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl mb-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gradient-text">
                  <ShoppingCart size={16} className="mr-2 text-primary pulse" />
                  Your Cart
                </h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                  </span>
                  <span className="text-xl font-medium gradient-text">
                    ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                  </span>
                </div>
                <div className="h-2 w-full bg-white rounded-full overflow-hidden shadow-inner mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 shimmer"
                    style={{ width: `${Math.min(cart.length * 10, 100)}%` }}
                  ></div>
                </div>

                {cart.length > 0 && (
                  <div className="bg-white p-3 rounded-lg shadow-sm mb-4 max-h-32 overflow-y-auto custom-scrollbar">
                    {cart.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-1 border-b last:border-0">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-neutral-100 overflow-hidden mr-2">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs text-gray-700 truncate max-w-[100px]">{item.name}</span>
                        </div>
                        <span className="text-xs font-medium">${item.price}</span>
                      </div>
                    ))}
                    {cart.length > 3 && (
                      <div className="text-xs text-center text-gray-500 pt-1">
                        +{cart.length - 3} more items
                      </div>
                    )}
                  </div>
                )}

                {cart.length === 0 && (
                  <div className="text-center py-2 text-sm text-gray-500">
                    Your cart is empty
                  </div>
                )}
              </div>
              <Button
                className="w-full group relative overflow-hidden py-6"
                disabled={cart.length === 0}
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-primary group-hover:skew-x-12 group-hover:translate-x-full"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 -translate-x-full group-hover:skew-x-0 group-hover:translate-x-0 bg-primary-dark"></span>
                <span className="relative flex items-center justify-center">
                  <ShoppingCart size={16} className="mr-2 group-hover:animate-bounce" />
                  Checkout
                </span>

                {/* Animated particles on hover */}
                <span className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></span>
                <span className="absolute top-0 left-2/4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.2s' }}></span>
                <span className="absolute top-0 left-3/4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.4s' }}></span>
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full md:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-neutral-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 mb-4">No products match your filters.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange([0, 300]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-neutral-100 flex flex-col tilt"
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;
                      const rotateX = (y - centerY) / 10;
                      const rotateY = (centerX - x) / 10;

                      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                      card.style.setProperty('--x', `${x}px`);
                      card.style.setProperty('--y', `${y}px`);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                    }}
                  >
                    <div
                      className="relative aspect-square w-full overflow-hidden cursor-pointer spotlight"
                      onClick={() => openProductDetail(product)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                        <span className="px-4 py-2 bg-white bg-opacity-90 rounded-full text-sm font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shimmer">
                          View Details
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 z-20">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white pulse">
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex space-x-2">
                          <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                            <Heart size={14} />
                          </button>
                          <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                            <Share2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col tilt-inner stagger-fade-in">
                      <h3
                        className="text-xl font-serif font-medium text-gray-900 cursor-pointer hover:text-primary transition-colors duration-200 mb-2 animated-border"
                        onClick={() => openProductDetail(product)}
                      >
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 flex-grow">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-xl font-medium gradient-text">
                          ${product.price}
                        </span>
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openProductDetail(product)}
                            className="text-xs border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 magnetic-btn"
                          >
                            Details
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="text-xs relative overflow-hidden group/btn liquid-btn ripple"
                          >
                            <span className="absolute inset-0 w-0 bg-white bg-opacity-30 transition-all duration-300 group-hover/btn:w-full"></span>
                            <span className="relative flex items-center">
                              <ShoppingCart size={14} className="mr-1" />
                              Add
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={productDetailOpen} onOpenChange={setProductDetailOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl">
          {selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onClose={closeProductDetail}
              onAddToCart={addToCart}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Shop;
