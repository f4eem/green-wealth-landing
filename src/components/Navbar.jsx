import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Close mobile menu when route changes
        setMobileMenuOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav
                className={`fixed inset-x-0 mx-0 sm:mx-10 z-50 bg-white transition-all duration-300 shadow-sm rounded-lg ${scrolled ? 'my-0' : 'my-5'}`}>
                {/* Top Bar - Hidden when scrolled - Desktop Only */}
                <div className={`bg-gray-50 transition-all duration-300 hidden md:block ${scrolled ? 'h-0 overflow-hidden' : 'h-auto'}`}>
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center h-14">
                            <div className="flex border-r border-gray-300 divide-x divide-gray-300">
                                <Link
                                    to="/home"
                                    className={`text-sm font-medium transition px-6 lg:px-8 py-4 ${isActive('/home') ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-teal-700'
                                        }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/men"
                                    className={`text-sm font-medium transition px-6 lg:px-8 py-4 ${isActive('/men') ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-teal-700'
                                        }`}
                                >
                                    Men
                                </Link>
                                <Link
                                    to="/skin"
                                    className={`text-sm font-medium transition px-6 lg:px-8 py-4 ${isActive('/skin') ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-teal-700'
                                        }`}
                                >
                                    Skin
                                </Link>
                            </div>
                            <div className="w-full text-center text-xs lg:text-sm text-gray-700">
                                Fullest Hair Kit for visible results in as little as 3 months. <span className="italic font-medium">Shop Now</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className={`bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
                    <div className="max-w-7xl mx-auto px-4 lg:px-8">
                        <div className="flex justify-between items-center h-16 lg:h-20">
                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <Menu className="w-6 h-6 text-gray-700" />
                            </button>

                            {/* Left Navigation - Desktop */}
                            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                                <button className="flex items-center text-gray-900 hover:text-teal-700 transition font-medium text-sm lg:text-base">
                                    Products
                                    <ChevronDown className="ml-1 w-4 h-4" />
                                </button>
                                <button className="flex items-center text-gray-900 hover:text-teal-700 transition font-medium text-sm lg:text-base">
                                    Science
                                    <ChevronDown className="ml-1 w-4 h-4" />
                                </button>
                                <button className="text-gray-900 hover:text-teal-700 transition font-medium text-sm lg:text-base">
                                    Results
                                </button>
                            </div>

                            {/* Center Logo */}
                            <Link to="/home" className="absolute left-1/2 transform -translate-x-1/2">
                                <div className="text-lg lg:text-xl font-bold tracking-wider text-gray-900" style={{ letterSpacing: '0.25em' }}>
                                    GREEN WEALTH
                                </div>
                            </Link>

                            {/* Right Actions */}
                            <div className="flex items-center space-x-2 lg:space-x-4">
                                <button className="hidden sm:block bg-teal-700 text-white px-4 lg:px-7 py-2 lg:py-3 rounded hover:bg-teal-800 transition font-medium text-xs lg:text-sm">
                                    Take the Quiz
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition">
                                    <Search className="w-5 h-5 text-gray-700" />
                                </button>
                                <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition">
                                    <User className="w-5 h-5 text-gray-700" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition">
                                    <ShoppingBag className="w-5 h-5 text-gray-700" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Menu */}
            <div className={`fixed inset-0 z-50 lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>

                {/* Sidebar */}
                <div className={`fixed top-0 left-0 bottom-0 w-80 bg-white shadow-xl transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b">
                            <div className="text-xl font-bold tracking-wider text-gray-900" style={{ letterSpacing: '0.2em' }}>
                                GREEN WEALTH
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <X className="w-6 h-6 text-gray-700" />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Category Links */}
                            <div className="border-b">
                                <div className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Categories
                                </div>
                                <Link
                                    to="/home"
                                    className={`block px-6 py-4 text-base font-medium transition ${isActive('/home') ? 'text-teal-700 bg-teal-50' : 'text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    Women
                                </Link>
                                <Link
                                    to="/men"
                                    className={`block px-6 py-4 text-base font-medium transition ${isActive('/men') ? 'text-teal-700 bg-teal-50' : 'text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    Men
                                </Link>
                                <Link
                                    to="/skin"
                                    className={`block px-6 py-4 text-base font-medium transition ${isActive('/skin') ? 'text-teal-700 bg-teal-50' : 'text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    Skin
                                </Link>
                            </div>

                            {/* Navigation Links */}
                            <div className="border-b">
                                <div className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Menu
                                </div>
                                <button className="w-full flex items-center justify-between px-6 py-4 text-base font-medium text-gray-900 hover:bg-gray-50 transition">
                                    <span>Products</span>
                                    <ChevronDown className="w-5 h-5" />
                                </button>
                                <button className="w-full flex items-center justify-between px-6 py-4 text-base font-medium text-gray-900 hover:bg-gray-50 transition">
                                    <span>Science</span>
                                    <ChevronDown className="w-5 h-5" />
                                </button>
                                <button className="w-full text-left px-6 py-4 text-base font-medium text-gray-900 hover:bg-gray-50 transition">
                                    Results
                                </button>
                            </div>

                            {/* Account Links */}
                            <div className="p-6 space-y-3">
                                <button className="w-full bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition font-medium">
                                    Take the Quiz
                                </button>
                                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
                                    <User className="w-5 h-5 text-gray-700" />
                                    <span className="font-medium text-gray-900">Sign In</span>
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t p-6">
                            <div className="text-sm text-gray-600 text-center">
                                Fullest Hair Kit for visible results in as little as 3 months.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;