import { apiRequest, getSession } from './auth';
import { mockBookings, mockProducts, mockResources } from './mockData';

const replaceItems = (target, items) => {
  target.splice(0, target.length, ...items);
};

export const loadApiData = async () => {
  const [resourceResult, productResult] = await Promise.all([
    apiRequest('/resources'),
    apiRequest('/products')
  ]);

  replaceItems(mockResources, resourceResult.data.resources.map(resource => ({ ...resource, id: resource._id })));
  replaceItems(mockProducts, productResult.data.products.map(product => ({ ...product, id: product._id })));

  if (getSession()?.token) {
    const bookingResult = await apiRequest('/bookings');
    replaceItems(mockBookings, bookingResult.data.bookings);
  }
};

export const createBooking = booking => apiRequest('/bookings', {
  method: 'POST',
  body: JSON.stringify(booking)
});
