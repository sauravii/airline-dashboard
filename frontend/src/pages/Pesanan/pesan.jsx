import { useState, useEffect, useRef} from "react"
import "./pesanStyle.css"

import landing from "../../assets/Landing.svg"
import takeoff from "../../assets/Frame.svg"
import { initThreeBackground } from '../../3D_Asset/earth.js'


export default function SearchBox() {
  const [tripType, setTripType] = useState("oneway")

  return (
    <div className="background">
      <div className="search-card">

        {/* TOGGLE */}
        <div className="trip-toggle">
          <button
            className={tripType === "oneway" ? "active" : "deactive"}
            onClick={() => setTripType("oneway")}
          >
            Sekali Jalan
          </button>

          <button
            className={tripType === "roundtrip" ? "active" : "deactive"}
            onClick={() => setTripType("roundtrip")}
          >
            Pulang Pergi
          </button>
        </div>

        {/* FORM */}
        <div className="form">

          {/* DARI */}
          <div className="field">
            <label>Dari</label>
            <div className="input-wrapper">
              <img src={takeoff} alt="" />
              <input placeholder="Dari" />
            </div>
          </div>

          {/* KE */}
          <div className="field">
            <label>Ke</label>
            <div className="input-wrapper">
              <img src={landing} alt="" />
              <input placeholder="Ke" />
            </div>
          </div>

          {/* DATE */}
          <div className={`date-row ${tripType}`}>

            <div className="field">
              <label>Berangkat</label>
              <div className="input-wrapper">
                <input type="date" />
              </div>
            </div>

            {tripType === "roundtrip" && (
              <div className="field">
                <label>Kembali</label>
                <div className="input-wrapper">
                  <input type="date" />
                </div>
              </div>
            )}
          </div>

          {/* PENUMPANG */}
          <div className="field">
            <label>Penumpang</label>
            <div className="input-wrapper">
              <input placeholder="1 Dewasa, 0 Anak-anak, 0 Bayi" />
            </div>
          </div>

          <button className="search-btn">Cari Penerbangan</button>
        </div>

      </div>
    </div>
  )
}
