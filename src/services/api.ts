import axios from 'axios';
import { Book } from '@/types/book';

const API_URL = 'http://localhost:5000/api';

export const fetchBooks = async (searchQuery?: string, genre?: string): Promise<Book[]> => {
  try {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (genre) params.append('genre', genre);
    
    const response = await axios.get(`${API_URL}/books`, { params });
    console.log('Fetched books:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchBookById = async (id: string): Promise<Book> => {
  try {
    const response = await axios.get(`${API_URL}/books/${id}`);
    console.log('Fetched book:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};