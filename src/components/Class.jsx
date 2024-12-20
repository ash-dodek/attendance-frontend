import React, { useContext, useEffect, useState } from 'react'
import { AttendanceContext } from '../context/AttendanceContext'

function Class(props) {
  const {getSubjectDetails} = useContext(AttendanceContext)
  const [daysAttended, setDaysAttended] = useState(0)
  const [totalDays, setTotalDays] = useState(0)

  useEffect(() => {
    const getsDetails = async()=>{
      const records = await getSubjectDetails(props.subject)
      
      let daysCounter = 0, attendedCounter =0;
      for (const record of records) {
        if(record.status === 1){
          attendedCounter++;
        }
        daysCounter++
        
      }
      setDaysAttended(attendedCounter)
      setTotalDays(daysCounter)
    }
  
    getsDetails()
    
  }, [])
  
  const percentFinder = () => {
    if(totalDays === 0){
      return 0
    }
    else
    return Math.round(daysAttended*100/totalDays*10)/10
  }

  return (
    <div onClick={props.onClick} className="class">
        <span id='icon' className="material-icons-outlined">
        class
        </span>
        <div className="class-details">
            <div className="class-title">{props.subject} <span className='percentage'>({percentFinder()}%)</span> </div>
            <div className="class-stats">Total: <span className="ltext">{daysAttended}</span>/{totalDays}</div>
        </div>
        {/* <div className="days">
            <span className=''>M</span>
            <span className='isTrue'>T</span>
            <span className=''>W</span>
            <span className='isTrue'>T</span>
            <span className='isTrue'>F</span>
        </div> */}
    </div>
  )
}

export default Class