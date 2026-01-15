import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { AlertCircle, ChevronRight, Check, MapPin } from "lucide-react"
import "./detail_pesan.css"
import Logo from "../../assets/Logo.svg"
import { getFlightById } from "../../services/flight"

export default function PassengerDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // 🔑 pax dari page sebelumnya
  const pax = Number(location.state?.pax) || 1

  /* =====================
     PRICE CONFIG
  ====================== */
  const PRICE_DEWASA = 950000
  const PRICE_ANAK = 700000

  /* =====================
     FLIGHT STATE
  ====================== */
  const [flight, setFlight] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  /* =====================
     CONTACT STATE
  ====================== */
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "+62",
    email: ""
  })

  /* =====================
     PASSENGERS STATE
     ⚠️ JANGAN init pakai pax di sini
  ====================== */
  const [passengers, setPassengers] = useState([])

  /* =====================
     SYNC PASSENGERS WITH PAX
     🔥 FIX UTAMA
  ====================== */
  useEffect(() => {
    setPassengers(
      Array.from({ length: pax }, (_, i) => ({
        id: i + 1,
        title: "Dewasa", // Dewasa / Anak
        firstName: "",
        lastName: "",
        identityNumber: ""
      }))
    )
  }, [pax])

  /* =====================
     FETCH FLIGHT
  ====================== */
  useEffect(() => {
    setLoading(true)
    setError("")

    getFlightById(id)
      .then(setFlight)
      .catch(() => setError("Gagal memuat data penerbangan"))
      .finally(() => setLoading(false))
  }, [id])

  /* =====================
     HANDLERS
  ====================== */
  const handleContactChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }))
  }

  const handlePassengerChange = (pid, field, value) => {
    setPassengers(prev =>
      prev.map(p =>
        p.id === pid ? { ...p, [field]: value } : p
      )
    )
  }

  /* =====================
     PRICE CALC
  ====================== */
  const totalPrice = passengers.reduce((sum, p) => {
    return sum + (p.title === "Dewasa" ? PRICE_DEWASA : PRICE_ANAK)
  }, 0)

  /* =====================
     SUBMIT
  ====================== */
  const handleSubmit = () => {
    navigate(`/ticket/${flight.flightId}`, {
      state: {
        flight,
        passengers,
        contactInfo,
        totalPrice
      }
    })
  }

  /* =====================
     LOADING / ERROR
  ====================== */
  if (loading) {
    return <div className="loading">Memuat data penerbangan...</div>
  }

  if (error || !flight) {
    return (
      <div className="error-popup">
        <AlertCircle size={20} />
        <span>{error}</span>
        <button onClick={() => navigate(-1)}>Kembali</button>
      </div>
    )
  }

  /* =====================
     RENDER
  ====================== */
  return (
    <div className="passenger-container">
      <div className="passenger-wrapper">

        {/* HEADER */}
        <div className="passenger-header">
          <img src={Logo} alt="Logo" className="logo-icon" />

          <div className="step-indicator">
            <div className="step">
              <div className="step-circle active">
                <Check size={16} />
              </div>
              <span>Pilih Penerbangan</span>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <div className="step-circle active">2</div>
              <span>Detail Penumpang</span>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <div className="step-circle">3</div>
              <span>Tiket</span>
            </div>
          </div>
        </div>

        <div className="passenger-content">

          {/* LEFT – FORM */}
          <div className="forms-section">

            {/* CONTACT */}
            <div className="detail-card">
              <h2>Kontak</h2>

              <input
                placeholder="Nama Depan"
                value={contactInfo.firstName}
                onChange={(e) =>
                  handleContactChange("firstName", e.target.value)
                }
              />
              <input
                placeholder="Nama Belakang"
                value={contactInfo.lastName}
                onChange={(e) =>
                  handleContactChange("lastName", e.target.value)
                }
              />
              <input
                placeholder="Nomor Telepon"
                value={contactInfo.phone}
                onChange={(e) =>
                  handleContactChange("phone", e.target.value)
                }
              />
              <input
                placeholder="Email"
                value={contactInfo.email}
                onChange={(e) =>
                  handleContactChange("email", e.target.value)
                }
              />
            </div>

            {/* PASSENGERS */}
            {passengers.map(p => (
              <div key={p.id} className="detail-card">
                <h2>Penumpang {p.id}</h2>

                {/* Dewasa / Anak */}
                <div className="radio-group">
                  {["Dewasa", "Anak"].map(opt => (
                    <label key={opt}>
                      <input
                        type="radio"
                        name={`title-${p.id}`}
                        value={opt}
                        checked={p.title === opt}
                        onChange={(e) =>
                          handlePassengerChange(
                            p.id,
                            "title",
                            e.target.value
                          )
                        }
                      />
                      {opt}
                    </label>
                  ))}
                </div>

                <input
                  placeholder="Nama Depan"
                  value={p.firstName}
                  onChange={(e) =>
                    handlePassengerChange(
                      p.id,
                      "firstName",
                      e.target.value
                    )
                  }
                />
                <input
                  placeholder="Nama Belakang"
                  value={p.lastName}
                  onChange={(e) =>
                    handlePassengerChange(
                      p.id,
                      "lastName",
                      e.target.value
                    )
                  }
                />
                <input
                  placeholder="Nomor Identitas"
                  value={p.identityNumber}
                  onChange={(e) =>
                    handlePassengerChange(
                      p.id,
                      "identityNumber",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>

          {/* RIGHT – SUMMARY */}
          <div className="summary-section">
            <div className="summary-card">
              <h3>Ringkasan</h3>

              <div className="flight-info-box">
                <MapPin size={18} />
                <div>
                  <p>{flight.origin} → {flight.destination}</p>
                  <p>
                    {new Date(flight.departureTime)
                      .toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Dewasa</span>
                  <span>
                    Rp {(passengers.filter(p => p.title === "Dewasa").length
                      * PRICE_DEWASA).toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="price-row">
                  <span>Anak</span>
                  <span>
                    Rp {(passengers.filter(p => p.title === "Anak").length
                      * PRICE_ANAK).toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="price-row total">
                  <strong>Total</strong>
                  <strong>
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </strong>
                </div>
              </div>

              <button onClick={handleSubmit} className="continue-button">
                Lanjut
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
