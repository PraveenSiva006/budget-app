// apps/frontend/src/lib/api-client.ts

import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // important for auth later
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // central error handling
    const message = error.response?.data?.message || "Something went wrong";

    return Promise.reject(new Error(message));
  },
);
