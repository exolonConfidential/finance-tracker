import api from "./axios";

interface loginProps {
  email: string;
  password: string;
}

interface registerProps {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  country: string;
  currency: string;
}

interface authRes {
  token: string;
}

export const login = async (data: loginProps) => {
  const response = await api.post<authRes>("/auth/login", data);
  return response.data.token;
};

export const signup = async (data: registerProps) => {
  const response = await api.post<authRes>("/auth/signup", data);
  return response.data.token;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLoggedin = () => {
  return !!localStorage.getItem("token");
};
