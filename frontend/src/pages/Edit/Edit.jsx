import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFlightById, updateFlight } from '../../services/flight'
import { Plane, Calendar, Clock, MapPin, ArrowRight, Save, X, Loader } from 'lucide-react'
import './Edit.css'

export default function EditFlight() {
  const { flight } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

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
  // VALIDATION
  // ======================
  const validateForm = () => {
    const newErrors = {}

    if (!form.origin.trim()) newErrors.origin = 'Origin harus diisi'
    if (!form.destination.trim()) newErrors.destination = 'Destination harus diisi'
    if (!form.date) newErrors.date = 'Tanggal harus diisi'
    if (!form.time) newErrors.time = 'Waktu harus diisi'
    if (!form.aircraftId) newErrors.aircraftId = 'Aircraft ID harus diisi'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ======================
  // UPDATE
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

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

  const handleCancel = () => {
    if (window.confirm('Batalkan perubahan?')) {
      navigate('/admin')
    }
  }

  if (loading) {
    return (
      <div className="edit-flight-loading">
        <Loader className="spinner" />
        <p>Memuat data penerbangan...</p>
      </div>
    )
  }

  return (
    <div className="edit-flight-page">
      <div className="edit-flight-container">
        {/* Header */}
        <div className="edit-header">
          <div className="edit-header-content">
            <div className="edit-icon-wrapper">
              <Plane className="edit-icon" />
            </div>
            <div>
              <h1>Edit Penerbangan</h1>
              <p className="edit-subtitle">Flight ID: #{flight}</p>
            </div>
          </div>
          <button onClick={handleCancel} className="close-btn" title="Tutup">
            <X />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="edit-form">
          {/* Route Section */}
          <div className="form-section">
            <h2 className="section-title">
              <MapPin size={20} />
              Rute Penerbangan
            </h2>
            
            <div className="route-inputs">
              <div className="form-group">
                <label htmlFor="origin">Bandara Keberangkatan</label>
                <div className="input-wrapper">
                  <input
                    id="origin"
                    type="text"
                    value={form.origin}
                    onChange={e => {
                      setForm({ ...form, origin: e.target.value.toUpperCase() })
                      setErrors({ ...errors, origin: '' })
                    }}
                    placeholder="CGK"
                    className={errors.origin ? 'error' : ''}
                    maxLength={3}
                  />
                  <span className="input-hint">Kode IATA (3 huruf)</span>
                </div>
                {errors.origin && <span className="error-message">{errors.origin}</span>}
              </div>

              <div className="route-arrow">
                <ArrowRight />
              </div>

              <div className="form-group">
                <label htmlFor="destination">Bandara Tujuan</label>
                <div className="input-wrapper">
                  <input
                    id="destination"
                    type="text"
                    value={form.destination}
                    onChange={e => {
                      setForm({ ...form, destination: e.target.value.toUpperCase() })
                      setErrors({ ...errors, destination: '' })
                    }}
                    placeholder="DPS"
                    className={errors.destination ? 'error' : ''}
                    maxLength={3}
                  />
                  <span className="input-hint">Kode IATA (3 huruf)</span>
                </div>
                {errors.destination && <span className="error-message">{errors.destination}</span>}
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="form-section">
            <h2 className="section-title">
              <Calendar size={20} />
              Jadwal Keberangkatan
            </h2>
            
            <div className="schedule-inputs">
              <div className="form-group">
                <label htmlFor="date">Tanggal</label>
                <input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={e => {
                    setForm({ ...form, date: e.target.value })
                    setErrors({ ...errors, date: '' })
                  }}
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="time">Waktu</label>
                <div className="input-with-icon">
                  <Clock size={18} />
                  <input
                    id="time"
                    type="time"
                    value={form.time}
                    onChange={e => {
                      setForm({ ...form, time: e.target.value })
                      setErrors({ ...errors, time: '' })
                    }}
                    className={errors.time ? 'error' : ''}
                  />
                </div>
                {errors.time && <span className="error-message">{errors.time}</span>}
              </div>
            </div>
          </div>

          {/* Aircraft Section */}
          <div className="form-section">
            <h2 className="section-title">
              <Plane size={20} />
              Pesawat
            </h2>
            
            <div className="form-group">
              <label htmlFor="aircraftId">Aircraft ID</label>
              <input
                id="aircraftId"
                type="number"
                value={form.aircraftId}
                onChange={e => {
                  setForm({ ...form, aircraftId: e.target.value })
                  setErrors({ ...errors, aircraftId: '' })
                }}
                placeholder="Masukkan ID pesawat"
                className={errors.aircraftId ? 'error' : ''}
                min="1"
              />
              {errors.aircraftId && <span className="error-message">{errors.aircraftId}</span>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button 
              type="button" 
              onClick={handleCancel} 
              className="btn-cancel"
              disabled={saving}
            >
              <X size={18} />
              Batal
            </button>
            <button 
              type="submit" 
              className="btn-save"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader className="spinner-small" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}