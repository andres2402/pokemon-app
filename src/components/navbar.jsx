import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to={"/"} className="flex-shrink-0">
              <span className="font-bold text-xl text-gray-800 hover:text-green-500 transition duration-300">
                Inicio
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <img
              src="./imgs/poke-ball.png"
              alt="Logo"
              className="h-10 w-13 mr-2"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
