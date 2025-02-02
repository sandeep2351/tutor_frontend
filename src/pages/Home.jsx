import React, { useState } from 'react';
import Header from '../components/Header';
import CharacterSelection from '../components/CharacterSelection';
import TutorCharacter from '../components/TutorCharacter';
import Lessons from './Lessons'

const Home = () => {
  const [character, setCharacter] = useState(null);

  return (
    <div className="container gradient-background  mx-auto p-4 ">
      <Header />
      {!character ? (
        <CharacterSelection onSelect={setCharacter} />
      ) : (
        <>
        <TutorCharacter />
        <Lessons/>
        </>
      )}
    </div>
  );
};

export default Home;