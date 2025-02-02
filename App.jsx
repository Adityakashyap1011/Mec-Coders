import React, { useState } from "react";

const App = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");

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

    return (
        <div>
            <h1>Gemini Text Generator</h1>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here"
            />
            <button onClick={handleGenerate}>Generate</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {response && (
                <div>
                    <h2>Generated Text:</h2>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default App;



