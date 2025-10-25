import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Animated Waveform Carousel Component
function WaveformCarousel() {
  const waves = [
    { id: 1, path: "M0,50 Q25,20 50,50 T100,50 T150,50 T200,50", color: "rgba(236, 72, 153, 0.3)" },
    { id: 2, path: "M0,50 Q25,80 50,50 T100,50 T150,50 T200,50", color: "rgba(168, 85, 247, 0.3)" },
    { id: 3, path: "M0,50 Q25,35 50,50 T100,50 T150,50 T200,50", color: "rgba(236, 72, 153, 0.2)" },
    { id: 4, path: "M0,50 Q25,65 50,50 T100,50 T150,50 T200,50", color: "rgba(168, 85, 247, 0.2)" },
    { id: 5, path: "M0,50 Q25,30 50,50 T100,50 T150,50 T200,50", color: "rgba(236, 72, 153, 0.15)" }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {waves.map((wave, index) => (
        <motion.div
          key={wave.id}
          className="absolute inset-0"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 20 + index * 3,
            repeat: Infinity,
            ease: "linear",
            delay: index * 2
          }}
        >
          <svg
            className="absolute top-1/2 -translate-y-1/2"
            width="200%"
            height="200"
            viewBox="0 0 200 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d={wave.path}
              fill="none"
              stroke={wave.color}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// Scroll-Triggered Waveform Section
function ScrollWaveformSection() {
  const sectionRef = useRef(null);
  const [activeLabel, setActiveLabel] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const labels = ["AGING", "STRESS", "METABOLISM", "HORMONES"];
  
  const blur = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 8, 8]);
  const waveOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0.3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLabel((prev) => (prev + 1) % labels.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      {/* Background Image */}
      <motion.div 
        style={{ filter: `blur(${blur}px)`, opacity: imageOpacity }}
        className="absolute inset-0"
      >
        <img 
          src="https://www.hkvitals.com/blog/wp-content/uploads/2023/05/5-top-reasons-for-Hair-fall-in-men-_900.jpg" 
          alt="Hair wellness background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Not sure where to start?<br />
              Uncover what you need to<br />
              support hair growth.
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700 transition inline-flex items-center gap-2"
            >
              Take the Quiz
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Right: Animated Waveforms */}
          <motion.div 
            style={{ opacity: waveOpacity }}
            className="relative h-96"
          >
            <svg 
              className="w-full h-full" 
              viewBox="0 0 800 400" 
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Animated Waveforms */}
              {[0, 1, 2, 3].map((index) => (
                <motion.path
                  key={index}
                  d="M0,200 Q200,100 400,200 T800,200"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, pathOffset: 0 }}
                  animate={{ 
                    pathLength: 1,
                    pathOffset: [0, 1],
                    y: [0, -20, 0]
                  }}
                  transition={{
                    pathLength: { duration: 2, delay: index * 0.2 },
                    pathOffset: { duration: 8, repeat: Infinity, ease: "linear" },
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }
                  }}
                />
              ))}

              {/* Moving Dots with Labels */}
              <AnimatePresence mode="wait">
                <motion.g key={activeLabel}>
                  {/* First Dot - Top of Wave */}
                  <motion.circle
                    cx="400"
                    cy="150"
                    r="8"
                    fill="#FCD34D"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.text
                    x="400"
                    y="120"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="600"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {labels[activeLabel]}
                  </motion.text>

                  {/* Second Dot - Bottom */}
                  <motion.circle
                    cx="600"
                    cy="280"
                    r="8"
                    fill="#FCD34D"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </motion.g>
              </AnimatePresence>

              {/* Vertical Dashed Lines */}
              <motion.line
                x1="400"
                y1="150"
                x2="400"
                y2="280"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>

            {/* Label Indicators */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
              {labels.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === activeLabel ? 'bg-yellow-400' : 'bg-white/30'
                  }`}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Whole Body Health Section with Pill Animation
function WholeBodyHealthSection() {
  const [selectedStage, setSelectedStage] = useState('postpartum');
  
  const stages = [
    { id: '18-44', label: '18-44 yrs.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop', text: "Green Wealth Hair Balance is the only hair growth supplement with published clinical studies in menopausal people with hair thinning." },
    { id: '45+', label: '45+ yrs.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop', text: "This formula is proven to improve hair growth by targeting key root causes of thinning, such as hormones and aging." },
    { id: 'postpartum', label: 'Postpartum', image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=600&fit=crop', text: "Developed by OBGYNs and breastfeeding-friendly, our Postpartum formula supports whole-body recovery and targets postpartum hair changes." }
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-bnd from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block">
            <div className="text-sm font-bold text-gray-900 mb-1">#1 Dermatologist-Recommended</div>
            <div className="text-sm text-gray-600">Hair Growth Supplement Brand*</div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Pill Animation with Dotted Circle */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center"
          >
            {/* Animated Pill in Dotted Circle */}
            <div className="relative w-80 h-80 flex items-center justify-center mb-8">
              {/* Dotted Circle Border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle, transparent 48%, transparent 50%)',
                  WebkitMask: 'radial-gradient(circle, transparent 48%, black 50%)',
                  mask: 'radial-gradient(circle, transparent 48%, black 50%)'
                }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="#CBD5E0"
                    strokeWidth="0.5"
                    strokeDasharray="2,4"
                  />
                </svg>
              </motion.div>

              {/* Floating Pill */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateZ: [-5, 5, -5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <div className="w-20 h-48 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-2xl relative overflow-hidden">
                  {/* Pill Shine Effect */}
                  <motion.div
                    animate={{
                      x: [-100, 200],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  />
                  {/* Pill Highlight */}
                  <div className="absolute top-8 left-2 w-6 h-16 bg-white/30 rounded-full blur-sm"></div>
                </div>
              </motion.div>

              {/* Vertical Dotted Line */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: '200px' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px overflow-hidden"
                style={{ top: '100%' }}
              >
                <div className="w-full h-full border-l-2 border-dashed border-gray-300"></div>
              </motion.div>
            </div>

            {/* Shop Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-2"
              >
                Shop Hair Products
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-2"
              >
                Shop Derma Roll
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full max-w-md border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-teal-50 transition flex items-center justify-center gap-2"
            >
              Take the Quiz for a Personalized Plan
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Right Side - Content with Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Hair health is{' '}
                <span className="italic font-serif">whole-body</span> health.
              </motion.h2>
            </div>

            {/* Vertical Line with Circle Image and Stage Buttons */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 md:left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gray-300 via-yellow-400 to-gray-300 -translate-x-1/2 md:translate-x-0"></div>

              {/* Circle Image Container */}
              <div className="relative flex flex-col md:flex-row items-center gap-8 mb-12">
                <motion.div
                  key={selectedStage}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white z-10"
                >
                  <img
                    src={stages.find(s => s.id === selectedStage)?.image}
                    alt="Life stage"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Stage Selection Buttons - Mobile: Horizontal, Desktop: Vertical */}
                <div className="flex md:flex-col gap-3 z-10">
                  {stages.map((stage) => (
                    <motion.button
                      key={stage.id}
                      onClick={() => setSelectedStage(stage.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-full font-semibold transition-all ${
                        selectedStage === stage.id
                          ? 'bg-yellow-400 text-gray-900 shadow-lg'
                          : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-yellow-400'
                      }`}
                    >
                      {stage.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Description Text */}
              <motion.div
                key={selectedStage + '-text'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Our hair growth formulas{' '}
                  <span className="italic font-serif">meet your body where it's at.</span>
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {stages.find(s => s.id === selectedStage)?.text}
                </p>
                <p className="text-sm text-gray-500 mt-2">3-5</p>
              </motion.div>

              {/* Shop Now Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition inline-flex items-center gap-2"
              >
                Shop Now
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Card Stack Component
function CardStack() {
  const [cards, setCards] = useState([
    { 
      id: 1, 
      title: "Visible Results",
      subtitle: "In 3-6 Months",
      desc: "Clinically proven to increase hair thickness and reduce shedding",
      icon: "📈",
      gradient: "from-green-500 to-rose-500"
    },
    { 
      id: 2, 
      title: "Science-Backed",
      subtitle: "Medical Grade",
      desc: "Formulated by physicians with premium, drug-free ingredients",
      icon: "🔬",
      gradient: "from-purple-500 to-green-500"
    },
    { 
      id: 3, 
      title: "Personalized Care",
      subtitle: "Just For You",
      desc: "Customized formulas for your unique hair wellness journey",
      icon: "✨",
      gradient: "from-indigo-500 to-purple-500"
    }
  ]);

  const moveToEnd = () => {
    setCards(prev => {
      const newCards = [...prev];
      const firstCard = newCards.shift();
      newCards.push(firstCard);
      return newCards;
    });
  };

  useEffect(() => {
    const interval = setInterval(moveToEnd, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto h-96">
      <AnimatePresence initial={false}>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="absolute inset-0 cursor-pointer"
            initial={{ 
              scale: 1 - index * 0.05,
              y: index * 20,
              opacity: 1,
              zIndex: cards.length - index
            }}
            animate={{ 
              scale: 1 - index * 0.05,
              y: index * 20,
              opacity: index === 0 ? 1 : 0.7 - index * 0.2,
              zIndex: cards.length - index,
              rotateX: index * 2,
            }}
            exit={{ 
              x: 300,
              opacity: 0,
              transition: { duration: 0.3 }
            }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut"
            }}
            onClick={index === 0 ? moveToEnd : undefined}
            whileHover={index === 0 ? { scale: 1.02, y: -5 } : {}}
          >
            <div className={`relative h-full bg-gradient-to-br ${card.gradient} rounded-3xl p-8 shadow-2xl text-white overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4">{card.icon}</div>
                  <div className="text-sm font-semibold opacity-90 mb-2">{card.subtitle}</div>
                  <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                  <p className="text-lg opacity-90">{card.desc}</p>
                </div>
                
                {index === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center text-sm font-semibold"
                  >
                    <span>Tap to see next</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Animated Product Hero Section with Background Image
function ProductHeroWithBackground() {
  const products = [
    {
      id: 1,
      name: "Neo Hair Lotion",
      category: "Hair Serum",
      price: "125.00 AED",
      rating: 4,
      image: "https://images.unsplash.com/photo-1556229010-aa31b6e8c56a?w=400&h=400&fit=crop",
      description: "All-natural Thai herbal solution for hair regrowth. Stimulates dormant follicles and strengthens from roots.",
      benefits: ["Reduces Hair Fall", "Natural Ingredients", "Clinically Proven"],
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Rosemary Mint Oil",
      category: "Hair Oil",
      price: "40.00 AED",
      rating: 5,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
      description: "Enriched with rosemary and biotin to nourish scalp and promote healthy hair growth naturally.",
      benefits: ["Scalp Health", "Growth Boost", "Shine Enhancement"],
      badge: "New"
    },
    {
      id: 3,
      name: "Derma Roller Kit",
      category: "Hair Regrowth",
      price: "15.00 AED",
      rating: 4,
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop",
      description: "Microneedling tool that improves absorption and stimulates blood flow for enhanced results.",
      benefits: ["Boosts Absorption", "Stimulates Scalp", "Easy to Use"],
      badge: "Tool"
    },
    {
      id: 4,
      name: "Hair Growth Pack",
      category: "Hair Regrowth",
      price: "170.00 AED",
      rating: 4,
      image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop",
      description: "Complete solution combining Neo Hair Lotion with advanced treatment for maximum hair wellness.",
      benefits: ["Complete Kit", "3-6 Month Supply", "Best Value"],
      badge: "Bundle"
    }
  ];

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <img
            src="https://d1or11in5278oe.cloudfront.net/how-to-stop-and-prevent-hair-loss-in-men-under-25-1.jpg"
            alt="Hair wellness background"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 px-6 py-3 rounded-full text-sm font-semibold mb-6"
          >
            ✨ Ancient Thai Herbal Solutions
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Experience Hair Regrowth<br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              The Natural Way
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Time-tested, all-natural hair growth treatments designed to restore your hair's vitality. 
            Made from powerful Thai herbs, clinically proven to stimulate regrowth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl"
            >
              Shop Collection
              <ChevronRight className="inline ml-2" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-sm bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Animated Product Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -15, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500">
                {/* Badge */}
                <motion.div
                  initial={{ x: -100 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 1 + idx * 0.1 }}
                  className="absolute top-4 left-4 z-20 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                >
                  {product.badge}
                </motion.div>

                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Hover Overlay with Benefits */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-emerald-600/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-white"
                  >
                    <h4 className="text-lg font-bold mb-4">Key Benefits</h4>
                    {product.benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 mb-2"
                      >
                        <Check className="w-4 h-4" />
                        <span className="text-sm">{benefit}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                      {product.category}
                    </span>
                    <div className="flex">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price & Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-emerald-400">
                      {product.price}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2"
                    >
                      <span>Add</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Bottom Glow Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Blog Cards Section
function BlogCardsSection() {
  const blogs = [
    {
      id: 1,
      title: "Why Is My Hair Falling? Causes, Proven Solutions",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop",
      date: "24 September, 2025",
      author: "Dr. Sarah Mitchell",
      excerpt: "If you're noticing more hair in the comb or on the pillow, you're not alone. Hair loss is one of the most common concerns today...",
      category: "Hair Care",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Transform Your Hair: The Ultimate Guide to Natural Solutions",
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&h=400&fit=crop",
      date: "21 August, 2025",
      author: "Green Wealth Team",
      excerpt: "Are you tired of dealing with hair loss or thinning hair? Millions of people worldwide search for effective solutions...",
      category: "Treatment",
      readTime: "8 min read",
      stats: { customers: "200K+", satisfaction: "85%" }
    },
    {
      id: 3,
      title: "Is Saw Palmetto Effective for Hair Loss?",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop",
      date: "1 August, 2025",
      author: "Dr. James Chen",
      excerpt: "Emotional fallout of gradual hair loss is enough to affect our confidence. Learn about the powerful natural ingredients...",
      category: "Ingredients",
      readTime: "6 min read"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Latest Content
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Check out what's new in our company!
          </motion.p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {blog.category}
                </div>

                {/* Read Time */}
                <div className="absolute bottom-4 right-4 backdrop-blur-sm bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {blog.readTime}
                </div>

                {/* Stats Overlay (for blog 2) */}
                {blog.stats && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-emerald-600/95 flex items-center justify-center gap-8 text-white"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold">{blog.stats.customers}</div>
                      <div className="text-sm">Satisfied Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{blog.stats.satisfaction}</div>
                      <div className="text-sm">Noticed Results</div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-bold text-xs">
                        {blog.author.charAt(0)}
                      </span>
                    </div>
                    <span>Posted by {blog.author}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mb-3">{blog.date}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Read More Button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-emerald-600 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  Continue Reading
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Bottom Border Effect */}
              <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </motion.article>
          ))}
        </div>

        {/* See All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition inline-flex items-center gap-2"
          >
            See All Articles
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Counter Animation Component
function AnimatedCounter({ end, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    'Clinically proven results',
    'Physician-formulated',
    'Drug-free ingredients',
    '100% satisfaction guarantee'
  ];

  const testimonials = [
    { name: 'Sarah M.', text: 'After 6 months, my hair is noticeably thicker and healthier. Best investment!', rating: 5 },
    { name: 'Jessica R.', text: 'Finally found something that works. My hairdresser noticed the difference!', rating: 5 },
    { name: 'Emily K.', text: 'Life-changing product. Wish I had found this sooner.', rating: 5 }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative pt-44 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-purple-50 to-indigo-50 opacity-60"></div>
        <WaveformCarousel />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content with Parallax */}
          <motion.div 
            style={{ y: textY, opacity }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold"
            >
              #1 People's Choice
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
            >
              Hair Wellness for All
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600"
            >
              Clinically proven supplements designed specifically for hair health. Target hormonal imbalances, stress, and nutritional deficiencies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition"
              >
                Take Hair Wellness Quiz
                <ChevronRight className="inline ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition"
              >
                Shop Hair Products
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <span className="text-gray-600">4.9/5 from 15,000+ Customer's</span>
            </motion.div>
          </motion.div>

          {/* Right Image with Parallax Float Effect */}
          <motion.div 
            style={{ y: imageY }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-purple-400 rounded-3xl transform rotate-3 opacity-20"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative bg-white rounded-3xl p-8 shadow-2xl"
            >
              <motion.img
                style={{ scale: imageScale }}
                src="https://img.freepik.com/premium-photo/man-showing-signs-hair-loss_1160504-9101.jpg" 
                alt="hair wellness" 
                className="w-full h-96 object-cover rounded-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-6 shadow-xl"
              >
                <div className="text-3xl font-bold text-green-600">
                  <AnimatedCounter end={92} />%
                </div>
                <div className="text-sm text-gray-600">saw thicker hair</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Bar with Scroll Animation */}
      <AnimatedSection>
        <section className="bg-green-600 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            >
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="text-white"
                >
                  <Check className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">{benefit}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Whole Body Health Section */}
      <WholeBodyHealthSection />

      {/* Card Stack Section - Why Choose Us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.h2
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                Why People Choose Us
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600"
              >
                Tap the card to explore our benefits
              </motion.p>
            </div>
          </AnimatedSection>
          <CardStack />
        </div>
      </section>

      {/* Scroll-Triggered Waveform Section */}
      <ScrollWaveformSection />

      {/* Testimonials with Smooth Transition */}
      <AnimatedSection>
        <section id="results" className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-12"
            >
              Real Products, Real Results
            </motion.h2>
            <div className="relative bg-gradient-to-br from-green-50 to-purple-50 rounded-3xl p-12 min-h-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 p-12"
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-2xl text-gray-800 mb-6 italic">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <p className="text-lg font-semibold text-green-600">
                    - {testimonials[activeTestimonial].name}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {testimonials.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className={`w-3 h-3 rounded-full transition ${
                      idx === activeTestimonial ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Product Hero with Background - Bottom */}
      <ProductHeroWithBackground />

      {/* Blog Cards Section */}
      <BlogCardsSection />

      {/* CTA Section */}
      <AnimatedSection>
        <section className="bg-gradient-to-r from-green-600 to-purple-600 py-20 px-4 text-white">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Hair Wellness Journey</h2>
            <p className="text-xl mb-8 opacity-90">Take our quiz to find your personalized solution</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started Now
              <ChevronRight className="inline ml-2" />
            </motion.button>
            <p className="mt-6 opacity-75">Free shipping on all orders • 90-day money-back guarantee</p>
          </motion.div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}

// Reusable scroll animation wrapper
function AnimatedSection({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

export default Home;