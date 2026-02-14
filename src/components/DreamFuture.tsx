"use client";

import { motion } from "framer-motion";

const dreams = [
    { emoji: "🏡", text: "A home that smells like coffee and sounds like our laughter." },
    { emoji: "🌅", text: "Mornings where the first thing I see is your face on the pillow next to mine." },
    { emoji: "🧳", text: "Travelling the world together and collecting memories in every city." },
    { emoji: "🐶", text: "A little furry friend who loves us both almost as much as I love you." },
    { emoji: "📖", text: "Growing old together, reading books, telling stories about how we fell in love." },
    { emoji: "💫", text: "A life so beautiful that we pinch ourselves to make sure it is real." },
];

export default function DreamFuture() {
    return (
        <section style={{
            padding: "80px 16px",
            background: "linear-gradient(180deg, #0a0101 0%, #08050a 50%, #0a0101 100%)",
        }}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    textAlign: "center",
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    color: "#d4af37",
                    marginBottom: 16,
                }}
            >
                Our Future Together
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{
                    textAlign: "center",
                    fontFamily: "var(--font-cormorant)",
                    fontSize: 18,
                    color: "rgba(245,230,232,0.5)",
                    marginBottom: 48,
                    fontStyle: "italic",
                }}
            >
                Everything I dream has you in it
            </motion.p>

            <div style={{
                maxWidth: 800,
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 24,
            }}>
                {dreams.map((d, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ y: -8, boxShadow: "0 12px 40px rgba(212,175,55,0.15)" }}
                        style={{
                            padding: 28,
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 20,
                            textAlign: "center",
                            cursor: "default",
                            transition: "box-shadow 0.3s",
                        }}
                    >
                        <div style={{ fontSize: 40, marginBottom: 16 }}>{d.emoji}</div>
                        <p style={{
                            fontFamily: "var(--font-cormorant)",
                            fontSize: "clamp(1rem, 2vw, 1.15rem)",
                            color: "rgba(245,230,232,0.8)",
                            lineHeight: 1.6,
                        }}>
                            {d.text}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
