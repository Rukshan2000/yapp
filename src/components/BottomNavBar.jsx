import React from "react";
import { NavLink } from "react-router-dom";
import { FaHeadphones, FaNewspaper, FaListUl, FaRegNewspaper, FaPhone } from "react-icons/fa";

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 flex justify-around w-full py-3 text-white bg-gray-700 rounded-t-lg shadow-lg">


      <NavLink
        to="/program-lineup"
        className={({ isActive }) =>
          isActive
            ? "text-yellow-400 flex flex-col items-center transform scale-110 transition duration-200"
            : "flex flex-col items-center"
        }
      >
        <FaListUl className="text-2xl" />
        <span className="mt-1 text-xs">Lineup</span>
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
        <span className="mt-1 text-xs">Stories</span>
      </NavLink>
      
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "flex flex-col items-center transform scale-110 transition duration-200"
            : "flex flex-col items-center"
        }
      >
        <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
          <FaHeadphones className="text-2xl" />
        </div>
        <span className="mt-1 text-xs"></span>
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
        <span className="mt-1 text-xs">News</span>
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "text-yellow-400 flex flex-col items-center transform scale-110 transition duration-200"
            : "flex flex-col items-center"
        }
      >
        <FaPhone className="text-2xl" />
        <span className="mt-1 text-xs">Contact</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavBar;
