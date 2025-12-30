import React, { useState } from 'react';
import { Plane, Menu, Calendar } from 'lucide-react';
import './searchStyle.css'

export default function KomodoAirList() {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const flights = [
    {
      id: 'KA128',
      departure: { time: '10.00', date: 'Rabu, Des 17', location: 'CGK' },
      arrival: { time: '10.50', date: 'Rabu, Des 17', location: 'OCW' },
      aircraft: 'Airbus A320neo',
      duration: 'J: 50m',
      price: 950000
    },
    {
      id: 'KA130',
      departure: { time: '17.00', date: 'Rabu, Des 17', location: 'CGK' },
      arrival: { time: '17.50', date: 'Rabu, Des 17', location: 'OCW' },
      aircraft: 'Airbus A320neo',
      duration: 'J: 50m',
      price: 950000
    }
  ];

  return (
    

      <div className="all">
        <div className="container">
          {/* Filter Section */}
          <div className="filter-card">
            <div className="filter-content">
              <div className="filter-group">
                <div className="filter-item">
                  <Plane className="filter-icon" />
                  <div>
                    <div className="filter-title">Pilih Keberangkatan</div>
                    <div className="filter-subtitle">Kupang, NTT → Jakarta (Soekarno Hatta)</div>
                  </div>
                </div>
                
                <div className="filter-item">
                  <Calendar className="filter-icon" />
                  <div>
                    <div className="filter-title">Tanggal Keberangkatan</div>
                    <div className="filter-subtitle">Rabu, 17 Desember 2025</div>
                  </div>
                </div>
              </div>
              
              <Menu className="menu-icon" />
            </div>
          </div>

          {/* Flight Cards */}
          <div className="flight-cards">
            {flights.map((flight) => (
              <div key={flight.id} className="flight-card">
                <div className="flight-content">
                  {/* Airline Section */}
                  <div className="airline-section">
                    <div className="airline-logo">
                      <Plane className="airline-logo-icon" />
                    </div>
                    <div className="airline-info">
                      <div className="airline-name">Komodo Air</div>
                      <div className="flight-number">{flight.id}</div>
                    </div>
                  </div>

                  {/* Flight Details */}
                  <div className="flight-details">
                    {/* Departure */}
                    <div className="time-section">
                      <div className="time-label">Keberangkatan</div>
                      <div className="time-value">{flight.departure.time}</div>
                      <div className="location-code">{flight.departure.location}</div>
                      <div className="date-text">{flight.departure.date}</div>
                    </div>

                    {/* Flight Path */}
                    <div className="flight-path">
                      <div className="aircraft-text">{flight.aircraft}</div>
                      <div className="nonstop-text">Nonstop/fly</div>
                      <div className="path-line">
                        <div className="path-dot"></div>
                        <div className="path-connector">
                          <Plane className="plane-icon" />
                        </div>
                        <div className="path-dot"></div>
                      </div>
                      <div className="direct-text">Langsung</div>
                      <div className="duration-text">{flight.duration}</div>
                    </div>

                    {/* Arrival */}
                    <div className="time-section arrival">
                      <div className="time-label">Kedatangan</div>
                      <div className="time-value">{flight.arrival.time}</div>
                      <div className="location-code">{flight.arrival.location}</div>
                      <div className="date-text">{flight.arrival.date}</div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="price-section">
                    <div className="price-label">Dari</div>
                    <div className="price-value">Rp {flight.price.toLocaleString('id-ID')}</div>
                    <div className="per-person">/orang</div>
                    <button
                      onClick={() => setSelectedFlight(flight.id)}
                      className="select-button"
                    >
                      PILIH
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  
  );
}