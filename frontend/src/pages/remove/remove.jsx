import './Remove.css';
import Head from '../Header/header.jsx';

const pesawat = {
  flight: 'KA102',
};

export default function Remove() {
  return (
    <>
      <div className="backgroundremove">
        <div className="centered-box">
          <h1>Remove Flight</h1>
          <h2>{pesawat.flight}</h2>
          
          <div className="form-check">
            <label className="form-check-label">
              <input 
                type="checkbox" 
                className="form-check-input" 
                name="confirmRemove" 
                id="confirmRemove" 
                value="checkedValue" 
                defaultChecked={false}
              />
              Are you sure?
            </label>
          </div>
          
          <button className="RemoveButton">Confirm</button>
        </div>
      </div>
    </>
  );
}