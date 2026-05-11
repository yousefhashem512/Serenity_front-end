import api from './axios';

// --- Auth ---
export const loginAdmin = (credentials) =>
  api.post('/admin/login', credentials).then((r) => r.data);

// --- Analytics ---
export const fetchAnalytics = () =>
  api.get('/admin/analytics').then((r) => r.data);

// --- Pricing ---
export const fetchPrices = () =>
  api.get('/public/prices').then((r) => r.data);

export const updatePricing = (data) =>
  api.put('/admin/updatePricing', data).then((r) => r.data);

// --- Captains ---
export const fetchCaptains = () =>
  api.get('/public/captains').then((r) => r.data);

export const addCaptain = (data) =>
  api.post('/admin/captains', data).then((r) => r.data);

export const deleteCaptain = (id) =>
  api.delete(`/admin/captains/${id}`).then((r) => r.data);

// --- Bookings ---
export const fetchBookings = () =>
  api.get('/admin/bookings').then((r) => r.data);

export const updateBookingStatus = (id, data) =>
  api.patch(`/admin/updatebooking/${id}`, data).then((r) => r.data);
export const createBooking = (data) =>
  api.post('/admin/createbooking', data).then((r) => r.data);

export const fetchAvailableSlots = (data) =>
  api.post('/bookings/available-slots', data).then((r) => r.data);
// --- Slots ---
export const disableSlot = (data) =>
  api.post('/admin/disable-slot', data).then((r) => r.data);

export const enableSlot = (id) =>
  api.delete(`/admin/enable-slot/${id}`).then((r) => r.data);

// --- Gallery ---
export const fetchGallery = () =>
  api.get('/public/gallery').then((r) => r.data);

export const addGalleryItem = (formData) =>
  api.post('/admin/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },

  }).then((r) => r.data);

export const deleteGalleryItem = (id) =>
  api.delete(`/admin/gallery/${id}`).then((r) => r.data);

export const fetchDisabledSlots = () =>
  api.get('/admin/get-disabled-slots').then((r) => r.data);


// --- Full Day ---
export const fetchDisabledDays = () =>
  api.get('/admin/get-disabled-days').then((r) => r.data);

export const disableFullDay = (data) =>
  api.post('/admin/disable-full-day', data).then((r) => r.data);

export const enableFullDay = ({ date, captainId }) =>
  api.delete(`/admin/enable-full-day/${date}/${captainId}`).then((r) => r.data);
