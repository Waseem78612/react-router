import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RepoDetail = () => {
  const { username, reponame } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRepo, setShowRepo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch user profile
        const userResponse = await axios.get(
          `https://api.github.com/users/${username}`,
        );
        setUserData(userResponse.data);

        // Fetch specific repository
        const repoResponse = await axios.get(
          `https://api.github.com/repos/${username}/${reponame}`,
        );
        setRepoData(repoResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username && reponame) {
      fetchData();
    }
  }, [username, reponame]);

  const toggleView = () => {
    setShowRepo(!showRepo);
  };

  const goToGitHub = () => {
    window.open(repoData?.html_url, "_blank");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading {username}'s profile...</p>
        </div>
      </div>
    );
  }

  if (!userData || !repoData) {
    return (
      <div className="text-center text-red-500 p-8">
        <h2 className="text-2xl">Error loading data</h2>
        <Link to="/repositories" className="text-blue-500 mt-4 block">
          Go back to repositories
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Back button */}
      <Link
        to="/repositories"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <span>←</span> Back to Repositories
      </Link>

      {/* Main Card */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
        {/* Card Header - User Info (Always Visible) */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-6">
            <img
              src={userData.avatar_url}
              alt={userData.login}
              className="w-24 h-24 rounded-full border-4 border-purple-500"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">
                {userData.name || userData.login}
              </h1>
              <p className="text-gray-400">@{userData.login}</p>
              {userData.bio && (
                <p className="text-gray-300 mt-2">{userData.bio}</p>
              )}
            </div>
          </div>

          {/* User Stats */}
          <div className="flex gap-6 mt-4 ml-32">
            <div className="text-center">
              <span className="block text-xl font-bold text-white">
                {userData.public_repos}
              </span>
              <span className="text-sm text-gray-400">Repositories</span>
            </div>
            <div className="text-center">
              <span className="block text-xl font-bold text-white">
                {userData.followers}
              </span>
              <span className="text-sm text-gray-400">Followers</span>
            </div>
            <div className="text-center">
              <span className="block text-xl font-bold text-white">
                {userData.following}
              </span>
              <span className="text-sm text-gray-400">Following</span>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="p-4 bg-gray-900/50 flex justify-center">
          <button
            onClick={toggleView}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg flex items-center gap-2"
          >
            {showRepo
              ? "👤 Show Profile Details"
              : "📦 Show Repository Details"}
          </button>
        </div>

        {/* Dynamic Content - Toggles between Profile and Repo */}
        <div className="p-6">
          {!showRepo ? (
            // Profile Details View
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-semibold text-white mb-4">
                Profile Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.location && (
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-gray-400 block text-sm">
                      Location
                    </span>
                    <span className="text-white">{userData.location}</span>
                  </div>
                )}

                {userData.company && (
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-gray-400 block text-sm">Company</span>
                    <span className="text-white">{userData.company}</span>
                  </div>
                )}

                {userData.blog && (
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-gray-400 block text-sm">Blog</span>
                    <a
                      href={userData.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {userData.blog}
                    </a>
                  </div>
                )}

                {userData.email && (
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-gray-400 block text-sm">Email</span>
                    <span className="text-white">{userData.email}</span>
                  </div>
                )}

                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <span className="text-gray-400 block text-sm">
                    Account Created
                  </span>
                  <span className="text-white">
                    {new Date(userData.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <span className="text-gray-400 block text-sm">
                    Public Gists
                  </span>
                  <span className="text-white">{userData.public_gists}</span>
                </div>
              </div>
            </div>
          ) : (
            // Repository Details View
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-semibold text-white mb-4">
                Repository: {repoData.name}
              </h3>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                {repoData.description && (
                  <p className="text-gray-300 mb-4">{repoData.description}</p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <span className="block text-xl font-bold text-yellow-500">
                      {repoData.stargazers_count}
                    </span>
                    <span className="text-sm text-gray-400">Stars</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-xl font-bold text-blue-500">
                      {repoData.forks_count}
                    </span>
                    <span className="text-sm text-gray-400">Forks</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-xl font-bold text-green-500">
                      {repoData.open_issues_count}
                    </span>
                    <span className="text-sm text-gray-400">Issues</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-xl font-bold text-purple-500">
                      {repoData.watchers_count}
                    </span>
                    <span className="text-sm text-gray-400">Watchers</span>
                  </div>
                </div>

                {repoData.language && (
                  <div className="mb-4">
                    <span className="text-gray-400">Language: </span>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                      {repoData.language}
                    </span>
                  </div>
                )}

                {/* View on GitHub Button */}
                <button
                  onClick={goToGitHub}
                  className="w-full mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  View on GitHub
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepoDetail;
