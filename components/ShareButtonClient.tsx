"use client"

import { useState } from "react"


export default function ShareButtonClient() {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy: ", err)
        }
    }

    return (
        <div style={{ width: "100%", position: "relative", display: "inline-block" }}>
            <button
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                onClick={handleCopy}
            >
                Share URL
            </button>
            {copied && (
                <span
                    style={{
                        position: "absolute",
                        top: "-1.5rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#333",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        whiteSpace: "nowrap"
                    }}
                >
                    Copied!
                </span>
            )}
        </div>
    )
}
