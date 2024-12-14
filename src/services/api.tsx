import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface UserType {
  username: string;
  password: string;
}

export const register = async ({ username, password }: UserType) => {
  try {
    const response = await axios.post(`${URL}/auth/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const login = async ({ username, password }: UserType) => {
  try {
    const response = await axios.post(`${URL}/auth/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
