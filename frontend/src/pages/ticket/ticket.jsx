import React, { useRef } from 'react';
import { Plane, Calendar, Clock, User, MapPin, Barcode, Download, Printer, Mail, Phone, Check } from 'lucide-react';
import './ticket.css';

export default function PrintTicket() {
  const ticketRef = useRef();

  const ticketData = {
    bookingCode: 'KA2025X7B9',
    status: 'CONFIRMED',
    passenger: {
      name: 'BUDI SANTOSO',
      title: 'Tuan',
      email: 'budi.santoso@email.com',
      phone: '+62 812 3456 7890',
      seatNumber: '12A'
    },
    flight: {
      flightNumber: 'KA128',
      airline: 'Komodo Air',
      aircraft: 'Airbus A320neo',
      departure: {
        airport: 'Kupang (El Tari)',
        code: 'KOE',
        city: 'Kupang, NTT',
        date: 'Rabu, 17 Desember 2025',
        time: '10:00',
        terminal: 'Terminal 1'
      },
      arrival: {
        airport: 'Jakarta (Soekarno-Hatta)',
        code: 'CGK',
        city: 'Jakarta',
        date: 'Rabu, 17 Desember 2025',
        terminal: 'Terminal 2F'
      },
      duration: '50 menit',
      class: 'Economy'
    },
    baggage: {
      cabin: '7 kg',
      checked: '20 kg'
    },
    price: {
      fare: 850000,
      tax: 100000,
      total: 950000
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Download PDF functionality - implement with jsPDF or similar library');
  };

  const handleEmail = () => {
    alert('Email ticket functionality');
  };

  return (
    <div className="print-ticket-page">
      <div className="print-ticket-wrapper">
        {/* Action Bar - Hidden on print */}
        <div className="action-bar no-print">
          <div className="action-header">
            <div className="action-logo">
              <div className="action-logo-icon">✈️</div>
              <h1>Komodo Air</h1>
            </div>
            <div className="action-buttons">
              <button onClick={handleEmail} className="action-btn email-btn">
                <Mail size={18} />
                Email Tiket
              </button>
              <button onClick={handleDownload} className="action-btn download-btn">
                <Download size={18} />
                Download PDF
              </button>
              <button onClick={handlePrint} className="action-btn print-btn">
                <Printer size={18} />
                Cetak Tiket
              </button>
            </div>
          </div>
        </div>

        {/* Ticket Container */}
        <div ref={ticketRef} className="ticket-container">
          {/* Success Banner */}
          <div className="success-banner no-print">
            <div className="success-icon">
              <Check size={32} />
            </div>
            <div className="success-text">
              <h2>Pemesanan Berhasil!</h2>
              <p>E-Tiket Anda sudah siap. Simpan atau cetak tiket ini untuk perjalanan Anda.</p>
            </div>
          </div>

          {/* Main Ticket */}
          <div className="ticket-card">
            {/* Ticket Header */}
            <div className="ticket-header">
              <div className="ticket-header-left">
                <div className="airline-logo">
                  <Plane size={36} />
                </div>
                <div className="airline-info">
                  <h3>{ticketData.flight.airline}</h3>
                  <p>E-TICKET / BOARDING PASS</p>
                </div>
              </div>
              <div className="ticket-header-right">
                <div className="booking-code">
                  <span className="booking-label">Kode Booking</span>
                  <span className="booking-value">{ticketData.bookingCode}</span>
                </div>
                <div className="status-badge confirmed">
                  <Check size={16} />
                  {ticketData.status}
                </div>
              </div>
            </div>

            {/* Flight Route */}
            <div className="flight-route">
              <div className="route-point departure">
                <div className="route-time">{ticketData.flight.departure.time}</div>
                <div className="route-code">{ticketData.flight.departure.code}</div>
                <div className="route-city">{ticketData.flight.departure.city}</div>
                <div className="route-airport">{ticketData.flight.departure.airport}</div>
                <div className="route-terminal">{ticketData.flight.departure.terminal}</div>
              </div>

              <div className="route-middle">
                <div className="route-flight-info">
                  <span className="flight-number">{ticketData.flight.flightNumber}</span>
                  <span className="aircraft-type">{ticketData.flight.aircraft}</span>
                </div>
                <div className="route-line">
                  <div className="route-dot"></div>
                  <div className="route-path">
                    <Plane className="route-plane-icon" />
                  </div>
                  <div className="route-dot"></div>
                </div>
                <div className="route-duration">
                  <Clock size={14} />
                  <span>{ticketData.flight.duration}</span>
                </div>
              </div>

              <div className="route-point arrival">
                <div className="route-time">{ticketData.flight.arrival.time}</div>
                <div className="route-code">{ticketData.flight.arrival.code}</div>
                <div className="route-city">{ticketData.flight.arrival.city}</div>
                <div className="route-airport">{ticketData.flight.arrival.airport}</div>
                <div className="route-terminal">{ticketData.flight.arrival.terminal}</div>
              </div>
            </div>

            {/* Flight Date */}
            <div className="flight-date">
              <Calendar size={18} />
              <span>{ticketData.flight.departure.date}</span>
            </div>

            {/* Passenger Details */}
            <div className="ticket-section">
              <h4 className="section-title">
                <User size={20} />
                Detail Penumpang
              </h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Nama Penumpang</span>
                  <span className="detail-value">{ticketData.passenger.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Nomor Kursi</span>
                  <span className="detail-value seat-number">{ticketData.passenger.seatNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{ticketData.passenger.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Telepon</span>
                  <span className="detail-value">{ticketData.passenger.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Kelas</span>
                  <span className="detail-value">{ticketData.flight.class}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Bagasi Kabin</span>
                  <span className="detail-value">{ticketData.baggage.cabin}</span>
                </div>
              </div>
            </div>

            {/* Barcode Section */}
            <div className="barcode-section">
              <div className="barcode-wrapper">
                <Barcode size={120} strokeWidth={1.5} />
                <span className="barcode-text">{ticketData.bookingCode}</span>
              </div>
            </div>

            {/* Important Notes */}
            <div className="ticket-notes">
              <h5>Informasi Penting:</h5>
              <ul>
                <li>Harap tiba di bandara minimal 2 jam sebelum keberangkatan</li>
                <li>Check-in online dapat dilakukan 24 jam sebelum keberangkatan</li>
                <li>Pastikan membawa identitas yang valid (KTP/Paspor)</li>
                <li>Simpan e-tiket ini dan tunjukkan saat check-in</li>
              </ul>
            </div>
          </div>

          {/* Price Summary */}
          <div className="price-summary-card">
            <h4 className="summary-title">Rincian Pembayaran</h4>
            <div className="summary-rows">
              <div className="summary-row">
                <span className="summary-label">Harga Tiket</span>
                <span className="summary-value">Rp {ticketData.price.fare.toLocaleString('id-ID')}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Pajak & Biaya Layanan</span>
                <span className="summary-value">Rp {ticketData.price.tax.toLocaleString('id-ID')}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span className="summary-total-label">Total Pembayaran</span>
                <span className="summary-total-value">Rp {ticketData.price.total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="ticket-footer">
            <p>Terima kasih telah memilih Komodo Air. Selamat terbang!</p>
            <p className="footer-contact">Hubungi kami: 021-1500-XXX | support@komodoair.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}