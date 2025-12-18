'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import NewsletterPopup from '@/components/NewsletterPopup';
import BrandsBar from '@/components/BrandsBar';

/**
 * HomePage Component
 * 
 * Main landing page featuring:
 * - Hero section with video background
 * - Brands bar
 * 
 * @returns {JSX.Element} The home page component
 */
export default function HomePage() {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isHoveringHero, setIsHoveringHero] = useState(false);
    const heroRef = useRef(null);

    /**
     * Custom cursor tracking for hero section
     */
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                const isInHero = (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                );
                setIsHoveringHero(isInHero);
                if (isInHero) {
                    setCursorPos({ x: e.clientX, y: e.clientY });
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const leftVideoRef = useRef(null);
    const rightVideoRef = useRef(null);

    const handleMouseEnter = (ref) => {
        if (ref.current) {
            ref.current.play().catch(e => console.log('Video play failed:', e));
        }
    };

    const handleMouseLeave = (ref) => {
        if (ref.current) {
            ref.current.pause();
        }
    };

    return (
        <div className="bg-white">
            {/* Newsletter Popup */}
            <NewsletterPopup />

            {/* Custom Cursor for Hero */}
            {isHoveringHero && (
                <div
                    className="fixed pointer-events-none z-50 transition-transform duration-100 ease-out"
                    style={{
                        left: cursorPos.x,
                        top: cursorPos.y,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center animate-pulse">
                        <span className="text-white text-xs font-light tracking-[0.2em] uppercase">
                            Explore
                        </span>
                    </div>
                </div>
            )}

            {/* Split-Screen Hero Section */}
            <section
                ref={heroRef}
                className="relative h-screen min-h-[600px] flex flex-col md:flex-row"
                aria-label="Hero section"
            >
                {/* Left Panel - Beauty Collection */}
                <Link
                    href="/beauty"
                    className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden group cursor-none block"
                    aria-label="Shop beauty collection"
                    onMouseEnter={() => handleMouseEnter(leftVideoRef)}
                    onMouseLeave={() => handleMouseLeave(leftVideoRef)}
                >
                    {/* Video Background */}
                    <video
                        ref={leftVideoRef}
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        aria-label="Beauty collection video"
                    >
                        <source src="/videos/2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/80 group-hover:bg-black/60 transition-colors duration-500" aria-hidden="true"></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end items-center text-center px-6 md:px-8 lg:px-12 pb-16 md:pb-24 pointer-events-none">
                        <div className="max-w-lg relative z-10">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight text-white mb-4 animate-fade-in drop-shadow-lg font-serif group-hover:tracking-wider transition-all duration-500">
                                Beauty Collection
                            </h2>
                            <p className="text-lg md:text-xl text-white/90 font-light tracking-wide drop-shadow-md group-hover:text-white transition-colors duration-300">
                                Skincare & Makeup essentials
                            </p>
                            {/* Animated Arrow */}
                            <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                <span className="text-white text-3xl animate-pulse">→</span>
                            </div>
                        </div>
                    </div>

                </Link>

                {/* Right Panel - Accessories */}
                <Link
                    href="/products?productType=accessories"
                    className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden group cursor-none block"
                    aria-label="Shop accessories collection"
                    onMouseEnter={() => handleMouseEnter(rightVideoRef)}
                    onMouseLeave={() => handleMouseLeave(rightVideoRef)}
                >
                    {/* Video Background */}
                    <video
                        ref={rightVideoRef}
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        aria-label="Accessories collection video"
                    >
                        <source src="/videos/3.mov" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/80 group-hover:bg-black/60 transition-colors duration-500" aria-hidden="true"></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end items-center text-center px-6 md:px-8 lg:px-12 pb-16 md:pb-24 pointer-events-none">
                        <div className="max-w-lg relative z-10">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight text-white mb-4 animate-fade-in drop-shadow-lg font-serif group-hover:tracking-wider transition-all duration-500">
                                Accessories
                            </h2>
                            <p className="text-lg md:text-xl text-white/90 font-light tracking-wide drop-shadow-md group-hover:text-white transition-colors duration-300">
                                Complete your look
                            </p>
                            {/* Animated Arrow */}
                            <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                <span className="text-white text-3xl animate-pulse">→</span>
                            </div>
                        </div>
                    </div>

                </Link>

                {/* Centered Logo */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <img
                        src="/images/brand/logo2.png"
                        alt="Ayush Logo"
                        className="h-20 md:h-28 lg:h-36 w-auto object-contain brightness-110 contrast-110 drop-shadow-[0_4px_20px_rgba(255,255,255,1)]"
                    />
                </div>

            </section>

            {/* Brands We've Worked With */}
            <BrandsBar title="Trusted By" />

            {/* Newsletter Section */}
            <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-[#4a4a4a] text-white">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-wide">
                        join the community
                    </h2>
                    <p className="text-gray-300 mb-8">
                        Subscribe for exclusive access, new product launches, and special offers.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 bg-transparent border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-white text-[#4a4a4a] text-sm tracking-widest hover:bg-gray-100 transition-colors"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
