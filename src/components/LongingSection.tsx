"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

export default function LongingSection() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const hearts = useMemo(() =>
        Array.from({ length: 12 }, (_, i) => ({
            id: i,
            left: `${(i * 8.5 + 3) % 100}%`,
            fontSize: 20 + (i % 4) * 10,
            duration: 12 + (i % 6) * 2,
            delay: (i * 1.3) % 8,
        })),
        []);

    return (
        <section
            className="relative overflow-hidden flex items-center justify-center bg-heartbeat"
            style={{ minHeight: "80vh" }}
        >
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} />

            {/* Floating Hearts */}
            {mounted && hearts.map((h) => (
                <motion.div
                    key={h.id}
                    className="absolute pointer-events-none"
                    style={{ left: h.left, bottom: -50, fontSize: h.fontSize, opacity: 0.15, color: "#8a1c1c" }}
                    animate={{ y: [-50, -800] }}
                    transition={{ duration: h.duration, repeat: Infinity, ease: "linear", delay: h.delay }}
                >
                    ❤️
                </motion.div>
            ))}

            <div className="relative z-10 text-center px-6" style={{ maxWidth: 640 }}>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#f5e6e8", marginBottom: 32 }}>
                    Every Beat is For You
                </h2>

                <p style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                    color: "rgba(255,158,181,0.9)",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                }}>
                    &ldquo;The distance between us only makes my love grow louder. I miss you in the quiet moments, in the busy hours, in every breath I take. I am counting down the seconds until I can hold you again.&rdquo;
                </p>

                <motion.div
                    style={{ marginTop: 48 }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="#8a1c1c" style={{ margin: "0 auto", filter: "drop-shadow(0 0 10px rgba(138,28,28,0.8))" }}>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}
