import './DashboardStyle.css'
import Frame from '../../assets/frame.svg'
import Trash from '../../assets/trash.svg'
import Add from '../../assets/add.svg'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllFlights } from '../../services/flight'

function Box({ showDelete }) {
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
  }, [])

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
          onDoubleClick={() => navigate(`/admin/edit/${f.flightId}`)}

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
                <span>ID: {f.aircraftId}</span>
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

            {/* Delete Button (conditional) */}
            {showDelete && (
              <div className="btns">
                <button
                  className="deletebtn"
                  onClick={(e) => {
                    e.stopPropagation() // penting!
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
  const navigate = useNavigate()

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
        <Box showDelete={showDelete} />
      </div>
    </div>
  )
}