import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

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

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("50ml");
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  // Default reviews if none provided
  const reviews = product.reviews || [
    {
      id: 1,
      name: "Emily Johnson",
      rating: 5,
      date: "2023-10-15",
      comment:
        "This fragrance is absolutely divine! The scent lasts all day and I've received so many compliments. Will definitely purchase again.",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      date: "2023-09-28",
      comment:
        "Very elegant scent with good longevity. The bottle design is also beautiful. Taking off one star because the price is a bit high.",
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      rating: 5,
      date: "2023-08-12",
      comment:
        "I've tried many luxury perfumes and this one stands out. The complexity of the notes is impressive and it evolves beautifully throughout the day.",
    },
  ];

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      price: product.price * quantity,
    });
  };

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleRatingChange = (rating: number) => {
    setNewReview({
      ...newReview,
      rating,
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    alert("Thank you for your review! It will be published after moderation.");
    setNewReview({
      name: "",
      rating: 5,
      comment: "",
    });
  };

  useEffect(() => {
    // Add active class to staggered elements after component mounts
    const staggerElements = document.querySelectorAll('.stagger-fade-in');
    staggerElements.forEach(element => {
      element.classList.add('active');
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Product Image */}
        <div className="relative group spotlight">
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white pulse">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <div className="aspect-square overflow-hidden bg-neutral-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="absolute bottom-4 right-4 z-10 flex space-x-2">
            <button className="w-10 h-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center hover:bg-opacity-100 hover:text-primary transition-all duration-200 shadow-sm magnetic-btn">
              <Heart size={18} className="text-gray-700" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center hover:bg-opacity-100 hover:text-primary transition-all duration-200 shadow-sm magnetic-btn">
              <Share2 size={18} className="text-gray-700" />
            </button>
          </div>

          {/* Floating elements */}
          <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-primary/10 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 float"></div>
          <div className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-secondary/10 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Product Info */}
        <div className="p-8 md:p-10 flex flex-col stagger-fade-in">
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${
                      star <=
                      reviews.reduce((sum, review) => sum + review.rating, 0) /
                        reviews.length
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    } transform transition-transform hover:scale-125`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                {reviews.length} reviews
              </span>
            </div>
            <h1 className="text-3xl font-serif font-medium gradient-text mb-3 neon-glow">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
            <div className="inline-block bg-gradient-to-r from-primary/20 to-secondary/20 px-6 py-3 rounded-full text-2xl font-medium text-primary mb-6 shimmer">
              ${product.price.toFixed(2)}
            </div>

            {/* Animated badge */}
            <div className="inline-flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium ml-3 float">
              <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              In Stock
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8 stagger-fade-in">
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-3 neon-glow">Size</h3>
            <div className="flex space-x-3">
              {["30ml", "50ml", "100ml"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-3 border-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 ${
                    selectedSize === size
                      ? "border-primary bg-primary/10 text-primary shadow-md shadow-primary/20"
                      : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className={selectedSize === size ? "gradient-text" : ""}>{size}</span>
                  {selectedSize === size && (
                    <div className="mt-1 h-0.5 w-full bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8 stagger-fade-in">
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-3 neon-glow">Quantity</h3>
            <div className="flex items-center w-36 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-sm -z-10"></div>
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-12 h-12 border-2 border-gray-200 bg-white flex items-center justify-center rounded-l-xl hover:bg-gray-50 transition-all duration-200 ripple"
              >
                <span className="text-xl font-medium text-gray-500">-</span>
              </button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-12 h-12 border-y-2 border-x-0 border-gray-200 text-center rounded-none text-gray-900 font-medium bg-white"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 border-2 border-gray-200 bg-white flex items-center justify-center rounded-r-xl hover:bg-gray-50 transition-all duration-200 ripple"
              >
                <span className="text-xl font-medium text-gray-500">+</span>
              </button>

              {/* Animated quantity indicator */}
              <div className="ml-4 flex items-center space-x-1">
                {Array.from({ length: Math.min(quantity, 5) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    style={{
                      animationName: 'pulse',
                      animationDuration: '1.5s',
                      animationIterationCount: 'infinite',
                      animationDelay: `${i * 0.2}s`
                    }}
                  ></div>
                ))}
                {quantity > 5 && (
                  <span className="text-xs text-gray-500">+{quantity - 5}</span>
                )}
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mb-8 stagger-fade-in">
            <Button
              onClick={handleAddToCart}
              className="w-full py-6 text-base group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-primary group-hover:skew-x-12 group-hover:translate-x-full"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 -translate-x-full group-hover:skew-x-0 group-hover:translate-x-0 bg-primary-dark"></span>
              <span className="relative flex items-center justify-center">
                <ShoppingCart size={18} className="mr-2 group-hover:animate-bounce" />
                Add to Cart
              </span>

              {/* Animated particles */}
              <span className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></span>
              <span className="absolute top-0 left-2/4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.2s' }}></span>
              <span className="absolute top-0 left-3/4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.4s' }}></span>

              {/* Ripple effect */}
              <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 group-hover:animate-ping"></span>
            </Button>

            {/* Secure checkout badge */}
            <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Checkout
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-8 mt-auto stagger-fade-in">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-gradient-to-r from-primary/5 to-secondary/5 p-1 rounded-xl">
                <TabsTrigger
                  value="details"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all duration-300"
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Details
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="ingredients"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all duration-300"
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Ingredients
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all duration-300"
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                    Shipping
                  </span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-2 text-gray-600 leading-relaxed stagger-fade-in">
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                  {product.details ||
                    `${product.name} is a luxurious fragrance crafted with the finest ingredients.
                    This elegant scent opens with vibrant top notes, followed by a complex heart,
                    and settles into a rich, long-lasting base. Perfect for both everyday wear and
                    special occasions, this fragrance embodies sophistication and timeless appeal.`}
                </div>
              </TabsContent>
              <TabsContent value="ingredients" className="pt-2 text-gray-600 stagger-fade-in">
                {product.ingredients ? (
                  <div className="grid grid-cols-2 gap-3 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                    {product.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center group">
                        <div className="w-3 h-3 rounded-full bg-primary/20 group-hover:bg-primary/50 flex items-center justify-center mr-2 transition-colors duration-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        </div>
                        <span className="group-hover:text-primary transition-colors duration-300">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 leading-relaxed">
                    Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene,
                    Linalool, Coumarin, Citronellol, Geraniol, Citral,
                    Cinnamal, Eugenol.
                  </div>
                )}
              </TabsContent>
              <TabsContent value="shipping" className="pt-2 text-gray-600 space-y-3 stagger-fade-in">
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3 float">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 gradient-text">Standard Shipping:</span> 3-5
                      business days <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-1">Free on orders over $100</span>
                    </div>
                  </div>
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3 float" style={{ animationDelay: '0.2s' }}>
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 gradient-text">Express Shipping:</span> 1-2
                      business days <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-1">$12.95</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3 float" style={{ animationDelay: '0.4s' }}>
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 gradient-text">International Shipping:</span>{" "}
                      7-14 business days <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full ml-1">Rates at checkout</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-gray-200 mt-8 pt-10 px-8 md:px-10 pb-10 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-medium text-gray-900 mb-8 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Customer Reviews
          </h2>

          {/* Review Summary */}
          <div className="flex flex-col md:flex-row items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 mb-8 stagger-fade-in">
            <div className="flex items-center mr-8 mb-4 md:mb-0">
              <div className="text-5xl font-medium text-primary mr-4">
                {(
                  reviews.reduce((sum, review) => sum + review.rating, 0) /
                  reviews.length
                ).toFixed(1)}
              </div>
              <div>
                <div className="flex mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={`${
                        star <=
                        reviews.reduce((sum, review) => sum + review.rating, 0) /
                          reviews.length
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  Based on {reviews.length} reviews
                </div>
              </div>
            </div>
            <div className="flex-grow">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = (count / reviews.length) * 100;
                return (
                  <div key={rating} className="flex items-center mb-1 last:mb-0">
                    <div className="text-xs text-gray-500 w-6">{rating}</div>
                    <Star size={14} className="text-yellow-400 fill-yellow-400 mr-2" />
                    <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 ml-2 w-8">{percentage.toFixed(0)}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-6 mb-12 stagger-fade-in">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
                      {review.name.charAt(0)}
                    </div>
                    <h3 className="font-medium text-gray-900">{review.name}</h3>
                  </div>
                  <span className="text-sm text-gray-500 bg-neutral-100 px-3 py-1 rounded-full">
                    {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${
                        star <= review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Write a Review */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 stagger-fade-in">
            <h3 className="text-xl font-serif font-medium text-gray-900 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write a Review
            </h3>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newReview.name}
                  onChange={handleReviewChange}
                  required
                  className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Rating</Label>
                <div className="flex space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="focus:outline-none transition-transform duration-200 hover:scale-110"
                    >
                      <Star
                        size={28}
                        className={`${
                          star <= newReview.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="comment" className="text-sm font-medium text-gray-700 mb-1 block">Your Review</Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={newReview.comment}
                  onChange={handleReviewChange}
                  rows={4}
                  required
                  className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                  placeholder="Share your experience with this product..."
                />
              </div>
              <Button
                type="submit"
                className="w-full py-6 text-base group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-primary group-hover:skew-x-12 group-hover:translate-x-full"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 -translate-x-full group-hover:skew-x-0 group-hover:translate-x-0 bg-primary-dark"></span>
                <span className="relative flex items-center justify-center">
                  Submit Review
                </span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
