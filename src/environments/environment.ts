export const BACKEND_URL =
  'https://outside-kizzie-jhonmata0427s-projects-b3b63a78.koyeb.app/api/v1';

export const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export const IS_GUEST = localStorage.getItem('guest') !== null;