import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface NewsletterPopupProps {
  delay?: number; // Delay in milliseconds before showing the popup
  onSubscribe?: (email: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const NewsletterPopup = ({
  delay = 5000,
  onSubscribe = () => {},
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: NewsletterPopupProps) => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  // Determine if component is controlled or uncontrolled
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : isOpen;
  const onOpenChange = isControlled ? controlledOnOpenChange : setIsOpen;

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");

    if (!hasSeenPopup && !isControlled) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenPopup", "true");
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay, isControlled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe(email);
      setHasSubscribed(true);
      setEmail("");

      // Close popup after successful subscription
      setTimeout(() => {
        if (onOpenChange) onOpenChange(false);
      }, 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-md rounded-lg p-0 overflow-hidden">
        <div className="absolute right-4 top-4 z-10">
          <DialogClose className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <X className="h-4 w-4 text-gray-500" />
          </DialogClose>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4">
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&q=80"
                alt="Essentia Logo"
                className="h-16 w-auto mx-auto"
              />
            </div>
            <DialogTitle className="text-2xl font-serif text-gray-800">
              Join Our Essence Club
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Subscribe to receive exclusive deals, early access to new
              launches, and personalized fragrance recommendations.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          {hasSubscribed ? (
            <div className="text-center py-4">
              <h3 className="text-xl font-serif text-gray-800 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600">
                Your senses will thank you. Look for our welcome email soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-gray-200 focus:border-purple-300"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 transition-colors"
              >
                Subscribe
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                By subscribing, you agree to our privacy policy and consent to
                receive updates from our company.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
