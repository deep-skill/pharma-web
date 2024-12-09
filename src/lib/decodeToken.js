import { jwtDecode } from 'jwt-decode';

export const decodeToken = (accessToken) => {
  if (!accessToken) return 'not token';
  const decoded = jwtDecode(accessToken);

  if (decoded.permissions.includes('admin')) {
    return 'rol admin';
  }

  if (decoded.permissions.includes('cajero')) {
    return 'rol cajero';
  }

  return 'not rol';
};
