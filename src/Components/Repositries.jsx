import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";

const Repositries = () => {
  const [repos, setRepos] = useState(null);

  const gitRepos = async () => {
    const response = await axios.get(
      "https://api.github.com/search/repositories?q=XXX",
    );
    console.log("API Response:", response.data.items);
    setRepos(response.data.items);
    return response.data;
  };

  useEffect(() => {
    gitRepos().catch((e) => console.error(e));
  }, []);

  return (
    <div className="users-cont">
      {repos ? (
        repos.map((repo, index) => (
          <div key={repo.id} className="user-card-cont">
            <div className="user-card-content">
              <img
                src={repo.owner.avatar_url}
                alt="userAvatar"
                className="user-avatar"
              />

              <div className="user-info">
                <h2 className="repo-name">
                  {index + 1}. {repo.name}
                </h2>
                <p className="repo-id">ID: {repo.id}</p>
                <p className="repo-url">URL: {repo.html_url}</p>
              </div>

              {/* TEST 1: Regular anchor */}
              <div className="test-container blue-border">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="test-link"
                >
                  TEST 1 - Regular Link
                </a>
              </div>

              {/* TEST 2: Button with onClick */}
              <div className="test-container green-border">
                <button
                  onClick={() => {
                    console.log("Button clicked for:", repo.name);
                    window.open(repo.html_url, "_blank");
                  }}
                  className="test-button green"
                >
                  TEST 2 - Button
                </button>
              </div>

              {/* TEST 3: Double-check URL */}
              <div className="test-container orange-border">
                <button
                  onClick={() => {
                    const testUrl = `https://github.com/${repo.full_name}`;
                    console.log("Test URL:", testUrl);
                    window.open(testUrl, "_blank");
                  }}
                  className="test-button orange"
                >
                  TEST 3 - Constructed URL
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="loading-container">
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Repositries;
