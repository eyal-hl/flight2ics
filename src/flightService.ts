import type { FlightData } from './types';

/**
 * Mock flight data service that returns placeholder flight information
 * In a real application, this would call a flight information API
 */
export const getFlightData = async (flightNumber: string): Promise<FlightData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Parse flight number to extract airline code and number
  const match = flightNumber.match(/^([A-Z]{2})(\d+)$/i);
  
  if (!match) {
    throw new Error('Invalid flight number format. Expected format: AB123');
  }
  
  const airlineCode = match[1].toUpperCase();
  const flightNum = match[2];
  
  // Mock airline names
  const airlines: Record<string, string> = {
    'AA': 'American Airlines',
    'UA': 'United Airlines',
    'DL': 'Delta Air Lines',
    'BA': 'British Airways',
    'LH': 'Lufthansa',
    'AF': 'Air France',
    'KL': 'KLM',
    'EK': 'Emirates',
    'QF': 'Qantas',
    'SQ': 'Singapore Airlines',
  };
  
  const airlineName = airlines[airlineCode] || `${airlineCode} Airlines`;
  
  // Generate mock flight data
  const now = new Date();
  const departureTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  departureTime.setHours(10, 0, 0, 0);
  
  const arrivalTime = new Date(departureTime.getTime() + 3 * 60 * 60 * 1000); // 3 hours flight
  
  return {
    flightNumber: `${airlineCode}${flightNum}`,
    airline: airlineName,
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: departureTime,
    },
    arrival: {
      airport: 'LAX',
      city: 'Los Angeles',
      time: arrivalTime,
    },
  };
};
