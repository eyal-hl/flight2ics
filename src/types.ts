export interface FlightData {
  flightNumber: string;
  airline: string;
  departure: {
    airport: string;
    city: string;
    time: Date;
  };
  arrival: {
    airport: string;
    city: string;
    time: Date;
  };
}
