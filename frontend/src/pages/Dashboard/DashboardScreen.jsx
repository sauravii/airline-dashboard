import'./DashboardStyle.css'
import Frame from '../../assets/frame.svg'
import Trash from '../../assets/trash.svg'
import Add from '../../assets/add.svg'
import Head from '../Header/header.jsx'
import { useNavigate } from "react-router-dom";
import Remove from '../remove/remove.jsx'
import { useState } from 'react';


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



function Box({ showDelete }) {
  const navigate = useNavigate();
  return (
    <>
    <Head />
          <div className="box">
            {pesawat.map((item, index) => (
              <div className="card" key={index}>
                <div className="isi">
                  <div className="headeran">
                    <div className="head">
                      <h2>{item.flight}</h2>
                    <span>{item.route}</span>
                    </div>
                    <p className='plane-info'>{item.plane} <br />
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
                    {showDelete && (
                      <div className="btns">
                        <button className='deletebtn'  onClick={(e) => {
                                                          e.stopPropagation();
                                                          navigate(`/remove/${item.flight}`);
                                                        }}>
                          <img src={Trash} alt="delete" />
                        </button>
                      </div>
                    )}
                </div>
                
              </div>
            ))}
          </div>

    </>
  )
}

export default function DashboardScreen() {
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="background">
        <div className="leftside">
          <div className="upper">
            <button className="btn"> <img src={Frame} alt=''/> Outbond</button>
            <button className="btn"><img src={Frame} alt=''/> Inbound</button>
          </div>
          <div className="under">
            <button onClick={()=>navigate("/add")} className='btnadd' ><img src={Add} alt=''/> Add Flight</button>
            <button  className='btnrem' onClick={(e) => {e.stopPropagation();setShowDelete(true) }} ><img src={Trash} alt=''/> Remove Flight</button>
          </div>
        </div>
        <div className="right_side">
          <Box showDelete={showDelete} />


        </div>
      </div>
  )
}
