import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFlightById, updateFlight } from '../../services/flight'
import './Edit.css'

export default function EditFlight() {
  const { flight } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    aircraftId: '',
  })

  // ======================
  // LOAD DATA
  // ======================
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const data = await getFlightById(flight)

        // pecah datetime -> date & time
        const [datePart, timePart] = data.departure_time.split(' ')

        setForm({
          origin: data.origin,
          destination: data.destination,
          date: datePart,
          time: timePart.slice(0, 5), // HH:mm
          aircraftId: data.aircraft_id,
        })
      } catch (err) {
        alert(err.message || 'Gagal mengambil data flight')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFlight()
  }, [flight])

  // ======================
  // UPDATE
  // ======================
  const handleSubmit = async () => {
    setSaving(true)
    try {
      await updateFlight(flight, {
        origin: form.origin,
        destination: form.destination,
        departureTime: `${form.date} ${form.time}:00`,
        aircraftId: Number(form.aircraftId),
      })

      alert('Flight berhasil diupdate')
      navigate('/admin')
    } catch (err) {
      alert(err.message || 'Update gagal')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="add-flight-container">
      <h1>Edit Flight #{flight}</h1>

      <div className="form-container">
        <input
          value={form.origin}
          onChange={e => setForm({ ...form, origin: e.target.value })}
          placeholder="Origin (CGK)"
        />

        <input
          value={form.destination}
          onChange={e => setForm({ ...form, destination: e.target.value })}
          placeholder="Destination (DPS)"
        />

        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="time"
          value={form.time}
          onChange={e => setForm({ ...form, time: e.target.value })}
        />

        <input
          type="number"
          value={form.aircraftId}
          onChange={e => setForm({ ...form, aircraftId: e.target.value })}
          placeholder="Aircraft ID"
        />

        <button onClick={handleSubmit} disabled={saving}>
          {saving ? 'Saving...' : 'Update Flight'}
        </button>
      </div>
    </div>
  )
}
