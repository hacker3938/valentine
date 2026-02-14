"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { db, ref, set, serverTimestamp } from "@/lib/firebase";

export default function ForeverPage() {
    const [password, setPassword] = useState("");
    const [unlocked, setUnlocked] = useState(false);
    const [error, setError] = useState("");
    const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
    const [answered, setAnswered] = useState<"YES" | "NO" | null>(null);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        const pw = password.toLowerCase().trim();
        if (pw === "forever" || pw === "love") {
            setUnlocked(true);
        } else {
            setError("Not our secret word...");
            setTimeout(() => setError(""), 2000);
        }
    };

    const fireConfetti = () => {
        const duration = 5000;
        const end = Date.now() + duration;
        const colors = ["#d4af37", "#ff9eb5", "#8a1c1c", "#ffffff"];

        const frame = () => {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors,
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors,
            });
            if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
    };

    const handleYes = async () => {
        setAnswered("YES");
        fireConfetti();
        try {
            await set(ref(db, "proposalResponse"), { answer: "YES", timestamp: serverTimestamp() });
            await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "proposal-yes" }),
            });
        } catch (e) {
            console.error(e);
        }
    };

    const handleNoDodge = () => {
        setNoOffset({
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 200,
        });
    };

    const handleNoClick = async () => {
        setAnswered("NO");
        try {
            await set(ref(db, "proposalResponse"), { answer: "NO", timestamp: serverTimestamp() });
            await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "proposal-no" }),
            });
        } catch (e) {
            console.error(e);
        }
    };

    // Password screen
    if (!unlocked) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "#000",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
            }}>
                <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#d4af37", marginBottom: 32 }}>
                    Enter Our Secret
                </h1>
                <form onSubmit={handleUnlock} style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 360 }}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Type 'forever'..."
                        style={{
                            background: "transparent",
                            borderBottom: "2px solid #8a1c1c",
                            borderTop: "none",
                            borderLeft: "none",
                            borderRight: "none",
                            textAlign: "center",
                            fontSize: 20,
                            padding: 12,
                            color: "#f5e6e8",
                            outline: "none",
                            fontFamily: "var(--font-cormorant)",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            marginTop: 16,
                            padding: "12px 24px",
                            background: "rgba(138,28,28,0.2)",
                            color: "#8a1c1c",
                            borderRadius: 9999,
                            border: "1px solid rgba(138,28,28,0.4)",
                            cursor: "pointer",
                            fontFamily: "var(--font-playfair)",
                            fontSize: 16,
                            transition: "all 0.3s",
                        }}
                        onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.background = "#8a1c1c";
                            (e.target as HTMLElement).style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.background = "rgba(138,28,28,0.2)";
                            (e.target as HTMLElement).style.color = "#8a1c1c";
                        }}
                    >
                        Unlock
                    </button>
                    {error && (
                        <p style={{ color: "#ef4444", fontSize: 14, textAlign: "center", animation: "fadeIn 0.3s" }}>
                            {error}
                        </p>
                    )}
                </form>
            </div>
        );
    }

    // Proposal screen
    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(180deg, #0a0101 0%, #1a0808 50%, #0a0101 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Subtle glow */}
            <div style={{
                position: "absolute",
                width: 400,
                height: 400,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(138,28,28,0.2) 0%, transparent 70%)",
                filter: "blur(60px)",
            }} />

            <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 640 }}>
                {answered === "YES" ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            padding: 48,
                            borderRadius: 24,
                            border: "1px solid rgba(212,175,55,0.3)",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        <h1 className="glow-text" style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "clamp(2.5rem, 6vw, 5rem)",
                            color: "#d4af37",
                            marginBottom: 16,
                        }}>
                            Forever Starts Now ❤️
                        </h1>
                        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "#f5e6e8" }}>
                            I love you, Mumma. Infinite times infinity.
                        </p>
                    </motion.div>
                ) : answered === "NO" ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                            background: "rgba(127,29,29,0.3)",
                            padding: 48,
                            borderRadius: 24,
                            border: "1px solid rgba(239,68,68,0.3)",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: 16 }}>
                            Ouch... 💔
                        </h1>
                        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 20, color: "#d1d5db" }}>
                            (I know you didn&apos;t mean it. Refresh and try again? 😉)
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                            color: "#fff",
                            marginBottom: 48,
                            lineHeight: 1.3,
                        }}>
                            Will you be my<br />
                            <span style={{ color: "#8a1c1c", fontWeight: 700 }}>Valentine</span>?
                        </h1>

                        <div style={{ display: "flex", gap: 32, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                            <motion.button
                                onClick={handleYes}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: "16px 40px",
                                    background: "#8a1c1c",
                                    color: "#fff",
                                    fontFamily: "var(--font-playfair)",
                                    fontSize: 20,
                                    borderRadius: 9999,
                                    border: "none",
                                    cursor: "pointer",
                                    boxShadow: "0 0 30px rgba(138,28,28,0.6)",
                                    transition: "box-shadow 0.3s",
                                }}
                            >
                                YES, ALWAYS ❤️
                            </motion.button>

                            <motion.button
                                onMouseEnter={handleNoDodge}
                                onClick={handleNoClick}
                                animate={{ x: noOffset.x, y: noOffset.y }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                style={{
                                    padding: "16px 40px",
                                    background: "rgba(55,65,81,0.5)",
                                    color: "#9ca3af",
                                    fontFamily: "var(--font-playfair)",
                                    fontSize: 20,
                                    borderRadius: 9999,
                                    border: "1px solid #374151",
                                    cursor: "pointer",
                                }}
                            >
                                No
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
