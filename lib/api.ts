import { API_URL } from "@/app/(shared)/constant/endpoint";

const TOKEN_KEY = "auth_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const token = getToken();

  const isFormData = options?.body instanceof FormData;

  const config: RequestInit = {
    ...options,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
    signal: AbortSignal.timeout(30000),
  };
  
  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      if (response.status == 401) {
        removeToken();
      }
      let errorMessage = `HTTP error! Status: ${response.status}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        console.error("API Error:", errorData);
      } catch (parseError) {
        console.error("Failed to parse error response:", parseError);
      }

      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    console.error("API Client Error:", error);
    throw error;
  }
}
