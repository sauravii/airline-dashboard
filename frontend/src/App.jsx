 import { useContext } from 'react'
 import { Outlet, Route, Routes } from 'react-router-dom'
 import Head  from './pages/Header/header.jsx' 
 import Add from './pages/Add/Add.jsx'
 import './App.css'
 import Remove from './pages/remove/remove.jsx'

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
         <Route index element={<Dashboard/>} />
       </Route>
     </Routes>
   )
 }
