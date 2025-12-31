import './DashboardStyle.css'
import Frame from '../../assets/frame.svg'
import Trash from '../../assets/trash.svg'
import Add from '../../assets/add.svg'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllFlights } from '../../services/flight'
import { updateFlight } from '../../services/flight'
import { getAllAircraft } from '../../services/aircraft'

function Box({ showDelete, onEdit, refreshKey, aircraftModelById }) {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getAllFlights()
      .then(data => {
        setFlights(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        alert('Gagal ambil data flight')
        setLoading(false)
      })
  }, [refreshKey])

  const formatTime = (dateTimeStr) => {
    if (!dateTimeStr) return '--:--'
    const date = new Date(dateTimeStr)
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (dateTimeStr) => {
    if (!dateTimeStr) return '--'
    const date = new Date(dateTimeStr)
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading flights...</p>
      </div>
    )
  }

  if (flights.length === 0) {
    return (
      <div className="empty-state">
        <p>Belum ada flight. Klik "Add Flight" untuk menambah.</p>
      </div>
    )
  }

  return (
    <div className="box">
      {flights.map(f => (
        <div
          key={f.flightId}
          className="card"
          onDoubleClick={() => onEdit?.(f)}
        >
          <div className="isi">
            {/* Header */}
            <div className="headeran">
              <div className="head">
                <h2>{f.origin} → {f.destination}</h2>
                <span>Flight ID: {f.flightId}</span>
              </div>
              <div className="plane-info">
                <p>Aircraft</p>
                <span>{aircraftModelById?.[f.aircraftId] || `ID: ${f.aircraftId}`}</span>
              </div>
            </div>

            {/* Time Info */}
            <div className="time">
              <div className="depart">
                <p>Departure</p>
                <h2>{formatTime(f.departureTime)}</h2>
              </div>
              <div className="duration">
                <span>•──────•</span>
              </div>
              <div className="Arrive">
                <p>Date</p>
                <span>{formatDate(f.departureTime)}</span>
              </div>
            </div>

            {/* Delete Button  */}
            {showDelete && (
              <div className="btns">
                <button
                  className="deletebtn"
                  onClick={(e) => {
                    e.stopPropagation() 
                    navigate(`/admin/remove/${f.flightId}`)
                  }}
                >
                  <img src={Trash} alt="Delete" />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function DashboardScreen() {
  const [showDelete, setShowDelete] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [editingFlight, setEditingFlight] = useState(null)
  const [editForm, setEditForm] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    aircraftId: '',
  })
  const [aircraftList, setAircraftList] = useState([])
  const [aircraftLoading, setAircraftLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (aircraftList.length > 0) return

    let cancelled = false

    const loadAircraft = async () => {
      setAircraftLoading(true)
      try {
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
  }, [aircraftList.length])

  const aircraftModelById = aircraftList.reduce((acc, a) => {
    if (a?.aircraftId != null) {
      acc[a.aircraftId] = a.model
    }
    return acc
  }, {})

  const openEdit = (flight) => {
    const dt = flight?.departureTime || ''
    let datePart = ''
    let timePart = ''
    if (typeof dt === 'string' && dt.includes('T')) {
      const parts = dt.split('T')
      datePart = parts[0] || ''
      timePart = (parts[1] || '').slice(0, 5)
    } else if (typeof dt === 'string' && dt.includes(' ')) {
      const parts = dt.split(' ')
      datePart = parts[0] || ''
      timePart = (parts[1] || '').slice(0, 5)
    }

    setEditingFlight(flight)
    setEditForm({
      origin: flight?.origin || '',
      destination: flight?.destination || '',
      date: datePart,
      time: timePart,
      aircraftId: flight?.aircraftId != null ? String(flight.aircraftId) : '',
    })
  }

  const closeEdit = () => {
    if (saving) return
    setEditingFlight(null)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    if (!editingFlight) return
    if (!editForm.origin || !editForm.destination || !editForm.date || !editForm.time || !editForm.aircraftId) {
      alert('Semua field wajib diisi')
      return
    }

    try {
      setSaving(true)
      const departureTime = `${editForm.date}T${editForm.time}:00`
      await updateFlight(editingFlight.flightId, {
        origin: editForm.origin.toUpperCase(),
        destination: editForm.destination.toUpperCase(),
        departureTime,
        aircraftId: Number(editForm.aircraftId),
      })

      alert('Flight berhasil diupdate!')
      setEditingFlight(null)
      setRefreshKey((v) => v + 1)
    } catch (err) {
      alert(err.message || 'Gagal update flight')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="background">
      <div className="leftside">
        <div className="upper">
          <button className="btn">
            <img src={Frame} alt="" />
            <span>Outbound</span>
          </button>
          <button className="btn">
            <img src={Frame} alt="" />
            <span>Inbound</span>
          </button>
        </div>

        <div className="under">
          <button onClick={() => navigate('/admin/add')} className="btnadd">
            <img src={Add} alt="" />
            <span>Add Flight</span>
          </button>

          <button
            className="btnrem"
            onClick={() => setShowDelete(prev => !prev)}
          >
            <img src={Trash} alt="" />
            <span>{showDelete ? 'Cancel' : 'Remove Flight'}</span>
          </button>
        </div>
      </div>

      <div className="right_side">
        <Box showDelete={showDelete} onEdit={openEdit} refreshKey={refreshKey} aircraftModelById={aircraftModelById} />
      </div>

      {editingFlight && (
        <div className="modal-overlay" onMouseDown={closeEdit}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <h1>Edit Flight</h1>

            <form className="modal-form" onSubmit={handleEditSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Departure Airport</label>
                  <input
                    type="text"
                    value={editForm.origin}
                    onChange={e => setEditForm((p) => ({ ...p, origin: e.target.value }))}
                    placeholder="e.g. CGK, JKT, SUB"
                    maxLength={3}
                    required
                    disabled={saving}
                  />
                </div>

                <div className="form-group">
                  <label>Destination Airport</label>
                  <input
                    type="text"
                    value={editForm.destination}
                    onChange={e => setEditForm((p) => ({ ...p, destination: e.target.value }))}
                    placeholder="e.g. DPS, BDO, UPG"
                    maxLength={3}
                    required
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Departure Date</label>
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={e => setEditForm((p) => ({ ...p, date: e.target.value }))}
                    required
                    disabled={saving}
                  />
                </div>

                <div className="form-group">
                  <label>Departure Time</label>
                  <input
                    type="time"
                    value={editForm.time}
                    onChange={e => setEditForm((p) => ({ ...p, time: e.target.value }))}
                    required
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="form-group-full">
                <label>Aircraft Model</label>
                <select
                  value={editForm.aircraftId}
                  onChange={e => setEditForm((p) => ({ ...p, aircraftId: e.target.value }))}
                  required
                  disabled={saving || aircraftLoading}
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
                <button type="button" className="btn-cancel" onClick={closeEdit} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Update Flight'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}