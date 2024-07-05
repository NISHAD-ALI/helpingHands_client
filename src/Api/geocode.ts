import axios from 'axios';

export const getCoordinates = async (city :any) => {
  if (!city || city.trim() === '') {
    console.error('Invalid city name:', city);
    return { lat: null, lon: null };
  }

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: city,
        format: 'json',
      },
    });
    const data = response.data;
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};