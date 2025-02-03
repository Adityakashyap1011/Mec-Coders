import React, { useState, useRef, useEffect } from "react";

const ChatBox = ({ isDarkMode }) => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const [height, setHeight] = useState(250);
    const resizeRef = useRef(null);

    useEffect(() => {
        // Set dark mode styles dynamically
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    const handleGenerate = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/gemini/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) throw new Error("Failed to fetch");

            const data = await res.json();
            setResponse(data.response);
            setError("");
        } catch (err) {
            setError("Failed to generate text");
            console.error(err);
        }
    };

    const handleResize = (e) => {
        const startY = e.clientY;
        const startHeight = height;

        const onMouseMove = (e) => {
            const newHeight = startHeight + (startY - e.clientY);
            setHeight(Math.max(150, Math.min(window.innerHeight * 0.8, newHeight)));
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    return (
        <div
            className={`w-full border-t shadow-xl rounded-t-lg transition-all ${
                isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-200 text-black border-gray-300"
            }`}
            style={{ height: `${height}px` }}
        >
            {/* Resize Handle */}
            <div
                className="h-1 cursor-row-resize bg-gray-600 rounded-t-lg"
                onMouseDown={handleResize}
                ref={resizeRef}
            ></div>

            {/* Chat Box Content */}
            <div className="flex items-center justify-center p-4">
                <img
                    src="/robot-chatbot-icon-sign-free-vector-removebg-preview.png"
                    alt="Cody AI"
                    height={40}
                    width={60}
                />
                <h1 className="text-lg font-bold ml-2">CODY AI</h1>
            </div>
            <div className="p-2">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here..."
                    className={`w-full h-20 p-2 border rounded-md transition-all ${
                        isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-400"
                    }`}
                />
                <button
                    onClick={handleGenerate}
                    className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-all"
                >
                    Generate
                </button>
                {error && <p className="mt-2 text-red-400">{error}</p>}
                {response && (
                    <div
                        className={`mt-4 p-3 rounded-md border transition-all ${
                            isDarkMode ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-gray-100 border-gray-400 text-black"
                        }`}
                    >
                        <h2 className="text-md font-semibold">Generated Response:</h2>
                        <p className="mt-2">{response}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBox;
