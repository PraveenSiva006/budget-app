import axios from "axios";
export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/* -------------------------------------------------------------------------- */
/* REQUEST INTERCEPTOR                                                        */
/* -------------------------------------------------------------------------- */

apiClient.interceptors.request.use((config) => {
  // temporary user id until auth is implemented
  config.headers["x-user-id"] = "1";

  return config;
});

/* -------------------------------------------------------------------------- */
/* RESPONSE INTERCEPTOR                                                       */
/* -------------------------------------------------------------------------- */

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";

    return Promise.reject(new ApiError(message, error.response?.status));
  },
);
