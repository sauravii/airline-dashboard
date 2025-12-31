import './remove.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFlightById, deleteFlight } from '../../services/flight';
import { getAircraftById } from '../../services/aircraft';
import { AlertTriangle, ArrowLeft, Trash2 } from 'lucide-react';

export default function Remove() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  
  const [flight, setFlight] = useState(null);
  const [aircraftModel, setAircraftModel] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (flightId) {
      getFlightById(flightId)
        .then(data => {
          setFlight(data);
          setAircraftModel('');
          setLoading(false);

          if (data?.aircraftId != null) {
            getAircraftById(data.aircraftId)
              .then((aircraft) => {
                setAircraftModel(aircraft?.model || '');
              })
              .catch(() => {
                setAircraftModel('');
              });
          }
        })
        .catch(err => {
          console.error(err);
          alert('Flight tidak ditemukan');
          navigate('/admin');
        });
    }
  }, [flightId, navigate]);

  const handleDelete = async () => {
    if (!confirmed) {
      alert('Please confirm deletion');
      return;
    }

    setDeleting(true);
    try {
      await deleteFlight(flightId);
      alert('Flight berhasil dihapus!');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus flight: ' + err.message);
      setDeleting(false);
    }
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '--';
    const date = new Date(dateTimeStr);
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="backgroundremove">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading flight data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="backgroundremove">
      <div className="centered-box">
        {/* Back Button */}
        <button 
          className="back-button"
          onClick={() => navigate('/admin')}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {/* Warning Icon */}
        <div className="warning-icon">
          <AlertTriangle size={44} color="#dc2626" />
        </div>

        {/* Title */}
        <h1>Remove Flight</h1>
        
        {/* Flight Info Card */}
        {flight && (
          <div className="flight-info-card">
            <div className="info-row">
              <span className="label">Flight ID:</span>
              <span className="value">{flight.flightId}</span>
            </div>
            <div className="info-row route">
              <span className="label">Route:</span>
              <span className="value-large">{flight.origin} → {flight.destination}</span>
            </div>
            <div className="info-row">
              <span className="label">Departure:</span>
              <span className="value">{formatDateTime(flight.departureTime)}</span>
            </div>
            <div className="info-row">
              <span className="label">Aircraft:</span>
              <span className="value">{aircraftModel ? `${aircraftModel}` : flight.aircraftId}</span>
            </div>
          </div>
        )}

        {/* Warning Message */}
        <div className="warning-message">
          <p>⚠️ This action cannot be undone!</p>
        </div>

        {/* Confirmation Checkbox */}
        <div className="form-check">
          <label className="form-check-label">
            <input 
              type="checkbox" 
              className="form-check-input" 
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span>I understand and want to delete this flight</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="button-group">
          <button 
            className="CancelButton"
            onClick={() => navigate('/admin')}
            disabled={deleting}
          >
            Cancel
          </button>
          
          <button 
            className="RemoveButton"
            onClick={handleDelete}
            disabled={!confirmed || deleting}
          >
            {deleting ? (
              <>
                <div className="button-spinner"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Confirm Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}