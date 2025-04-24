import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import NavigationBar from "../components/NavigationBar";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    alert("Thank you for your message. We'll get back to you soon!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-serif text-center mb-8">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="text-xl font-medium mb-6">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">contact@essentia.com</p>
                  <p className="text-gray-600">support@essentia.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">Mon-Fri: 9am - 6pm EST</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Visit Our Flagship Store</h3>
                  <p className="text-gray-600">123 Fragrance Avenue</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                  <p className="text-gray-600 mt-1">Open Daily: 10am - 8pm</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="p-6">
            <h2 className="text-xl font-medium mb-6">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <Input id="name" placeholder="Your name" required />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="What is this regarding?"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
