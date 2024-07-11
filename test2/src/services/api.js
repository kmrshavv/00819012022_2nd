import axios from 'axios';

const API_BASE_URL = 'https://test-server.com/api';

export const fetchProducts = async (category, company) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`, {
            params: { category, company },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};
