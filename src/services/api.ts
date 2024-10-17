import { Ticket, User } from '../types'; // Importing types for Ticket and User

// Define the API endpoint URLs (you can replace these with your actual API URLs)
const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

// Fetch tickets and users from the API
export const fetchTicketsAndUsers = async (): Promise<{ tickets: Ticket[], users: User[] }> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }

    const data = await response.json();

    // Return the fetched tickets and users
    return {
      tickets: data.tickets,
      users: data.users,
    };
  } catch (error) {
    console.error('Error fetching tickets and users:', error);
    return {
      tickets: [],
      users: [],
    };
  }
};
