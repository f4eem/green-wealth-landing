import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Men() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const products = [
    { name: 'Men Core', desc: 'Target DHT and root causes of male pattern baldness', price: '$88' },
    { name: 'Men Performance', desc: 'Enhanced formula for active lifestyles', price: '$98' },
    { name: 'Men Balance', desc: 'For stress-related thinning', price: '$88' },
    { name: 'Men Plus', desc: 'Advanced strength formula', price: '$108' }
  ];

  const benefits = [
    'Targets DHT production',
    'Clinically tested on men',
    'No side effects',
    'Visible results in 3-6 months'
  ];

  const testimonials = [
    { name: 'Michael T.', text: 'After 4 months, my hair loss has significantly slowed down. Highly recommend!', rating: 5 },
    { name: 'James K.', text: 'Finally a solution that works without harsh chemicals. My hair feels stronger.', rating: 5 },
    { name: 'David R.', text: 'Impressive results! My confidence is back.', rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-44 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 opacity-60"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              Trusted by Men Worldwide
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Reclaim Your Hair Confidence
            </h1>
            <p className="text-xl text-gray-600">
              Scientifically formulated to target DHT and the root causes of male pattern baldness. Drug-free and clinically proven.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105">
                Take the Men's Quiz
                <ChevronRight className="inline ml-2" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition">
                Shop Men's Products
              </button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600">4.7/5 from 8,000+ men</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-3xl transform rotate-3 opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition duration-300">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=700&fit=crop" 
                alt="Men's hair wellness" 
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-blue-600">84%</div>
                <div className="text-sm text-gray-600">saw hair growth</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-blue-600 py-8">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Men's Hair Solutions</h2>
            <p className="text-xl text-gray-600">Powerful formulas designed for men's hair needs</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 h-48 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-6xl">💊</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
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
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Men Who've Transformed Their Hair</h2>
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 min-h-64">
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
                <p className="text-lg font-semibold text-blue-600">- {testimonial.name}</p>
              </div>
            ))}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition ${
                    idx === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Take Control of Your Hair Health</h2>
          <p className="text-xl mb-8 opacity-90">Get your personalized men's hair solution today</p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
            Start Your Journey
            <ChevronRight className="inline ml-2" />
          </button>
          <p className="mt-6 opacity-75">Free shipping on all orders • 90-day money-back guarantee</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Men;