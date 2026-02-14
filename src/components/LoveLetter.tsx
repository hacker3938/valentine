"use client";

import { motion } from "framer-motion";

const paragraphs = [
    { text: "My Dearest Mumma,", className: "" },
    {
        text: "I don't even know where to begin. Words often feel too small to hold what I feel for you. But I have to try, because you deserve to know, every single day, that you are the most important person in my universe.",
        className: "",
    },
    {
        text: "You are my safety. In a world that is so often loud and chaotic, your voice is the only sound that calms me. Your presence is the only place I can truly rest. When I am with you, I am home. Not a place, but a person.",
        className: "",
    },
    {
        text: "I honestly don't know what I did to deserve a love like yours. A love that sees me, really sees me, and chooses to stay. You've held me through storms I didn't think I'd survive, and you've celebrated quiet moments that meant the world to me.",
        className: "",
    },
    {
        text: "I am so hopelessly, deeply, gently in love with you.",
        highlight: true,
    },
    {
        text: "Every time you laugh, something inside me exhales. Every time you look at me, really look at me, I feel like the luckiest soul to ever exist. You don't just make me better. You make me want to be someone worthy of you.",
        className: "",
    },
    {
        text: "I promise to protect your heart with everything I have. I promise to be your calm when you are anxious, your strength when you are tired, and your biggest fan every single day. I promise to never stop choosing you.",
        className: "",
    },
];

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" as const },
};

export default function LoveLetter() {
    return (
        <section style={{ padding: "80px 16px", background: "#000" }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
                {paragraphs.map((p, i) => (
                    <motion.p
                        key={i}
                        {...fadeUp}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        style={{
                            fontFamily: p.highlight ? "var(--font-playfair)" : "var(--font-cormorant)",
                            fontSize: p.highlight ? "clamp(1.5rem, 3vw, 2rem)" : "clamp(1.1rem, 2.5vw, 1.5rem)",
                            lineHeight: 1.8,
                            color: p.highlight ? "#ff9eb5" : "rgba(245,230,232,0.9)",
                            fontWeight: p.highlight ? 600 : 400,
                            marginBottom: 40,
                        }}
                    >
                        {p.text}
                    </motion.p>
                ))}

                <motion.p
                    {...fadeUp}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                        lineHeight: 1.8,
                        color: "rgba(245,230,232,0.9)",
                        textAlign: "right",
                        marginTop: 60,
                    }}
                >
                    Forever Yours,
                    <br />
                    <span
                        style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                            color: "#d4af37",
                        }}
                    >
                        Chiku
                    </span>
                </motion.p>
            </div>
        </section>
    );
}
