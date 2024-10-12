import React, { useRef, useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa"; // Import play and pause icons
import ReactAudioPlayer from "react-audio-player"; // Import ReactAudioPlayer

const TopNavBar = ({ currentProgram }) => {
  const audioRef = useRef(null); // Create a reference for ReactAudioPlayer
  const [isPlaying, setIsPlaying] = useState(false); // Local state for play/pause

  // Function to toggle play/pause
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.audioEl.current.paused) {
        audioRef.current.audioEl.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          // Optional: Notify user about the playback error
        });
        setIsPlaying(true);
      } else {
        audioRef.current.audioEl.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Error handling for audio playback
  useEffect(() => {
    const audioElement = audioRef.current?.audioEl.current;
    if (audioElement) {
      const handleError = () => {
        console.error("Audio playback error");
        // Optional: Notify user about the error
      };

      audioElement.addEventListener("error", handleError);

      return () => {
        audioElement.removeEventListener("error", handleError);
      };
    }
  }, []);

  return (
    <div className="bg-red-600 text-white flex items-center justify-between p-2 fixed top-0 left-0 right-0 shadow-lg">
      <button
        className="bg-white text-red-600 p-2 rounded flex items-center"
        onClick={handlePlayPause}
      >
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />} {/* Use icons */}
      </button>
      <div className="flex-grow text-center mx-4">
        <span className="text-lg font-bold">{currentProgram}</span>
      </div>
      <span className="text-white">On Air Now</span>

      {/* Hidden Audio Player */}
      <ReactAudioPlayer
        src="https://mbc.thestreamtech.com:7032/" // Your audio source
        controls={false}
        ref={audioRef} // Attach ref here
      />
    </div>
  );
};

export default TopNavBar;
