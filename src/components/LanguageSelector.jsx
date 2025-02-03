import { useState } from "react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "text-blue-400"; // Tailwind CSS color for active state

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  // Toggle the dropdown visibility when button is clicked
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="ml-2 mb-4">
      <p className="mb-2 text-lg text-white">Language:</p>
      <div className="relative">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={toggleDropdown} 
        >
          {language}
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-48 bg-[#110c1b] border border-gray-700 rounded-md shadow-lg z-10">
            {languages.map(([lang, version]) => (
              <div
                key={lang}
                className={`w-full text-left px-4 py-2 ${
                  lang === language ? ACTIVE_COLOR : "text-white"
                } ${
                  lang === language ? "bg-gray-900" : "bg-transparent"
                } hover:${ACTIVE_COLOR} hover:bg-gray-900 cursor-pointer transition-colors`}
                onClick={() => {
                  onSelect(lang);
                  setIsOpen(false); 
                }}
              >
                {lang}
                <span className="text-gray-600 text-sm ml-1">({version})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
