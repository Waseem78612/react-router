import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import Repositries from "./Components/Repositries.jsx";
import Home from "./Components/Home.jsx";
import NotFoundFun from "./Components/NotFoundFun.jsx"; // Import the 404 component
// import NotFoundFun from "./Components/NotFoundFun.jsx"; // Alternative fun version

function App() {
  const location = useLocation();

  return (
    <div className="App min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              GitHub Repository Search
            </span>
          </h1>
          <p className="text-gray-400 text-center mt-2 text-sm md:text-base">
            Discover amazing repositories from GitHub
          </p>

          {/* Navigation Buttons - Hide on 404? Optional */}
          {location.pathname !== "/404" && (
            <nav className="flex justify-center gap-4 mt-6">
              <Link to="/">
                <button
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 
                    ${
                      location.pathname === "/"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                    }`}
                >
                  🏠 Home
                </button>
              </Link>

              <Link to="/repositories">
                <button
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 
                    ${
                      location.pathname === "/repositories"
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                    }`}
                >
                  📚 Repositories
                </button>
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repositories" element={<Repositries />} />

          {/* 404 Route - This catches all undefined routes */}
          <Route path="*" element={<NotFoundFun />} />
          {/* <Route path="*" element={<NotFoundFun />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
