import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, CreditCard, AlertCircle, ChevronRight, Check } from 'lucide-react';
import './detail_pesan.css';
import Logo from '../../assets/Logo.svg'

export default function PassengerDetails() {
  const [contactInfo, setContactInfo] = useState({
    gender: 'Tuan',
    firstName: '',
    lastName: '',
    phone: '+62',
    email: ''
  });

  const [passengers, setPassengers] = useState([
    {
      id: 1,
      title: 'Dewasa 1',
      gender: 'Tuan',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: 'Indonesia',
      identityType: 'KTP/Nik/Paspor',
      identityNumber: ''
    }
  ]);

  const handleContactChange = (field, value) => {
    setContactInfo({ ...contactInfo, [field]: value });
  };

  const handlePassengerChange = (id, field, value) => {
    setPassengers(passengers.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSubmit = () => {
    console.log('Contact:', contactInfo);
    console.log('Passengers:', passengers);
    // Navigate to payment page
  };

  return (
    <div className="passenger-container">
      <div className="passenger-wrapper">
        {/* Header */}
        <div className="passenger-header">
          <div className="logo-section">
            <img src={Logo} alt='' className="logo-icon"></img>
          </div>
          
          <div className="step-indicator">
            <div className="step">
              <div className="step-circle active">
                <Check size={16} />
              </div>
              <span className="step-label">Pilih Penerbangan</span>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <div className="step-circle active">2</div>
              <span className="step-label">Detail Penumpang</span>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <div className="step-circle">3</div>
              <span className="step-label">Pembayaran</span>
            </div>
          </div>
        </div>

        <div className="passenger-content">
          {/* Left Side - Forms */}
          <div className="forms-section">
            {/* Contact Details Card */}
            <div className="detail-card">
              <div className="card-header">
                <div className="header-icon contact-icon">
                  <Mail size={24} />
                </div>
                <div className="header-text">
                  <h2 className="card-title">Kontak</h2>
                  <p className="card-subtitle">Detail Kontak untuk E-Tiket</p>
                </div>
              </div>

              <div className="alert-box">
                <AlertCircle size={18} />
                <p>Isiikan kami memberikan link Anda tentang panduan (Buku) penerbangan. Penumpang pertama akan menjadi link kontak utama untuk perubahan (A).</p>
              </div>

              <div className="form-section">
                <div className="form-group full-width">
                  <label className="form-label">Gelar</label>
                  <div className="radio-group">
                    {['Tuan', 'Nyonya', 'Nona'].map(option => (
                      <label key={option} className="radio-option">
                        <input
                          type="radio"
                          name="contact-gender"
                          value={option}
                          checked={contactInfo.gender === option}
                          onChange={(e) => handleContactChange('gender', e.target.value)}
                        />
                        <span className="radio-label">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Nama Depan (dan Nama Tengah)</label>
                    <input
                      type="text"
                      placeholder="Nama Depan"
                      value={contactInfo.firstName}
                      onChange={(e) => handleContactChange('firstName', e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nama Belakang</label>
                    <input
                      type="text"
                      placeholder="Nama Belakang"
                      value={contactInfo.lastName}
                      onChange={(e) => handleContactChange('lastName', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Nomor Telepon</label>
                    <div className="phone-input-wrapper">
                      <select className="phone-code">
                        <option>🇮🇩 +62</option>
                      </select>
                      <input
                        type="tel"
                        placeholder="812 3456 7890"
                        value={contactInfo.phone.replace('+62', '')}
                        onChange={(e) => handleContactChange('phone', '+62' + e.target.value)}
                        className="phone-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Alamat Email</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={contactInfo.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Details Cards */}
            {passengers.map((passenger) => (
              <div key={passenger.id} className="detail-card">
                <div className="card-header">
                  <div className="header-icon passenger-icon">
                    <User size={24} />
                  </div>
                  <div className="header-text">
                    <h2 className="card-title">Detail Penumpang</h2>
                    <p className="card-subtitle">{passenger.title}</p>
                  </div>
                </div>

                <div className="alert-box">
                  <AlertCircle size={18} />
                  <p>Nama penumpang Harus sama dengan KTP atau Paspor</p>
                </div>

                <div className="form-section">
                  <div className="form-group full-width">
                    <label className="form-label">Gelar</label>
                    <div className="radio-group">
                      {['Tuan', 'Nyonya', 'Nona'].map(option => (
                        <label key={option} className="radio-option">
                          <input
                            type="radio"
                            name={`passenger-${passenger.id}-gender`}
                            value={option}
                            checked={passenger.gender === option}
                            onChange={(e) => handlePassengerChange(passenger.id, 'gender', e.target.value)}
                          />
                          <span className="radio-label">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Nama Depan (dan Nama Tengah)</label>
                      <input
                        type="text"
                        placeholder="Nama Depan"
                        value={passenger.firstName}
                        onChange={(e) => handlePassengerChange(passenger.id, 'firstName', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Nama Belakang</label>
                      <input
                        type="text"
                        placeholder="Nama Belakang"
                        value={passenger.lastName}
                        onChange={(e) => handlePassengerChange(passenger.id, 'lastName', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Tanggal Lahir</label>
                      <input
                        type="date"
                        value={passenger.dateOfBirth}
                        onChange={(e) => handlePassengerChange(passenger.id, 'dateOfBirth', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">e-Mel / Member</label>
                      <input
                        type="text"
                        placeholder="Email atau Nomor Member"
                        onChange={(e) => handlePassengerChange(passenger.id, 'member', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Identitas</label>
                    <select 
                      value={passenger.identityType}
                      onChange={(e) => handlePassengerChange(passenger.id, 'identityType', e.target.value)}
                      className="form-select"
                    >
                      <option>KTP/Nik/Paspor</option>
                      <option>Paspor</option>
                      <option>KTP</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Nomor Identitas</label>
                    <input
                      type="text"
                      placeholder="Nomor Identitas"
                      value={passenger.identityNumber}
                      onChange={(e) => handlePassengerChange(passenger.id, 'identityNumber', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Summary */}
          <div className="summary-section">
            <div className="summary-card">
              <h3 className="summary-title">Ringkasan</h3>
              
              <div className="flight-info-box">
                <div className="flight-route-info">
                  <MapPin size={18} className="route-icon" />
                  <div>
                    <p className="route-text">Kupang, NTT → Jakarta</p>
                    <p className="route-detail">(Soekarno Hatta)</p>
                  </div>
                </div>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span className="price-label">Subtotal (1 Penumpang)</span>
                  <span className="price-amount">Rp 950.000</span>
                </div>
                <div className="price-divider"></div>
                <div className="price-row total">
                  <span className="total-label">Total Biaya</span>
                  <span className="total-amount">Rp 950.000</span>
                </div>
              </div>

              <button onClick={handleSubmit} className="continue-button">
                Lanjut
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}