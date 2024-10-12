import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import programData from '../data/program.json'; // Adjust the path as necessary
import TopNavBar from '../components/TopNavBar';

const ProgramLineup = () => {
  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const [selectedDay, setSelectedDay] = useState(daysOfWeek[new Date().getDay()]); // Default to current day
  const [currentProgram, setCurrentProgram] = useState(null);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const getProgramsForDay = (day) => {
    return programData.programLineup[day] || [];
  };

  const convertTo24HourFormat = (time) => {
    const [timePart, period] = time.split(" ");
    let [hour, minute] = timePart.split(":").map(Number);

    if (period === "PM" && hour < 12) {
      hour += 12; // Convert PM to 24-hour format
    }
    if (period === "AM" && hour === 12) {
      hour = 0; // Convert 12 AM to 0 hours
    }
    return `${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""}${minute}`; // Return HH:mm format
  };

  const timeToMinutes = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  };

  const timeIsInRange = (time, start, end) => {
    const currentMinutes = timeToMinutes(time);
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);

    if (endMinutes < startMinutes) {
      // Time range crosses midnight
      return (
        currentMinutes >= startMinutes || currentMinutes <= endMinutes
      );
    } else {
      return (
        currentMinutes >= startMinutes && currentMinutes <= endMinutes
      );
    }
  };

  const getCurrentProgram = (programs) => {
    const now = new Date();
    const currentTime = `${now.getHours() < 10 ? '0' : ''}${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`; // Format time as HH:mm

    for (let i = 0; i < programs.length; i++) {
      const [programName, timeRange] = programs[i];
      const [startTime, endTime] = timeRange.split(' - ').map(time => time.trim());

      if (timeIsInRange(currentTime, convertTo24HourFormat(startTime), convertTo24HourFormat(endTime))) {
        return programName;
      }
    }
    return "No program running at the moment.";
  };

  useEffect(() => {
    const programs = getProgramsForDay(selectedDay);
    setCurrentProgram(getCurrentProgram(programs));
    const interval = setInterval(() => {
      const updatedPrograms = getProgramsForDay(selectedDay);
      setCurrentProgram(getCurrentProgram(updatedPrograms));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [selectedDay]);

  const programs = getProgramsForDay(selectedDay);

  return (
    <>
      <TopNavBar />
      <div className="bg-black min-h-screen flex flex-col pb-20">
        <div className="flex-grow p-4 pt-20"> {/* pt-20 to create space for TopNavBar */}
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

          {/* Current Running Program */}
          <motion.div
            className="bg-gray-800 rounded-lg p-4 shadow-lg mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white">Current Program:</p>
            <p className="text-green-400 text-lg font-bold">{currentProgram}</p>
          </motion.div>

          {/* Program List */}
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-20">
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
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around shadow-lg">
        <button className="text-white">Home</button>
        <button className="text-white">Programs</button>
        <button className="text-white">Settings</button>
      </div>
    </>
  );
};

export default ProgramLineup;
