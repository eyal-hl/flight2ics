import { useState } from 'react'
import './App.css'
import { getFlightData } from './flightService'
import { generateICS, downloadICS } from './icsGenerator'
import type { FlightData } from './types'

function App() {
  const [flightNumber, setFlightNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [flightData, setFlightData] = useState<FlightData | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setFlightData(null)

    if (!flightNumber.trim()) {
      setError('Please enter a flight number')
      return
    }

    setLoading(true)

    try {
      const data = await getFlightData(flightNumber.trim())
      setFlightData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch flight data')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!flightData) return

    const icsContent = generateICS(flightData)
    const filename = `flight-${flightData.flightNumber}.ics`
    downloadICS(icsContent, filename)
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>✈️ Flight to ICS</h1>
        <p>Convert your flight number to a downloadable calendar event</p>
      </header>

      <main className="app-main">
        <form onSubmit={handleSubmit} className="flight-form">
          <div className="input-group">
            <input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
              placeholder="Enter flight number (e.g., AA123)"
              className="flight-input"
              disabled={loading}
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>

        {flightData && (
          <div className="flight-details">
            <h2>Flight Details</h2>
            <div className="detail-card">
              <div className="detail-row">
                <span className="label">Flight:</span>
                <span className="value">{flightData.flightNumber}</span>
              </div>
              <div className="detail-row">
                <span className="label">Airline:</span>
                <span className="value">{flightData.airline}</span>
              </div>
              <div className="detail-row">
                <span className="label">From:</span>
                <span className="value">
                  {flightData.departure.city} ({flightData.departure.airport})
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Departure:</span>
                <span className="value">{formatDateTime(flightData.departure.time)}</span>
              </div>
              <div className="detail-row">
                <span className="label">To:</span>
                <span className="value">
                  {flightData.arrival.city} ({flightData.arrival.airport})
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Arrival:</span>
                <span className="value">{formatDateTime(flightData.arrival.time)}</span>
              </div>
            </div>
            <button onClick={handleDownload} className="download-button">
              📅 Download ICS File
            </button>
          </div>
        )}

        <div className="info-section">
          <h3>How to use:</h3>
          <ol>
            <li>Enter your flight number in the format AB123 (e.g., AA123, UA456)</li>
            <li>Click "Search" to retrieve flight details (mock data)</li>
            <li>Click "Download ICS File" to save the calendar event</li>
            <li>Import the .ics file into your calendar app</li>
          </ol>
          <p className="note">
            <strong>Note:</strong> This app uses mock/placeholder flight data for demonstration purposes.
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
