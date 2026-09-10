export const mockResources = [
  { id: 1, name: 'The Green Room', type: 'Study room', capacity: 8, location: 'Library · Level 2', description: 'Quiet, light-filled room for focused group work.', amenities: ['Whiteboard', 'Display', 'WiFi'], price: 45, available: true, color: 'sage', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=85' },
  { id: 2, name: 'Innovation Lab', type: 'Lab', capacity: 24, location: 'Tech Hub · North wing', description: 'A flexible lab for prototyping and practical sessions.', amenities: ['24 PCs', '3D printers', 'AC'], price: 80, available: true, color: 'blue', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85' },
  { id: 3, name: 'The Court', type: 'Sports facility', capacity: 18, location: 'Sports Centre · Court A', description: 'Full-size indoor court for training and campus leagues.', amenities: ['Equipment', 'Showers', 'Lockers'], price: 120, available: false, color: 'orange', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=85' },
  { id: 4, name: 'Media Studio', type: 'Equipment', capacity: 6, location: 'Arts Building · Room 04', description: 'Record, edit and create with professional equipment.', amenities: ['Lighting', 'Mics', 'Backdrop'], price: 65, available: true, color: 'plum', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=85' }
];

export const mockProducts = [
  { id: 1, name: 'Everyday Campus Hoodie', category: 'Apparel', price: 420, oldPrice: 480, rating: 4.9, tag: 'Best seller', color: 'rust', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Field Notes Set', category: 'Stationery', price: 95, rating: 4.7, tag: 'New', color: 'yellow', image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Canvas Tote', category: 'Accessories', price: 180, rating: 4.8, color: 'teal', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Steel Campus Bottle', category: 'Supplies', price: 260, rating: 4.6, tag: 'Popular', color: 'blue', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85' }
];

export const mockBookings = [
  { id: 1, resourceId: 1, resource: 'The Green Room', date: 'Tue, 10 Sep', time: '10:00 – 12:00', status: 'Confirmed', price: 90, color: 'sage' },
  { id: 2, resourceId: 4, resource: 'Media Studio', date: 'Thu, 12 Sep', time: '14:00 – 16:00', status: 'Pending', price: 130, color: 'plum' }
];

export const mockUsers = [{ id: 1, firstName: 'John', lastName: 'Doe', email: 'student@example.com', role: 'student', department: 'Computer Science' }];
