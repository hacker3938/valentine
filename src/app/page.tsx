"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LockScreen from "@/components/LockScreen";
import HeroSection from "@/components/HeroSection";
import LoveLetter from "@/components/LoveLetter";
import StarryNight from "@/components/StarryNight";
import OurStory from "@/components/OurStory";
import LongingSection from "@/components/LongingSection";
import CountdownTimer from "@/components/CountdownTimer";
import FlipCards from "@/components/FlipCards";
import PromisesSection from "@/components/PromisesSection";
import DreamFuture from "@/components/DreamFuture";

import MusicPlayer from "@/components/MusicPlayer";
import Link from "next/link";

export default function Home() {
  const [locked, setLocked] = useState(true);

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", overflow: "hidden" }}>
      <AnimatePresence>
        {locked && <LockScreen onUnlock={() => setLocked(false)} />}
      </AnimatePresence>

      {!locked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <MusicPlayer />
          <HeroSection />

          <div style={{ position: "relative", zIndex: 10 }}>
            {/* The emotional journey */}
            <LoveLetter />
            <StarryNight />
            <OurStory />
            <LongingSection />
            <CountdownTimer />
            <FlipCards />
            <PromisesSection />
            <DreamFuture />


            {/* Secret entry to proposal */}
            <section style={{ padding: "80px 16px", textAlign: "center" }}>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: 22,
                  color: "rgba(245,230,232,0.6)",
                  marginBottom: 32,
                  fontStyle: "italic",
                }}
              >
                There is one last thing I need to ask you...
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/forever"
                  style={{
                    display: "inline-block",
                    padding: "16px 40px",
                    border: "1px solid #d4af37",
                    color: "#d4af37",
                    fontFamily: "var(--font-playfair)",
                    borderRadius: 9999,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.background = "#d4af37";
                    (e.target as HTMLElement).style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = "transparent";
                    (e.target as HTMLElement).style.color = "#d4af37";
                  }}
                >
                  Enter Secret
                </Link>
              </motion.div>
            </section>

            <footer style={{
              padding: "32px 0",
              textAlign: "center",
              color: "#4b5563",
              fontFamily: "var(--font-cormorant)",
              fontSize: 14,
            }}>
              Made with every beat of my heart for You ❤️
            </footer>
          </div>
        </motion.div>
      )}
    </main>
  );
}
