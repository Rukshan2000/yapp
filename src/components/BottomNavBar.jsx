import React from "react";
import { NavLink } from "react-router-dom";
import { FaBroadcastTower, FaNewspaper, FaListUl, FaRegNewspaper } from "react-icons/fa";

const BottomNavBar = () => {
  return (
    <nav className="bg-gray-800 text-white flex justify-around py-3 fixed bottom-0 w-full rounded-t-lg shadow-lg">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? " flex flex-col items-center transform scale-110 transition duration-200"
            : "flex flex-col items-center"
        }
      >
        <FaBroadcastTower className="text-2xl" />
        <span className="text-xs mt-1">Live</span>
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
        <span className="text-xs mt-1">Top Stories</span>
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
        <span className="text-xs mt-1">Program Lineup</span>
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
        <span className="text-xs mt-1">News First</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavBar;
