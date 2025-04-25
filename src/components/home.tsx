import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import NavigationBar from "./NavigationBar";
import NewsletterPopup from "./NewsletterPopup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "./ui/dialog";
import { Button } from "./ui/button";

// Define the perfume interface
interface Perfume {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  details: string;
  ingredients: string[];
}

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // State for the perfume dialog
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // State for the process dialog
  const [processDialogOpen, setProcessDialogOpen] = useState(false);

  // State for the collections dialog
  const [collectionDialogOpen, setCollectionDialogOpen] = useState(false);
  const [currentCollection, setCurrentCollection] = useState<string>("");

  // State for the about dialog
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);
  const [currentAboutSection, setCurrentAboutSection] = useState<string>("");

  // State for the contact dialog
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [currentContactSection, setCurrentContactSection] = useState<string>("");

  // Perfume collections data
  const allFragrances: Perfume[] = [
    {
      id: 1,
      name: "Ethereal Bloom",
      description: "A delicate floral bouquet with notes of jasmine and lily",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80",
      category: "Floral",
      price: 120,
      details: "Ethereal Bloom captures the essence of a spring garden in full bloom. This elegant fragrance opens with delicate notes of jasmine and lily, complemented by subtle hints of rose and peony.",
      ingredients: ["Jasmine", "Lily", "Rose", "Peony"]
    },
    {
      id: 2,
      name: "Midnight Velvet",
      description: "Rich and mysterious with amber and sandalwood undertones",
      image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=500&q=80",
      category: "Woody",
      price: 140,
      details: "Midnight Velvet is a sophisticated fragrance that evokes the mystery of twilight hours. This captivating scent combines rich amber and warm sandalwood with subtle undertones of vanilla and musk.",
      ingredients: ["Amber", "Sandalwood", "Vanilla", "Musk"]
    },
    {
      id: 3,
      name: "Citrus Whisper",
      description: "Refreshing blend of bergamot and mandarin with a hint of vanilla",
      image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=500&q=80",
      category: "Citrus",
      price: 110,
      details: "Citrus Whisper is a bright, invigorating fragrance that brings to mind sun-drenched orchards. This refreshing scent opens with zesty notes of bergamot and mandarin, balanced by the subtle sweetness of vanilla.",
      ingredients: ["Bergamot", "Mandarin", "Vanilla", "Lemon Verbena"]
    },
    {
      id: 4,
      name: "Ocean Breeze",
      description: "Fresh aquatic notes with a touch of sea salt and driftwood",
      category: "Fresh",
      price: 130,
      image: "https://images.unsplash.com/photo-1595425964071-2c1b7eda0101?w=500&q=80",
      details: "Ocean Breeze evokes the feeling of standing on a coastal cliff, with the sea breeze carrying hints of salt and fresh air. This clean, refreshing scent combines aquatic notes with subtle touches of driftwood and white musk.",
      ingredients: ["Sea Salt", "Driftwood", "White Musk", "Seaweed"]
    },
    {
      id: 5,
      name: "Amber Mystique",
      description: "Warm amber and vanilla with exotic spices",
      category: "Oriental",
      price: 150,
      image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=500&q=80",
      details: "Amber Mystique is a warm, enveloping fragrance that transports you to exotic lands. This rich oriental scent combines amber and vanilla with hints of cardamom, cinnamon, and other exotic spices for a truly captivating experience.",
      ingredients: ["Amber", "Vanilla", "Cardamom", "Cinnamon"]
    },
    {
      id: 6,
      name: "Lavender Dreams",
      description: "Calming lavender with hints of chamomile and bergamot",
      category: "Floral",
      price: 125,
      image: "https://images.unsplash.com/photo-1612968379066-74617f6cfb44?w=500&q=80",
      details: "Lavender Dreams is a soothing, calming fragrance designed to promote relaxation and tranquility. This gentle scent combines lavender with chamomile and bergamot, creating a peaceful aroma that's perfect for unwinding after a long day.",
      ingredients: ["Lavender", "Chamomile", "Bergamot", "Ylang-Ylang"]
    }
  ];

  const newArrivals: Perfume[] = [
    {
      id: 7,
      name: "Golden Sunset",
      description: "Warm and radiant with notes of amber and orange blossom",
      image: "https://images.unsplash.com/photo-1592945403407-9caf930b7505?w=500&q=80",
      category: "Oriental",
      price: 145,
      details: "Golden Sunset captures the magical moment when day turns to night. This warm, radiant fragrance combines amber and orange blossom with hints of vanilla and sandalwood for a truly enchanting experience.",
      ingredients: ["Amber", "Orange Blossom", "Vanilla", "Sandalwood"]
    },
    {
      id: 8,
      name: "Velvet Rose",
      description: "Luxurious rose with hints of peony and blackcurrant",
      image: "https://images.unsplash.com/photo-1557682250-81f14a41e907?w=500&q=80",
      category: "Floral",
      price: 135,
      details: "Velvet Rose is a luxurious floral fragrance that celebrates the queen of flowers. This elegant scent combines rich rose with peony and a touch of blackcurrant for a sophisticated and timeless aroma.",
      ingredients: ["Rose", "Peony", "Blackcurrant", "Musk"]
    },
    {
      id: 9,
      name: "Mountain Pine",
      description: "Fresh and invigorating with notes of pine and cedarwood",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80",
      category: "Woody",
      price: 120,
      details: "Mountain Pine transports you to a forest high in the mountains. This fresh, invigorating scent combines pine and cedarwood with hints of eucalyptus and mint for a truly refreshing experience.",
      ingredients: ["Pine", "Cedarwood", "Eucalyptus", "Mint"]
    }
  ];

  const bestsellers: Perfume[] = [
    {
      id: 2,
      name: "Midnight Velvet",
      description: "Rich and mysterious with amber and sandalwood undertones",
      image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=500&q=80",
      category: "Woody",
      price: 140,
      details: "Midnight Velvet is a sophisticated fragrance that evokes the mystery of twilight hours. This captivating scent combines rich amber and warm sandalwood with subtle undertones of vanilla and musk.",
      ingredients: ["Amber", "Sandalwood", "Vanilla", "Musk"]
    },
    {
      id: 5,
      name: "Amber Mystique",
      description: "Warm amber and vanilla with exotic spices",
      category: "Oriental",
      price: 150,
      image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=500&q=80",
      details: "Amber Mystique is a warm, enveloping fragrance that transports you to exotic lands. This rich oriental scent combines amber and vanilla with hints of cardamom, cinnamon, and other exotic spices for a truly captivating experience.",
      ingredients: ["Amber", "Vanilla", "Cardamom", "Cinnamon"]
    },
    {
      id: 3,
      name: "Citrus Whisper",
      description: "Refreshing blend of bergamot and mandarin with a hint of vanilla",
      image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=500&q=80",
      category: "Citrus",
      price: 110,
      details: "Citrus Whisper is a bright, invigorating fragrance that brings to mind sun-drenched orchards. This refreshing scent opens with zesty notes of bergamot and mandarin, balanced by the subtle sweetness of vanilla.",
      ingredients: ["Bergamot", "Mandarin", "Vanilla", "Lemon Verbena"]
    },
    {
      id: 6,
      name: "Lavender Dreams",
      description: "Calming lavender with hints of chamomile and bergamot",
      category: "Floral",
      price: 125,
      image: "https://images.unsplash.com/photo-1612968379066-74617f6cfb44?w=500&q=80",
      details: "Lavender Dreams is a soothing, calming fragrance designed to promote relaxation and tranquility. This gentle scent combines lavender with chamomile and bergamot, creating a peaceful aroma that's perfect for unwinding after a long day.",
      ingredients: ["Lavender", "Chamomile", "Bergamot", "Ylang-Ylang"]
    }
  ];

  const giftSets: Perfume[] = [
    {
      id: 10,
      name: "Floral Collection",
      description: "Set of three floral fragrances in elegant mini bottles",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80",
      category: "Gift Set",
      price: 250,
      details: "The Floral Collection gift set includes three of our most popular floral fragrances: Ethereal Bloom, Velvet Rose, and Lavender Dreams. Each comes in an elegant 15ml mini bottle, perfect for travel or sampling our different scents.",
      ingredients: ["Ethereal Bloom", "Velvet Rose", "Lavender Dreams"]
    },
    {
      id: 11,
      name: "Seasonal Favorites",
      description: "Four fragrances inspired by the seasons",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80",
      category: "Gift Set",
      price: 320,
      details: "The Seasonal Favorites gift set includes four fragrances inspired by the changing seasons: Citrus Whisper (Spring), Ocean Breeze (Summer), Amber Mystique (Fall), and Mountain Pine (Winter). Each comes in a 30ml bottle.",
      ingredients: ["Citrus Whisper", "Ocean Breeze", "Amber Mystique", "Mountain Pine"]
    },
    {
      id: 12,
      name: "Luxury Duo",
      description: "Our two most luxurious fragrances with matching body lotions",
      image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=500&q=80",
      category: "Gift Set",
      price: 280,
      details: "The Luxury Duo gift set includes our two most prestigious fragrances: Midnight Velvet and Golden Sunset. Each comes in a 50ml bottle accompanied by a matching scented body lotion for a complete fragrance experience.",
      ingredients: ["Midnight Velvet", "Golden Sunset", "Scented Body Lotions"]
    }
  ];

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

  const handleShopNowClick = () => {
    navigate('/shop');
  };

  // Function to open collection dialog
  const openCollectionDialog = (collectionName: string) => {
    setCurrentCollection(collectionName);
    setCollectionDialogOpen(true);
  };

  // Function to get the current collection data
  const getCurrentCollectionData = (): { title: string; perfumes: Perfume[] } => {
    switch (currentCollection) {
      case "All Fragrances":
        return { title: "All Fragrances", perfumes: allFragrances };
      case "New Arrivals":
        return { title: "New Arrivals", perfumes: newArrivals };
      case "Bestsellers":
        return { title: "Bestsellers", perfumes: bestsellers };
      case "Gift Sets":
        return { title: "Gift Sets", perfumes: giftSets };
      default:
        return { title: "", perfumes: [] };
    }
  };

  // Function to open about dialog
  const openAboutDialog = (sectionName: string) => {
    setCurrentAboutSection(sectionName);
    setAboutDialogOpen(true);
  };

  // Function to open contact dialog
  const openContactDialog = (sectionName: string) => {
    setCurrentContactSection(sectionName);
    setContactDialogOpen(true);
  };

  // Function to get the current about section content
  const getCurrentAboutContent = (): { title: string; subtitle: string; content: React.ReactNode } => {
    switch (currentAboutSection) {
      case "Our Story":
        return {
          title: "Our Story",
          subtitle: "The journey of Essentia Perfumes",
          content: (
            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=800&q=80"
                  alt="Essentia Founders"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif">Our Beginnings</h3>
                <p className="text-gray-600">
                  Essentia was founded in 2010 by master perfumer Isabella Laurent and entrepreneur Michael Chen,
                  who shared a vision of creating fragrances that tell stories and evoke emotions. What began as
                  a small atelier in Paris has grown into a globally recognized luxury fragrance house, while
                  maintaining our commitment to artisanal craftsmanship and quality.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif">Our Philosophy</h3>
                <p className="text-gray-600">
                  At Essentia, we believe that fragrance is more than just a scent—it's an experience, a memory,
                  an expression of individuality. Each of our creations is designed to transport you to a different
                  world, to evoke emotions and create lasting impressions. We approach perfumery as an art form,
                  with each fragrance carefully composed like a piece of music or a work of art.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif">Our Growth</h3>
                <p className="text-gray-600">
                  From our first collection of three signature scents, Essentia has expanded to offer a diverse
                  range of fragrances for every preference and occasion. Our flagship stores in Paris, New York,
                  and Tokyo serve as sensory destinations where customers can explore our complete collection in
                  elegant, immersive environments. Despite our growth, we remain committed to our founding principles
                  of quality, creativity, and authenticity.
                </p>
              </div>
            </div>
          )
        };
      case "Sustainability":
        return {
          title: "Our Commitment to Sustainability",
          subtitle: "Creating luxury fragrances with responsibility",
          content: (
            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src="https://images.unsplash.com/photo-1536303158031-c868b371399f?w=800&q=80"
                  alt="Sustainable Farming"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif">Responsible Sourcing</h3>
                <p className="text-gray-600">
                  We carefully select our suppliers based on their ethical and environmental practices.
                  From the jasmine fields of Grasse to the sandalwood forests of Australia, we work directly
                  with farmers and producers who share our commitment to sustainability. We pay fair prices
                  for our raw materials and invest in the communities that produce them.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif">Eco-Friendly Packaging</h3>
                <p className="text-gray-600">
                  Our packaging is designed to minimize environmental impact without compromising on luxury.
                  We use recycled and recyclable materials wherever possible, and our bottles are designed
                  to be refillable. Our gift boxes are made from FSC-certified paper, and we're continuously
                  working to reduce plastic use throughout our supply chain.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif">Carbon Neutrality</h3>
                <p className="text-gray-600">
                  Essentia is committed to becoming carbon neutral by 2025. We're reducing our carbon footprint
                  through energy-efficient manufacturing processes, optimized shipping methods, and investment
                  in renewable energy. For emissions we cannot eliminate, we invest in high-quality carbon offset
                  projects that support biodiversity and sustainable development.
                </p>
              </div>
            </div>
          )
        };
      case "Ingredients":
        return {
          title: "Our Ingredients",
          subtitle: "The finest raw materials from around the world",
          content: (
            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80"
                  alt="Perfume Ingredients"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-serif">Floral Notes</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Rose de Mai:</span>
                      Harvested in Grasse, France, this precious rose variety yields a complex, honey-like scent.
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Jasmine Sambac:</span>
                      Sourced from India, this jasmine variety offers an intoxicating, sweet floral note.
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Orange Blossom:</span>
                      From Morocco, these delicate blossoms provide a fresh, clean floral note.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-serif">Woody Notes</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Sandalwood:</span>
                      Sustainably harvested in Australia, our sandalwood provides creamy, warm base notes.
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Cedarwood:</span>
                      From the Atlas Mountains, this wood adds dry, sophisticated depth to our fragrances.
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Vetiver:</span>
                      Sourced from Haiti, this grass root provides earthy, smoky complexity.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-serif">Citrus Notes</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Bergamot:</span>
                      From Calabria, Italy, this citrus provides bright, sophisticated top notes.
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Sicilian Lemon:</span>
                      Cold-pressed lemon oil adds sparkling freshness to our compositions.
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Mandarin:</span>
                      Sweet and gentle citrus notes from Mediterranean orchards.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-serif">Spice & Resin Notes</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Frankincense:</span>
                      Harvested in Oman, this resin adds mystical, aromatic depth.
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Cardamom:</span>
                      From Guatemala, these seeds provide warm, spicy complexity.
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Vanilla:</span>
                      Bourbon vanilla from Madagascar adds rich, sweet warmth.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )
        };
      case "Press":
        return {
          title: "Press & Media",
          subtitle: "Essentia in the spotlight",
          content: (
            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=800&q=80"
                  alt="Essentia in Press"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-serif mb-2">Vogue - September 2023</h3>
                  <p className="text-gray-600 mb-2">
                    "Essentia continues to redefine luxury fragrance with their innovative approach to
                    traditional perfumery. Their latest collection is nothing short of extraordinary."
                  </p>
                  <p className="text-sm text-gray-500 italic">- Anna Winters, Beauty Editor</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-serif mb-2">Forbes - July 2023</h3>
                  <p className="text-gray-600 mb-2">
                    "In an industry dominated by conglomerates, Essentia stands out as a beacon of
                    independent luxury, proving that artisanal quality and global success can go hand in hand."
                  </p>
                  <p className="text-sm text-gray-500 italic">- James Richardson, Luxury Correspondent</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-serif mb-2">Elle - May 2023</h3>
                  <p className="text-gray-600 mb-2">
                    "Midnight Velvet is the scent of the season. Complex yet approachable, it's the
                    perfect embodiment of modern luxury—sophisticated without pretension."
                  </p>
                  <p className="text-sm text-gray-500 italic">- Michelle Lee, Senior Beauty Writer</p>
                </div>

                <div>
                  <h3 className="text-lg font-serif mb-2">Wallpaper* - March 2023</h3>
                  <p className="text-gray-600 mb-2">
                    "Essentia's flagship Tokyo store is a masterclass in sensory retail design.
                    The space doesn't just showcase fragrances—it immerses visitors in the brand's
                    entire philosophy and creative process."
                  </p>
                  <p className="text-sm text-gray-500 italic">- Takashi Murakami, Design Critic</p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-serif mb-4">Media Inquiries</h3>
                <p className="text-gray-600">
                  For press samples, interview requests, or other media inquiries, please contact our
                  press office at <span className="text-primary">press@essentia.com</span> or call
                  +1 (212) 555-0123.
                </p>
              </div>
            </div>
          )
        };
      default:
        return { title: "", subtitle: "", content: null };
    }
  };

  // Function to get the current contact section content
  const getCurrentContactContent = (): { title: string; subtitle: string; content: React.ReactNode } => {
    switch (currentContactSection) {
      case "Customer Service":
        return {
          title: "Customer Service",
          subtitle: "We're here to help",
          content: (
            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80"
                  alt="Customer Service"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Email Support</h4>
                    <p className="text-gray-600 text-sm mb-1">For general inquiries:</p>
                    <p className="text-primary font-medium">support@essentia.com</p>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Phone Support</h4>
                    <p className="text-gray-600 text-sm mb-1">Monday-Friday, 9am-6pm EST:</p>
                    <p className="text-primary font-medium">+1 (800) 555-0123</p>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Live Chat</h4>
                    <p className="text-gray-600 text-sm mb-1">Available on our website:</p>
                    <p className="text-primary font-medium">7 days a week, 9am-9pm EST</p>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Response Time</h4>
                    <p className="text-gray-600 text-sm mb-1">We aim to respond to all inquiries within:</p>
                    <p className="text-primary font-medium">24 hours</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif">Our Services</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <span className="font-medium">Order Assistance</span>: Help with placing orders, tracking shipments, and resolving delivery issues.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <span className="font-medium">Product Recommendations</span>: Personalized fragrance consultations to help you find your perfect scent.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <span className="font-medium">Returns & Exchanges</span>: Hassle-free process for returns and exchanges within 30 days of purchase.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <span className="font-medium">Gift Services</span>: Custom gift wrapping, personalized messages, and corporate gifting solutions.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )
        };
      case "Store Locator":
        return {
          title: "Store Locator",
          subtitle: "Find Essentia fragrances near you",
          content: (
            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80"
                  alt="Essentia Store"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif">Flagship Stores</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1555529771-7888783a18d3?w=500&q=80"
                        alt="New York Store"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium mb-2">New York</h4>
                      <p className="text-gray-600 text-sm mb-2">
                        123 Fifth Avenue<br />
                        New York, NY 10010
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">Hours:</span> Mon-Sat 10am-8pm, Sun 11am-6pm
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Phone:</span> +1 (212) 555-0123
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1549637642-90187f64f420?w=500&q=80"
                        alt="Paris Store"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium mb-2">Paris</h4>
                      <p className="text-gray-600 text-sm mb-2">
                        45 Rue du Faubourg Saint-Honoré<br />
                        75008 Paris, France
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">Hours:</span> Mon-Sat 10am-7pm, Sun Closed
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Phone:</span> +33 1 42 68 XX XX
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&q=80"
                        alt="Tokyo Store"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium mb-2">Tokyo</h4>
                      <p className="text-gray-600 text-sm mb-2">
                        5-2-1 Ginza, Chuo-ku<br />
                        Tokyo 104-0061, Japan
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">Hours:</span> Daily 11am-8pm
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Phone:</span> +81 3 XXXX XXXX
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=500&q=80"
                        alt="London Store"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium mb-2">London</h4>
                      <p className="text-gray-600 text-sm mb-2">
                        27 Bond Street<br />
                        London W1S 1DB, UK
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">Hours:</span> Mon-Sat 10am-7pm, Sun 12pm-6pm
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Phone:</span> +44 20 XXXX XXXX
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif">Authorized Retailers</h3>
                <p className="text-gray-600">
                  Essentia fragrances are also available at select luxury department stores and specialty
                  boutiques worldwide. Please contact our customer service team to find the nearest
                  authorized retailer in your area.
                </p>
              </div>
            </div>
          )
        };
      case "FAQ":
        return {
          title: "Frequently Asked Questions",
          subtitle: "Answers to common questions about our products and services",
          content: (
            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
                  alt="FAQ"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-serif mb-2">Products</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Are Essentia fragrances tested on animals?</h4>
                      <p className="text-gray-600">
                        No, Essentia is committed to cruelty-free practices. We do not test our products on animals,
                        nor do we work with suppliers who conduct animal testing.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">How long do your fragrances last on the skin?</h4>
                      <p className="text-gray-600">
                        Our Eau de Parfum formulations typically last 6-8 hours on the skin, though this can vary
                        based on individual skin chemistry, climate, and application method. For maximum longevity,
                        apply to pulse points on well-moisturized skin.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Are your fragrances suitable for sensitive skin?</h4>
                      <p className="text-gray-600">
                        While our fragrances are formulated to be gentle, individual sensitivities can vary. We recommend
                        performing a patch test before full application if you have sensitive skin. Our Botanical Collection
                        is specifically designed for those with skin sensitivities.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-serif mb-2">Orders & Shipping</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">What are your shipping options?</h4>
                      <p className="text-gray-600">
                        We offer standard shipping (3-5 business days), expedited shipping (2 business days), and
                        overnight shipping (next business day). Free standard shipping is available for orders over $100.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Do you ship internationally?</h4>
                      <p className="text-gray-600">
                        Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days,
                        depending on the destination. Please note that customers are responsible for any import duties or
                        taxes imposed by their country.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">How can I track my order?</h4>
                      <p className="text-gray-600">
                        Once your order ships, you'll receive a confirmation email with tracking information. You can also
                        track your order by logging into your account on our website or contacting our customer service team.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-serif mb-2">Returns & Refunds</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">What is your return policy?</h4>
                      <p className="text-gray-600">
                        We accept returns of unopened and unused products within 30 days of purchase. Returns must be in
                        their original packaging with all seals intact. Please contact our customer service team to initiate
                        a return.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">How long does it take to process a refund?</h4>
                      <p className="text-gray-600">
                        Once we receive your returned item, refunds are typically processed within 5-7 business days.
                        The time it takes for the refund to appear in your account depends on your payment method and
                        financial institution.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Can I exchange a fragrance if I don't like the scent?</h4>
                      <p className="text-gray-600">
                        We understand that fragrance is a personal choice. If you're not satisfied with your purchase,
                        you may exchange an unopened product for another fragrance within 30 days. For opened products,
                        please contact our customer service team to discuss your options.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        };
      case "Careers":
        return {
          title: "Careers at Essentia",
          subtitle: "Join our team of fragrance enthusiasts",
          content: (
            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80"
                  alt="Essentia Team"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif">Why Join Essentia?</h3>
                <p className="text-gray-600">
                  At Essentia, we're passionate about creating extraordinary fragrances that inspire and delight.
                  We're a team of creative thinkers, skilled artisans, and fragrance enthusiasts dedicated to
                  crafting luxury experiences. When you join our team, you become part of a company that values
                  innovation, sustainability, and the art of perfumery.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Growth & Development</h4>
                    <p className="text-gray-600 text-sm">
                      We invest in our team members through mentorship programs, professional development opportunities,
                      and a culture that encourages continuous learning.
                    </p>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Work-Life Balance</h4>
                    <p className="text-gray-600 text-sm">
                      We believe in the importance of balance. Our flexible work arrangements and generous time-off
                      policies help our team members thrive both personally and professionally.
                    </p>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Inclusive Culture</h4>
                    <p className="text-gray-600 text-sm">
                      We celebrate diversity and are committed to creating an inclusive environment where all team
                      members feel valued, respected, and empowered to contribute their unique perspectives.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif">Current Opportunities</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Senior Perfumer</h4>
                    <p className="text-sm text-gray-500 mb-2">Paris, France | Full-time</p>
                    <p className="text-gray-600 mb-3">
                      We're seeking an experienced perfumer to join our creative team in Paris. The ideal candidate
                      will have a proven track record of creating successful fragrances and a passion for pushing
                      the boundaries of traditional perfumery.
                    </p>
                    <button className="text-primary text-sm font-medium hover:underline">View Details</button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">E-Commerce Manager</h4>
                    <p className="text-sm text-gray-500 mb-2">New York, NY | Full-time</p>
                    <p className="text-gray-600 mb-3">
                      Join our digital team to lead our e-commerce strategy and operations. You'll be responsible
                      for optimizing the online shopping experience and driving growth across our digital channels.
                    </p>
                    <button className="text-primary text-sm font-medium hover:underline">View Details</button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Retail Sales Associate</h4>
                    <p className="text-sm text-gray-500 mb-2">Multiple Locations | Full-time & Part-time</p>
                    <p className="text-gray-600 mb-3">
                      Become the face of Essentia in our retail stores. We're looking for passionate individuals
                      with excellent customer service skills to help our customers discover their perfect fragrance.
                    </p>
                    <button className="text-primary text-sm font-medium hover:underline">View Details</button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Sustainability Coordinator</h4>
                    <p className="text-sm text-gray-500 mb-2">London, UK | Full-time</p>
                    <p className="text-gray-600 mb-3">
                      Help drive our sustainability initiatives forward. In this role, you'll work across departments
                      to implement and monitor our environmental programs and ensure we meet our sustainability goals.
                    </p>
                    <button className="text-primary text-sm font-medium hover:underline">View Details</button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-gray-600">
                  Don't see the right opportunity? We're always interested in connecting with talented individuals.
                  Send your resume to <span className="text-primary">careers@essentia.com</span> with a cover letter
                  explaining why you'd like to join our team.
                </p>
              </div>
            </div>
          )
        };
      default:
        return { title: "", subtitle: "", content: null };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main>
        <HeroSection onCtaClick={handleShopNowClick} />

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
                  id: 1,
                  name: "Ethereal Bloom",
                  description:
                    "A delicate floral bouquet with notes of jasmine and lily",
                  image:
                    "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80",
                  category: "Floral",
                  price: 120,
                  details: "Ethereal Bloom captures the essence of a spring garden in full bloom. This elegant fragrance opens with delicate notes of jasmine and lily, complemented by subtle hints of rose and peony. The heart reveals a touch of fresh bergamot and green tea, while the base notes of white musk and sandalwood provide a soft, lingering finish.",
                  ingredients: ["Jasmine", "Lily", "Rose", "Peony", "Bergamot", "Green Tea", "White Musk", "Sandalwood"]
                },
                {
                  id: 2,
                  name: "Midnight Velvet",
                  description:
                    "Rich and mysterious with amber and sandalwood undertones",
                  image:
                    "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=500&q=80",
                  category: "Woody",
                  price: 140,
                  details: "Midnight Velvet is a sophisticated fragrance that evokes the mystery of twilight hours. This captivating scent combines rich amber and warm sandalwood with subtle undertones of vanilla and musk. Hints of black pepper and dark berries add depth and intrigue, creating a complex aroma that's perfect for evening wear.",
                  ingredients: ["Amber", "Sandalwood", "Vanilla", "Musk", "Black Pepper", "Dark Berries", "Cedar", "Patchouli"]
                },
                {
                  id: 3,
                  name: "Citrus Whisper",
                  description:
                    "Refreshing blend of bergamot and mandarin with a hint of vanilla",
                  image:
                    "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=500&q=80",
                  category: "Citrus",
                  price: 110,
                  details: "Citrus Whisper is a bright, invigorating fragrance that brings to mind sun-drenched orchards. This refreshing scent opens with zesty notes of bergamot and mandarin, balanced by the subtle sweetness of vanilla. Middle notes of lemon verbena and neroli add complexity, while base notes of white amber and light musk create a clean, lasting finish.",
                  ingredients: ["Bergamot", "Mandarin", "Vanilla", "Lemon Verbena", "Neroli", "White Amber", "Light Musk", "Orange Blossom"]
                },
              ].map((perfume) => (
                <div
                  key={perfume.id}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className="aspect-square overflow-hidden rounded-md mb-4 cursor-pointer"
                    onClick={() => {
                      setSelectedPerfume(perfume);
                      setDialogOpen(true);
                    }}
                  >
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-serif mb-2">{perfume.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {perfume.description}
                  </p>
                  <button
                    className="text-sm font-medium text-primary hover:underline"
                    onClick={() => {
                      setSelectedPerfume(perfume);
                      setDialogOpen(true);
                    }}
                  >
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
            <button
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => setProcessDialogOpen(true)}
            >
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
                <button
                  onClick={() => openCollectionDialog("All Fragrances")}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-neutral-400"
                >
                  All Fragrances
                </button>
              </li>
              <li>
                <button
                  onClick={() => openCollectionDialog("New Arrivals")}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-neutral-400"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => openCollectionDialog("Bestsellers")}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-neutral-400"
                >
                  Bestsellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => openCollectionDialog("Gift Sets")}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-neutral-400"
                >
                  Gift Sets
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">About</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => openAboutDialog("Our Story")}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-neutral-400"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => openAboutDialog("Sustainability")}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-neutral-400"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button
                  onClick={() => openAboutDialog("Ingredients")}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-neutral-400"
                >
                  Ingredients
                </button>
              </li>
              <li>
                <button
                  onClick={() => openAboutDialog("Press")}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-neutral-400"
                >
                  Press
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => openContactDialog("Customer Service")}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-neutral-400"
                >
                  Customer Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => openContactDialog("Store Locator")}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-neutral-400"
                >
                  Store Locator
                </button>
              </li>
              <li>
                <button
                  onClick={() => openContactDialog("FAQ")}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-neutral-400"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => openContactDialog("Careers")}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-neutral-400"
                >
                  Careers
                </button>
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

      {/* Perfume Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedPerfume && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">{selectedPerfume.name}</DialogTitle>
                <DialogDescription className="text-sm text-gray-500">
                  {selectedPerfume.category} · ${selectedPerfume.price}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="aspect-square overflow-hidden rounded-md">
                  <img
                    src={selectedPerfume.image}
                    alt={selectedPerfume.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Description</h4>
                    <p className="text-sm text-gray-600">{selectedPerfume.details}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Key Ingredients</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPerfume.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-gray-100 text-xs rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  className="sm:mr-auto"
                  onClick={() => navigate('/scents')}
                >
                  View All Scents
                </Button>
                <Button onClick={() => navigate('/shop')}>
                  Add to Cart
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Process Dialog */}
      <Dialog open={processDialogOpen} onOpenChange={setProcessDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">Our Perfume-Making Process</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Discover how we craft our luxury fragrances from concept to bottle
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium text-sm">1</div>
                <h3 className="text-lg font-serif">Inspiration & Concept</h3>
              </div>
              <p className="text-gray-600 pl-11">
                Every Essentia fragrance begins with inspiration. Our perfumers travel the world,
                immersing themselves in different cultures, landscapes, and experiences.
                These journeys spark the initial concept for a new scent, which is then refined
                through mood boards, sketches, and extensive discussions with our creative team.
              </p>
              <div className="pl-11 aspect-video overflow-hidden rounded-md">
                <img
                  src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=800&q=80"
                  alt="Perfume Inspiration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium text-sm">2</div>
                <h3 className="text-lg font-serif">Ingredient Selection</h3>
              </div>
              <p className="text-gray-600 pl-11">
                We source only the finest ingredients from around the world. Our team works directly
                with farmers and suppliers who share our commitment to quality and sustainability.
                Each raw material is carefully selected and tested for purity and potency before
                being approved for use in our fragrances.
              </p>
              <div className="pl-11 aspect-video overflow-hidden rounded-md">
                <img
                  src="https://images.unsplash.com/photo-1536303158031-c868b371399f?w=800&q=80"
                  alt="Ingredient Selection"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium text-sm">3</div>
                <h3 className="text-lg font-serif">Composition & Formulation</h3>
              </div>
              <p className="text-gray-600 pl-11">
                Our master perfumers blend dozens of ingredients to create a harmonious composition.
                This meticulous process can take months or even years, with countless iterations and
                refinements. Each fragrance is structured with top notes (the initial impression),
                heart notes (the essence of the perfume), and base notes (the lasting impression).
              </p>
              <div className="pl-11 aspect-video overflow-hidden rounded-md">
                <img
                  src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80"
                  alt="Fragrance Composition"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium text-sm">4</div>
                <h3 className="text-lg font-serif">Maturation</h3>
              </div>
              <p className="text-gray-600 pl-11">
                Once formulated, our fragrances undergo a maturation period. This crucial step allows
                the ingredients to blend harmoniously and develop their full complexity. Depending on
                the composition, this process can take anywhere from several weeks to several months,
                ensuring that each scent reaches its optimal expression.
              </p>
              <div className="pl-11 aspect-video overflow-hidden rounded-md">
                <img
                  src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=800&q=80"
                  alt="Perfume Maturation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Step 5 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium text-sm">5</div>
                <h3 className="text-lg font-serif">Bottling & Packaging</h3>
              </div>
              <p className="text-gray-600 pl-11">
                The final fragrance is carefully filtered and bottled in our state-of-the-art facility.
                Each bottle is individually inspected to ensure perfection. Our packaging is designed
                to reflect the luxury and artistry of the fragrance within, using sustainable materials
                and meticulous craftsmanship.
              </p>
              <div className="pl-11 aspect-video overflow-hidden rounded-md">
                <img
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80"
                  alt="Bottling Process"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setProcessDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Collection Dialog */}
      <Dialog open={collectionDialogOpen} onOpenChange={setCollectionDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">{getCurrentCollectionData().title}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Explore our {currentCollection.toLowerCase()} and find your perfect scent
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {getCurrentCollectionData().perfumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentCollectionData().perfumes.map((perfume) => (
                  <div
                    key={perfume.id}
                    className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={perfume.image}
                        alt={perfume.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-serif font-medium text-gray-900 mb-1">
                        {perfume.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {perfume.category}
                      </p>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {perfume.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">
                          ${perfume.price}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedPerfume(perfume);
                            setCollectionDialogOpen(false);
                            setDialogOpen(true);
                          }}
                          className="text-xs"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No perfumes found in this collection.</p>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              variant="outline"
              className="sm:mr-auto"
              onClick={() => setCollectionDialogOpen(false)}
            >
              Close
            </Button>
            <Button onClick={() => navigate('/shop')}>
              View All Products
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* About Dialog */}
      <Dialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">{getCurrentAboutContent().title}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {getCurrentAboutContent().subtitle}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {getCurrentAboutContent().content}
          </div>

          <DialogFooter>
            <Button onClick={() => setAboutDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">{getCurrentContactContent().title}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {getCurrentContactContent().subtitle}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {getCurrentContactContent().content}
          </div>

          <DialogFooter>
            <Button onClick={() => setContactDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
