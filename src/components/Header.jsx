import React from 'react';
import { motion } from 'framer-motion';

const Header = () => (
  <motion.header
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="text-center py-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white -mt-2"
  >
    <h1 className="text-5xl font-bold bounce">Welcome to Python Tutor!</h1>
    <p className="text-xl mt-4">Learn Python in a fun and interactive way!</p>
  </motion.header>
);

export default Header;