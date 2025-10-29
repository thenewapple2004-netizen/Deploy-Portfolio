import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/portfolio';

export const fetchPortfolio = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        throw error;
    }
};

export const createPortfolio = async (portfolioData) => {
    try {
        const response = await axios.post(API_URL, portfolioData);
        return response.data;
    } catch (error) {
        console.error('Error creating portfolio:', error);
        throw error;
    }
};

export const updatePortfolio = async (id, portfolioData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, portfolioData);
        return response.data;
    } catch (error) {
        console.error('Error updating portfolio:', error);
        throw error;
    }
};

export const deletePortfolio = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        throw error;
    }
};