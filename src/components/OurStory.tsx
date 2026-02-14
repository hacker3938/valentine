"use client";

import { motion } from "framer-motion";

const milestones = [
    {
        emoji: "✨",
        title: "The Day We Met",
        desc: "The universe rearranged itself just so our paths would cross. I didn't know it then, but my whole life was about to change.",
    },
    {
        emoji: "💓",
        title: "First Heartbeat",
        desc: "The first time my heart skipped for you. I tried to play it cool, but everything inside me was on fire.",
    },
    {
        emoji: "🌹",
        title: "Falling Deeper",
        desc: "Every conversation, every laugh, every stolen glance pulled me in further. There was no going back. I was already yours.",
    },
    {
        emoji: "🔥",
        title: "The Confession",
        desc: "When I finally told you how I felt. My hands were shaking, my voice was trembling, but my heart had never been more sure.",
    },
    {
        emoji: "🌙",
        title: "Our Late Nights",
        desc: "Talking until the world went quiet. Just us, the moon, and words we could never say to anyone else.",
    },
    {
        emoji: "💍",
        title: "Forever Begins",
        desc: "This is not the end of our story. This is where forever begins. Every chapter from here, I write with you.",
    },
];

export default function OurStory() {
    return (
        <section style={{ padding: "80px 16px", background: "linear-gradient(180deg, #050000 0%, #0a0303 50%, #050000 100%)" }}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    textAlign: "center",
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    color: "#d4af37",
                    marginBottom: 64,
                }}
            >
                Our Story
            </motion.h2>

            <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
                {/* Timeline line */}
                <div style={{
                    position: "absolute",
                    left: 28,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: "linear-gradient(to bottom, transparent, #8a1c1c, #d4af37, #8a1c1c, transparent)",
                }} />

                {milestones.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ display: "flex", gap: 24, marginBottom: 48, position: "relative" }}
                    >
                        {/* Dot */}
                        <div style={{
                            width: 56,
                            height: 56,
                            minWidth: 56,
                            borderRadius: "50%",
                            background: "rgba(138,28,28,0.2)",
                            border: "2px solid #8a1c1c",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 24,
                            zIndex: 2,
                            boxShadow: "0 0 20px rgba(138,28,28,0.3)",
                        }}>
                            {m.emoji}
                        </div>

                        {/* Content */}
                        <div style={{ paddingTop: 4 }}>
                            <h3 style={{
                                fontFamily: "var(--font-playfair)",
                                fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                                color: "#f5e6e8",
                                marginBottom: 8,
                            }}>
                                {m.title}
                            </h3>
                            <p style={{
                                fontFamily: "var(--font-cormorant)",
                                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                                color: "rgba(245,230,232,0.7)",
                                lineHeight: 1.7,
                            }}>
                                {m.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
