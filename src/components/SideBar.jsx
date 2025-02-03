import React, { useState } from "react";
import ChatBox from "./ChatBox";

const Sidebar = ({ isDarkMode }) => {
    const teammates = ["Alice", "Bob", "Charlie", "David"];
    const [chatHeight, setChatHeight] = useState(250);
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = () => setIsResizing(true);
    const stopResizing = () => setIsResizing(false);

    const resizeChat = (e) => {
        if (isResizing) {
            const newHeight = chatHeight - e.movementY;
            setChatHeight(Math.max(150, Math.min(window.innerHeight * 0.8, newHeight)));
        }
    };

    // Function to generate a random color for each teammate's logo
    const getRandomColor = (index) => {
        const colors = [
            "bg-red-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
        ];
        return colors[index % colors.length];
    };

    return (
        <div
            className={`flex flex-col w-72 h-screen shadow-lg relative transition-colors duration-300 ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-blue-200 text-gray-900"
            }`}
        >
            {/* Team Members Section */}
            <div className={`p-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}>
                <h2 className="text-xl font-semibold mb-3">Team Members</h2>
                <ul className="space-y-2">
                    {teammates.map((mate, index) => (
                        <li
                            key={index}
                            className={`flex items-center space-x-3 py-2 px-3 rounded-md transition ${
                                isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            {/* Logo with the first letter of the name */}
                            <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${
                                    getRandomColor(index)
                                }`}
                            >
                                {mate[0].toUpperCase()}
                            </div>
                            {/* Teammate's name */}
                            <span>{mate}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Resizable Chat Box Fixed to Bottom */}
            <div
                className="absolute bottom-0 left-0 w-full"
                style={{
                    height: chatHeight,
                    backgroundColor: isDarkMode ? "#2d2d2d" : "#e0e0e0", // Dark mode unchanged, Light mode softer gray
                }}
                onMouseMove={resizeChat}
                onMouseUp={stopResizing}
            >
                {/* Resize Handle */}
                <div
                    className={`h-1 cursor-row-resize ${
                        isDarkMode ? "bg-gray-600" : "bg-gray-400"
                    }`}
                    onMouseDown={startResizing}
                ></div>

                {/* Chat Box Content */}
                <div className="overflow-hidden  h-full">
                    <ChatBox isDarkMode={isDarkMode} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
