import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TypeScript interfaces removed - using plain JavaScript objects

// Map backend status codes to frontend display names
export const STATUS_MAP = {
  'P': 'Pending Verification',
  'I': 'Incomplete Profile',
  'W': 'Waiting approval',
  'V': 'Active',
  'D': 'Banned',
};

// Map backend role codes to frontend display names
export const ROLE_MAP = {
  'S': 'Learner',
  'T': 'Teacher',
  'A': 'Admin',
};

export const getUsers = async (params) => {
  try {
    const response = await api.get('/api/accounts/users', {
      params: {
        search: params?.search,
        role: params?.role,
        status: params?.status,
        page: params?.page,
        page_size: params?.page_size || 8,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    const response = await api.patch(`/api/accounts/users/${userId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};

export default api;
