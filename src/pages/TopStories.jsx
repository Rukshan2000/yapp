import React from 'react';
import TopNavBar from '../components/TopNavBar';


const TopStories = () => {
  return (
    <>
          <TopNavBar />
          
    <div className="p-4 bg-black min-h-screen flex flex-col items-center justify-center">
      {/* Embed YouTube playlist 1 */}
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/videoseries?si=XziGusqqe2fd8Rj4&list=PL0qH7Ay3Z2p7nVuOMvEqd_L027pYH_dZv"
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
        src="https://www.youtube.com/embed/videoseries?list=PL0qH7Ay3Z2p4NYwyEpD2MaeeYj9ee2OJ9"
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
        src="https://www.youtube.com/embed/videoseries?list=PL0qH7Ay3Z2p7_iqJm16457s3VX36r0MeY"
        title="YouTube Playlist 3"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="w-full md:w-3/4 lg:w-2/3 mb-4"
      ></iframe>

    </div>
    </>
  );
};

export default TopStories;
