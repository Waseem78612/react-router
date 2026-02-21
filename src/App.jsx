import "./App.css";

import { Route, Routes, Link, useLocation, NavLink } from "react-router-dom";
import Repositries from "./Components/Repositries.jsx";
import Home from "./Components/Home.jsx";
import RepoDetail from "./Components/RepoDetails.jsx";
import NotFoundFun from "./Components/NotFoundFun.jsx";
import TrendingRepos from "./Components/TrendingRepos.jsx";
import PopularRepos from "./Components/PopularRepos.jsx";
import StarredRepos from "./Components/StarredRepos.jsx";
import { useState, useEffect } from "react";

function App() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: "/", name: "🏠 Home", color: "blue" },
    { path: "/repositories", name: "📚 Repositories", color: "purple" },
    { path: "/trending", name: "📈 Trending", color: "green" },
    { path: "/popular", name: "⭐ Popular", color: "orange" },
    { path: "/starred", name: "✨ Starred", color: "pink" },
  ];

  // Function to get active class based on path and color for desktop
  const getDesktopActiveClass = (isActive, color) => {
    const baseClasses =
      "px-3 lg:px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm lg:text-base whitespace-nowrap";

    if (isActive) {
      switch (color) {
        case "blue":
          return `${baseClasses} bg-blue-600 text-white shadow-lg shadow-blue-500/50`;
        case "purple":
          return `${baseClasses} bg-purple-600 text-white shadow-lg shadow-purple-500/50`;
        case "green":
          return `${baseClasses} bg-green-600 text-white shadow-lg shadow-green-500/50`;
        case "orange":
          return `${baseClasses} bg-orange-600 text-white shadow-lg shadow-orange-500/50`;
        case "pink":
          return `${baseClasses} bg-pink-600 text-white shadow-lg shadow-pink-500/50`;
        default:
          return `${baseClasses} bg-gray-600 text-white`;
      }
    }

    return `${baseClasses} bg-gray-800/80 text-gray-300 hover:bg-gray-700 border border-gray-700`;
  };

  // Function for mobile nav class
  const getMobileActiveClass = (isActive, color) => {
    const baseClasses =
      "block px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-base w-full text-left";

    if (isActive) {
      switch (color) {
        case "blue":
          return `${baseClasses} bg-blue-600 text-white shadow-lg shadow-blue-500/50`;
        case "purple":
          return `${baseClasses} bg-purple-600 text-white shadow-lg shadow-purple-500/50`;
        case "green":
          return `${baseClasses} bg-green-600 text-white shadow-lg shadow-green-500/50`;
        case "orange":
          return `${baseClasses} bg-orange-600 text-white shadow-lg shadow-orange-500/50`;
        case "pink":
          return `${baseClasses} bg-pink-600 text-white shadow-lg shadow-pink-500/50`;
        default:
          return `${baseClasses} bg-gray-600 text-white`;
      }
    }

    return `${baseClasses} bg-gray-800/80 text-gray-300 hover:bg-gray-700 border border-gray-700`;
  };

  return (
    <div className="App bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header with navigation - Full width */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/95 backdrop-blur-md shadow-lg py-3"
            : "bg-gray-900/90 backdrop-blur-sm py-5"
        } border-b border-gray-700/50`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo/Heading - Left Side */}
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex-shrink-0"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  GitHub Explorer
                </span>
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">
                Discover amazing repositories
              </p>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    getDesktopActiveClass(isActive, link.color)
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700/50 pt-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      getMobileActiveClass(isActive, link.color)
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Natural flow with top padding for fixed header */}
      <main className="w-full px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 lg:pt-36 pb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repositories" element={<Repositries />} />
          <Route path="/trending" element={<TrendingRepos />} />
          <Route path="/popular" element={<PopularRepos />} />
          <Route path="/starred" element={<StarredRepos />} />
          <Route
            path="/repo-detail/:username/:reponame"
            element={<RepoDetail />}
          />
          <Route path="*" element={<NotFoundFun />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
