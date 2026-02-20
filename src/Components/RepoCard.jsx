import React from "react";

const RepoCard = ({ repo }) => {
  const handleViewRepo = () => {
    window.open(repo.html_url, "_blank", "noopener,noreferrer");
  };

  const handleOwnerClick = () => {
    window.open(repo.owner.html_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                 backdrop-blur-sm rounded-2xl p-5 sm:p-6
                 border border-gray-700/50 hover:border-purple-500/50
                 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10
                 transform hover:scale-[1.02] transition-all duration-300
                 flex flex-col gap-3 sm:gap-4
                 animate-fade-in"
    >
      {/* Header with Avatar and Name */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Avatar with Glow */}
        <div className="relative">
          <div
            className="absolute inset-0 bg-purple-500 rounded-full blur-md 
                          opacity-0 group-hover:opacity-40 transition-opacity duration-300"
          ></div>
          <img
            src={repo.owner.avatar_url}
            alt={`${repo.owner.login}'s avatar`}
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full 
                       border-2 border-purple-500/30 group-hover:border-purple-400
                       transition-all duration-300"
          />
        </div>

        {/* Repo Name and Owner */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-white font-semibold text-base sm:text-lg 
                         truncate group-hover:text-purple-400 transition-colors"
          >
            {repo.name}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm truncate">
            @{repo.owner.login}
          </p>
        </div>
      </div>

      {/* Language Badge */}
      {repo.language && (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
          <span className="text-xs sm:text-sm text-gray-300">
            {repo.language}
          </span>
        </div>
      )}

      {/* Description (if available) */}
      {repo.description && (
        <p
          className="text-gray-400 text-xs sm:text-sm line-clamp-2 
                      border-l-2 border-purple-500/30 pl-3"
        >
          {repo.description}
        </p>
      )}

      {/* Stats Row */}
      <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400">
        {repo.stargazers_count !== undefined && (
          <span className="flex items-center gap-1">
            <span className="text-yellow-400">⭐</span>
            {repo.stargazers_count.toLocaleString()}
          </span>
        )}
        {repo.forks_count !== undefined && (
          <span className="flex items-center gap-1">
            <span className="text-gray-400">🍴</span>
            {repo.forks_count.toLocaleString()}
          </span>
        )}
        {repo.size && (
          <span className="flex items-center gap-1">
            <span className="text-gray-400">📦</span>
            {repo.size}KB
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        {/* View Repo Button - Primary Action */}
        <button
          onClick={handleViewRepo}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500
                     hover:from-purple-600 hover:to-pink-600
                     text-white font-semibold py-2.5 px-4 rounded-xl
                     shadow-lg hover:shadow-purple-500/25
                     transform hover:scale-105 transition-all duration-300
                     flex items-center justify-center gap-2
                     text-sm sm:text-base"
        >
          <span>View Repository</span>
          <svg
            className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>

        {/* Owner Button - Secondary Action */}
        <button
          onClick={handleOwnerClick}
          className="px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700
                     text-gray-300 hover:text-white rounded-xl
                     border border-gray-600 hover:border-gray-500
                     transition-all duration-300 text-sm
                     flex items-center justify-center gap-2
                     sm:w-auto"
        >
          <span>👤</span>
          <span className="sm:hidden">Owner</span>
          <span className="hidden sm:inline">View Owner</span>
        </button>
      </div>

      {/* Topics/Tags (if available) */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-gray-700/50">
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="text-xs bg-gray-700/30 text-gray-400 
                         px-2 py-1 rounded-full border border-gray-600"
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 3 && (
            <span className="text-xs text-gray-500">
              +{repo.topics.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Add this to your global CSS or tailwind.config.js
const styles = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;

export default RepoCard;
