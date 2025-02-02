import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ children, onClick, className }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`p-2 rounded-lg transition-colors ${className}`}
  >
    {children}
  </motion.button>
);

export default AnimatedButton;