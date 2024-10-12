import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa"; // Import icons
import ReactAudioPlayer from "react-audio-player"; // Import audio player
import programData from '../data/program.json'; // Adjust the path as necessary

const TopNavBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgram, setCurrentProgram] = useState("");
  const audioRef = useRef(null); // Reference for audio player

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
    const audioElement = audioRef.current.audioEl.current;
    if (audioElement.paused) {
      audioElement.play();
      setIsPlaying(true);
    } else {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  return (
     <div className="bg-red-600 text-white flex items-center justify-between p-1 fixed top-0 left-0 right-0 shadow-lg z-10">

      <button
        className="bg-white text-red-600 p-1 rounded flex items-center"
        onClick={togglePlayPause}
      >
        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
      </button>

      {/* Display current program */}
      <div className="flex items-center mx-2">
        <span className="text-sm font-bold">{currentProgram}</span>
      </div>

      {/* Audio Player (Hidden Controls) */}
      <ReactAudioPlayer
        src="https://mbc.thestreamtech.com:7032/"
        controls={false} // Hide controls
        ref={audioRef}
      />
    </div>
  );
};

export default TopNavBar;
