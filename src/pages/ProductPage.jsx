import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { ChevronRight, Star, Check, ShoppingCart, Heart, Share2, Minus, Plus, Badge, Play } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { Card } from '../components/Card';
// Neural Network Background Component
function NeuralNetwork({ intensity = 1 }) {
    const pointsRef = useRef();
    const linesRef = useRef();

    const nodes = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 50; i++) {
            temp.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 10
                ),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                )
            });
        }
        return temp;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        nodes.forEach((node, i) => {
            node.position.add(node.velocity);

            if (Math.abs(node.position.x) > 10) node.velocity.x *= -1;
            if (Math.abs(node.position.y) > 7.5) node.velocity.y *= -1;
            if (Math.abs(node.position.z) > 5) node.velocity.z *= -1;

            if (pointsRef.current) {
                const positions = pointsRef.current.geometry.attributes.position.array;
                positions[i * 3] = node.position.x;
                positions[i * 3 + 1] = node.position.y;
                positions[i * 3 + 2] = node.position.z;
                pointsRef.current.geometry.attributes.position.needsUpdate = true;
            }
        });

        if (pointsRef.current) {
            pointsRef.current.material.opacity = 0.4 + Math.sin(time * 0.5) * 0.2 * intensity;
        }
    });

    const lineSegments = useMemo(() => {
        const segments = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = nodes[i].position.distanceTo(nodes[j].position);
                if (distance < 3) {
                    segments.push(nodes[i].position, nodes[j].position);
                }
            }
        }
        return segments;
    }, [nodes]);

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={nodes.length}
                        array={new Float32Array(nodes.flatMap(n => [n.position.x, n.position.y, n.position.z]))}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.15}
                    color="#60A5FA"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                />
            </points>

            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={lineSegments.length}
                        array={new Float32Array(lineSegments.flatMap(v => [v.x, v.y, v.z]))}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color="#3B82F6"
                    transparent
                    opacity={0.1 * intensity}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
        </group>
    );
}

// Ingredient Sphere Component
function IngredientSphere({ position, color, delay = 0, splitProgress }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.position.y = position[1] + Math.sin(time + delay) * 0.1;

            const driftDistance = splitProgress * 2;
            meshRef.current.position.x = position[0] + (position[0] * driftDistance * 0.5);
            meshRef.current.position.z = position[2] + (position[2] * driftDistance * 0.5);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={hovered ? 1.2 : 1}
            >
                <sphereGeometry args={[0.12, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 0.8 : 0.3}
                    metalness={0.3}
                    roughness={0.2}
                />
                <mesh scale={1.5}>
                    <sphereGeometry args={[0.12, 32, 32]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.2}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            </mesh>
        </Float>
    );
}

// Premium Pill Capsule Component
function PremiumPill({ splitProgress }) {
    const leftHalfRef = useRef();
    const rightHalfRef = useRef();
    const groupRef = useRef();
    const auraRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.15;
        }

        if (leftHalfRef.current && rightHalfRef.current) {
            leftHalfRef.current.position.x = -splitProgress * 1.5;
            leftHalfRef.current.rotation.z = splitProgress * 0.4;

            rightHalfRef.current.position.x = splitProgress * 1.5;
            rightHalfRef.current.rotation.z = -splitProgress * 0.4;
        }

        if (auraRef.current) {
            const pulseScale = 1 + Math.sin(time * 2) * 0.05;
            auraRef.current.scale.set(pulseScale, pulseScale, pulseScale);
            auraRef.current.material.opacity = 0.15 + Math.sin(time * 2) * 0.05;
        }
    });

    const ingredients = [
        { pos: [0, 0.3, 0], color: "#10B981" },
        { pos: [-0.15, 0, 0.1], color: "#3B82F6" },
        { pos: [0.15, 0, 0.1], color: "#F59E0B" },
        { pos: [0, -0.3, 0], color: "#8B5CF6" },
        { pos: [0, 0.15, -0.15], color: "#EC4899" },
        { pos: [0, -0.15, -0.15], color: "#14B8A6" },
    ];

    return (
        <group ref={groupRef}>
            <mesh ref={auraRef} scale={1.8}>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshBasicMaterial
                    color="#60A5FA"
                    transparent
                    opacity={0.1}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                />
            </mesh>

            <group ref={leftHalfRef}>
                <mesh>
                    <capsuleGeometry args={[0.4, 1.6, 32, 64]} />
                    <MeshTransmissionMaterial
                        transmission={0.95}
                        thickness={0.2}
                        roughness={0.1}
                        chromaticAberration={0.05}
                        anisotropy={0.3}
                        color="#ffffff"
                    />
                </mesh>
                <mesh position={[0.15, 0.4, 0.35]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial
                        color="white"
                        transparent
                        opacity={0.8}
                        emissive="white"
                        emissiveIntensity={0.5}
                    />
                </mesh>
            </group>

            <group ref={rightHalfRef}>
                <mesh>
                    <capsuleGeometry args={[0.4, 1.6, 32, 64]} />
                    <meshStandardMaterial
                        color="#F59E0B"
                        metalness={0.9}
                        roughness={0.1}
                        envMapIntensity={1.5}
                    />
                </mesh>
                <mesh position={[0.15, 0.3, 0.35]} scale={0.8}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial
                        color="#FCD34D"
                        transparent
                        opacity={0.6}
                        emissive="#FCD34D"
                        emissiveIntensity={0.4}
                    />
                </mesh>
            </group>

            {splitProgress > 0.1 && (
                <group>
                    {ingredients.map((ing, idx) => (
                        <IngredientSphere
                            key={idx}
                            position={ing.pos}
                            color={ing.color}
                            delay={idx * 0.5}
                            splitProgress={splitProgress}
                        />
                    ))}
                </group>
            )}

            {splitProgress > 0.3 && (
                <>
                    {[...Array(20)].map((_, i) => (
                        <mesh
                            key={i}
                            position={[
                                (Math.random() - 0.5) * 3 * splitProgress,
                                (Math.random() - 0.5) * 2,
                                (Math.random() - 0.5) * 3 * splitProgress
                            ]}
                        >
                            <sphereGeometry args={[0.02, 8, 8]} />
                            <meshBasicMaterial
                                color={ingredients[i % ingredients.length].color}
                                transparent
                                opacity={0.6}
                                blending={THREE.AdditiveBlending}
                            />
                        </mesh>
                    ))}
                </>
            )}
        </group>
    );
}

function TechnologyScrollSection() {
    const sectionRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const slideProgress = useTransform(scrollYProgress, [0, 1], [0, 4]);

    useEffect(() => {
        const unsubscribe = slideProgress.on("change", (latest) => {
            setCurrentSlide(Math.floor(Math.min(latest, 3)));
        });
        return unsubscribe;
    }, [slideProgress]);

    const slides = [
        {
            id: 1,
            title: "MULTI-TARGETED",
            subtitle: "NUTRAFOL MEN'S HAIR GROWTH NUTRACEUTICAL",
            description: "While many hair growth solutions target just one cause of thinning, our Men's Hair Growth Nutraceutical addresses multiple root causes that affect hair health.",
            visual: "body"
        },
        {
            id: 2,
            title: "STANDARDIZED",
            subtitle: "NUTRAFOL MEN'S HAIR GROWTH NUTRACEUTICAL",
            description: "We extract our ingredients from the most concentrated, potent parts of each plant—and ensure you get the same amount of active phytonutrients in every pill.",
            visual: "dots"
        },
        {
            id: 3,
            title: "BIOAVAILABLE",
            subtitle: "NUTRAFOL MEN'S HAIR GROWTH NUTRACEUTICAL",
            description: "Our ingredients are more easily recognized and absorbed by the body—improving their efficacy.",
            visual: "chart"
        },
        {
            id: 4,
            title: "PATENTED",
            subtitle: "NUTRAFOL MEN'S HAIR GROWTH NUTRACEUTICAL",
            description: "Featuring Synergen Complex®, a proprietary blend of ingredients formulated in unique ratios to effectively address root causes of hair thinning in men.",
            visual: "pill"
        }
    ];

    return (
        <div ref={sectionRef} className="relative" style={{ height: '400vh' }}>
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
                    <div className="relative w-full h-full flex flex-col lg:flex-row">
                        {/* Left Side - Content */}
                        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 lg:p-12">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.5 }}
                                    className="max-w-lg w-full"
                                >
                                    {/* Product Badge */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="inline-flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-3 md:px-4 py-2 md:py-3 rounded-xl mb-4 md:mb-8"
                                    >
                                        <div className="w-8 h-12 md:w-10 md:h-14 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                                            <span className="text-white text-xl md:text-2xl">💊</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-[10px] md:text-xs text-gray-300 uppercase tracking-wider line-clamp-2">
                                                {slides[currentSlide].subtitle}
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-6"
                                    >
                                        {slides[currentSlide].title}
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 md:mb-8"
                                    >
                                        {slides[currentSlide].description}
                                    </motion.p>

                                    {/* Slide Counter */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="flex items-center gap-3 md:gap-4"
                                    >
                                        <span className="text-2xl md:text-3xl font-bold text-white">
                                            0{currentSlide + 1}
                                        </span>
                                        <div className="flex-1 h-px bg-white/30"></div>
                                        <span className="text-gray-400 text-sm md:text-base">04</span>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Vertical Divider - Hidden on mobile */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

                        {/* Right Side - Visuals */}
                        <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[300px] lg:min-h-0">
                            <AnimatePresence mode="wait">
                                {currentSlide === 0 && <HumanBodyVisual key="body" />}
                                {currentSlide === 1 && <FloatingDotsVisual key="dots" />}
                                {currentSlide === 2 && <ChartBarVisual key="chart" />}
                                {currentSlide === 3 && <SplittingPillVisual key="pill" />}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Scroll Progress Indicator */}
                    <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
                        {slides.map((_, idx) => (
                            <motion.div
                                key={idx}
                                className={`h-1.5 md:h-2 rounded-full transition-all ${idx === currentSlide ? 'w-8 md:w-12 bg-white' : 'w-1.5 md:w-2 bg-white/30'
                                    }`}
                                animate={{
                                    scale: idx === currentSlide ? 1 : 0.8
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// RESPONSIVE VISUAL COMPONENTS

// Visual Component 1: Human Body - RESPONSIVE
function HumanBodyVisual() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-full flex items-center justify-center px-4"
        >
            {/* Human Body Silhouette - Responsive sizing */}
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 300 600"
                className="opacity-40 max-w-[200px] md:max-w-[250px] lg:max-w-[300px] max-h-[400px] md:max-h-[500px] lg:max-h-[600px]"
                preserveAspectRatio="xMidYMid meet"
            >
                <ellipse cx="150" cy="80" rx="50" ry="60" fill="#4A5568" />
                <rect x="100" y="140" width="100" height="200" rx="30" fill="#4A5568" />
                <rect x="40" y="160" width="50" height="150" rx="25" fill="#4A5568" />
                <rect x="210" y="160" width="50" height="150" rx="25" fill="#4A5568" />
                <rect x="110" y="340" width="35" height="200" rx="17" fill="#4A5568" />
                <rect x="155" y="340" width="35" height="200" rx="17" fill="#4A5568" />
            </svg>

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute"
                style={{ top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-red-500/30 rounded-full blur-2xl"></div>
            </motion.div>

            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 120],
                        y: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 120]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3
                    }}
                    className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-red-400 rounded-full"
                    style={{ top: '40%', left: '50%' }}
                />
            ))}
        </motion.div>
    );
}

// Visual Component 2: Floating Dots - RESPONSIVE
function FloatingDotsVisual() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex items-center justify-center px-4"
        >
            <motion.div
                initial={{ scale: 1, rotate: 0 }}
                animate={{
                    scale: [1, 2, 0],
                    rotate: [0, 180, 360],
                    opacity: [1, 0.5, 0]
                }}
                transition={{ duration: 1.5 }}
                className="absolute text-5xl md:text-6xl lg:text-8xl"
            >
                🍃
            </motion.div>

            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: [0, 1.5, 1],
                        x: Math.cos((i / 12) * Math.PI * 2) * (window.innerWidth < 768 ? 80 : 150),
                        y: Math.sin((i / 12) * Math.PI * 2) * (window.innerWidth < 768 ? 80 : 150)
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.5 + i * 0.05
                    }}
                    className="absolute w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full"
                    style={{
                        background: `linear-gradient(135deg, ${['#F59E0B', '#10B981', '#3B82F6'][i % 3]}, ${['#FCD34D', '#34D399', '#60A5FA'][i % 3]})`
                    }}
                />
            ))}

            <motion.div
                initial={{ opacity: 0, scale: 0, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bg-slate-800/90 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-3 md:p-4 lg:p-6 shadow-2xl max-w-[280px] md:max-w-none"
            >
                <div className="text-center mb-2 md:mb-3">
                    <div className="text-xs md:text-sm text-gray-300 uppercase tracking-wider mb-1">ASHWAGANDHA</div>
                    <div className="text-[10px] md:text-xs text-gray-400">(WITHANOLIDE)</div>
                </div>

                <svg width="100%" height="80" viewBox="0 0 200 120" className="opacity-70 max-w-[160px] md:max-w-[200px] mx-auto">
                    <path d="M40,40 L60,30 L80,40 L80,60 L60,70 L40,60 Z" stroke="#60A5FA" fill="none" strokeWidth="2" />
                    <path d="M80,60 L100,70 L120,60 L120,40 L100,30 L80,40" stroke="#60A5FA" fill="none" strokeWidth="2" />
                    <line x1="120" y1="40" x2="140" y2="50" stroke="#60A5FA" strokeWidth="2" />
                    <line x1="140" y1="50" x2="160" y2="40" stroke="#60A5FA" strokeWidth="2" />
                    <circle cx="60" cy="30" r="4" fill="#FCD34D" />
                    <circle cx="100" cy="30" r="4" fill="#FCD34D" />
                    <circle cx="140" cy="50" r="4" fill="#10B981" />
                    <circle cx="160" cy="40" r="4" fill="#EC4899" />
                    <text x="60" y="20" fill="white" fontSize="10" textAnchor="middle">C</text>
                    <text x="140" y="45" fill="white" fontSize="10" textAnchor="middle">O</text>
                    <text x="160" y="35" fill="white" fontSize="10" textAnchor="middle">H</text>
                </svg>
            </motion.div>
        </motion.div>
    );
}

// Visual Component 3: Chart - RESPONSIVE
function ChartBarVisual() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex items-center justify-center p-4 md:p-8 lg:p-12"
        >
            <div className="w-full max-w-sm md:max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-4 md:mb-8 text-white"
                >
                    <div className="text-sm md:text-lg lg:text-xl font-bold mb-2">ABSORPTION LEVEL TIMELINE</div>
                </motion.div>

                <div className="flex items-end justify-between gap-3 md:gap-4 h-48 md:h-56 lg:h-64">
                    <div className="flex-1 flex flex-col items-center">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "85%" }}
                            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                            className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-xl relative overflow-hidden"
                        >
                            <motion.div
                                animate={{ y: ["100%", "-100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/20 to-white/0"
                            />
                        </motion.div>
                        <div className="mt-2 md:mt-4 text-center">
                            <div className="text-white font-bold text-xs md:text-sm">NUTRAFOL MEN</div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "45%" }}
                            transition={{ duration: 2, delay: 0.7, ease: "easeOut" }}
                            className="w-full bg-gradient-to-t from-gray-600 to-gray-500 rounded-t-xl opacity-60"
                        />
                        <div className="mt-2 md:mt-4 text-center">
                            <div className="text-gray-400 font-bold text-xs md:text-sm">OTHER PRODUCTS</div>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-4 md:mt-8 border-t-2 border-white/30 pt-2 md:pt-4 flex justify-between items-center"
                >
                    <div className="text-gray-400 text-xs">TIME</div>
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}

// Visual Component 4: Splitting Pill - RESPONSIVE
function SplittingPillVisual() {
    const [split, setSplit] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setSplit(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const ingredients = [
        { name: "SAW PALMETTO", color: "#F59E0B", position: { x: -60, y: -30 } },
        { name: "MARINE COLLAGEN", color: "#F59E0B", position: { x: -70, y: 15 } },
        { name: "ASHWAGANDHA", color: "#F59E0B", position: { x: -65, y: 60 } },
        { name: "CURCUMIN", color: "#F59E0B", position: { x: 60, y: -45 } },
        { name: "TOCOTRIENOL", color: "#F59E0B", position: { x: 70, y: 15 } }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex items-center justify-center px-4 scale-75 md:scale-90 lg:scale-100"
        >
            <div className="relative">
                <motion.div
                    animate={{
                        x: split ? -40 : 0,
                        rotate: split ? -15 : 0
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute"
                    style={{ top: -60, left: -20 }}
                >
                    <div className="w-12 h-32 md:w-14 md:h-36 lg:w-16 lg:h-40 bg-gradient-to-b from-gray-700 to-gray-900 rounded-l-full shadow-2xl"></div>
                </motion.div>

                <motion.div
                    animate={{
                        x: split ? 40 : 0,
                        rotate: split ? 15 : 0
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute"
                    style={{ top: -60, left: -20 }}
                >
                    <div className="w-12 h-32 md:w-14 md:h-36 lg:w-16 lg:h-40 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-r-full shadow-2xl"></div>
                </motion.div>

                <AnimatePresence>
                    {split && ingredients.map((ing, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                            animate={{
                                x: ing.position.x,
                                y: ing.position.y,
                                opacity: 1,
                                scale: 1
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3 + i * 0.1,
                                type: "spring",
                                stiffness: 100
                            }}
                            className="absolute"
                            style={{ top: 0, left: 0 }}
                        >
                            <div className="relative">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                    className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                                    style={{ backgroundColor: ing.color }}
                                />

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 + i * 0.1 }}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap hidden md:block"
                                >
                                    <div className="bg-slate-800/90 backdrop-blur-sm border border-white/20 px-2 md:px-3 py-1 rounded-lg">
                                        <div className="text-[10px] md:text-xs text-white font-semibold">{ing.name}</div>
                                    </div>
                                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-3 md:w-4 h-px bg-white/40" />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {split && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.6, scale: 2 }}
                        transition={{ duration: 1 }}
                        className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                    />
                )}
            </div>
        </motion.div>
    );
}
// Main Product Page Component
function ProductPage() {
    const [quantity, setQuantity] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState('subscribe');
    const [activeIngredient, setActiveIngredient] = useState(0);
    const containerRef = useRef(null);
    const [neuralIntensity, setNeuralIntensity] = useState(1);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroSplitProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

    const [splitValue, setSplitValue] = useState(0);

    useEffect(() => {
        const unsubscribe = heroSplitProgress.onChange((latest) => {
            setSplitValue(latest);
            setNeuralIntensity(1 + latest * 2);
        });
        return unsubscribe;
    }, [heroSplitProgress]);

    const ingredientsList = [
        {
            name: "Saw Palmetto",
            benefit: "Blocks DHT production",
            description: "Clinically proven to reduce hair loss by targeting the root cause",
            color: "#10B981"
        },
        {
            name: "Ashwagandha",
            benefit: "Reduces stress",
            description: "Adaptogen that helps balance cortisol levels affecting hair growth",
            color: "#3B82F6"
        },
        {
            name: "Curcumin",
            benefit: "Anti-inflammatory",
            description: "Supports scalp health and reduces inflammation",
            color: "#F59E0B"
        },
        {
            name: "Marine Collagen",
            benefit: "Strengthens hair",
            description: "Provides building blocks for healthy hair structure",
            color: "#8B5CF6"
        },
        {
            name: "Biotin",
            benefit: "Hair thickness",
            description: "Essential vitamin for keratin production",
            color: "#EC4899"
        }
    ];

    const images = [
        { src: "/images/ingredients-culture.jpg", alt: "Organic Fermented Ingredients", zoomable: true },
        { src: "/images/video-testimonial-thumb.jpg", alt: "Video Testimonial", video: true },
        { src: "/images/clinical-stats.jpg", alt: "Clinical Research Results", zoomable: true },
        { src: "/images/certification-badge.jpg", alt: "NSF Certified", zoomable: true },
    ];

    const plans = [
        {
            id: 'subscribe',
            name: 'Subscribe & Save',
            price: '$79',
            originalPrice: '$88',
            savings: 'Save 10%',
            delivery: 'Auto-delivery every 30 days',
            badge: 'Most Popular'
        },
        {
            id: 'onetime',
            name: 'One-Time Purchase',
            price: '$88',
            delivery: 'Single bottle',
        }
    ];

    return (
        <div className="min-h-screen bg-white" ref={containerRef}>
            <Navbar />

            {/* Premium Hero Section with Neural Network */}
            <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50 to-slate-100">
                {/* 3D Canvas Background */}
                <div className="absolute inset-0">
                    <Canvas>
                        <PerspectiveCamera makeDefault position={[0, 0, 8]} />

                        <ambientLight intensity={0.4} />
                        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} color="#60A5FA" />
                        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3B82F6" />
                        <pointLight position={[5, 5, 5]} intensity={0.3} color="#93C5FD" />

                        <Suspense fallback={null}>
                            <NeuralNetwork intensity={neuralIntensity} />
                            <PremiumPill splitProgress={splitValue} />
                            <Environment preset="city" />
                        </Suspense>
                    </Canvas>
                </div>

                {/* Foreground Content */}
                <div className="relative z-10 min-h-screen flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="grid mt-50 lg:grid-cols-2 gap-12 items-center">

                            <div className="sticky top-24 animate-fade-in">
                                <div className="relative bg-sand/50 rounded-2xl p-8 lg:p-12">
                                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                                        #1 Dermatologist Recommended
                                    </Badge>
                                    <img
                                        src='/images/product.jpg'
                                        alt="Floradyle Essence"
                                        className="w-full max-w-md mx-auto hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Image Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {images.map((image, index) => (
                                        <Card
                                            key={index}
                                            className="relative group cursor-pointer overflow-hidden border-2 hover:border-accent transition-all duration-300 hover:shadow-[var(--shadow-medium)]"
                                            onClick={() => {
                                                if (image.video) {
                                                    setShowVideo(true);
                                                } else if (image.zoomable) {
                                                    setSelectedImage(image.src);
                                                }
                                            }}
                                        >
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            {image.video && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Play className="w-8 h-8 text-primary ml-1" />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                                <p className="text-white text-sm font-medium">{image.alt}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>

                            </div>

                            {/* Right Column - Image Grid */}
                            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                                        Floradyle Essence
                                    </h1>
                                    <p className="text-xl text-muted-foreground mb-6">
                                        Our daily hair growth supplement for men with shedding and decreased scalp coverage who want to take a proactive approach to hair thinning. Our patented technology visibly improves hair growth and thickness by multi-targeting root causes like hormone, stress, and nutrition—with 100% drug-free ingredients that don't compromise sexual performance                                    </p>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 fill-[hsl(var(--accent))]" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-sm text-muted-foreground">4.8 (2,847 reviews)</span>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-6 lg:sticky lg:top-32"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900">Choose Your Plan</h3>
                                    {plans.map((plan) => (
                                        <motion.div
                                            key={plan.id}
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => setSelectedPlan(plan.id)}
                                            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition ${selectedPlan === plan.id
                                                ? 'border-blue-600 bg-blue-50'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                                }`}
                                        >
                                            {plan.badge && (
                                                <div className="absolute -top-3 left-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                    {plan.badge}
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id ? 'border-blue-600' : 'border-gray-300'
                                                            }`}>
                                                            {selectedPlan === plan.id && (
                                                                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                                            )}
                                                        </div>
                                                        <h4 className="text-lg font-bold text-gray-900">{plan.name}</h4>
                                                    </div>
                                                    <p className="text-sm text-gray-600 ml-8">{plan.delivery}</p>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-3xl font-bold text-gray-900">{plan.price}</div>
                                                    {plan.originalPrice && (
                                                        <div className="text-sm text-gray-500 line-through">{plan.originalPrice}</div>
                                                    )}
                                                    {plan.savings && (
                                                        <div className="text-sm text-green-600 font-semibold">{plan.savings}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    <div className="flex items-center gap-4">
                                        <span className="text-gray-700 font-medium">Quantity:</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-600 transition"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-600 transition"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart - ${selectedPlan === 'subscribe' ? '79' : '88'}
                                    </motion.button>

                                    <div className="flex gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 border-2 border-gray-300 py-3 rounded-xl font-semibold hover:border-gray-400 transition flex items-center justify-center gap-2"
                                        >
                                            <Heart className="w-5 h-5" />
                                            Save
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 border-2 border-gray-300 py-3 rounded-xl font-semibold hover:border-gray-400 transition flex items-center justify-center gap-2"
                                        >
                                            <Share2 className="w-5 h-5" />
                                            Share
                                        </motion.button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                                        <div className="text-center">
                                            <div className="text-2xl mb-1">🚚</div>
                                            <div className="text-sm font-medium text-gray-900">Free Shipping</div>
                                            <div className="text-xs text-gray-600">On all orders</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl mb-1">✅</div>
                                            <div className="text-sm font-medium text-gray-900">90-Day Guarantee</div>
                                            <div className="text-xs text-gray-600">Money back</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl mb-1">🔬</div>
                                            <div className="text-sm font-medium text-gray-900">Clinically Tested</div>
                                            <div className="text-xs text-gray-600">Proven results</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="hidden lg:block"></div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: splitValue > 0.2 ? 0 : 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 font-medium">Scroll to discover</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-2"
                        >
                            <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Split Progress Indicator */}
                <motion.div
                    style={{ opacity: splitValue > 0.1 ? 1 : 0 }}
                    className="absolute top-32 right-8 z-20"
                >
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 px-6 py-3 rounded-full shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12">
                                <svg className="transform -rotate-90" width="48" height="48">
                                    <circle cx="24" cy="24" r="20" stroke="#E5E7EB" strokeWidth="3" fill="none" />
                                    <circle
                                        cx="24" cy="24" r="20"
                                        stroke="#3B82F6"
                                        strokeWidth="3"
                                        fill="none"
                                        strokeDasharray={`${2 * Math.PI * 20}`}
                                        strokeDashoffset={`${2 * Math.PI * 20 * (1 - splitValue)}`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-bold text-blue-600">
                                        {Math.round(splitValue * 100)}%
                                    </span>
                                </div>
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-gray-500">Revealing</div>
                                <div className="text-sm font-semibold text-gray-900">Ingredients</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
            </section >

            {/* Technology Scroll Section */}
            < TechnologyScrollSection />

            {/* Product Details Section */}
            < section className="relative z-10 py-20 px-4 bg-white" >
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                                    Men's Formula
                                </span>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                    Clinically Proven
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Hair Growth Supplement for Men
                            </h2>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-gray-600">4.8/5 (2,847 reviews)</span>
                            </div>

                            <p className="text-xl text-gray-700 leading-relaxed">
                                Target the root causes of thinning hair with our physician-formulated,
                                drug-free supplement. Clinically shown to improve hair growth in men.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {['Targets DHT', 'Reduces Stress', 'Strengthens Hair', '100% Drug-Free'].map((benefit, idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-gray-50 p-4 rounded-xl">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        <span className="font-medium text-gray-900">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Purchase Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6 lg:sticky lg:top-32"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">Choose Your Plan</h3>
                            {plans.map((plan) => (
                                <motion.div
                                    key={plan.id}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition ${selectedPlan === plan.id
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                >
                                    {plan.badge && (
                                        <div className="absolute -top-3 left-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            {plan.badge}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id ? 'border-blue-600' : 'border-gray-300'
                                                    }`}>
                                                    {selectedPlan === plan.id && (
                                                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                                    )}
                                                </div>
                                                <h4 className="text-lg font-bold text-gray-900">{plan.name}</h4>
                                            </div>
                                            <p className="text-sm text-gray-600 ml-8">{plan.delivery}</p>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-gray-900">{plan.price}</div>
                                            {plan.originalPrice && (
                                                <div className="text-sm text-gray-500 line-through">{plan.originalPrice}</div>
                                            )}
                                            {plan.savings && (
                                                <div className="text-sm text-green-600 font-semibold">{plan.savings}</div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            <div className="flex items-center gap-4">
                                <span className="text-gray-700 font-medium">Quantity:</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-600 transition"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-600 transition"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart - ${selectedPlan === 'subscribe' ? '79' : '88'}
                            </motion.button>

                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1 border-2 border-gray-300 py-3 rounded-xl font-semibold hover:border-gray-400 transition flex items-center justify-center gap-2"
                                >
                                    <Heart className="w-5 h-5" />
                                    Save
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1 border-2 border-gray-300 py-3 rounded-xl font-semibold hover:border-gray-400 transition flex items-center justify-center gap-2"
                                >
                                    <Share2 className="w-5 h-5" />
                                    Share
                                </motion.button>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                                <div className="text-center">
                                    <div className="text-2xl mb-1">🚚</div>
                                    <div className="text-sm font-medium text-gray-900">Free Shipping</div>
                                    <div className="text-xs text-gray-600">On all orders</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-1">✅</div>
                                    <div className="text-sm font-medium text-gray-900">90-Day Guarantee</div>
                                    <div className="text-xs text-gray-600">Money back</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-1">🔬</div>
                                    <div className="text-sm font-medium text-gray-900">Clinically Tested</div>
                                    <div className="text-xs text-gray-600">Proven results</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* Ingredients Section - Scroll Activated */}
            < section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white" >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Inside Every Capsule
                        </h2>
                        <p className="text-xl text-gray-300">
                            6 clinically-proven ingredients working together
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Ingredient List */}
                        <div className="space-y-4">
                            {ingredientsList.map((ingredient, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    onMouseEnter={() => setActiveIngredient(idx)}
                                    className={`p-6 rounded-2xl cursor-pointer transition ${activeIngredient === idx
                                        ? 'bg-white/10 scale-105'
                                        : 'bg-white/5 hover:bg-white/8'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
                                            style={{ backgroundColor: ingredient.color }}
                                        >
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold mb-2">{ingredient.name}</h3>
                                            <p className="text-emerald-400 font-semibold mb-2">{ingredient.benefit}</p>
                                            <p className="text-gray-300">{ingredient.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Visual Representation */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative h-[500px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl"></div>
                            <div className="relative h-full flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 180, 360]
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="text-9xl"
                                >
                                    💊
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white" >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Start Your Hair Growth Journey Today
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of men who've transformed their hair
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>
                    <p className="mt-6 opacity-75">Free shipping • 90-day guarantee • Cancel anytime</p>
                </motion.div>
            </section >

            <Footer />
        </div >
    );
}

export default ProductPage;