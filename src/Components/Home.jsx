import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2
          className="text-4xl md:text-5xl font-bold mb-6 
                       bg-gradient-to-r from-blue-400 to-purple-400 
                       bg-clip-text text-transparent"
        >
          Welcome to GitHub Explorer
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Search and discover amazing repositories from GitHub's vast ecosystem
        </p>

        {/* CTA Button */}
        <Link to="/repositories">
          <button
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 
                           text-white font-bold rounded-xl text-lg
                           shadow-lg hover:shadow-xl transform hover:scale-105 
                           transition-all duration-300
                           animate-pulse"
          >
            Explore Repositories 🚀
          </button>
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <FeatureCard
          icon="🔍"
          title="Search Repos"
          description="Search through thousands of GitHub repositories"
        />
        <FeatureCard
          icon="⭐"
          title="Star Ratings"
          description="See popular repositories by star count"
        />
        <FeatureCard
          icon="👥"
          title="Owner Info"
          description="View repository owner details and profiles"
        />
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div
    className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl 
                  border border-gray-700/50 hover:border-purple-500/50 
                  transition-all duration-300 text-center
                  hover:transform hover:scale-105"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Home;
