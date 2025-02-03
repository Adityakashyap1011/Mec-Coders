import { useState } from "react";
import { executeCode } from "../api";

const Output = ({ editorRef, language, isDarkMode }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      alert("An error occurred: " + (error.message || "Unable to run code"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2">
      <p className={`mb-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>Output</p>
      <button
  className={`px-4 py-2 mb-4 border-2 rounded-md transition-colors disabled:opacity-50 
    ${isDarkMode
      ? 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
      : 'bg-green-500 text-white hover:bg-white hover:text-green-500 border-green-500'}
  `}
  onClick={runCode}
  disabled={isLoading}
>
  {isLoading ? "Running..." : "Run Code"}
</button>



      <div
        className={`h-[75vh] p-2 border rounded-md text-white ${isError ? "border-red-500 text-red-400" : "border-gray-800"}`}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
