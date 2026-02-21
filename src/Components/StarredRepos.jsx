import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const StarredRepos = () => {
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStarredRepos = async () => {
    try {
      const response = await axios.get(
        "https://api.github.com/search/repositories?q=stars:>500&sort=stars&order=desc&per_page=30",
      );
      console.log("Starred Repos:", response.data.items);
      setRepos(response.data.items);
    } catch (error) {
      console.error("Error fetching starred repos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStarredRepos();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <h1>Loading starred repositories...</h1>
      </div>
    );
  }

  return (
    <div className="repos-container">
      <div className="page-header">
        <h1 className="page-title">✨ Most Starred Repositories</h1>
        <p className="page-subtitle">Repositories with over 500 stars</p>
      </div>

      <div className="cards-grid">
        {repos &&
          repos.map((repo, index) => (
            <div key={repo.id} className="card-wrapper">
              <div className="user-card-cont">
                <div className="user-card-content">
                  <img
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    className="user-avatar"
                  />

                  <div className="user-info">
                    <h2 className="repo-name">
                      #{index + 1}. {repo.name}
                    </h2>
                    <p className="repo-stars">
                      ⭐ {repo.stargazers_count?.toLocaleString() || 0} stars
                    </p>
                    <p className="repo-description">
                      📝{" "}
                      {repo.description?.substring(0, 60) ||
                        "No description available"}
                      ...
                    </p>
                  </div>

                  {/* Single Button - View Details */}
                  <div className="test-container purple-border">
                    <Link to={`/repo-detail/${repo.owner.login}/${repo.name}`}>
                      <button className="test-button purple">
                        👤 View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StarredRepos;
