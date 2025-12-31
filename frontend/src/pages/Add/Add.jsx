import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Add.css'
import { createFlight } from '../../services/flight'
import { getToken } from '../../services/api'
import { getAllAircraft } from '../../services/aircraft'


export default function AddFlight() {
  const navigate = useNavigate()

  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [aircraftId, setAircraftId] = useState('')
  const [aircraftList, setAircraftList] = useState([])
  const [aircraftLoading, setAircraftLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadAircraft = async () => {
      try {
        setAircraftLoading(true)
        const res = await getAllAircraft()
        if (cancelled) return
        setAircraftList(Array.isArray(res) ? res : [])
      } catch {
        if (cancelled) return
        setAircraftList([])
      } finally {
        if (cancelled) return
        setAircraftLoading(false)
      }
    }

    loadAircraft()
    return () => {
      cancelled = true
    }
  }, [])

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
            <label>Aircraft Model</label>
            <select
              value={aircraftId}
              onChange={e => setAircraftId(e.target.value)}
              required
              disabled={loading || aircraftLoading}
            >
              <option value="" disabled>
                {aircraftLoading ? 'Loading aircraft...' : 'Select aircraft'}
              </option>
              {aircraftList.map((a) => (
                <option key={a.aircraftId} value={a.aircraftId}>
                  {a.model}
                </option>
              ))}
            </select>
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