import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Add.css'

import { createFlight } from '../../services/flight'
import { getToken } from '../../services/api'

export default function AddFlight() {
  const navigate = useNavigate()

  // ===== FORM STATE =====
  const [flightCode, setFlightCode] = useState('')
  const [aircraftType, setAircraftType] = useState('')
  const [deptTime, setDeptTime] = useState('')
  const [deptAirport, setDeptAirport] = useState('')
  const [destAirport, setDestAirport] = useState('')

  const [selectedTimezone, setSelectedTimezone] = useState('WITA')
  const [selectedDays, setSelectedDays] = useState([])

  const [loading, setLoading] = useState(false)

  // ===== CONSTANT =====
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  // ===== HANDLERS =====
  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  const handleSubmit = async () => {
    if (!flightCode || !deptAirport || !destAirport || !deptTime) {
      alert('Please fill all required fields')
      return
    }

    try {
      setLoading(true)

      await createFlight({
        token: getToken(),
        flightCode,
        origin: deptAirport,
        destination: destAirport,
        departureTime: `${deptTime} ${selectedTimezone}`,
        aircraftId: aircraftType,
        days: selectedDays,
      })

      navigate('/dashboard')
    } catch (err) {
      alert(err.message || 'Failed to create flight')
    } finally {
      setLoading(false)
    }
  }

  // ===== UI =====
  return (
    <div className="add-flight-container">
      <h1>Add Flight</h1>

      <div className="content">
        <div className="form-container">
          <div className="form-grid">

            {/* Flight Code */}
            <div className="form-group">
              <label className="form-label">Flight Code</label>
              <input
                type="text"
                className="form-input"
                placeholder="KA100"
                value={flightCode}
                onChange={(e) => setFlightCode(e.target.value)}
              />
            </div>

            {/* Aircraft Type */}
            <div className="form-group">
              <label className="form-label">Aircraft Type</label>
              <input
                type="text"
                className="form-input"
                placeholder="input aircraft type"
                value={aircraftType}
                onChange={(e) => setAircraftType(e.target.value)}
              />
            </div>

            {/* Dept Time */}
            <div className="form-group">
              <label className="form-label">Departure Time</label>
              <input
                type="time"
                className="form-input"
                value={deptTime}
                onChange={(e) => setDeptTime(e.target.value)}
              />

              <div className="timezone-group">
                {['WITA', 'WIT', 'WIB'].map(tz => (
                  <button
                    key={tz}
                    type="button"
                    className={`timezone-button ${selectedTimezone === tz ? 'active' : ''}`}
                    onClick={() => setSelectedTimezone(tz)}
                  >
                    {tz}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div className="form-group frequency-section">
              <label className="form-label">Frequency</label>
              <div className="frequency-days">
                {days.map(day => (
                  <button
                    key={day}
                    type="button"
                    className={`day-button ${selectedDays.includes(day) ? 'active' : ''}`}
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Dept Airport */}
            <div className="form-group">
              <label className="form-label">Dept. Airport</label>
              <input
                type="text"
                className="form-input"
                placeholder="input departure airport"
                value={deptAirport}
                onChange={(e) => setDeptAirport(e.target.value)}
              />
            </div>

            {/* Dest Airport */}
            <div className="form-group">
              <label className="form-label">Dest. Airport</label>
              <input
                type="text"
                className="form-input"
                placeholder="input destination airport"
                value={destAirport}
                onChange={(e) => setDestAirport(e.target.value)}
              />
            </div>

          </div>

          <button
            className="confirm-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}
