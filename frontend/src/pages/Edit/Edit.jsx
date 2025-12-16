import { useState } from 'react';
import './Edit.css';

export default function AddFlight() {
  const [selectedTimezone, setSelectedTimezone] = useState('WITA');
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="add-flight-container">
      <div className="title"> <h1>Edit</h1></div>
      <div className="content">
        <div className="form-container">
          <div className="form-grid">
            {/* Flight Code */}
            <div className="form-group">
              <label className="form-label">Flight Code</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter flight code"
              />
              
            

            

            {/* Aircraft Type */}
            <div className="form-group">
              <label className="form-label">Aircraft Type</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter aircraft type"
              />
            </div>
            {/* Dept. Time */}
            <div className="form-group">
              <label className="form-label">Dept. Time</label>
              <input 
                type="time" 
                className="form-input"
              />
              <div className="timezone-group">
                {['WITA', 'WIT', 'WIB'].map(tz => (
                  <button
                    key={tz}
                    className={`timezone-button ${selectedTimezone === tz ? 'active' : ''}`}
                    onClick={() => setSelectedTimezone(tz)}
                  >
                    {tz}
                  </button>
                ))}
              </div>
            </div>
            </div>
            
            

            {/* Frequency */}
            <div className="form-group frequency-section">
              <label className="form-label">Frequency</label>
              <div className="frequency-days">
                {days.map(day => (
                  <button
                    key={day}
                    className={`day-button ${selectedDays.includes(day) ? 'active' : ''}`}
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Dept. Airport */}
            <div className="form-group">
              <label className="form-label">Dept. Airport</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter departure airport"
              />
            </div>

            {/* Dest. Airport */}
            <div className="form-group">
              <label className="form-label">Dest. Airport</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter destination airport"
              />
            </div>
          </div>

          <button className="confirm-button">Confirm</button>
        </div>
      </div>
    </div>
  );
}