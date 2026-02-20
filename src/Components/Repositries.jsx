import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

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

              {/* Main Interactive Button - Shows Profile First, Then Repo */}
              <div className="test-container purple-border">
                <Link to={`/repo-detail/${repo.owner.login}/${repo.name}`}>
                  <button className="test-button purple">
                    👤 View Owner Profile & Repository
                  </button>
                </Link>
              </div>

              {/* Original buttons kept for reference */}
              <div className="test-container blue-border">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="test-link"
                >
                  Direct Link to Repo
                </a>
              </div>

              <div className="test-container orange-border">
                <button
                  onClick={() => {
                    const testUrl = `https://github.com/${repo.full_name}`;
                    console.log("Test URL:", testUrl);
                    window.open(testUrl, "_blank");
                  }}
                  className="test-button orange"
                >
                  Open in GitHub
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
