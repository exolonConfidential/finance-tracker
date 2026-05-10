import api from './axios';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  currency: string;
  country: string;
}

export const getUserProfile = async () => {
  const { data } = await api.get<UserProfile>('/users/profile');
  return data;
};