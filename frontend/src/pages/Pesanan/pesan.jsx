import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Plane, Calendar, ArrowLeftRight, AlertCircle, Loader2 } from "lucide-react"
import "./pesanStyle.css"

import landing from "../../assets/Landing.svg"
import takeoff from "../../assets/Frame.svg"
import { initThreeBackground } from "../../3D_Asset/earth.js"

export default function SearchBox() {
  const navigate = useNavigate()
  
  
  // Form State
  const [tripType, setTripType] = useState("oneway")
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: ""
  })
  const [passengers, setPassengers] = useState(1)
  
  // UI State
  const [loading] = useState(false)
  const [errors, setErrors] = useState({})

  // Three.js Refs
  const earthContainerRef = useRef(null)
  const earthInstanceRef = useRef(null)

 
  useEffect(() => {
     /* 🌍 INIT EARTH */
    if (earthContainerRef.current && !earthInstanceRef.current) {
      try {
        earthInstanceRef.current = initThreeBackground(
          earthContainerRef.current,
          {},
          {
            earth: 1,
            airplane: 0.02,
            earthPositionY: -0.5
          }
        )
      } catch (error) {
        console.error("Failed to initialize 3D background:", error)
      }
    }

    return () => {
      if (earthInstanceRef.current?.cleanup) {
        earthInstanceRef.current.cleanup()
      }
      earthInstanceRef.current = null
    }
  }, [])

  /* Set minimum date to today */
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  /* Handle input change */
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  /* Swap origin and destination */
  const handleSwapLocations = () => {
    setFormData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }))
  }

  /* Validate form */
  const validateForm = () => {
    const newErrors = {}

    if (!formData.origin.trim()) {
      newErrors.origin = "Pilih bandara keberangkatan"
    }
    if (!formData.destination.trim()) {
      newErrors.destination = "Pilih bandara tujuan"
    }
    if (formData.origin === formData.destination && formData.origin) {
      newErrors.destination = "Bandara tujuan harus berbeda"
    }
    if (!formData.departureDate) {
      newErrors.departureDate = "Pilih tanggal keberangkatan"
    }
    if (tripType === "roundtrip" && !formData.returnDate) {
      newErrors.returnDate = "Pilih tanggal kepulangan"
    }
    if (tripType === "roundtrip" && formData.returnDate && formData.departureDate) {
      if (new Date(formData.returnDate) < new Date(formData.departureDate)) {
        newErrors.returnDate = "Tanggal kepulangan tidak boleh sebelum keberangkatan"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /* 🔍 SEARCH */
  const handleSearch = () => {
  if (!validateForm()) return

  const query = new URLSearchParams({
    origin: formData.origin.toUpperCase(),
    destination: formData.destination.toUpperCase(),
    date: formData.departureDate,
    pax: passengers
  }).toString()

  navigate(`/list?${query}`)
}


  /* Handle Enter key */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="background">
      {/* 🌍 THREE.JS CONTAINER */}
      <div ref={earthContainerRef} className="earth-canvas" />

      <div className="search-card">
        {/* HEADER */}
        <div className="search-header">
          <h1 className="search-title">Temukan Penerbangan Anda</h1>
          <p className="search-subtitle">Cari dan pesan tiket pesawat dengan mudah</p>
        </div>

        {/* TOGGLE */}
        <div className="trip-toggle">
          <button
            className={tripType === "oneway" ? "active" : "deactive"}
            onClick={() => {
              setTripType("oneway")
              setFormData(prev => ({ ...prev, returnDate: "" }))
              setErrors({})
            }}
          >
            <Plane size={18} />
            Sekali Jalan
          </button>
          <button
            className={tripType === "roundtrip" ? "active" : "deactive"}
            onClick={() => {
              setTripType("roundtrip")
              setErrors({})
            }}
          >
            <ArrowLeftRight size={18} />
            Pulang Pergi
          </button>
        </div>

        {/* GENERAL ERROR */}
        {errors.general && (
          <div className="error-banner">
            <AlertCircle size={18} />
            <span>{errors.general}</span>
          </div>
        )}

        {/* FORM */}
        <div className="form">
          {/* LOCATION ROW */}
          <div className="location-row">
            {/* DARI */}
            <div className={`field ${errors.origin ? "field-error" : ""}`}>
              <label>Dari</label>
              <div className="input-wrapper">
                <img src={takeoff} alt="Takeoff" className="input-icon" />
                <input
                  value={formData.origin}
                  onChange={(e) => handleInputChange("origin", e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  placeholder="CGK"
                  maxLength={3}
                  className="location-input"
                />
              </div>
              {errors.origin && (
                <span className="error-text">{errors.origin}</span>
              )}
            </div>

            {/* SWAP BUTTON */}
            <button 
              className="swap-button"
              onClick={handleSwapLocations}
              title="Tukar lokasi"
              type="button"
            >
              <ArrowLeftRight size={20} />
            </button>

            {/* KE */}
            <div className={`field ${errors.destination ? "field-error" : ""}`}>
              <label>Ke</label>
              <div className="input-wrapper">
                <img src={landing} alt="Landing" className="input-icon" />
                <input
                  value={formData.destination}
                  onChange={(e) => handleInputChange("destination", e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  placeholder="DPS"
                  maxLength={3}
                  className="location-input"
                />
              </div>
              {errors.destination && (
                <span className="error-text">{errors.destination}</span>
              )}
            </div>
          </div>

          {/* DATE ROW */}
          <div className="date-row">
            {/* BERANGKAT */}
            <div className={`field ${errors.departureDate ? "field-error" : ""}`}>
              <label>Tanggal Berangkat</label>
              <div className="input-wrapper">
                <Calendar size={18} className="calendar-icon" />
                <input
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => handleInputChange("departureDate", e.target.value)}
                  onKeyPress={handleKeyPress}
                  min={getTodayDate()}
                  className="date-input"
                />
              </div>
              {errors.departureDate && (
                <span className="error-text">{errors.departureDate}</span>
              )}
            </div>

            {/* PULANG (only for roundtrip) */}
            {tripType === "roundtrip" && (
              <div className={`field ${errors.returnDate ? "field-error" : ""}`}>
                <label>Tanggal Pulang</label>
                <div className="input-wrapper">
                  <Calendar size={18} className="calendar-icon" />
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => handleInputChange("returnDate", e.target.value)}
                    onKeyPress={handleKeyPress}
                    min={formData.departureDate || getTodayDate()}
                    className="date-input"
                  />
                </div>
                {errors.returnDate && (
                  <span className="error-text">{errors.returnDate}</span>
                )}
              </div>
            )}

            {/* PASSENGERS */}
            <div className="field passengers-field">
              <label>Penumpang</label>
              <div className="passengers-selector">
                <button
                  type="button"
                  className="passenger-btn"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  disabled={passengers <= 1}
                >
                  -
                </button>
                <span className="passenger-count">{passengers} Orang</span>
                <button
                  type="button"
                  className="passenger-btn"
                  onClick={() => setPassengers(Math.min(9, passengers + 1))}
                  disabled={passengers >= 9}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <button 
            className="search-btn" 
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Mencari...
              </>
            ) : (
              <>
                <Search size={20} />
                Cari Penerbangan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}