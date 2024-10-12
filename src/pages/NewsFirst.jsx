import React from 'react';
import TopNavBar from '../components/TopNavBar';

const NewsFirst = () => {
  const currentProgram = "Current Program Name"; // Replace with actual program name
  const isPlaying = false; // Replace with actual play state
  const togglePlayPause = () => {}; // Replace with actual function

  return (
    <div className="bg-black min-h-screen flex flex-col pb-20">
      {/* TopNavBar with fixed position */}
      <TopNavBar
        currentProgram={currentProgram}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
      />

      {/* Main content with padding at the top */}
      <div className="flex-grow p-4 pt-20"> {/* pt-20 to create space for TopNavBar */}
        {/* Embed YouTube playlist 1 */}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/videoseries?si=XziGusqqe2fd8Rj4&list=PLwBEINflt3JHDHA0G4qR6HRNieFyVtCqX"
          title="YouTube Playlist 1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full md:w-3/4 lg:w-2/3 mb-4"
        ></iframe>

        {/* Embed YouTube playlist 2 */}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/videoseries?list=PLwBEINflt3JG7geGUHMn9Qks4odrb34Qc"
          title="YouTube Playlist 2"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full md:w-3/4 lg:w-2/3 mb-4"
        ></iframe>

        {/* Embed YouTube playlist 3 */}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/videoseries?list=PLwBEINflt3JG36kGwG_csLKoLe5gqNKtF"
          title="YouTube Playlist 3"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full md:w-3/4 lg:w-2/3 mb-4"
        ></iframe>
      </div>
    </div>
  );
};

export default NewsFirst;
