import axios from "axios";

// Create axios instance
const githubApi = axios.create({
  baseURL: "https://api.github.com",
  timeout: 10000,
});

// Request interceptor
githubApi.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
githubApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
      switch (error.response.status) {
        case 403:
          throw new Error("Rate limit exceeded. Please try again later.");
        case 404:
          throw new Error("Resource not found.");
        default:
          throw new Error("An error occurred. Please try again.");
      }
    } else if (error.request) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  },
);

// API service functions
export const searchRepositories = (query = "XXX") =>
  githubApi.get(`/search/repositories?q=${query}`);

export const getUserRepositories = (username) =>
  githubApi.get(`/users/${username}/repos`);

export const getRepository = (owner, repo) =>
  githubApi.get(`/repos/${owner}/${repo}`);
