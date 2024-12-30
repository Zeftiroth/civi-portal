import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "./endpoints";

// Get all users
export const fetchUsers = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.USERS);
  return response.data;
};

// Create a new user
export const createUser = async (userData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.USERS, userData);
  return response.data;
};

// Update a user
export const updateUser = async (id, userData) => {
  const response = await axiosInstance.put(`${API_ENDPOINTS.USERS}/${id}`, userData);
  return response.data;
};

// Delete a user
export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`${API_ENDPOINTS.USERS}/${id}`);
  return response.data;
};
