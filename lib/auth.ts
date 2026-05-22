import { API_ENDPOINTS } from '@/app/(shared)/constant/endpoint';
import { apiClient, setToken, removeToken } from './api';

export interface User {
  id: string | number;
  email: string;
  username: string;
  avatar_url?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: any;
}

export async function fetchCurrentUser(): Promise<User> {
  const response = await apiClient<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME);
  return response.data.data;
}

export async function loginUser(email: string, password: string): Promise<User> {
  const response = await apiClient<ApiResponse<{ user: User; token: string }>>(
    API_ENDPOINTS.AUTH.LOGIN,
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }
  );

  setToken(response.data.token);
  
  return response.data.user;
}

export async function signupUser(name: string, email: string, password: string): Promise<User> {
  const response = await apiClient<ApiResponse<{ user: User; token: string }>>(
    API_ENDPOINTS.AUTH.SIGNUP,
    {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }
  );
  
  setToken(response.data.token);
  
  return response.data.user;
}

export async function logoutUser(): Promise<void> {
  try {
    await apiClient(API_ENDPOINTS.AUTH.LOGOUT, { method: 'POST' });
  } finally {
    removeToken();
  }
}
