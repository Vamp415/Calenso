const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function fetchApi(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// User API
export const userApi = {
  sync: (userData) => fetchApi('/users/sync', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  getByUsername: (username) => fetchApi(`/users/${username}`),
  
  updateUsername: (userId, username) => fetchApi('/users/username', {
    method: 'PUT',
    body: JSON.stringify({ userId, username }),
  }),
};

// Events API
export const eventsApi = {
  getAll: (userId) => {
    if (userId) {
      return fetchApi(`/events?userId=${userId}`);
    }
    return fetchApi('/events');
  },
  
  getByUsernameAndId: (username, eventId) => fetchApi(`/events/${username}/${eventId}`),
  
  create: (eventData) => fetchApi('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  }),
  
  delete: (eventId) => fetchApi(`/events/${eventId}`, {
    method: 'DELETE',
  }),
};

// Availability API
export const availabilityApi = {
  get: (userId) => {
    if (userId) {
      return fetchApi(`/availability?userId=${userId}`);
    }
    return fetchApi('/availability');
  },
  
  update: (data) => fetchApi('/availability', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  getSlots: (username, eventId, date) => 
    fetchApi(`/availability/slots?username=${username}&eventId=${eventId}&date=${date}`),
};

// Bookings API
export const bookingsApi = {
  create: (bookingData) => fetchApi('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  }),
  
  getByEvent: (eventId) => fetchApi(`/bookings/event/${eventId}`),
  
  cancel: (bookingId) => fetchApi(`/bookings/${bookingId}`, {
    method: 'DELETE',
  }),
};

// Dashboard API
export const dashboardApi = {
  getUpdates: (userId) => {
    if (userId) {
      return fetchApi(`/dashboard/updates?userId=${userId}`);
    }
    return fetchApi('/dashboard/updates');
  },
  
  getMeetings: (type = 'upcoming', userId) => {
    if (userId) {
      return fetchApi(`/dashboard/meetings?userId=${userId}&type=${type}`);
    }
    return fetchApi(`/dashboard/meetings?type=${type}`);
  },
  
  getAnalytics: (userId) => {
    if (userId) {
      return fetchApi(`/dashboard/analytics?userId=${userId}`);
    }
    return fetchApi('/dashboard/analytics');
  },
};
