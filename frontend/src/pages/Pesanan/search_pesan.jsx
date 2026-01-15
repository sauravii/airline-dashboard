import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import {
  Plane,
  Menu,
  Calendar,
  Clock,
  ArrowRight,
  AlertCircle,
  Loader2
} from "lucide-react"
import "./searchStyle.css"
import { searchFlights } from "../../services/flight"

export default function KomodoAirList() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [flights, setFlights] = useState([])
  const [selectedFlight] = useState(null)
  const pax = Number(searchParams.get("pax")) || 1

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const origin = searchParams.get("origin")
  const destination = searchParams.get("destination")
  const departureDate = searchParams.get("date")

  /* Format helpers */
  const formatTime = (dateTime) =>
    new Date(dateTime).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    })

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    })

  /* FETCH DATA */
  useEffect(() => {
    if (!origin || !destination || !departureDate) {
      setError("Parameter pencarian tidak lengkap")
      setLoading(false)
      return
    }

    setLoading(true)
    setError("")

    searchFlights({ origin, destination, departureDate })
      .then((data) => {
        if (!data || data.length === 0) {
          setError("Gagal mencari penerbangan. Tidak ada jadwal tersedia.")
          setFlights([])
        } else {
          setFlights(data)
        }
      })
      .catch(() => {
        setError("Gagal mencari penerbangan. Silakan coba lagi.")
        setFlights([])
      })
      .finally(() => setLoading(false))
  }, [origin, destination, departureDate])

  return (
    <div className="app-container">
      <div className="content-wrapper">

        {/* HEADER */}
        <div className="header">
          <div className="header-logo">
            <Plane className="logo-icon" />
            <h1>Komodo Air</h1>
          </div>
          <button className="menu-btn">
            <Menu />
          </button>
        </div>

        {/* SEARCH SUMMARY */}
        {!loading && !error && (
          <div className="search-card">
            <div className="search-item">
              <div className="search-icon-wrapper route">
                <Plane className="search-icon" />
              </div>
              <div className="search-info">
                <span className="search-label">Rute Penerbangan</span>
                <span className="search-value">
                  {origin} → {destination}
                </span>
              </div>
            </div>

            <div className="search-item">
              <div className="search-icon-wrapper date">
                <Calendar className="search-icon" />
              </div>
              <div className="search-info">
                <span className="search-label">Tanggal Keberangkatan</span>
                <span className="search-value">
                  {formatDate(departureDate)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="loading-container">
            <Loader2 className="loading-icon" />
            <p>Mencari penerbangan...</p>
          </div>
        )}

        {/* ERROR / EMPTY */}
        {!loading && error && (
          <div className="error-popup">
            <AlertCircle size={20} />
            <span>{error}</span>
            <button
              className="retry-btn"
              onClick={() => navigate("/")}
            >
              Cari Ulang
            </button>
          </div>
        )}

        {/* RESULTS */}
        {!loading && !error && (
          <>
            <div className="results-header">
              <h2>Penerbangan Tersedia</h2>
              <span className="results-count">
                {flights.length} penerbangan
              </span>
            </div>

            <div className="flight-list">
              {flights.map((flight) => (
                <div
                  key={flight.flightId}
                  className={`flight-card ${
                    selectedFlight === flight.flightId ? "selected" : ""
                  }`}
                >
                  {/* HEADER */}
                  <div className="flight-header">
                    <div className="airline-badge">
                      <Plane className="airline-icon" />
                      <div>
                        <div className="airline-name">Komodo Air</div>
                        <div className="flight-number">
                          KA-{flight.flightId}
                        </div>
                      </div>
                    </div>
                    <div className="aircraft-badge">
                      Aircraft #{flight.aircraftId ?? "-"}
                    </div>
                  </div>

                  {/* ROUTE */}
                  <div className="flight-route">
                    <div className="route-point">
                      <div className="route-time">
                        {formatTime(flight.departureTime)}
                      </div>
                      <div className="route-code">{flight.origin}</div>
                    </div>

                    <div className="route-line">
                      <div className="route-duration">
                        <Clock size={14} />
                        <span>Langsung</span>
                      </div>
                    </div>

                    <div className="route-point">
                      <div className="route-time"></div>
                      <div className="route-code">{flight.destination}</div>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="flight-footer">
                    <div className="price-section">
                      <span className="price-label">Mulai dari</span>
                      <span className="price-value">Rp {(950000 * pax).toLocaleString("id-ID")}</span>
                      <span className="price-per">({pax} orang)</span>
                    </div>
                    <button
                      className="select-btn"
                      onClick={() => navigate(`/flight/${flight.flightId}`, {state:{pax} })}
                    >
                      Pilih Penerbangan
                      <ArrowRight size={18} />
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}
