import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TutorCharacter = () => {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const savedCharacter = JSON.parse(localStorage.getItem('tutorCharacter'));
    if (savedCharacter) {
      setCharacter(savedCharacter);
    }
  }, []);

  if (!character) return <p>No character selected.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-32 h-32 mx-auto rounded-full border-4 border-purple-500 shadow-lg mt-3"
      />
      <p className="text-xl  font-semibold text-purple-700">{character.name}</p>
    </motion.div>
  );
};

export default TutorCharacter;