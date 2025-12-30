 import { useContext } from 'react'
 import { Outlet, Route, Routes } from 'react-router-dom'
 import Head  from './pages/Header/header.jsx' 
 import Add from './pages/Add/Add.jsx'
 import './App.css'
 import Remove from './pages/remove/remove.jsx'
 import Login from './pages/login_user/login.jsx'
 import { AuthContext } from './context/AuthContext'
 import Dashboard from './pages/DashboardAdmin/DashboardScreen.jsx'
import TestScene from './pages/asset/test.jsx'
import FlightSearchBox from './pages/Pesanan/pesan.jsx'
import KomodoAirList from './pages/Pesanan/search_pesan.jsx'
import LandingPage from './pages/landingPage/Landingpage.jsx'

 
 // Layout dengan Header
function LayoutWithHeader() {
  return (
    <>
      <Head />
      <Outlet />
    </>
  )
}

// Layout tanpa Header
function LayoutWithoutHeader() {
  return <Outlet />
}

export default function App() {
  return (
    <Routes>
      {/* Routes DENGAN Header */}
      <Route path="/" element={<LayoutWithHeader />}>
        <Route index element={<Dashboard/>} />
        <Route path="add" element={<Add />} />
        <Route path="/remove/:id" element={<Remove />} />
        <Route path="test" element={<TestScene />} />
        <Route path="search" element={<FlightSearchBox />} />
        <Route path="list" element={<KomodoAirList />} />
      </Route>

      {/* Routes TANPA Header */}
      <Route element={<LayoutWithoutHeader />}>
        <Route path="login" element={<Login />} />
        <Route path="Landing" element={<LandingPage />} />
      </Route>
    </Routes>
  )
}