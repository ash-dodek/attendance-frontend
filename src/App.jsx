import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Navbar from "./components/Navbar"
import './universal.css'
import AttendancePage from "./components/AttendancePage"
import { BrowserRouter, Routes, Route,Link, Navigate, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Register from "./components/Register"
import { UserContext } from "./context/UserContext.jsx"
import AddAttendance from "./components/AddAttendance.jsx"
import { AttendanceProvider } from "./context/AttendanceContext.jsx"
import ShowsSubject from "./components/ShowsSubject.jsx"

function App() {
    const {isLogged, loading, setIsLogged} = useContext(UserContext)
   
    
    if(loading){
      return <div>Loading...</div>
    }

    return (
      <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route
            path="/"
            element = {isLogged?<AttendanceProvider><AttendancePage/></AttendanceProvider> : <Navigate to='/login'/>}
          />

          <Route
            path="/login"
            element = {isLogged?<Navigate to='/'/>:<Login/>}
          />
          <Route
            path="/register"
            element = {isLogged?<Navigate to='/'/>:<Register/>}
          />
          <Route
            path="/Dashboard"
            element = {isLogged?<AttendanceProvider><Dashboard/></AttendanceProvider>:<Navigate to='/login'/>}
          />
          <Route
            path="/subject/add"
            element = {isLogged?<AttendanceProvider><AddAttendance/></AttendanceProvider>:<Navigate to='/login'/>}
          />
          <Route
            path="/subject/details/:subject"
            element = {isLogged?<AttendanceProvider><ShowsSubject/></AttendanceProvider>:<Navigate to='/login'/>}
          />
          
        </Routes>
      </BrowserRouter>

      </>
    )
  }

  export default App
