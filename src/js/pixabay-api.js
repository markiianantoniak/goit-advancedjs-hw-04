import axios from 'axios';

const API_KEY = '49395214-508d98637227ed6d41be849b6';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch images: ${error.message}`);
  }
}
