"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Star {
    x: number;
    y: number;
    size: number;
    opacity: number;
    twinkleSpeed: number;
}

export default function StarryNight() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);
    const animFrameRef = useRef<number>(0);

    const drawStars = useCallback((ctx: CanvasRenderingContext2D, stars: Star[], time: number) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw stars
        stars.forEach((star) => {
            const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 248, 230, ${star.opacity * twinkle})`;
            ctx.fill();

            // Glow
            if (star.size > 1.2) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
                const grad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
                grad.addColorStop(0, `rgba(255, 220, 180, ${0.15 * twinkle})`);
                grad.addColorStop(1, "transparent");
                ctx.fillStyle = grad;
                ctx.fill();
            }
        });

        // Draw a subtle shooting star occasionally
        if (Math.sin(time * 0.0003) > 0.998) {
            const sx = Math.random() * ctx.canvas.width;
            const sy = Math.random() * ctx.canvas.height * 0.4;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx + 80, sy + 30);
            const shootGrad = ctx.createLinearGradient(sx, sy, sx + 80, sy + 30);
            shootGrad.addColorStop(0, "rgba(255,255,255,0.8)");
            shootGrad.addColorStop(1, "transparent");
            ctx.strokeStyle = shootGrad;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();

        // Generate stars deterministically
        const stars: Star[] = Array.from({ length: 200 }, (_, i) => ({
            x: ((i * 37.7 + 13) % 100) / 100 * canvas.offsetWidth,
            y: ((i * 53.3 + 7) % 100) / 100 * canvas.offsetHeight,
            size: 0.3 + (i % 7) * 0.25,
            opacity: 0.3 + (i % 5) * 0.14,
            twinkleSpeed: 0.001 + (i % 10) * 0.0003,
        }));

        const animate = (time: number) => {
            drawStars(ctx, stars, time);
            animFrameRef.current = requestAnimationFrame(animate);
        };
        animFrameRef.current = requestAnimationFrame(animate);

        window.addEventListener("resize", resize);
        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("resize", resize);
        };
    }, [mounted, drawStars]);

    return (
        <section className="relative overflow-hidden" style={{ minHeight: "70vh", background: "linear-gradient(180deg, #020010 0%, #0a0101 100%)" }}>
            <canvas
                ref={canvasRef}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
            <div className="relative z-10 flex flex-col items-center justify-center px-6" style={{ minHeight: "70vh" }}>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2 }}
                    style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "clamp(1.3rem, 3vw, 2rem)",
                        color: "rgba(255,248,230,0.7)",
                        fontStyle: "italic",
                        textAlign: "center",
                        maxWidth: 600,
                        lineHeight: 1.8,
                    }}
                >
                    &ldquo;If the stars were made for wishing, I would waste none of them. Because everything I could ever wish for is already you.&rdquo;
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1 }}
                    style={{ marginTop: 32, textAlign: "center" }}
                >
                    <span style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "#d4af37", letterSpacing: "0.2em" }}>
                        ✦ YOU ARE MY BRIGHTEST STAR ✦
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
