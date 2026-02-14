"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LockScreenProps {
    onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
    const [holding, setHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const stableUnlock = useCallback(onUnlock, [onUnlock]);

    useEffect(() => {
        if (holding) {
            const startTime = Date.now();
            intervalRef.current = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const p = Math.min((elapsed / 3000) * 100, 100);
                setProgress(p);
                if (p >= 100) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    stableUnlock();
                }
            }, 16);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setProgress(0);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [holding, stableUnlock]);

    const circumference = 2 * Math.PI * 54; // r=54

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex flex-col items-center justify-center"
                style={{ background: "#000", width: "100vw", height: "100vh" }}
                exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
            >
                {/* Subtle glow */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: 200,
                        height: 200,
                        background: "radial-gradient(circle, rgba(138,28,28,0.3) 0%, transparent 70%)",
                        filter: "blur(40px)",
                    }}
                />

                {/* SVG Progress Ring */}
                <div className="relative mb-8" style={{ width: 128, height: 128 }}>
                    <svg
                        width="128"
                        height="128"
                        viewBox="0 0 120 120"
                        style={{ transform: "rotate(-90deg)", position: "absolute", inset: 0 }}
                    >
                        <circle cx="60" cy="60" r="54" fill="none" stroke="#330505" strokeWidth="4" />
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#d4af37"
                            strokeWidth="4"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference - (circumference * progress) / 100}
                            strokeLinecap="round"
                            style={{ transition: "stroke-dashoffset 0.05s linear" }}
                        />
                    </svg>

                    {/* Heart Button */}
                    <button
                        className="absolute inset-0 flex items-center justify-center rounded-full cursor-pointer"
                        style={{ width: 128, height: 128, background: "transparent", border: "none" }}
                        onMouseDown={() => setHolding(true)}
                        onMouseUp={() => setHolding(false)}
                        onMouseLeave={() => setHolding(false)}
                        onTouchStart={() => setHolding(true)}
                        onTouchEnd={() => setHolding(false)}
                    >
                        <motion.span
                            style={{ fontSize: 48, userSelect: "none" }}
                            animate={{ scale: holding ? 1.3 : 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            ❤️
                        </motion.span>
                    </button>
                </div>

                <p
                    className="text-center"
                    style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: 20,
                        letterSpacing: "0.15em",
                        color: "#f5e6e8",
                        opacity: 0.8,
                    }}
                >
                    {holding ? "Keep holding..." : "Hold my heart to enter"}
                </p>

                {/* Progress percentage */}
                {holding && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        style={{ fontFamily: "var(--font-cormorant)", fontSize: 14, color: "#d4af37", marginTop: 12 }}
                    >
                        {Math.round(progress)}%
                    </motion.p>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
