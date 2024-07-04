import axios from 'axios';

export const getCoordinates = async (city) => {
    const LOCATIONIQ_API_KEY = 'pk.ed588247a0f97e4d52f425568e282640';
    


    if (!city || city.trim() === '') {
      console.error('Invalid city name:', city);
      return { lat: null, lon: null }; 
    }

    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
        params: {
          key: LOCATIONIQ_API_KEY,
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
