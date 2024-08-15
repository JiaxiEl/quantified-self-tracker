import axios from 'axios';
import { User } from '@/types/user';

const API_BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://Jiaxi.com';

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface CreateGoalParams {
  title: string;
  description: string;
  targetDate: string;
}

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, params);
      localStorage.setItem('custom-auth-token', response.data.token);
      return {};
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.error || 'Registration failed' };
      } else {
        return { error: 'An unexpected error occurred' };
      }
    }
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, params);
      localStorage.setItem('custom-auth-token', response.data.token);
      return {};
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.error || 'Login failed' };
      } else {
        return { error: 'An unexpected error occurred' };
      }
    }
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('custom-auth-token');
    if (!token) {
      return { data: null };
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { data: response.data };
    } catch (error) {
      return { data: null };
    }
  }

  async createGoal(params: CreateGoalParams): Promise<{ data?: any; error?: string }> {
    const token = localStorage.getItem('custom-auth-token');
    if (!token) {
      return { error: 'No authentication token found' };
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/goals`, params, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.error || 'Goal creation failed' };
      } else {
        return { error: 'An unexpected error occurred' };
      }
    }
  }


  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    return {};
  }

  async resetPassword(params: { email: string }): Promise<{ error?: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, params);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.error || 'Failed to send recovery link' };
      } else {
        return { error: 'An unexpected error occurred' };
      }
    }
  }

  async confirmResetPassword(params: { token: string; password: string }): Promise<{ error?: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password/confirm`, params);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.error || 'Failed to reset password' };
      } else {
        return { error: 'An unexpected error occurred' };
      }
    }
  }
}

export const authClient = new AuthClient();
