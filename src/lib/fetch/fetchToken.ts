
export const fetchToken = async () => {
  try {
    const response = await fetch('/api/getToken');
    const data = await response.json();
    
    return data
  } catch (err) {
    console.error('Error al obtener el token:', err);
  }
};