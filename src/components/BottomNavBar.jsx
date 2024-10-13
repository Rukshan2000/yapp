import React from "react";
import { NavLink } from "react-router-dom";
import { FaBroadcastTower, FaNewspaper, FaListUl, FaRegNewspaper, FaPhone } from "react-icons/fa"; // Import the phone icon

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 flex justify-around w-full py-3 text-white bg-gray-800 rounded-t-lg shadow-lg">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "flex flex-col items-center transform scale-110 transition duration-200"
            : "flex flex-col items-center"
        }
      >
        <FaBroadcastTower className="text-2xl" />
        <span className="mt-1 text-xs">Live</span>
      </NavLink>
      <NavLink
        to="/top-stories"
        className={({ isActive }) =>
          isActive
            ? "text-yellow-400 flex flex-col items-center transform scale-110 transition duration-200"
            : "flex flex-col items-center"
        }
      >
        <FaNewspaper className="text-2xl" />
        <span className="mt-1 text-xs">Top Stories</span>
      </NavLink>
      <NavLink
        to="/program-lineup"
        className={({ isActive }) =>
          isActive
            ? "text-yellow-400 flex flex-col items-center transform scale-110 transition duration-200"
            : "flex flex-col items-center"
        }
      >
        <FaListUl className="text-2xl" />
        <span className="mt-1 text-xs">Program Lineup</span>
      </NavLink>
      <NavLink
        to="/news-first"
        className={({ isActive }) =>
          isActive
            ? "text-yellow-400 flex flex-col items-center transform scale-110 transition duration-200"
            : "flex flex-col items-center"
        }
      >
        <FaRegNewspaper className="text-2xl" />
        <span className="mt-1 text-xs">News First</span>
      </NavLink>
      {/* New Contact NavLink */}
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "text-yellow-400 flex flex-col items-center transform scale-110 transition duration-200"
            : "flex flex-col items-center"
        }
      >
        <FaPhone className="text-2xl" /> {/* Phone icon */}
        <span className="mt-1 text-xs">Contact</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavBar;
