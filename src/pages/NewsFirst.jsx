import React, { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import { motion } from 'framer-motion'; // For animation

const TopStories = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <TopNavBar />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-900 to-black">
        
        {/* Loading spinner */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-12 h-12 border-t-4 border-b-4 border-gray-400 rounded-full animate-spin"></div>
          </div>
        )}

        <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
          {/* Embed YouTube playlist 1 */}
          <motion.div
            className="w-full mb-4 md:w-3/4 lg:w-2/3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <iframe
              width="560"
              height="200" // Adjusted height
              src="https://www.youtube.com/embed/videoseries?si=XziGusqqe2fd8Rj4&list=PLwBEINflt3JHDHA0G4qR6HRNieFyVtCqX"

              title="YouTube Playlist 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full rounded-lg shadow-lg"
              onLoad={handleIframeLoad}
            ></iframe>
          </motion.div>

          {/* Embed YouTube playlist 2 */}
          <motion.div
            className="w-full mb-4 md:w-3/4 lg:w-2/3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <iframe
              width="560"
              height="200" // Adjusted height
              src="https://www.youtube.com/embed/videoseries?list=PLwBEINflt3JG7geGUHMn9Qks4odrb34Qc"

              title="YouTube Playlist 2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full rounded-lg shadow-lg"
              onLoad={handleIframeLoad}
            ></iframe>
          </motion.div>

          {/* Embed YouTube playlist 3 */}
          <motion.div
            className="w-full mb-4 md:w-3/4 lg:w-2/3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <iframe
              width="560"
              height="200" // Adjusted height
              src="https://www.youtube.com/embed/videoseries?list=PLwBEINflt3JG36kGwG_csLKoLe5gqNKtF"

              title="YouTube Playlist 3"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full rounded-lg shadow-lg"
              onLoad={handleIframeLoad}
            ></iframe>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TopStories;