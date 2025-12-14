 import { useContext } from 'react'
 import { Outlet, Route, Routes } from 'react-router-dom'
 
 import './App.css'

 import { AuthContext } from './context/AuthContext'
 import HomePage from './pages/HomePage'

 
 function Layout() {
   const auth = useContext(AuthContext)
 
   return (
     <>
       <Outlet />
     </>
   )
 }
 
 export default function App() {
   return (
     <Routes>
       <Route path="/" element={<Layout />}>
       {/* daftarin semua halaman disini biar react bisa navigasi */}
         <Route index element={<HomePage />} />
         
       </Route>
     </Routes>
   )
 }
