import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CharacterSelection = ({ onSelect }) => {
  const characters = [
    { name: 'Robot', image: '/robot.avif' },
    { name: 'Dinosaur', image: '/Dinosaur.png' },
    { name: 'Wizard', image: '/wizard.png' },
  ];

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleSelect = (character) => {
    setSelectedCharacter(character);
    localStorage.setItem('tutorCharacter', JSON.stringify(character));
    onSelect(character);
  };

  return (
    <div className="character-selection p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Choose Your Tutor</h2>
      <div className="flex gap-6 justify-center">
        {characters.map((character) => (
          <motion.div
            key={character.name}
            onClick={() => handleSelect(character)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`cursor-pointer p-4 border rounded-lg ${
              selectedCharacter?.name === character.name ? 'bg-blue-50' : 'bg-white'
            }`}
          >
            <img
              src={character.image}
              alt={character.name}
              className="w-24 h-24 mx-auto rounded-full border-2 border-purple-300"
            />
            <p className="text-center mt-0 text-gray-700 ">{character.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;