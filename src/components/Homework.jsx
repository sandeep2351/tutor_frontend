import React, { useState } from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';
import { motion } from 'framer-motion';

const Homework = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const challenge = `
  # Write a Python function to add two numbers
  def add(a, b):
      # Your code here
      return a + b
  `;

  const handleRunCode = () => {
    try {
      const result = eval(code); 
      setOutput(`Result: ${result}`);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="homework p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Homework Challenge</h2>
      <CodeBlock
        text={challenge}
        language="python"
        theme={dracula}
        showLineNumbers={true}
      />
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
        className="w-full p-2 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows={10}
      />
      <button
        onClick={handleRunCode}
        className="mt-4 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Run Code
      </button>
      {output && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 p-4 bg-gray-50 rounded-lg"
        >
          <p className="text-gray-700">{output}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Homework;