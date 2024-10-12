import React from 'react';

const NewsFirst = () => {
  return (
    <div className="p-4 bg-black min-h-screen flex flex-col items-center justify-center pb-20"> {/* Added bottom padding */}
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
  );
};

export default NewsFirst;
