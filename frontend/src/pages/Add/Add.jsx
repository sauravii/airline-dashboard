import './Add.css';

export default function Add() {
  return (
    <>
      <div data-layer="Add Flight" className="add-flight">
        <div data-layer="Background" className="background">
          <div data-layer="Rectangle 1" className="rectangle-1" />
          
          <div data-layer="Rectangle 25" className="rectangle-25" />
          
          {/* Input Fields */}
          <div data-layer="Rectangle 26" className="input-field rectangle-26" />
          <div data-layer="Rectangle 38" className="input-field rectangle-38" />
          <div data-layer="Rectangle 27" className="input-field rectangle-27" />
          <div data-layer="Rectangle 29" className="input-field rectangle-29" />
          

          <div data-svg-wrapper data-layer="Rectangle 39" className="timezone-button rectangle-39">
            <svg width="40" height="14" viewBox="0 0 40 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="14" rx="7" fill="#C9C9C9"/>
            </svg>
          </div>
          
          <div data-svg-wrapper data-layer="Rectangle 41" className="timezone-button rectangle-41">
            <svg width="40" height="14" viewBox="0 0 40 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="14" rx="7" fill="#C9C9C9"/>
            </svg>
          </div>
          
          <div data-svg-wrapper data-layer="Rectangle 40" className="timezone-button rectangle-40">
            <svg width="40" height="14" viewBox="0 0 40 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="14" rx="7" fill="#C9C9C9"/>
            </svg>
          </div>
          
          {/* Confirm Button */}
          <div data-layer="Rectangle 37" className="rectangle-37" />
          
          {/* More Input Fields */}
          <div data-layer="Rectangle 30" className="input-field rectangle-30" />
          <div data-layer="Rectangle 34" className="input-field rectangle-34" />
          <div data-layer="Rectangle 32" className="input-field rectangle-32" />
          <div data-layer="Rectangle 35" className="input-field rectangle-35" />
          <div data-layer="Rectangle 31" className="input-field rectangle-31" />
          <div data-layer="Rectangle 36" className="input-field rectangle-36" />
          <div data-layer="Rectangle 33" className="input-field rectangle-33" />
          <div data-layer="Rectangle 28" className="input-field rectangle-28" />
          
          {/* Labels - Light Text */}
          <div data-layer="Flight Code" className="label flight-code">Flight Code</div>
          <div data-layer="Aircraft Type" className="label aircraft-type">Aircraft Type</div>
          <div data-layer="Dept. Airport" className="label dept-airport">Dept. Airport</div>
          <div data-layer="Dept. Time" className="label dept-time">Dept. Time</div>
          <div data-layer="Frequency" className="label frequency">Frequency</div>
          <div data-layer="Confirm" className="label confirm">Confirm</div>
          <div data-layer="Dest. Airport" className="label dest-airport">Dest. Airport</div>
          
          {/* Labels - Dark Text */}
          <div data-layer="Monday" className="label-dark monday">Monday</div>
          <div data-layer="Wednesday" className="label-dark wednesday">Wednesday</div>
          <div data-layer="Thursday" className="label-dark thursday">Thursday</div>
          <div data-layer="Friday" className="label-dark friday">Friday</div>
          <div data-layer="Saturday" className="label-dark saturday">Saturday</div>
          <div data-layer="Sunday" className="label-dark sunday">Sunday</div>
          <div data-layer="Tuesday" className="label-dark tuesday">Tuesday</div>
          <div data-layer="WITA" className="label-dark wita">WITA</div>
          <div data-layer="WIT" className="label-dark wit">WIT</div>
          <div data-layer="WIB" className="label-dark wib">WIB</div>
        </div>
      </div>
    </>
  );
}