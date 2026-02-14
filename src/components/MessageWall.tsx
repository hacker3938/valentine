"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    text: string;
    timestamp: number;
}

export default function MessageWall() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dbReady, setDbReady] = useState(false);

    useEffect(() => {
        let unsubscribe: (() => void) | null = null;

        async function initFirebase() {
            try {
                const fb = await import("@/lib/firebase");
                const messagesRef = fb.ref(fb.db, "messages");
                unsubscribe = fb.onValue(
                    messagesRef,
                    (snapshot) => {
                        setDbReady(true);
                        const data = snapshot.val();
                        if (data) {
                            const loaded = Object.entries(data).map(([id, val]: [string, unknown]) => {
                                const v = val as { text: string; timestamp: number };
                                return { id, text: v.text, timestamp: v.timestamp };
                            });
                            setMessages(loaded.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)));
                        } else {
                            setMessages([]);
                        }
                    },
                    (err) => {
                        console.error("Firebase read error:", err);
                        setError("Could not load messages");
                        setDbReady(true);
                    }
                );
            } catch (err) {
                console.error("Firebase init error:", err);
                setError("Could not connect to database");
                setDbReady(true);
            }
        }

        initFirebase();
        return () => { if (unsubscribe) unsubscribe(); };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setSending(true);
        try {
            const fb = await import("@/lib/firebase");
            await fb.push(fb.ref(fb.db, "messages"), {
                text: newMessage,
                timestamp: fb.serverTimestamp(),
            });

            // Send email (non-blocking, don't fail if this fails)
            fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "message", text: newMessage }),
            }).catch(() => { });

            setNewMessage("");
        } catch (err) {
            console.error("Error sending message:", err);
            setError("Failed to send. Try again.");
            setTimeout(() => setError(null), 3000);
        } finally {
            setSending(false);
        }
    };

    return (
        <section style={{
            padding: "80px 16px",
            background: "linear-gradient(180deg, #050000 0%, #0a0303 50%, #050000 100%)",
        }}>
            <div style={{ maxWidth: 640, margin: "0 auto" }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        textAlign: "center",
                        fontFamily: "var(--font-playfair)",
                        fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                        color: "#ff9eb5",
                        marginBottom: 8,
                    }}
                >
                    💌 Leave a Piece of Your Heart
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
                        fontStyle: "italic",
                        marginBottom: 40,
                    }}
                >
                    Write something only we will understand
                </motion.p>

                {/* Input Form */}
                <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
                    <div style={{ position: "relative" }}>
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Write something sweet..."
                            disabled={sending}
                            rows={3}
                            style={{
                                width: "100%",
                                background: "rgba(26,5,5,0.6)",
                                border: "1px solid rgba(255,158,181,0.2)",
                                borderRadius: 16,
                                padding: "16px 56px 16px 16px",
                                color: "#f5e6e8",
                                fontFamily: "var(--font-cormorant)",
                                fontSize: 17,
                                resize: "none",
                                outline: "none",
                                lineHeight: 1.6,
                                transition: "border-color 0.3s",
                            }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,158,181,0.5)"; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,158,181,0.2)"; }}
                        />
                        <button
                            type="submit"
                            disabled={sending || !newMessage.trim()}
                            style={{
                                position: "absolute",
                                bottom: 12,
                                right: 12,
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: newMessage.trim() ? "rgba(138,28,28,0.6)" : "transparent",
                                border: "none",
                                cursor: newMessage.trim() ? "pointer" : "default",
                                fontSize: 22,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: sending ? 0.4 : 1,
                                transition: "all 0.2s",
                            }}
                        >
                            {sending ? "⏳" : "💌"}
                        </button>
                    </div>

                    {error && (
                        <p style={{ color: "#ef4444", fontSize: 13, marginTop: 8, textAlign: "center" }}>{error}</p>
                    )}
                </form>

                {/* Messages List */}
                <div style={{ maxHeight: 500, overflowY: "auto", paddingRight: 4 }}>
                    {!dbReady && (
                        <div style={{ textAlign: "center", padding: 32 }}>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                style={{ display: "inline-block", fontSize: 24 }}
                            >
                                💕
                            </motion.div>
                            <p style={{
                                fontFamily: "var(--font-cormorant)",
                                fontSize: 16,
                                color: "rgba(245,230,232,0.4)",
                                marginTop: 12,
                            }}>
                                Loading messages...
                            </p>
                        </div>
                    )}

                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    background: "rgba(138,28,28,0.08)",
                                    border: "1px solid rgba(138,28,28,0.15)",
                                    padding: "16px 20px",
                                    borderRadius: 16,
                                    marginBottom: 12,
                                    backdropFilter: "blur(4px)",
                                }}
                            >
                                <p style={{
                                    fontFamily: "var(--font-cormorant)",
                                    fontSize: 18,
                                    color: "#f5e6e8",
                                    lineHeight: 1.5,
                                    margin: 0,
                                }}>
                                    {msg.text}
                                </p>
                                <span style={{
                                    fontSize: 12,
                                    color: "rgba(107,114,128,0.7)",
                                    marginTop: 8,
                                    display: "block",
                                }}>
                                    {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : "Just now"}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {dbReady && messages.length === 0 && !error && (
                        <div style={{ textAlign: "center", padding: 32 }}>
                            <p style={{
                                fontFamily: "var(--font-cormorant)",
                                fontSize: 18,
                                color: "rgba(245,230,232,0.4)",
                                fontStyle: "italic",
                            }}>
                                No messages yet. Be the first to leave a note. 💕
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
