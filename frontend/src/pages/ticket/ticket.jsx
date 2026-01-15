import React, { useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Plane,
  Calendar,
  Clock,
  User,
  Barcode,
  Download,
  Printer,
  Mail,
  Check
} from "lucide-react"
import "./ticket.css"

export default function PrintTicket() {
  const ticketRef = useRef()
  const navigate = useNavigate()
  const { state } = useLocation()

  // 🔒 Guard
  if (!state) {
    navigate("/")
    return null
  }

  const { flight, passengers, contactInfo, totalPrice } = state

  const PRICE_DEWASA = 950000
  const PRICE_ANAK = 700000

  const handlePrint = () => window.print()
  const handleDownload = () =>
    alert("PDF bisa pakai jsPDF / html2pdf (nanti)")
  const handleEmail = () => alert("Email ticket (dummy)")

  return (
    <div className="print-ticket-page">
      <div className="print-ticket-wrapper">

        {/* ACTION BAR */}
        <div className="action-bar no-print">
          <div className="action-header">
            <div className="action-logo">
              ✈️ <h1>Komodo Air</h1>
            </div>
            <div className="action-buttons">
              <button onClick={handleEmail}>
                <Mail size={18} /> Email Tiket
              </button>
              <button onClick={handleDownload}>
                <Download size={18} /> Download PDF
              </button>
              <button onClick={handlePrint}>
                <Printer size={18} /> Cetak Tiket
              </button>
            </div>
          </div>
        </div>

        {/* TICKET */}
        <div ref={ticketRef} className="ticket-container">

          {/* SUCCESS */}
          <div className="success-banner no-print">
            <Check size={28} />
            <div>
              <h2>Pemesanan Berhasil</h2>
              <p>E-Tiket Anda siap digunakan</p>
            </div>
          </div>

          {/* HEADER */}
          <div className="ticket-card">
            <div className="ticket-header">
              <div>
                <Plane size={32} />
                <h3>Komodo Air</h3>
                <p>E-Ticket</p>
              </div>
              <div>
                <span>Kode Booking</span>
                <strong>KA-{flight.flightId}</strong>
              </div>
            </div>

            {/* ROUTE */}
            <div className="flight-route">
              <div>
                <strong>{flight.origin}</strong>
                <p>
                  {new Date(flight.departureTime).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>

              <div>
                <Plane />
                <p>Langsung</p>
              </div>

              <div>
                <strong>{flight.destination}</strong>
              </div>
            </div>

            <div className="flight-date">
              <Calendar size={18} />
              {new Date(flight.departureTime).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </div>

            {/* PASSENGERS */}
            <div className="ticket-section">
              <h4>
                <User size={18} /> Penumpang
              </h4>

              {passengers.map((p, i) => (
                <div key={i} className="detail-grid">
                  <div>
                    <span>Nama</span>
                    <strong>
                      {p.firstName} {p.lastName}
                    </strong>
                  </div>
                  <div>
                    <span>Tipe</span>
                    <strong>{p.title}</strong>
                  </div>
                  <div>
                    <span>Identitas</span>
                    <strong>{p.identityNumber || "-"}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* CONTACT */}
            <div className="ticket-section">
              <h4>Kontak</h4>
              <p>{contactInfo.email}</p>
              <p>{contactInfo.phone}</p>
            </div>

            {/* BARCODE */}
            <div className="barcode-section">
              <Barcode size={120} />
              <span>KA-{flight.flightId}</span>
            </div>
          </div>

          {/* PRICE */}
          <div className="price-summary-card">
            <h4>Rincian Pembayaran</h4>

            <div className="summary-row">
              <span>Dewasa</span>
              <span>
                Rp{" "}
                {(
                  passengers.filter(p => p.title === "Dewasa").length *
                  PRICE_DEWASA
                ).toLocaleString("id-ID")}
              </span>
            </div>

            <div className="summary-row">
              <span>Anak</span>
              <span>
                Rp{" "}
                {(
                  passengers.filter(p => p.title === "Anak").length *
                  PRICE_ANAK
                ).toLocaleString("id-ID")}
              </span>
            </div>

            <div className="summary-row total">
              <strong>Total</strong>
              <strong>
                Rp {totalPrice.toLocaleString("id-ID")}
              </strong>
            </div>
          </div>

          <div className="ticket-footer">
            Terima kasih telah memilih Komodo Air ✈️
          </div>
        </div>
      </div>
    </div>
  )
}
