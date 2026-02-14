"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

const fullText = "To my Mumma,\nThe one who holds my entire world.";

export default function HeroSection() {
    const [displayedText, setDisplayedText] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (charIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText.charAt(charIndex));
                setCharIndex((i) => i + 1);
            }, 80);
            return () => clearTimeout(timeout);
        }
    }, [charIndex]);

    // Pre-compute particle positions deterministically to avoid hydration mismatch
    const particles = useMemo(() => {
        return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: `${(i * 7.3 + 5) % 100}%`,
            top: `${(i * 11.7 + 10) % 100}%`,
            delay: (i * 0.7) % 5,
            duration: 6 + (i % 5),
            size: 2 + (i % 3),
        }));
    }, []);

    const typingDone = charIndex >= fullText.length;

    return (
        <section
            className="relative overflow-hidden flex items-center justify-center"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #0a0101 0%, #1a0808 50%, #0a0101 100%)",
            }}
        >
            {/* Floating particles */}
            {mounted && particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        background: "#d4af37",
                        opacity: 0.4,
                    }}
                    animate={{ y: [0, -80, 0], opacity: [0, 0.6, 0] }}
                    transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
                />
            ))}

            <div className="relative z-10 text-center px-6" style={{ maxWidth: 800 }}>
                <h1
                    style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "clamp(2rem, 5vw, 4.5rem)",
                        color: "#f5e6e8",
                        lineHeight: 1.3,
                        minHeight: 160,
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {displayedText}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        style={{ color: "#8a1c1c", display: "inline-block", marginLeft: 4 }}
                    >
                        |
                    </motion.span>
                </h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: typingDone ? 1 : 0, y: typingDone ? 0 : 20 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    style={{ marginTop: 32 }}
                >
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 20, color: "#9ca3af", fontStyle: "italic" }}>
                        Scroll down to read my heart...
                    </p>
                    <motion.div
                        style={{
                            margin: "16px auto 0",
                            width: 24,
                            height: 40,
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderRadius: 9999,
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: 8,
                        }}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <div style={{ width: 4, height: 8, background: "rgba(255,255,255,0.5)", borderRadius: 9999 }} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
