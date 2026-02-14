"use client";

import { motion } from "framer-motion";

const promises = [
    "I promise to always hold your hand, even when we are old and wrinkled.",
    "I promise to never let you fall asleep feeling unloved.",
    "I promise to be the shoulder you lean on and the arms that hold you tight.",
    "I promise to fight for you, for us, every single day.",
    "I promise to love you louder on the days you feel silent.",
    "I promise to always choose you, even when it is hard.",
    "I promise to keep your secrets safe in my heart.",
    "I promise to make you laugh when you forget how to smile.",
    "I promise to never stop telling you how beautiful you are.",
    "I promise to build a life with you that we are both proud of.",
    "I promise to kiss your forehead when you are sad and hold you closer when you are scared.",
    "I promise you are never, ever alone. Not while I breathe.",
];

export default function PromisesSection() {
    return (
        <section style={{
            padding: "80px 16px",
            background: "linear-gradient(180deg, #050000 0%, #100505 50%, #050000 100%)",
            overflow: "hidden",
        }}>
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                    textAlign: "center",
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    color: "#ff9eb5",
                    marginBottom: 16,
                }}
            >
                My Promises to You
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
                Sealed with every heartbeat
            </motion.p>

            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: 20,
                }}>
                    {promises.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                            style={{
                                padding: 24,
                                background: "rgba(138,28,28,0.08)",
                                border: "1px solid rgba(212,175,55,0.15)",
                                borderRadius: 16,
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* Gold accent bar */}
                            <div style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: 3,
                                height: "100%",
                                background: "linear-gradient(to bottom, #d4af37, transparent)",
                            }} />
                            <p style={{
                                fontFamily: "var(--font-cormorant)",
                                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                                color: "#f5e6e8",
                                lineHeight: 1.6,
                                paddingLeft: 12,
                            }}>
                                {p}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
