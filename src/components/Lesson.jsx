import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ClipLoader } from "react-spinners"; // Import the spinner

const Lesson = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading
  const [error, setError] = useState(null); // Track errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset errors before new request

    try {
      const res = await axios.post("https://python-tutor-backend-rfei.onrender.com/chat", { message });

      // Check if response data exists
      if (res.data && res.data.response) {
        setResponse(res.data.response);
      } else {
        setResponse("Sorry, no response received from the server.");
      }
    } catch (err) {
      console.error("Error fetching response", err);
      setError("Failed to fetch response. Please check your internet connection or try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text) => {
    if (!text) return null; // Prevent errors with undefined text

    // Remove unnecessary symbols like asterisks or bullet points
    text = text.replace(/[*_]/g, ""); 

    // Identify code blocks with triple backticks
    const regex = /```(.*?)```/gs;
    return text.split(regex).map((part, index) =>
      index % 2 === 1 ? (
        <SyntaxHighlighter language="python" style={solarizedlight} key={index}>
          {part}
        </SyntaxHighlighter>
      ) : (
        <p key={index}>{part}</p>
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lesson p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Ask Your Tutor</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything about Python!"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <button
          type="submit"
          className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          disabled={loading}
        >
          Ask
        </button>
      </form>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 p-4 bg-gray-50 rounded-lg text-center"
        >
          <ClipLoader color="#6B21A8" loading={loading} size={50} />
        </motion.div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}

      {response && !loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 p-4 bg-gray-50 rounded-lg"
        >
          <div className="text-gray-700">{formatResponse(response)}</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Lesson;
