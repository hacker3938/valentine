"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const reasons = [
    { title: "Your Smile", desc: "It lights up even my darkest days. One look and everything feels okay." },
    { title: "Your Voice", desc: "My favourite melody. I could listen to you forever and never get bored." },
    { title: "Your Kindness", desc: "The purest heart I have ever known. You love without conditions." },
    { title: "Your Strength", desc: "You inspire me to be better, braver, and more gentle, all at once." },
    { title: "Your Eyes", desc: "I get lost in them. They hold galaxies I want to explore forever." },
    { title: "Your Laugh", desc: "The best sound on earth. It heals something inside me every time." },
];

export default function FlipCards() {
    const [flipped, setFlipped] = useState<number | null>(null);

    return (
        <section style={{ padding: "80px 16px", background: "#050000" }}>
            <h2 style={{
                textAlign: "center",
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#d4af37",
                marginBottom: 48,
            }}>
                Why I Melt For You
            </h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: 24,
                    maxWidth: 900,
                    margin: "0 auto",
                }}
            >
                {reasons.map((reason, i) => (
                    <div
                        key={i}
                        className="perspective-1000"
                        style={{ height: 200, cursor: "pointer" }}
                        onClick={() => setFlipped(flipped === i ? null : i)}
                    >
                        <motion.div
                            className="transform-style-3d"
                            style={{ width: "100%", height: "100%", position: "relative" }}
                            animate={{ rotateY: flipped === i ? 180 : 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Front */}
                            <div
                                className="backface-hidden"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "rgba(138,28,28,0.15)",
                                    border: "1px solid rgba(138,28,28,0.4)",
                                    borderRadius: 16,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 24,
                                }}
                            >
                                <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 22, textAlign: "center", color: "#f5e6e8" }}>
                                    {reason.title}
                                </h3>
                            </div>

                            {/* Back */}
                            <div
                                className="backface-hidden rotate-y-180"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "rgba(212,175,55,0.15)",
                                    border: "1px solid rgba(212,175,55,0.4)",
                                    borderRadius: 16,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 24,
                                }}
                            >
                                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 18, textAlign: "center", fontStyle: "italic", color: "#f5e6e8" }}>
                                    {reason.desc}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
}
