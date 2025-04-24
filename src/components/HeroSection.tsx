import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  tagline?: string;
  ctaText?: string;
  backgroundImage?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  tagline = "Awaken Your Senses",
  ctaText = "Shop Now",
  backgroundImage = "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=80",
  onCtaClick = () => console.log("CTA clicked"),
}: HeroSectionProps) => {
  return (
    <section className="relative h-[700px] w-full overflow-hidden bg-[#f8f5f2]">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {tagline}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button
            onClick={onCtaClick}
            className="bg-white px-8 py-6 text-base font-medium text-black hover:bg-white/90"
            size="lg"
          >
            {ctaText}
          </Button>
        </motion.div>
      </div>

      {/* Decorative element */}
      <motion.div
        className="absolute bottom-10 left-1/2 h-12 w-[1px] -translate-x-1/2 bg-white/50"
        initial={{ height: 0 }}
        animate={{ height: 48 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </section>
  );
};

export default HeroSection;
