import React, { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import { motion } from 'framer-motion'; // For animation

const YouTubeIframe = ({ src, title, delay, onLoad }) => (
  <motion.div
    className="w-full mb-4 md:w-3/4 lg:w-2/3"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
  >
    <iframe
      width="560"
      height="200" // Adjusted height
      src={src}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="w-full rounded-lg shadow-lg"
      onLoad={onLoad}
    ></iframe>
  </motion.div>
);

const TopStories = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const playlists = [




    {
      src: "https://www.youtube.com/embed/videoseries?si=XziGusqqe2fd8Rj4&list=PL0qH7Ay3Z2p7nVuOMvEqd_L027pYH_dZv",
      title: "YouTube Playlist 1",
    },
    {
      src: "https://www.youtube.com/embed/videoseries?list=PL0qH7Ay3Z2p4NYwyEpD2MaeeYj9ee2OJ9",
      title: "YouTube Playlist 2",
    },
    {
      src: "https://www.youtube.com/embed/videoseries?list=PL0qH7Ay3Z2p7_iqJm16457s3VX36r0MeY",
      title: "YouTube Playlist 3",
    },
  ];

  return (
    <>
      <TopNavBar />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-900 to-black" style={{ marginTop: '4rem' }}>
        
        {/* Loading spinner */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-12 h-12 border-t-4 border-b-4 border-gray-400 rounded-full animate-spin"></div>
          </div>
        )}

        <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
          {playlists.map((playlist, index) => (
            <YouTubeIframe 
              key={index}
              src={playlist.src}
              title={playlist.title}
              delay={index * 0.2}
              onLoad={handleIframeLoad}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TopStories;
