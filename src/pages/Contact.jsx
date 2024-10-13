import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa"; // Icon for the send button
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"; // Icons for social media links
import TopNavBar from '../components/TopNavBar';

const Contact = () => {
  const [message, setMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode state
  const [chatHistory, setChatHistory] = useState([]); // Chat history state

  const handleSendMessage = () => {
    if (message.trim() === "") return; // Prevent sending empty messages
    const whatsappUrl = `https://wa.me/+94760927927?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setChatHistory([...chatHistory, { text: message, sender: "user" }]); // Add user message to chat history
    setMessage(''); // Clear the input after sending
  };

  return (
    <>
      <TopNavBar />
      {/* Adjust padding-top here to account for the fixed top nav */}
      <motion.div
        className={`flex flex-col items-center justify-center min-h-screen p-4 pt-20 ${ // Added pt-20 for top padding
          isDarkMode ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-gray-100 to-gray-300"
        }`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className={`mb-6 text-center ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Y 92.7 is the original youth radio channel in Sri Lanka. Creating a trend in global youth lifestyle every day with a best mix of the latest Sinhala, Hindi, and English hits back to back and nonstop!
        </motion.p>

        {/* Chat Display */}
        <div className="flex flex-col w-full max-w-md p-4 mb-6 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg h-60">
          {/* Greeting Messages */}
          <div className="my-2">
            <div className="inline-block max-w-xs p-2 text-black bg-gray-200 rounded-lg">
              <span className="block text-gray-600">Hi,</span>
              <span className="block text-gray-600">We are Y FM.</span>
              <span className="block text-gray-600">Feel free to chat with us!</span>
            </div>
          </div>
          
          {chatHistory.map((msg, index) => (
            <div key={index} className={`my-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
              <div className={`inline-block rounded-lg p-2 max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Box */}
        <div className="flex w-full max-w-md mb-6">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows="2"
            className={`flex-grow border-2 ${
              isDarkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"
            } rounded-lg p-2 focus:outline-none focus:border-blue-500 transition duration-200 resize-none`}
          />
          <button 
            onClick={handleSendMessage} 
            className={`ml-2 flex items-center justify-center ${
              isDarkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
            } py-2 px-4 rounded-lg shadow-lg transition transform duration-200 hover:scale-105`}
          >
            <FaPaperPlane className="mr-2" />
          </button>
        </div>

        {/* Join Group Button */}
        <div className="w-full max-w-md mb-6">
          <a 
            href="https://chat.whatsapp.com/BYp8iwyJTfwHO9zcHxaAke" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`w-full inline-block ${isDarkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"} py-2 rounded-lg shadow-lg text-center transition transform duration-200 hover:scale-105`}
          >
            Join Our Fan Group
          </a>
        </div>

        {/* Social Media Links */}
        <motion.div className="flex mt-6 mb-12 space-x-6"> {/* Add bottom margin here */}
          <motion.a 
            href="https://www.facebook.com/yfm927/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`text-3xl ${isDarkMode ? "text-white" : "text-black"}`}
            whileHover={{ scale: 0.5, rotate: 360 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaFacebook />
          </motion.a>
          <motion.a 
            href="https://www.instagram.com/myy_srilanka/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`text-3xl ${isDarkMode ? "text-white" : "text-black"}`}
            whileHover={{ scale: 0.5, rotate: 360 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaInstagram />
          </motion.a>
          <motion.a 
            href="https://www.tiktok.com/@yfmradio?lang=en" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`text-3xl ${isDarkMode ? "text-white" : "text-black"}`}
            whileHover={{ scale: 0.5, rotate: 360 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaTiktok />
          </motion.a>
          <motion.a 
            href="https://www.youtube.com/channel/UCsExZudI-3Bfi2ubAdwcgHw" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`text-3xl ${isDarkMode ? "text-white" : "text-black"}`}
            whileHover={{ scale: 0.5, rotate: 360 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaYoutube />
          </motion.a>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Contact;
