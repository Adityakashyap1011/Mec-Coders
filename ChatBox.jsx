import React, { useState, useRef } from "react";

const ChatBox = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const [height, setHeight] = useState(250); // Initial height of the chat box
    const resizeRef = useRef(null);

    const handleGenerate = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/gemini/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) {
                throw new Error("Failed to fetch");
            }

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
            setHeight(Math.max(150, Math.min(window.innerHeight * 0.8, newHeight))); // Min 150px, max 80% of viewport height
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
            className="w-full bg-gray-800 text-white border-t border-gray-700 p-4 shadow-xl rounded-t-lg" 
            style={{ height: `${height}px` }}
        >
            {/* Resize Handle */}
            <div 
                className="h-1 bg-gray-600 cursor-row-resize rounded-t-lg" 
                onMouseDown={handleResize} 
                ref={resizeRef}
            ></div>

            {/* Chat Box Content */}
            <h1 className="text-lg font-bold mb-2">CODY AI</h1>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="w-full h-20 p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
            />
            <button 
                onClick={handleGenerate} 
                className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-all"
            >
                Generate
            </button>
            {error && <p className="mt-2 text-red-400">{error}</p>}
            {response && (
                <div className="mt-4 p-3 bg-gray-700 rounded-md border border-gray-600">
                    <h2 className="text-md font-semibold">Generated Response:</h2>
                    <p className="mt-2 text-gray-300">{response}</p>
                </div>
            )}
        </div>
    );
};

export default ChatBox;