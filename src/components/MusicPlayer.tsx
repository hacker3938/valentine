"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
            }
            setPlaying(!playing);
        }
    };

    return (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50 }}>
            <audio ref={audioRef} src="/music.mp3" loop />
            <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "rgba(138,28,28,0.8)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(212,175,55,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(138,28,28,0.4)",
                    color: "#fff",
                }}
            >
                {playing ? "⏸️" : "🎵"}
            </motion.button>
        </div>
    );
}
