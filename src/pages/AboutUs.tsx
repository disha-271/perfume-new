import React from "react";
import NavigationBar from "@/components/NavigationBar";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif mb-8 text-center">About Us</h1>

          <div className="mb-16 aspect-video overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=1200&q=80"
              alt="Essentia Perfume Laboratory"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-serif mb-4">Our Story</h2>
            <p className="mb-6">
              Founded in 2010, Essentia was born from a passion for creating
              fragrances that evoke emotions and memories. Our founder, Isabella
              Laurent, a third-generation perfumer, set out to create a brand
              that would honor the traditional art of perfumery while embracing
              modern sensibilities.
            </p>

            <p className="mb-6">
              What began as a small atelier in Paris has grown into a globally
              recognized luxury fragrance house, but our commitment to quality
              and craftsmanship remains unchanged. Each Essentia fragrance is
              still created with the same attention to detail and passion that
              inspired our very first bottle.
            </p>

            <h2 className="text-2xl font-serif mb-4 mt-12">Our Philosophy</h2>
            <p className="mb-6">
              At Essentia, we believe that fragrance is more than just a
              scent—it's an expression of individuality, a trigger for memories,
              and a companion to life's most meaningful moments. We create
              fragrances that become an extension of the wearer, enhancing
              rather than overwhelming their natural presence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-serif mb-3">Craftsmanship</h3>
                <p>
                  Every Essentia fragrance is crafted by master perfumers who
                  train for years to develop their exceptional olfactory skills.
                  We source the finest ingredients from around the world,
                  working directly with producers to ensure quality and
                  sustainability.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-serif mb-3">Sustainability</h3>
                <p>
                  We are committed to responsible sourcing and production
                  practices. Our bottles are designed to be refillable, reducing
                  waste, and we partner with suppliers who share our commitment
                  to environmental stewardship and ethical labor practices.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-serif mb-4 mt-12">Our Team</h2>
            <p className="mb-6">
              The Essentia team is a diverse group of passionate individuals
              united by a love for exceptional fragrances. From our perfumers to
              our packaging designers, each team member brings unique expertise
              and creativity to our brand.
            </p>

            <div className="flex justify-center mt-12 mb-8">
              <blockquote className="italic text-xl text-center max-w-2xl">
                "A great perfume is a work of art, a composition that speaks to
                the soul and captures the essence of beauty."
                <footer className="text-right mt-2 text-base">
                  — Isabella Laurent, Founder
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
