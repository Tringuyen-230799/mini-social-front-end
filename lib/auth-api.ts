import { apiClient, API_ENDPOINTS, setToken, removeToken } from './api';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: any;
}

export async function fetchCurrentUser(): Promise<User> {
  const response = await apiClient<ApiResponse<User>>(API_ENDPOINTS.auth.me);
  return response.data.data;
}

export async function loginUser(email: string, password: string): Promise<User> {
  const response = await apiClient<ApiResponse<{ user: User; token: string }>>(
    API_ENDPOINTS.auth.login,
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }
  );

  setToken(response.data.data.token);
  
  return response.data.data.user;
}

export async function signupUser(name: string, email: string, password: string): Promise<User> {
  const response = await apiClient<ApiResponse<{ user: User; token: string }>>(
    API_ENDPOINTS.auth.signup,
    {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }
  );
  
  setToken(response.data.data.token);
  
  return response.data.data.user;
}

export async function logoutUser(): Promise<void> {
  try {
    await apiClient(API_ENDPOINTS.auth.logout, { method: 'POST' });
  } finally {
    removeToken();
  }
}
