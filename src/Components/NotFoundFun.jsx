import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NotFoundFun = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Fun facts about 404
  const facts = [
    "404 is the HTTP status code for 'Not Found'",
    "The first 404 error was seen in 1992",
    "404 is also the area code for Atlanta, Georgia",
    "In Roman numerals, 404 is CDIV",
    "404 is the number of a famous Boeing passenger aircraft",
  ];

  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [facts.length]);

  // Mouse move effect
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="min-h-[70vh] flex items-center justify-center px-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background moving elements */}
      <div
        className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        style={{
          transform: `translate(${position.x * 0.02}px, ${position.y * 0.02}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
      <div
        className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-0 right-0"
        style={{
          transform: `translate(${position.x * -0.01}px, ${position.y * -0.01}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      <div className="text-center relative z-10">
        {/* Animated 404 */}
        <div className="flex justify-center items-center gap-4">
          <span className="text-8xl md:text-9xl font-bold text-blue-500 animate-bounce">
            4
          </span>
          <span className="text-8xl md:text-9xl font-bold text-purple-500 animate-pulse">
            0
          </span>
          <span className="text-8xl md:text-9xl font-bold text-red-500 animate-bounce">
            4
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-400 text-lg mt-4 max-w-md mx-auto">
          This page is like a repository without a README - completely empty!
        </p>

        {/* Rotating facts */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="text-gray-300">
            <span className="text-purple-400">Did you know?</span>{" "}
            {facts[currentFact]}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-500/50 w-full sm:w-auto">
              🏠 Take Me Home
            </button>
          </Link>

          <Link to="/repositories">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-purple-500/50 w-full sm:w-auto">
              📚 Find Repositories
            </button>
          </Link>
        </div>

        {/* Funny git command */}
        <div className="mt-8 p-3 bg-gray-900 rounded-lg inline-block">
          <code className="text-sm text-green-400">
            git checkout -- . # Try going back
          </code>
        </div>
      </div>
    </div>
  );
};

export default NotFoundFun;
