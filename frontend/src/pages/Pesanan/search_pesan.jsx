import React, { useState } from 'react';
import { Plane, Menu, Calendar, Clock, ArrowRight } from 'lucide-react';
// import './KomodoAir.css';

export default function KomodoAirList() {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const flights = [
    {
      id: 'KA128',
      departure: { time: '10:00', date: 'Rabu, Des 17', location: 'CGK', city: 'Jakarta' },
      arrival: { time: '10:50', location: 'KOE', city: 'Kupang' },
      aircraft: 'Airbus A320neo',
      duration: '50m',
      price: 950000
    },
    {
      id: 'KA130',
      departure: { time: '17:00', date: 'Rabu, Des 17', location: 'CGK', city: 'Jakarta' },
      arrival: { time: '17:50', location: 'KOE', city: 'Kupang' },
      aircraft: 'Airbus A320neo',
      duration: '50m',
      price: 950000
    }
  ];

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="header">
          <div className="header-logo">
            <Plane className="logo-icon" />
            <h1>Komodo Air</h1>
          </div>
          <button className="menu-btn">
            <Menu />
          </button>
        </div>

        {/* Search Summary Card */}
        <div className="search-card">
          <div className="search-item">
            <div className="search-icon-wrapper route">
              <Plane className="search-icon" />
            </div>
            <div className="search-info">
              <span className="search-label">Rute Penerbangan</span>
              <span className="search-value">Kupang → Jakarta</span>
              <span className="search-detail">Soekarno Hatta International</span>
            </div>
          </div>

          <div className="search-item">
            <div className="search-icon-wrapper date">
              <Calendar className="search-icon" />
            </div>
            <div className="search-info">
              <span className="search-label">Tanggal Keberangkatan</span>
              <span className="search-value">Rabu, 17 Desember 2025</span>
              <span className="search-detail">1 Penumpang</span>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="results-header">
          <h2>Penerbangan Tersedia</h2>
          <span className="results-count">{flights.length} penerbangan</span>
        </div>

        {/* Flight List */}
        <div className="flight-list">
          {flights.map((flight) => (
            <div 
              key={flight.id} 
              className={`flight-card ${selectedFlight === flight.id ? 'selected' : ''}`}
            >
              {/* Airline Header */}
              <div className="flight-header">
                <div className="airline-badge">
                  <Plane className="airline-icon" />
                  <div>
                    <div className="airline-name">Komodo Air</div>
                    <div className="flight-number">{flight.id}</div>
                  </div>
                </div>
                <div className="aircraft-badge">{flight.aircraft}</div>
              </div>

              {/* Flight Route */}
              <div className="flight-route">
                <div className="route-point">
                  <div className="route-time">{flight.departure.time}</div>
                  <div className="route-code">{flight.departure.location}</div>
                  <div className="route-city">{flight.departure.city}</div>
                </div>

                <div className="route-line">
                  <div className="route-duration">
                    <Clock size={14} />
                    <span>{flight.duration}</span>
                  </div>
                  <div className="route-connector">
                    <div className="route-dot"></div>
                    <div className="route-path">
                      <Plane className="route-plane" />
                    </div>
                    <div className="route-dot"></div>
                  </div>
                  <div className="route-type">Langsung</div>
                </div>

                <div className="route-point">
                  <div className="route-time">{flight.arrival.time}</div>
                  <div className="route-code">{flight.arrival.location}</div>
                  <div className="route-city">{flight.arrival.city}</div>
                </div>
              </div>

              {/* Flight Footer */}
              <div className="flight-footer">
                <div className="price-section">
                  <span className="price-label">Mulai dari</span>
                  <span className="price-value">Rp {flight.price.toLocaleString('id-ID')}</span>
                  <span className="price-per">/orang</span>
                </div>
                <button
                  onClick={() => setSelectedFlight(flight.id)}
                  className="select-btn"
                >
                  {selectedFlight === flight.id ? 'Terpilih' : 'Pilih Penerbangan'}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}