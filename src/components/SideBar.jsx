import React, { useState } from "react";
import ChatBox from "./ChatBox";

const Sidebar = () => {
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

    return (
        <div className="flex flex-col w-72 h-screen bg-gray-900 text-white shadow-lg relative">
            
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold mb-3">Team Members</h2>
                <ul className="space-y-2">
                    {teammates.map((mate, index) => (
                        <li key={index} className="py-2 px-3 bg-gray-800 rounded-md hover:bg-gray-700">
                            {mate}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Resizable Chat Box Fixed to Bottom */}
            <div
                className="absolute bottom-0 left-0 w-full bg-gray-800"
                style={{ height: chatHeight, width: "100%" }} 
                onMouseMove={resizeChat}
                onMouseUp={stopResizing}
            >
                {/* Resize Handle */}
                <div
                    className="h-1 bg-gray-600 cursor-row-resize"
                    onMouseDown={startResizing}
                ></div>

                {/* Chat Box Content */}
                <div className="overflow-hidden p-4 h-full">
                    <ChatBox />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;