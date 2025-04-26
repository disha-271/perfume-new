import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface NavigationBarProps {
  logo?: string;
  links?: Array<{ label: string; href: string }>;
}

const NavigationBar = ({
  logo = "/logo.png",
  links = [
    { label: "Our Scents", href: "/scents" },
    { label: "About Us", href: "/about" },
    { label: "Shop", href: "/shop" },
    { label: "Fragrance Quiz", href: "/quiz" },
    { label: "Contact", href: "/contact" },
    { label: "Sign In", href: "/signin" },
  ],
}: NavigationBarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-serif font-medium text-gray-900">
            Essentia
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="text-gray-700 hover:text-gray-900 font-light text-sm transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-gray-700 hover:text-gray-900 font-light text-sm py-2 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
