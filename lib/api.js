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

// Get dashboard statistics
export const getStats = async () => {
  try {
    // Fetch all users to get total count
    const allUsersResponse = await api.get('/api/accounts/users', {
      params: { page_size: 1 },
    });
    
    // Fetch pending users (P, W, I statuses)
    const pendingResponse = await api.get('/api/accounts/users', {
      params: { page_size: 1 },
    });
    const pendingUsers = pendingResponse.data.results.filter(
      user => user.status === 'P' || user.status === 'W' || user.status === 'I'
    );
    
    // Fetch active users (V status)
    const activeResponse = await api.get('/api/accounts/users', {
      params: { page_size: 1000 },
    });
    const activeUsers = activeResponse.data.results.filter(
      user => user.status === 'V'
    );

    return {
      totalUsers: allUsersResponse.data.count || 0,
      pendingApprovals: pendingUsers.length,
      activeUsers: activeUsers.length,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

// Get current user profile (using hardcoded admin ID for now)
// TODO: Replace with actual current user ID from auth context
export const getCurrentUser = async () => {
  try {
    // For now, we'll use ID 8 as the admin user (exists in database)
    // In production, this should come from authentication context
    const response = await api.get('/api/accounts/users/8/');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

// Update user profile
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.patch(`/api/accounts/users/${userId}/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export default api;
