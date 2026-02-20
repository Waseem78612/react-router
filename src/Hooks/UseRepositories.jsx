import { useState, useEffect } from "react";
import { searchRepositories } from "../Services";

export const useRepositories = (initialQuery = "XXX") => {
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRepos = async (query) => {
    try {
      setLoading(true);
      const data = await searchRepositories(query);
      console.log(data.items);
      setRepos(data.items);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch repositories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos(initialQuery);
  }, [initialQuery]);

  return { repos, loading, error, refetch: fetchRepos };
};
