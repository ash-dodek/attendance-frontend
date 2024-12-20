import React, { useContext } from 'react'
import '../css/mainpage.css'
import { UserContext } from '../context/UserContext'

function Dashboard() {
  const {username, name} = useContext(UserContext)

  return (
    <div className='studentBlock'>
        <div className="blockTitle">Student Details</div>

        <div className="studetails">
            <img src="../../download.jpg" id='profile' />
            <div className="details">
                <div className="d-title">{name}</div>
                <div className="moreInfo">
                    <div className="info">
                        <div className="infolabel">Username</div>
                        <div className="data">{username}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard