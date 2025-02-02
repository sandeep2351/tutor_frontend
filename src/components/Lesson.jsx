import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ClipLoader } from 'react-spinners'; // Import the spinner

const Lesson = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when request is sent
    try {
      const res = await axios.post("http://localhost:5000/chat", { message });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error fetching response", error);
    } finally {
      setLoading(false); // Stop loading when request finishes
    }
  };

  const formatResponse = (text) => {
    // Remove unnecessary symbols like asterisks or bullet points
    text = text.replace(/[*_]/g, ""); // Remove all * and _ characters (you can adjust regex as needed)

    // Simple approach to identify code blocks with triple backticks
    const regex = /```(.*?)```/gs;
    return text.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        // It's a code block, wrap it in a SyntaxHighlighter
        return (
          <SyntaxHighlighter language="python" style={solarizedlight} key={index}>
            {part}
          </SyntaxHighlighter>
        );
      }
      return <p key={index}>{part}</p>; // Regular text
    });
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
        />
        <button
          type="submit"
          className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Ask
        </button>
      </form>
      
      {loading ? (
        // Display spinner while loading
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 p-4 bg-gray-50 rounded-lg text-center"
        >
          <ClipLoader color="#6B21A8" loading={loading} size={50} />
        </motion.div>
      ) : response && (
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
