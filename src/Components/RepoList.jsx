import React from "react";
import { useRepositories } from "../Hooks/UseRepositories";
import RepoCard from "./RepoCard";
import "../styles/RepoList.css"; // Moved styles to dedicated folder

const RepoList = () => {
  const { repos, loading, error } = useRepositories();

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  if (!repos) return null;

  return (
    <div className="users-cont">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default RepoList;
