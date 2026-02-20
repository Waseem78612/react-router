// src/components/AuthProfile.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";

const AuthProfile = ({ username }) => {
  const [gitUserData, setGitUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGitUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.github.com/users/${username}`,
        );
        console.log("USER IS HERE", response.data);
        setGitUserData(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data");
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      getGitUser();
    }
  }, [username]);

  // Loading State
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative">
            {/* Spinner */}
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 bg-gray-900 rounded-full"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-400 animate-pulse">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-bold text-red-400 mb-2">
            Error Loading Profile
          </h3>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  // No Data State
  if (!gitUserData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800/50 rounded-2xl p-8 text-center">
          <p className="text-gray-400">No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-10 mb-8 
                     bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent
                     animate-fade-in"
      >
        YOUR PROFILE
      </h2>

      {/* Main Profile Card */}
      <div
        className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 
                      border border-gray-700/50 shadow-2xl
                      hover:border-purple-500/50 transition-all duration-300
                      animate-slide-up"
      >
        {/* Top Section - Responsive Flex */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Avatar with glow effect */}
          <div className="relative flex-shrink-0 group">
            <div
              className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-0 
                            group-hover:opacity-50 transition-opacity duration-300"
            ></div>
            <img
              src={gitUserData.avatar_url || "https://via.placeholder.com/150"}
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full 
                         border-4 border-purple-500/30 
                         shadow-lg group-hover:scale-105 transition-all duration-300
                         group-hover:border-purple-400"
              alt="user-avatar"
            />
          </div>

          {/* User Info Section */}
          <div className="flex-1 text-center md:text-left space-y-4 w-full">
            {/* Username and Name */}
            <div className="space-y-2">
              <span
                className="text-purple-400 text-lg block md:inline-block 
                             bg-purple-500/10 px-4 py-1 rounded-full md:mr-3"
              >
                @{gitUserData.login}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {gitUserData.name || "No name provided"}
              </h2>
            </div>

            {/* Company and Public Repos */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {gitUserData.company && (
                <div className="flex items-center gap-2 bg-gray-700/30 rounded-lg px-4 py-2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-300">Company:</span>
                  <span className="text-purple-400 font-semibold">
                    {gitUserData.company}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 bg-gray-700/30 rounded-lg px-4 py-2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <span className="text-gray-300">Public Repos:</span>
                <span className="text-blue-400 font-semibold">
                  {gitUserData.public_repos || 0}
                </span>
              </div>
            </div>

            {/* Location */}
            {gitUserData.location && (
              <h3
                className="text-gray-300 flex items-center justify-center md:justify-start gap-2 
                           bg-gray-700/20 inline-flex px-4 py-2 rounded-lg"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {gitUserData.location}
              </h3>
            )}

            {/* Followers/Following Stats */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div
                className="bg-gradient-to-br from-green-500/10 to-green-600/5 
                            rounded-xl px-6 py-3 text-center min-w-[120px]
                            border border-green-500/20 hover:border-green-500/40 
                            transition-all duration-300"
              >
                <span className="text-2xl font-bold text-green-400 block">
                  {gitUserData.followers || 0}
                </span>
                <span className="text-gray-400 text-sm">Followers</span>
              </div>
              <div
                className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 
                            rounded-xl px-6 py-3 text-center min-w-[120px]
                            border border-blue-500/20 hover:border-blue-500/40 
                            transition-all duration-300"
              >
                <span className="text-2xl font-bold text-blue-400 block">
                  {gitUserData.following || 0}
                </span>
                <span className="text-gray-400 text-sm">Following</span>
              </div>
            </div>

            {/* GitHub Button */}
            <a
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 
                         text-white font-semibold py-3 px-6 rounded-lg
                         border border-gray-700 hover:border-purple-500
                         transition-all duration-300 transform hover:scale-105
                         shadow-lg hover:shadow-purple-500/20
                         group"
              href={gitUserData.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>View on GitHub</span>
              <svg
                className="w-4 h-4 opacity-0 group-hover:opacity-100 
                            -translate-x-2 group-hover:translate-x-0 
                            transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Section - Bio */}
        {gitUserData.bio && (
          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <div
              className="bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 
                          rounded-xl p-6"
            >
              <h3
                className="text-gray-300 text-lg leading-relaxed italic 
                           relative pl-4 border-l-4 border-purple-500"
              >
                "{gitUserData.bio}"
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthProfile;
