import React, { useContext } from 'react'
import '../css/navbar.css'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'

function Navbar() {
  const {logoutUser, username} = useContext(UserContext)

  return (
    <div className='navbar'>
      <div className="title"><Link to={'/'}>AttendanceTracker</Link></div>
      <div className="navContents">
        <Link to="/" className="content">Attendance</Link>
        <Link to="/dashboard" className="content">Dashboard</Link>
        <div className="content"><button onClick={() => {logoutUser(username)}}>logout</button></div>
      </div>
    </div>
  )
}

export default Navbar