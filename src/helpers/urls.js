const API_ROOT = 'http://codeial.codingninjas.com:8000/api/v2';

export const APIUrls = {
  login: () => `${API_ROOT}/api/v2/users/login`,
  signup: () => `${API_ROOT}/api/v2/users/signup`,
  fetchPosts: (page = 1, limit = 5) =>
    `${API_ROOT}/api/v2/posts?page=${page}&limit=${limit}`,
};
