import type { FlightData } from './types';

/**
 * Formats a date to ICS format (YYYYMMDDTHHMMSSZ)
 */
const formatICSDate = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
};

/**
 * Generates an ICS calendar file content from flight data
 */
export const generateICS = (flightData: FlightData): string => {
  const now = new Date();
  const dtstamp = formatICSDate(now);
  const dtstart = formatICSDate(flightData.departure.time);
  const dtend = formatICSDate(flightData.arrival.time);
  
  // Generate a unique ID for the event
  const uid = `${flightData.flightNumber}-${Date.now()}@flight2ics.app`;
  
  const summary = `Flight ${flightData.flightNumber} - ${flightData.airline}`;
  const description = `Flight: ${flightData.flightNumber}\\nAirline: ${flightData.airline}\\nFrom: ${flightData.departure.city} (${flightData.departure.airport})\\nTo: ${flightData.arrival.city} (${flightData.arrival.airport})`;
  const location = `${flightData.departure.airport} to ${flightData.arrival.airport}`;
  
  // Build ICS file content
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//flight2ics//Flight Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Flight Reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  
  return icsContent;
};

/**
 * Downloads an ICS file with the given content
 */
export const downloadICS = (icsContent: string, filename: string): void => {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
