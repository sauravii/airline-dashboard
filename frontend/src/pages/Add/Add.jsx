import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Add.css'
import { createFlight } from '../../services/flight'
import { getToken } from '../../services/api'


export default function AddFlight() {
  const navigate = useNavigate()

  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [aircraftId, setAircraftId] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!origin || !destination || !date || !time || !aircraftId) {
      alert('Semua field wajib diisi')
      return
    }

    try {
      setLoading(true)
      const departureTime = `${date}T${time}:00`
      console.log('Token sebelum request:', getToken());
await createFlight({ origin: origin.toUpperCase(),
        destination: destination.toUpperCase(),
        departureTime,
        aircraftId: Number(aircraftId), })
      await createFlight({
        origin: origin.toUpperCase(),
        destination: destination.toUpperCase(),
        departureTime,
        aircraftId: Number(aircraftId),
      })

      alert('Flight berhasil ditambahkan!')
      navigate('/admin')
    } catch (err) {
      alert(err.message || 'Gagal tambah flight')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-flight-container">
      <div className="add-flight-content">
        <h1>Add New Flight</h1>
        
        <form className="add-flight-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Departure Airport</label>
              <input
                type="text"
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                placeholder="e.g. CGK, JKT, SUB"
                maxLength={3}
                required
              />
            </div>

            <div className="form-group">
              <label>Destination Airport</label>
              <input
                type="text"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder="e.g. DPS, BDO, UPG"
                maxLength={3}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Departure Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Departure Time</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group-full">
            <label>Aircraft ID</label>
            <input
              type="number"
              value={aircraftId}
              onChange={e => setAircraftId(e.target.value)}
              placeholder="Enter aircraft ID"
              min="1"
              required
            />
          </div>

          <div className="button-row">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/admin')}
              disabled={loading}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Flight'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}