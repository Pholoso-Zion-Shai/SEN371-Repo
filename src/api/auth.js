const API_URL = 'http://localhost:5000/api';
const SESSION_KEY = 'campushub.session';

export const getSession = () => {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
};

export const signOut = () => sessionStorage.removeItem(SESSION_KEY);

const persistSession = session => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

const apiRequest = async (url, options = {}) => {
  const response = await fetch(`${API_URL}${url}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
};

export const registerUser = async ({ firstName, lastName, email, password, studentId, department }) => {
  const result = await apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password, studentId, department })
  });

  return persistSession({
    user: result.data.user,
    token: result.token,
    expiresAt: Date.now() + 8 * 60 * 60 * 1000
  });
};

export const signIn = async (email, password) => {
  const result = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  return persistSession({
    user: result.data.user,
    token: result.token,
    expiresAt: Date.now() + 8 * 60 * 60 * 1000
  });
};

export const resetLocalAccount = () => signOut();

export const isSessionValid = session => Boolean(session?.user && session.expiresAt > Date.now());
