
import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, Star, Shield, Award, Heart, Leaf, CheckCircle, PlayCircle, Package, Lock, Smartphone, Menu, X, ShoppingCart, Search, User } from 'lucide-react';

// Transparent Navbar Component
const TransparentNavbar = memo(function TransparentNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '/product/1' },
    { name: 'Product Verification', href: '#verify' },
    { name: 'Hair To Use', href: '#howto' },
    { name: 'Wholesale Registration', href: '#wholesale' },
    { name: 'Take To Original', href: '#verify' },
    { name: 'FAQs', href: '#faq' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Login', href: '#login' },
    { name: 'Contact us', href: '#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <img
              src="https://greenwealth-2219c.kxcdn.com/web/image/website/159/logo/greenwealth.com?unique=38e9d36"
              alt="Green Wealth"
              className="h-18 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.slice(0, 7).map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${scrolled
                  ? 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  : 'text-white hover:bg-white/10'
                  }`}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
            >
              <Search className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
            >
              <User className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full relative ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 ${scrolled ? 'text-gray-700' : 'text-white'
                }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

// Memoized Video Hero Section
const VideoHeroSection = memo(function VideoHeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play failed, user interaction required
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1920&h=1080&fit=crop"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/video/hair_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80"></div>
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              HORMONAL<br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                HAIR LOSS
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="inline-block bg-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-6"
            >
              DISCOVER SOLUTION
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
            >
              A natural DHT blocker hair loss treatment hormone triggered hair thinning in both men and women.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl"
              >
                Shop Now
                <ChevronRight className="inline ml-2" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-sm bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                Watch How It Works
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-emerald-500"></div>
                ))}
              </div>
              <div className="text-white">
                <div className="flex items-center gap-2 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm">Trusted by 200,000+ customers</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
});

// Verification Steps Section
const VerificationStepsSection = memo(function VerificationStepsSection() {
  const steps = [
    {
      number: "Step 1",
      title: "Identify The Secret Code",
      description: "When you purchase Neo Hair Lotion Green, look for the silver sticker on the box.",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop"
    },
    {
      number: "Step 2",
      title: "Scratch off the Secret Code",
      description: "Gently scratch the coating with a coin or your fingernail to reveal the unique 6-digit code.",
      image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=400&h=300&fit=crop",
      badge: "SECRET CODE"
    },
    {
      number: "Step 3",
      title: "Go to Verification Page",
      description: "Visit our verification website and enter the code to verify your product's authenticity.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop"
    },
    {
      number: "Step 4",
      title: "Confirmation",
      description: "Once you submit the code, you will receive an instant confirmation if your product is authentic.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section id="verify" className="py-20 px-4 bg-gradient-to-br from-white via-emerald-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Follow 4 simple steps to verify the original{' '}
            <span className="text-emerald-600">Neo Hair Lotion</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {step.badge && (
                  <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {step.badge}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-emerald-600 font-bold text-sm mb-2">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verification Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Verify Neo Hair Lotion
          </h3>
          <p className="text-center text-emerald-600 font-semibold mb-6">Product Verification</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                1. Put the 'Secret code' on the top of the box.
              </label>
              <input
                type="text"
                placeholder="Enter 6-digit number code"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                2. After do 'little number code' on the side.
              </label>
              <input
                type="text"
                placeholder="Enter code"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition"
          >
            Verify
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
});

// Product Showcase Section
const ProductShowcaseSection = memo(function ProductShowcaseSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20"
              >
                <div className="w-full h-full rounded-full border-4 border-dashed border-emerald-300"></div>
              </motion.div>

              <div className="relative grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="bg-white rounded-3xl p-6 shadow-xl"
                >
                  <img
                    src="https://www.greenwealth.com/web/image/product.template/2427/image_512?unique=862432a"
                    alt="Neo Hair Lotion Box"
                    loading="lazy"
                    className="w-full"
                  />
                  <div className="mt-4 text-center">
                    <div className="text-emerald-600 font-bold text-sm">AUTHENTIC PACKAGING</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, rotate: -5 }}
                  className="bg-white rounded-3xl p-6 shadow-xl mt-8"
                >
                  <img
                    src="https://www.greenwealth.com/web/image/product.template/2427/image_512?unique=862432a"
                    alt="Neo Hair Lotion Bottle"
                    loading="lazy"
                    className="w-full"
                  />
                  <div className="mt-4 text-center">
                    <div className="text-emerald-600 font-bold text-sm">ORIGINAL PRODUCT</div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Labels */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 right-8 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                Hologram security sticker
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-8 -left-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                Unique serial number
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              >
                Identify the original
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                GREEN WEALTH NEO HAIR LOTION!
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { label: "Hologram Sticker", desc: "Multi-dimensional security feature that changes color when tilted" },
                { label: "Secret code on back", desc: "Unique verification code protected by scratch-off coating" },
                { label: "Unique serial number", desc: "Individual tracking number printed on each bottle" },
                { label: "QR code verification", desc: "Scan to instantly verify product authenticity" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-emerald-50 transition"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.label}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-700 transition inline-flex items-center gap-2"
            >
              Verify Your Product
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

// Experience Section
const ExperienceSection = memo(function ExperienceSection() {
  const benefits = [
    { icon: "🌿", label: "Natural", desc: "Herbal Formula" },
    { icon: "🔬", label: "Clinically", desc: "Tested" },
    { icon: "💪", label: "Prevents", desc: "Hair Loss" },
    { icon: "✨", label: "Stimulates", desc: "Growth" },
    { icon: "🎯", label: "Targets", desc: "DHT" },
    { icon: "⚡", label: "Fast", desc: "Results" }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Experience Hair Regrowth with<br />
                <span className="text-emerald-600">Neo Hair Lotion</span>
              </h2>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                The Authentic, Ancient Thai Herbal Solution for Hair Loss
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Discover the power of traditional Thai medicine combined with modern science. Our natural hair regrowth serum is formulated with premium Thai herbs designed to combat your hair's destiny. Made from powerful blend of Thai herbs, our formula is clinically proven to revive dormant hair follicles, enhance blood circulation, and shield your scalp from DHT effects.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-center p-4 bg-emerald-50 rounded-2xl"
                >
                  <div className="text-4xl mb-2">{benefit.icon}</div>
                  <div className="font-bold text-gray-900 text-sm">{benefit.label}</div>
                  <div className="text-xs text-gray-600">{benefit.desc}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-700 transition inline-flex items-center gap-2"
            >
              Learn More
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Right Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl p-12">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img
                  src="https://www.greenwealth.com/web/image/product.template/2427/image_512?unique=862432a"
                  alt="Neo Hair Lotion Product"
                  loading="lazy"
                  className="w-full max-w-md mx-auto"
                />
              </motion.div>

              {/* Floating Icons */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <Leaf className="absolute top-8 right-8 w-12 h-12 text-emerald-500" />
                <Heart className="absolute bottom-12 left-8 w-10 h-10 text-pink-500" />
                <Shield className="absolute top-1/2 left-4 w-10 h-10 text-blue-500" />
              </motion.div>
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6"
            >
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600">85%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600">3-6</div>
                  <div className="text-sm text-gray-600">Months Result</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

// How It Works Section
const HowItWorksSection = memo(function HowItWorksSection() {
  return (
    <section id="howto" className="py-20 px-4 bg-gradient-to-br from-emerald-900 to-teal-800 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How Neo Hair Lotion Revitalizes Your Hair
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Our formula works by targeting the scalp and revitalizing dormant hair follicles, our natural ingredients significantly stimulate blood flow, delivering essential nutrients directly to the hair roots.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "BLOCK DHT", desc: "Prevents hormone-related hair loss", icon: Shield },
            { title: "STIMULATE FOLLICLES", desc: "Awakens dormant hair roots", icon: Leaf },
            { title: "INCREASE CIRCULATION", desc: "Delivers nutrients to scalp", icon: Heart }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-emerald-500 p-6 rounded-full mb-6"
              >
                <item.icon className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-emerald-100">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

// Animated Product Section
const AnimatedProductSection = memo(function AnimatedProductSection() {
  const products = [
    {
      id: 1,
      name: "Neo Hair Lotion",
      category: "Hair Serum",
      price: "125.00 AED",
      rating: 4,
      image: "https://www.greenwealth.com/web/image/product.template/2427/image_512?unique=862432a",
      description: "All-natural Thai herbal solution for hair regrowth.",
      benefits: ["Reduces Hair Fall", "Natural Ingredients", "Clinically Proven"],
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Rosemary Mint Oil",
      category: "Hair Oil",
      price: "40.00 AED",
      rating: 5,
      image: "https://www.greenwealth.com/web/image/product.template/2429/image_512?unique=f5ce2c2",
      description: "Enriched with rosemary and biotin to nourish scalp.",
      benefits: ["Scalp Health", "Growth Boost", "Shine Enhancement"],
      badge: "New"
    },
    {
      id: 3,
      name: "Derma Roller Kit",
      category: "Hair Regrowth",
      price: "15.00 AED",
      rating: 4,
      image: "https://www.greenwealth.com/web/image/product.template/2428/image_512?unique=6aa6992",
      description: "Microneedling tool that improves absorption.",
      benefits: ["Boosts Absorption", "Stimulates Scalp", "Easy to Use"],
      badge: "Tool"
    },
    {
      id: 4,
      name: "Hair Growth Pack",
      category: "Hair Regrowth",
      price: "170.00 AED",
      rating: 4,
      image: "https://www.greenwealth.com/web/image/product.template/2471/image_512?unique=df9c355",
      description: "Complete solution combining Neo Hair Lotion.",
      benefits: ["Complete Kit", "3-6 Month Supply", "Best Value"],
      badge: "Bundle"
    }
  ];

  return (
    <section id="shop" className="relative min-h-screen py-20 px-4 overflow-hidden">
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
            loading="lazy"
            width="1920"
            height="1080"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 px-6 py-3 rounded-full text-sm font-semibold mb-6"
          >
             Ancient Thai Herbal Solutions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Time-tested, all-natural hair growth treatments designed to restore your hair's vitality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + idx * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -15, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500">
                <motion.div
                  initial={{ x: -100 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + idx * 0.1 }}
                  className="absolute top-4 left-4 z-20 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                >
                  {product.badge}
                </motion.div>

                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    width="400"
                    height="400"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>

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

                <div className="p-6">
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

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition">
                    {product.name}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

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

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

// Testimonials Section
const TestimonialsGridSection = memo(function TestimonialsGridSection() {
  const testimonials = [
    {
      name: "Hasan Bakheet",
      age: "27 years old",
      result: "This product is very good",
      detail: "It is really working great for me and stopped my hair falling at the second month",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      rating: 5
    },
    {
      name: "Fareeque Ali",
      age: "34 years old",
      result: "It has great result!",
      detail: "I was using since 4 month now. I find improvements in my hair fall.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
      rating: 5
    },
    {
      name: "Renji Santro",
      age: "29 years old",
      result: "Highly good product!",
      detail: "I am using this product since January and the results are highly satisfied.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
      rating: 5
    },
    {
      name: "Hassan Omer",
      age: "45 years old",
      result: "Amazing result!!",
      detail: "This is a magic for hair growth. I see results I didn't expect.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Real People, Real Result
          </h2>
          <p className="text-xl text-gray-600">Join thousands of satisfied customers</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-8 text-white text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white"
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h3 className="text-xl font-bold mb-1">{testimonial.name}</h3>
                <p className="text-emerald-100 text-sm">{testimonial.age}</p>
              </div>

              <div className="p-6">
                <div className="flex justify-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h4 className="text-lg font-bold text-emerald-600 mb-2 underline">
                  {testimonial.result}
                </h4>
                <p className="text-gray-600 text-sm italic">"{testimonial.detail}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

// Stats Section
const StatsSection = memo(function StatsSection() {
  const stats = [
    { value: "200K+", label: "Happy Customers" },
    { value: "85%", label: "Saw Results" },
    { value: "95%", label: "Would Recommend" }
  ];

  return (
    <section className="py-20 px-4 bg-emerald-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="text-center text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-bold mb-4"
              >
                {stat.value}
              </motion.div>
              <div className="text-2xl font-semibold text-emerald-100">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

// Ingredients Section
const IngredientsSection = memo(function IngredientsSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powered by Nature: Our Key Ingredients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each bottle of Neo Hair Lotion is formulated with a powerhouse blend of natural Thai herbs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=600&fit=crop"
              alt="Natural Ingredients"
              loading="lazy"
              className="rounded-3xl shadow-2xl w-full"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-emerald-500 text-white p-6 rounded-full shadow-xl"
            >
              <Leaf className="w-12 h-12" />
            </motion.div>
          </motion.div>

          <div className="space-y-6">
            {[
              { name: "Saw Palmetto", benefit: "Blocks DHT hormone" },
              { name: "Biotin", benefit: "Strengthens hair structure" },
              { name: "Zinc", benefit: "Promotes scalp health" },
              { name: "Thai Herbs", benefit: "Natural nourishment" }
            ].map((ingredient, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-6 bg-emerald-50 rounded-2xl"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{ingredient.name}</h3>
                  <p className="text-gray-600">{ingredient.benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

// Simple Steps Section
const SimpleStepsSection = memo(function SimpleStepsSection() {
  const steps = [
    { step: "1", title: "Cleanse", desc: "Wash hair with mild shampoo" },
    { step: "2", title: "Apply", desc: "Massage lotion into scalp" },
    { step: "3", title: "Wait", desc: "Leave on for best results" },
    { step: "4", title: "Repeat", desc: "Use daily for 3-6 months" }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple Steps to Thicker Hair
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow these four simple steps for optimal results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative text-center"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6"
                >
                  {item.step}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ChevronRight className="w-6 h-6 text-emerald-500" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

// Blog Articles Section
const BlogArticlesSection = memo(function BlogArticlesSection() {
  const articles = [
    {
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop",
      category: "Hair Loss",
      title: "Why Is My Hair Falling? Causes, Proven Solutions",
      date: "Posted 2 days ago",
      link: "/blog/why-hair-falling"
    },
    {
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&h=400&fit=crop",
      category: "Treatment",
      title: "Transform Your Hair: The Ultimate Guide to Natural Solutions",
      date: "Posted 1 week ago",
      link: "/blog/natural-solutions"
    },
    {
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop",
      category: "Ingredients",
      title: "Is Saw Palmetto Effective for Hair Loss?",
      date: "Posted 2 weeks ago",
      link: "/blog/saw-palmetto"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our latest content
          </h2>
          <p className="text-xl text-gray-600">Check out what's new in our company!</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {article.category}
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">{article.date}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 hover:text-emerald-600 transition">
                  {article.title}
                </h3>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-emerald-600 font-semibold flex items-center gap-2"
                >
                  Continue Reading
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-500"></div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-700 transition"
          >
            Continue Reading
            <ChevronRight className="inline ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
});

// FAQ Section
const FAQSection = memo(function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long does it take to see results?",
      answer: "Most customers notice visible improvements within 3-6 months of consistent daily use. Results may vary based on individual hair conditions."
    },
    {
      question: "Is Neo Hair Lotion safe to use?",
      answer: "Yes, our formula is made from natural Thai herbs and has been clinically tested. It's safe for daily use and suitable for both men and women."
    },
    {
      question: "Can I use it with other hair products?",
      answer: "Yes, Neo Hair Lotion can be used alongside your regular hair care routine. Apply it after shampooing and allow it to fully absorb."
    },
    {
      question: "What if I'm not satisfied with the results?",
      answer: "We offer a 90-day money-back guarantee. If you're not satisfied with the results, contact us for a full refund."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">Everything you need to know</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-emerald-50 transition"
              >
                <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className={`w-6 h-6 text-emerald-600 transform ${openIndex === idx ? 'rotate-90' : ''}`} />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

// Trust Badges Section
const TrustBadgesSection = memo(function TrustBadgesSection() {
  const badges = [
    { icon: Shield, title: "100% Authentic", desc: "Verified Original Product" },
    { icon: Award, title: "Clinically Tested", desc: "Proven Results" },
    { icon: Heart, title: "Safe & Natural", desc: "No Side Effects" },
    { icon: Package, title: "Fast Shipping", desc: "Delivered Worldwide" }
  ];

  return (
    <section className="py-12 px-4 bg-white border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-emerald-100 p-4 rounded-full mb-3"
              >
                <badge.icon className="w-8 h-8 text-emerald-600" />
              </motion.div>
              <h3 className="font-bold text-gray-900 mb-1">{badge.title}</h3>
              <p className="text-sm text-gray-600">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

// CTA Section
const CTASection = memo(function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform Your Hair?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join 200,000+ satisfied customers and start your hair regrowth journey today
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-emerald-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition shadow-2xl"
            >
              Shop Now
              <ChevronRight className="inline ml-2" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-sm bg-white/20 border-2 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/30 transition"
            >
              Verify Product
              <Lock className="inline ml-2 w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>90-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Secure Payment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

// Simple Footer
const SimpleFooter = memo(function SimpleFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">About Us</h3>
            <p className="text-gray-400 text-sm">
              Paradise International General Trading LLC is the proud owner and exclusive distributor of the Green Wealth® brand and its flagship product, Neo Hair Lotion®, both protected trademarks recognized for premium herbal hair care and wellness solutions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Information</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">About us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Customer Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Use</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Refund Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Shipping & Returns</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Store Information</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@greenwealth.com</li>
              <li>Phone: +971504556326</li>
              <li>Address: 2003, One By Omniyat
                Business Bay, Dubai.
                United Arab Emirates</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>Copyright © Green Wealth International General LLC.</p>
        </div>
      </div>
    </footer>
  );
});

// Main Component
function GreenWealthHome() {
  return (
    <div className="min-h-screen bg-white">
      <TransparentNavbar />
      <VideoHeroSection />
      <VerificationStepsSection />
      <ProductShowcaseSection />
      <ExperienceSection />
      <HowItWorksSection />
      <AnimatedProductSection />
      <TestimonialsGridSection />
      <StatsSection />
      <IngredientsSection />
      <SimpleStepsSection />
      <BlogArticlesSection />
      <TrustBadgesSection />
      <FAQSection />
      <CTASection />
      <SimpleFooter />
    </div>
  );
}

export default GreenWealthHome;