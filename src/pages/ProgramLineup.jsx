import React, { useState } from 'react';
import { motion } from 'framer-motion';
import programData from '../data/program.json'; // Adjust the path as necessary

const ProgramLineup = () => {
  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]); // Default to the first day

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  // Get programs for the selected day
  const programs = programData.programLineup[selectedDay] || [];

  return (
    <div className="flex flex-col min-h-screen p-4 bg-black">
      <motion.h2
        className="text-3xl font-bold mb-4 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Program Lineup
      </motion.h2>
      <motion.p
        className="text-center mb-6 text-gray-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Today's schedule and shows
      </motion.p>

      <div className="mb-4">
        <motion.select
          id="day-select"
          value={selectedDay}
          onChange={handleDayChange}
          className="p-3 bg-gray-800 text-white rounded w-full md:w-1/3 shadow-md outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </motion.select>
      </div>

      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-20"> {/* Added margin bottom */}
        {programs.length > 0 ? (
          programs.map(([programName, timeRange], index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg p-4 shadow-lg transition transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <p className="text-gray-300">{programName}</p>
              <p className="text-white">{timeRange}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-red-500">No programs scheduled.</p>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around shadow-lg">
        {/* Add your navigation items here */}
        <button className="text-white">Home</button>
        <button className="text-white">Programs</button>
        <button className="text-white">Settings</button>
      </div>
    </div>
  );
};

export default ProgramLineup;
