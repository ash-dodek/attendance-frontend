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
        <div className="stats">
            <div className="stat">
                <span className="material-icons-outlined statIcon">
                person
                </span>
                <div>
                    <div style={{display:'inline'}} className='textBig'>47</div>
                    <div style={{display:'inline'}} className='textSmall'>/50</div>
                    <br />
                    <div className="stat-title">Classes attended</div>
                </div>
            </div>
            <div className="stat">
                <span className="material-icons-outlined statIcon">
                    person_off
                </span>
                <div>
                    <div style={{display:'inline'}} className='textBig'>3</div>
                    <div style={{display:'inline'}} className='textSmall'>/50</div>
                    <br />
                    <div className="stat-title">Complete absent</div>
                </div>
            </div>
            <div className="stat">
                <span className="material-icons-outlined statIcon">
                    class
                </span>
                <div>
                    <div style={{display:'inline'}} className='textBig'>121</div>
                    <div style={{display:'inline'}} className='textSmall'></div>
                    <br />
                    <div className="stat-title">Total classes</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard