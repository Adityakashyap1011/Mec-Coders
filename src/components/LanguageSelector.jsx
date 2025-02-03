import { useState, useEffect } from "react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "text-blue-500"; // Tailwind active color

const LanguageSelector = ({ language, onSelect, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="ml-2 mb-4">
      <p className={`mb-2 text-lg ${isDarkMode ? "text-white" : "text-gray-800"}`}>Language:</p>
      <div className="relative">
        {/* Button to open dropdown */}
        <button
          className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition-all ${
            isDarkMode
              ? "bg-gray-800 text-white hover:bg-gray-700 focus:ring-blue-400"
              : "bg-gray-200 text-black hover:bg-gray-300 focus:ring-blue-500"
          }`}
          onClick={toggleDropdown}
        >
          {language}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className={`absolute mt-2 w-48 border rounded-md shadow-lg z-10 transition-all ${
              isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"
            }`}
          >
            {languages.map(([lang, version]) => (
              <div
                key={lang}
                className={`w-full text-left px-4 py-2 cursor-pointer transition-colors ${
                  lang === language
                    ? `${ACTIVE_COLOR} ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`
                    : `${isDarkMode ? "text-white" : "text-gray-800"}`
                } hover:${ACTIVE_COLOR} hover:bg-gray-700`}
                onClick={() => {
                  onSelect(lang);
                  setIsOpen(false);
                }}
              >
                {lang} <span className="text-sm opacity-75 ml-1">({version})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
