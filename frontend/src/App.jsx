 import { useContext } from 'react'
 import { Outlet, Route, Routes } from 'react-router-dom'
 import Head  from './pages/Header/header.jsx' 
 import Add from './pages/Add/Add.jsx'
 import './App.css'
 import Remove from './pages/remove/remove.jsx'
 import Login from './pages/login/login.jsx'
 import { AuthContext } from './context/AuthContext'
 import Dashboard from './pages/Dashboard/DashboardScreen.jsx'

 
 function Layout() {
   const auth = useContext(AuthContext)
 
   return (
     <>
        <Head />
       <Outlet />
     </>
   )
 }
 
 export default function App() {
   return (
     <Routes>
       <Route path="/" element={<Layout />}>
       <Route path="add" element={<Add />} />
        <Route path="/remove/:id" element={<Remove />} />
         <Route index element={<Dashboard/>} />
         <Route path="login" element={<Login />} />
       </Route>
     </Routes>
   )
 }
