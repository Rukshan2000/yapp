import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaArrowUp } from "react-icons/fa"; // Import icons
import ReactAudioPlayer from "react-audio-player"; // Import audio player
import programData from '../data/program.json'; // Adjust the path as necessary

const TopNavBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgram, setCurrentProgram] = useState("");
  const [showScrollToTop, setShowScrollToTop] = useState(false); // State for scroll button
  const audioRef = useRef(null); // Reference for audio player

  useEffect(() => {
    const updateCurrentProgram = () => {
      const now = new Date();
      const dayOfWeek = now.toLocaleString("en-US", { weekday: "long" });
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`; // Format time as HH:mm

      const programs = programData.programLineup[dayOfWeek];
      if (!programs) {
        setCurrentProgram("No program scheduled for today.");
        return;
      }

      const currentProgram = programs.find(([programName, timeRange]) => {
        const [startTimeStr, endTimeStr] = timeRange.split(" - ").map((t) => t.trim());
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
        return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
      } else {
        return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
      }
    };

    updateCurrentProgram();
    const interval = setInterval(updateCurrentProgram, 60000); // Update every minute

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true); // Show button after scrolling down
      } else {
        setShowScrollToTop(false); // Hide button when near top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const togglePlayPause = () => {
    const audioElement = audioRef.current.audioEl.current;
    if (audioElement.paused) {
      audioElement.play();
      setIsPlaying(true);
    } else {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2 text-white shadow-lg bg-gradient-to-r from-red-500 to-red-700">
        {/* Play/Pause Button */}
        <button
          className={`bg-gradient-to-br from-green-400 to-blue-500 text-white p-4 rounded-full shadow-md transition-transform duration-300 transform hover:scale-105 focus:outline-none ${
            isPlaying ? "ring-4 ring-blue-300" : ""
          }`}
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <FaPause size={24} className="animate-pulse" />
          ) : (
            <FaPlay size={24} />
          )}
        </button>

        {/* Display current program */}
        <div className="flex flex-col items-center text-center">
          <span className="font-semibold text-md">{currentProgram}</span>
          <span className="text-xs">Now Airing</span>
        </div>

        {/* Audio Player (Hidden Controls) */}
        <ReactAudioPlayer
          src="https://mbc.thestreamtech.com:7032/"
          controls={false} // Hide controls
          ref={audioRef}
        />
      </div>

      {/* Scroll-to-Top Button */}
      {showScrollToTop && (
        <button
          className="fixed p-3 text-white transition-transform duration-300 bg-blue-600 rounded-full shadow-lg bottom-6 right-6 hover:scale-110 focus:outline-none"
          onClick={scrollToTop}
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default TopNavBar;
