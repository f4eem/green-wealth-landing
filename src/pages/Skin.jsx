import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Skin() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const products = [
    { name: 'Skin Balance', desc: 'Multi-vitamin for radiant, healthy skin', price: '$78' },
    { name: 'Collagen Infusion', desc: 'Boost elasticity and hydration', price: '$88' },
    { name: 'Anti-Aging Formula', desc: 'Combat signs of aging from within', price: '$98' },
    { name: 'Skin Glow', desc: 'Achieve luminous, youthful skin', price: '$78' }
  ];

  const benefits = [
    'Clinically proven ingredients',
    'Boost collagen production',
    'Hydrate from within',
    'Visible results in 30 days'
  ];

  const testimonials = [
    { name: 'Amanda L.', text: 'My skin has never looked better! The glow is real and people notice.', rating: 5 },
    { name: 'Rachel P.', text: 'After just 2 months, my fine lines are less visible. Amazing product!', rating: 5 },
    { name: 'Sophie H.', text: 'Finally found a supplement that actually works for my skin.', rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-44 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 opacity-60"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
              Radiant Skin from Within
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Nourish Your Skin Naturally
            </h1>
            <p className="text-xl text-gray-600">
              Science-backed supplements to support collagen production, hydration, and overall skin health. Beauty that starts from within.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transition transform hover:scale-105">
                Take Skin Quiz
                <ChevronRight className="inline ml-2" />
              </button>
              <button className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-50 transition">
                Shop Skin Care
              </button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600">4.9/5 from 12,000+ reviews</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-400 rounded-3xl transform rotate-3 opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition duration-300">
              <img 
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=700&fit=crop" 
                alt="Skin wellness" 
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-amber-600">95%</div>
                <div className="text-sm text-gray-600">saw skin improvement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-amber-600 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-white">
                <Check className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">{benefit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skin Wellness Collection</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions for radiant, healthy skin</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 h-48 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-6xl">✨</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-600">{product.price}</span>
                  <button className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="results" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Glowing Skin, Happy Customers</h2>
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12 min-h-64">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 p-12 transition-opacity duration-500 ${
                  idx === activeTestimonial ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-2xl text-gray-800 mb-6 italic">"{testimonial.text}"</p>
                <p className="text-lg font-semibold text-amber-600">- {testimonial.name}</p>
              </div>
            ))}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition ${
                    idx === activeTestimonial ? 'bg-amber-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 py-20 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Unlock Your Natural Radiance</h2>
          <p className="text-xl mb-8 opacity-90">Discover your personalized skin wellness routine</p>
          <button className="bg-white text-amber-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
            Begin Your Journey
            <ChevronRight className="inline ml-2" />
          </button>
          <p className="mt-6 opacity-75">Free shipping on all orders • 90-day money-back guarantee</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Skin;