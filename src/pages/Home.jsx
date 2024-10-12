import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { motion } from "framer-motion";
import ReactAudioPlayer from "react-audio-player";
import radioImage from "../assets/ylogo.png"; // Adjust the path based on your project structure
import programData from "../data/program.json"; // Adjust the path to your JSON file

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Initially set to false
  const [currentProgram, setCurrentProgram] = useState("");
  const audioRef = useRef(null); // Reference for controlling the audio player

  useEffect(() => {
    const updateCurrentProgram = () => {
      const now = new Date();
      const dayOfWeek = now.toLocaleString("en-US", { weekday: "long" });
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; // Format time as HH:mm

      const programs = programData.programLineup[dayOfWeek];
      const currentProgram = programs.find(([programName, timeRange]) => {
        const [startTime, endTime] = timeRange.split(" - ").map(t => convertTo24HourFormat(t));
        return timeIsInRange(currentTime, startTime, endTime);
      });

      setCurrentProgram(currentProgram ? currentProgram[0] : "No program currently airing");
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
      return `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`; // Return HH:mm format
    };

    const timeIsInRange = (time, start, end) => {
      const currentTime = new Date(`1970-01-01T${time}`);
      const startTime = new Date(`1970-01-01T${start}`);
      const endTime = new Date(`1970-01-01T${end}`);
      // Handle case where end time is past midnight
      if (endTime < startTime) {
        return currentTime >= startTime || currentTime <= endTime;
      }
      return currentTime >= startTime && currentTime <= endTime;
    };

    updateCurrentProgram();
    const interval = setInterval(updateCurrentProgram, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current.audioEl.current.paused) {
      audioRef.current.audioEl.current.play();
      setIsPlaying(true); // Set to playing
    } else {
      audioRef.current.audioEl.current.pause();
      setIsPlaying(false); // Set to paused
    }
  };

  // Waveform animation logic (with reduced heights)
  const bars = Array.from({ length: 20 }, (_, i) => i); // 20 bars

  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center text-white"
      initial={{ background: "linear-gradient(to bottom, #ff0000, #000000, #0000ff)" }} // initial state with red and blue
      animate={{
        background: [
          "linear-gradient(to bottom, #210105, #000000, #010721)", // red to black to blue
          "linear-gradient(to bottom, #000000, #210105, #010721)", // black to red and blue
          "linear-gradient(to bottom, #010721, #000000, #210105)", // blue to black to red
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Radio Image & Station Details */}
      <div className="relative w-64 h-64 bg-black rounded-3xl shadow-lg mb-6">
        <img
          src={radioImage}
          alt="Radio Station"
          className="w-full h-full object-cover rounded-3xl"
        />
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
          LIVE
        </div>
      </div>

      {/* Radio Station Information */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-semibold mb-2 text-red-500">Y FM Radio</h2>
        <p className="text-gray-300">The Best Hits - 92.7 MHz</p>
        <p className="text-lg font-bold text-yellow-400">{currentProgram}</p> {/* Display current program */}
      </div>

      {/* Waveform Visualization */}
      <div className="w-full max-w-md flex justify-center space-x-1 mb-8">
        {bars.map((bar, index) => (
          <motion.div
            key={index}
            className="w-1 bg-red-500"
            animate={{
              height: [5, Math.random() * 8 + 10, 5], // Reduced random heights
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1, // Stagger the bars
            }}
            style={{ borderRadius: "4px" }}
          ></motion.div>
        ))}
      </div>

      {/* Player Controls */}
      <div className="flex justify-center items-center space-x-8 mb-8">
        <button className="p-4 bg-gray-800 rounded-full shadow-lg hover:bg-gray-700">
          <FaBackward className="text-2xl text-gray-400" />
        </button>
        <button
          onClick={togglePlayPause}
          className="p-6 bg-red-500 rounded-full shadow-xl hover:bg-red-600"
        >
          {isPlaying ? (
            <FaPause className="text-white text-3xl" />
          ) : (
            <FaPlay className="text-white text-3xl" />
          )}
        </button>
        <button className="p-4 bg-gray-800 rounded-full shadow-lg hover:bg-gray-700">
          <FaForward className="text-2xl text-gray-400" />
        </button>
      </div>

      {/* Audio Player (Hidden Controls) */}
      <ReactAudioPlayer
        src="https://mbc.thestreamtech.com:7032/"
        controls={false}
        ref={audioRef} // Reference to the audio player
      />
    </motion.div>
  );
};

export default Home;
