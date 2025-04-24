import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import NavigationBar from "./NavigationBar";
import NewsletterPopup from "./NewsletterPopup";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show newsletter popup after 5 seconds
    const timer = setTimeout(() => {
      // Check if user has already closed the popup in this session
      const hasClosedPopup = sessionStorage.getItem("hasClosedPopup");
      if (!hasClosedPopup) {
        setShowPopup(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    // Store in session storage that user has closed the popup
    sessionStorage.setItem("hasClosedPopup", "true");
  };

  const handleSubscribe = (email: string) => {
    // Handle newsletter subscription logic here
    console.log(`Subscribed with email: ${email}`);
    setShowPopup(false);
    sessionStorage.setItem("hasClosedPopup", "true");
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main>
        <HeroSection />

        {/* Additional sections would be added here */}
        <section className="py-20 px-6 bg-neutral-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">
              Our Latest Collection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Featured perfumes */}
              {[
                {
                  name: "Ethereal Bloom",
                  description:
                    "A delicate floral bouquet with notes of jasmine and lily",
                  image:
                    "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80",
                },
                {
                  name: "Midnight Velvet",
                  description:
                    "Rich and mysterious with amber and sandalwood undertones",
                  image:
                    "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=500&q=80",
                },
                {
                  name: "Citrus Whisper",
                  description:
                    "Refreshing blend of bergamot and mandarin with a hint of vanilla",
                  image:
                    "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=500&q=80",
                },
              ].map((perfume, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="aspect-square overflow-hidden rounded-md mb-4">
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-serif mb-2">{perfume.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {perfume.description}
                  </p>
                  <button className="text-sm font-medium text-primary hover:underline">
                    Discover More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              The Essence of Luxury
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              At Essentia, we believe that fragrance is an expression of
              individuality and a journey of the senses. Each bottle is crafted
              with precision using only the finest ingredients sourced from
              around the world.
            </p>
            <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
              About Our Process
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">Essentia</h3>
            <p className="text-neutral-400">
              Luxury fragrances that awaken your senses and elevate your
              presence.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  All Fragrances
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Bestsellers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Gift Sets
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">About</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Ingredients
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Customer Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-neutral-800 text-neutral-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 Essentia. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Shipping & Returns
              </a>
            </div>
          </div>
        </div>
      </footer>

      {showPopup && (
        <NewsletterPopup
          onClose={handleClosePopup}
          onSubscribe={handleSubscribe}
        />
      )}
    </div>
  );
};

export default Home;
