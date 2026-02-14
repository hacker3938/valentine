"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CountdownTimer() {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    // Count from a meaningful date (customize this)
    const startDate = new Date("2025-07-29T00:00:00");
    const diff = now ? now.getTime() - startDate.getTime() : 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const blocks = [
        { label: "Days", value: days },
        { label: "Hours", value: hours },
        { label: "Minutes", value: minutes },
        { label: "Seconds", value: seconds },
    ];

    if (!now) return null; // Avoid hydration mismatch

    return (
        <section style={{
            padding: "80px 16px",
            background: "linear-gradient(180deg, #0a0101 0%, #120505 50%, #0a0101 100%)",
            textAlign: "center",
        }}>
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    color: "#ff9eb5",
                    marginBottom: 12,
                }}
            >
                Every Second With You
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: 18,
                    color: "rgba(245,230,232,0.6)",
                    marginBottom: 48,
                    fontStyle: "italic",
                }}
            >
                ...is a second I would never trade for anything
            </motion.p>

            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "clamp(12px, 3vw, 32px)",
                flexWrap: "wrap",
            }}>
                {blocks.map((b) => (
                    <motion.div
                        key={b.label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            width: "clamp(80px, 15vw, 130px)",
                            padding: "24px 8px",
                            background: "rgba(138,28,28,0.1)",
                            border: "1px solid rgba(138,28,28,0.3)",
                            borderRadius: 16,
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        <div style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            fontWeight: 700,
                            color: "#d4af37",
                            lineHeight: 1,
                        }}>
                            {b.value.toString().padStart(2, "0")}
                        </div>
                        <div style={{
                            fontFamily: "var(--font-cormorant)",
                            fontSize: 14,
                            color: "rgba(245,230,232,0.5)",
                            marginTop: 8,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                        }}>
                            {b.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: 16,
                    color: "rgba(245,230,232,0.4)",
                    marginTop: 40,
                }}
            >
                and counting, forever...
            </motion.p>
        </section>
    );
}
