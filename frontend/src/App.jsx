import { Outlet, Route, Routes, Navigate } from 'react-router-dom'
import Head from './pages/Header/header.jsx'

import Add from './pages/Add/Add.jsx'
import Remove from './pages/remove/remove.jsx'
import Edit from './pages/Edit/Edit.jsx'
import Login from './pages/login_user/login.jsx'
import Dashboard from './pages/DashboardAdmin/DashboardScreen.jsx'
import TestScene from './pages/asset/test.jsx'
import FlightSearchBox from './pages/Pesanan/pesan.jsx'
import KomodoAirList from './pages/Pesanan/search_pesan.jsx'
import LandingPage from './pages/landingPage/Landingpage.jsx'
import PassengerDetails from './pages/detail_pesan/detail_pesan.jsx'
import  Ticket  from './pages/ticket/ticket.jsx'
import { getToken } from './services/api.js'
import './App.css'


// ========== PROTECTED ROUTE ==========
function ProtectedRoute({ children }) {
  const token = getToken()
  if (!token) return <Navigate to="/login" replace />
  return children
}

// ========== LAYOUT ==========
function LayoutWithHeader() {
  return (
    <>
      <Head />
      <Outlet />
    </>
  )
}

function LayoutWithoutHeader() {
  return <Outlet />
}

// ========== APP ==========
export default function App() {
  return (
    <Routes>

      {/* ===== PUBLIC (WITH HEADER) ===== */}
      <Route path='/' element={<LayoutWithHeader />}>
        
        
      </Route>

      {/* ===== ADMIN (PROTECTED) ===== */}
      <Route
        path="admin/"
        element={
          <ProtectedRoute>
            <LayoutWithHeader />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="add" element={<Add />} />
        <Route path="remove/:flightId" element={<Remove />} />
        <Route path="edit/:flightId" element={<Edit />} />
        <Route path="test" element={<TestScene />} />
      </Route>

      {/* ===== PUBLIC (NO HEADER) ===== */}
      <Route path='' element={<LayoutWithoutHeader />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/flight/:id" element={<PassengerDetails/>} />
        <Route path="ticket/:id" element={<Ticket/>} />
        <Route path="search" element={<FlightSearchBox />} />
        <Route path="list" element={<KomodoAirList />} />
      </Route>

      {/* ===== 404 ===== */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  )
}
