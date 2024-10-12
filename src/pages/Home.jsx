import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaSun, FaMoon } from "react-icons/fa"; // Sun and Moon icons for theme toggle
import { motion } from "framer-motion";
import ReactAudioPlayer from "react-audio-player";
import radioImage from "../assets/ylogo.jpg"; // Adjust the path based on your project structure
import programData from "../data/program.json"; // Adjust the path to your JSON file

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgram, setCurrentProgram] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode by default
  const audioRef = useRef(null);

  useEffect(() => {
    const updateCurrentProgram = () => {
      const now = new Date();
      const dayOfWeek = now.toLocaleString("en-US", { weekday: "long" });
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = `${hours < 10 ? "0" : ""}${hours}:${
        minutes < 10 ? "0" : ""
      }${minutes}`; // Format time as HH:mm

      const programs = programData.programLineup[dayOfWeek];
      if (!programs) {
        setCurrentProgram("No program scheduled for today.");
        return;
      }

      const currentProgram = programs.find(([programName, timeRange]) => {
        const [startTimeStr, endTimeStr] = timeRange
          .split(" - ")
          .map((t) => t.trim());
        const startTime = convertTo24HourFormat(startTimeStr);
        const endTime = convertTo24HourFormat(endTimeStr);
        return timeIsInRange(currentTime, startTime, endTime);
      });

      setCurrentProgram(
        currentProgram ? currentProgram[0] : "No program currently airing"
      );
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
      return `${
        hour < 10 ? "0" : ""
      }${hour}:${minute < 10 ? "0" : ""}${minute}`; // Return HH:mm format
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

    updateCurrentProgram();
    const interval = setInterval(updateCurrentProgram, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current.audioEl.current.paused) {
      audioRef.current.audioEl.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.audioEl.current.pause();
      setIsPlaying(false);
    }
  };

  // Waveform animation logic (with reduced heights)
  const bars = Array.from({ length: 20 }, (_, i) => i); // 20 bars

  const shareUrl = "https://yfm.lk"; // Update with your share URL

  return (
    <motion.div
      className={`h-screen flex flex-col items-center justify-center ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      } transition-colors duration-500`}
      initial={{
        background: "linear-gradient(to bottom, #210105, #000000, #010721)",
      }}
      animate={{
        background: [
          isDarkMode
            ? "linear-gradient(to bottom, #210105, #000000, #010721)"
            : "linear-gradient(to bottom, #ffffff, #f7f8fa)",
          isDarkMode
            ? "linear-gradient(to bottom, #000000, #210105, #010721)"
            : "linear-gradient(to bottom, #f7f8fa, #ffffff)",
          isDarkMode
            ? "linear-gradient(to bottom, #010721, #000000, #210105)"
            : "linear-gradient(to bottom, #ffffff, #f7f8fa)",
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <motion.div
        className={`relative w-56 h-56 rounded-full shadow-lg mb-6 overflow-hidden ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 50, // Adjust the duration for slower or faster rotation
          ease: "linear",
        }}
      >
        <img
          src={radioImage}
          alt="Radio Station"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Radio Station Information */}
      <div className="text-center mb-6">
        <p className={`text-gray-500 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          The Best Hits - 92.7 MHz
        </p>
        <p className={`text-md font-bold ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}>
          {currentProgram}
        </p>
      </div>

      {/* Waveform Visualization */}
      <div className="w-full max-w-md flex justify-center space-x-1 mb-8">
        {bars.map((bar, index) => (
          <motion.div
            key={index}
            className={`w-1 ${isDarkMode ? "bg-red-500" : "bg-gray-500"}`}
            animate={{
              height: [5, Math.random() * 12 + 8, 5], // Reduced random heights
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
      <div className="flex justify-center items-center space-x-6 mb-8">
        <button
          onClick={togglePlayPause}
          className={`p-5 rounded-full shadow-md hover:scale-110 transition-all duration-300 ease-in-out ${
            isDarkMode ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          {isPlaying ? (
            <FaPause className="text-white text-2xl" />
          ) : (
            <FaPlay className="text-white text-2xl" />
          )}
        </button>
      </div>

      {/* Audio Player (Hidden Controls) */}
      <ReactAudioPlayer
        src="https://mbc.thestreamtech.com:7032/"
        controls={false}
        ref={audioRef}
      />
    </motion.div>
  );
};

export default Home;
