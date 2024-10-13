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
      <div className="flex flex-col min-h-screen p-4 pt-16 bg-black"> {/* Add padding to avoid overlap with TopNavBar */}
        <motion.h2
          className="mb-4 text-3xl font-bold text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Program Lineup
        </motion.h2>
        <motion.p
          className="mb-6 text-center text-gray-400"
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
            className="w-full p-3 text-white transition duration-150 ease-in-out bg-gray-800 rounded shadow-md outline-none md:w-1/3 focus:ring-2 focus:ring-blue-400"
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
          className="p-4 mb-6 text-center bg-gray-800 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white">Current Program:</p>
          <p className="text-lg font-bold text-green-400">{currentProgram}</p>
        </motion.div>

        {/* Program List */}
        <div className="grid flex-grow grid-cols-1 gap-4 mb-20 sm:grid-cols-2 md:grid-cols-3">
          {programs.length > 0 ? (
            programs.map(([programName, timeRange], index) => (
              <motion.div
                key={index}
                className="p-4 transition transform bg-gray-800 rounded-lg shadow-lg hover:scale-105"
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
        <div className="fixed bottom-0 left-0 right-0 flex justify-around p-4 bg-gray-800 shadow-lg">
          <button className="text-white">Home</button>
          <button className="text-white">Programs</button>
          <button className="text-white">Settings</button>
        </div>
      </div>
    </>
  );
};

export default ProgramLineup;
