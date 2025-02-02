import React from 'react';
import Lesson from '../components/Lesson';
import Homework from '../components/Homework';

const Lessons = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">Python Lessons</h1>
    <Lesson />
    <Homework />
  </div>
);

export default Lessons;