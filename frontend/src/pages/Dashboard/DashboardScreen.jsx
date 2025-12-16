import'./DashboardStyle.css'
import Frame from '../../assets/frame.svg'
import Trash from '../../assets/trash.svg'
import Add from '../../assets/add.svg'
import Head from '../Header/header.jsx'

const pesawat = [
  {
    flight: 'KA100',
    route: 'KOE-ENE',
    plane: 'Airbus',
    type: 'A220-300',
    depart: '07.30 WITA',
    duration: '50m',
    arrive: '08.30 WITA',
    days: 'Mon, Wed, Fri'
  },
  {
    flight: 'KA200',
    route: 'ENE-LOP',
    plane: 'Airbus',
    type: 'A220-300',
    depart: '09.00 WITA',
    duration: '1h 20m',
    arrive: '10.20 WITA',
    days: 'Tue, Thu, Sat'
  },
  {
    flight: 'KA300',
    route: 'LOP-KOE',
    plane: 'Airbus',
    type: 'A220-300',
    depart: '11.15 WITA',
    duration: '1h 10m',
    arrive: '12.25 WITA',
    days: 'Mon, Wed, Fri'
  },
  {
    flight: 'KA100',
    route: 'KOE-ENE',
    plane: 'Airbus',
    type: 'A220-300',
    depart: '07.30 WITA',
    duration: '50m',
    arrive: '08.30 WITA',
    days: 'Mon, Wed, Fri'
  },
  {
    flight: 'KA200',
    route: 'ENE-LOP',
    plane: 'Airbus',
    type: 'A220-300',
    depart: '09.00 WITA',
    duration: '1h 20m',
    arrive: '10.20 WITA',
    days: 'Tue, Thu, Sat'
  },
  {
    flight: 'KA300',
    route: 'LOP-KOE',
    plane: 'Airbus',
    type: 'A220-300',
    depart: '11.15 WITA',
    duration: '1h 10m',
    arrive: '12.25 WITA',
    days: 'Mon, Wed, Fri'
  },
  {
    flight: 'KA100',
    route: 'KOE-ENE',
    plane: 'Airbus',
    type: 'A220-300',
    depart: '07.30 WITA',
    duration: '50m',
    arrive: '08.30 WITA',
    days: 'Mon, Wed, Fri'
  },
  {
    flight: 'KA200',
    route: 'ENE-LOP',
    plane: 'Airbus',
    type: 'A220-300',
    depart: '09.00 WITA',
    duration: '1h 20m',
    arrive: '10.20 WITA',
    days: 'Tue, Thu, Sat'
  },
  {
    flight: 'KA300',
    route: 'LOP-KOE',
    plane: 'Airbus',
    type: 'A220-300',
    depart: '11.15 WITA',
    duration: '1h 10m',
    arrive: '12.25 WITA',
    days: 'Mon, Wed, Fri'
  },
]
function Box() {
  return (
    <>
    <Head />
          <div className="box">
            {pesawat.map((item, index) => (
              <div className="card" key={index}>
                <div className="isi">
                  <div className="header">
                    <div className="head">
                      <h2>{item.flight}</h2>
                    <span>{item.route}</span>
                    </div>
                    <p>{item.plane} <br />
                      {item.type}
                    </p>

                  </div>
                    <div className="time">
                      <div className="depart">
                        <h2>07.30</h2>
                        <span className='WrldTm'>WITA</span>
                      </div>

                      <span className="duration">50m</span>

                      <div className='Arrive'>
                        <h2>08.30</h2>
                        <span className='WrldTm'>WITA</span>
                      </div>
                    </div>
                    <div className="days">
                      <span>{item.days}</span>
                    </div>
                  

                </div>
              </div>
            ))}
          </div>

    </>
  )
}

export default function DashboardScreen() {
  return (
    <>
      
      <div className="background">
        <div className="leftside">
          <div className="upper">
            <button className="btn"> <img src={Frame} /> Outbond</button>
            <button className="btn"><img src={Frame} /> Inbound</button>
          </div>
          <div className="under">
            <button className='btnadd'><img src={Add}/> Add Flight</button>
            <button className='btnrem'><img src={Trash}/> Remove Flight</button>
          </div>
        </div>
        <div className="right_side">
          <Box />

        </div>
      </div>
    </>
  )
}
