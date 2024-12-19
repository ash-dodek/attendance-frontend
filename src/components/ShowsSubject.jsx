import React, { useContext, useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'
import '../css/showSubject.css'
import Button from './Button'
import { AttendanceContext } from '../context/AttendanceContext';

function ShowsSubject(props) {
  const [date, setDate] = useState(new Date())
  const currentUrl = window.location.pathname
  const currentSubject = currentUrl.split('/').pop()
  const [attendanceData, setAttendanceData] = useState([])
  const [subjectDays, setSubjectDays] = useState([])
  const {getSubjectDetails, getSubjects, markAttendance, editAttendance} = useContext(AttendanceContext)
  const [daysAttended, setDaysAttended] = useState(0)
  const [totalDays, setTotalDays] = useState(0)


  useEffect(() => {
    const asynctest = async() => {
      const data = await getSubjectDetails(currentSubject)
      setAttendanceData(data)
      const subjects = await getSubjects()

      for (const subject of subjects) { 
        // this for loop is to get the days of the subject, so that we can disable the calendar for other days
        if(subject.subject === currentSubject){
          setSubjectDays(subject.days)
        }
      }

      let daysCounter = 0, attendedCounter =0;
      for (const record of data) {
        // this for loop is to get the total days and attended days and update the state
        if(record.status === 1){
          attendedCounter++;
        }
        daysCounter++
      }
      setDaysAttended(attendedCounter)
      setTotalDays(daysCounter)
    }
    asynctest()
  }, [])
  
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1)
    const day = String(date.getDate())
    const stamp =  `${year}/${month}/${day}`;
    return stamp
  }
  const formatDate2 = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1)
    const day = String(date.getDate())
    const stamp =  `${day}/${month}/${year}`;
    return stamp
  }

  const onCalendarChange = async(e) => {
    setDate(e)
    const formattedDate = formatDate(e)
  }
  

  const marksAttendance = async (status) => {
    const formattedDate = formatDate(date)
    const res =await markAttendance(currentSubject, formattedDate, status)
    setAttendanceData(res)
    let daysCounter = 0, attendedCounter =0;
      for (const record of res) {
        // this for loop is to get the total days and attended days and update the state
        if(record.status === 1){
          attendedCounter++;
        }
        daysCounter++
      }
      setDaysAttended(attendedCounter)
      setTotalDays(daysCounter)
  }

  const editsAttendance = async (status) => {
    const formattedDate = formatDate(date)
    await editAttendance(currentSubject, formattedDate, status)
    const data = await getSubjectDetails(currentSubject)
    setAttendanceData(data)
  }
  const showsInfo = () => {

    const formattedDate = formatDate(date)
    for (const object of attendanceData) {
      if (object.date === formattedDate) {
        return(
          <><div className="data">
              <div className="date">Date: {formatDate2(date)}</div>
              <div className="status">{object.status?"Present":"Absent"}</div>
              {object.status?<Button buttonText='Change to Absent' onClick={() => editsAttendance(0)}/>:<Button buttonText='Change to Present' onClick={() => editsAttendance(1)}/>}
            </div>
            </>
        )
      }
    }
    return(
      <div className="data">
        <div className="status">No attendance for {formatDate2(date)}</div>
        <div className="buttons">
          <Button buttonText='Mark Present' onClick={() => marksAttendance(1)} />
          <Button buttonText='Mark Absent ' onClick={() => marksAttendance(0)} />
        </div>
      </div>
    )
  }
  
  const tileDisabled = ({date}) => {
    const day = date.getDay().toString();
    return subjectDays.includes(day) ? false : true
    //returns true means that on that date, tile of calendar should be disabled
  }

  
  return (  
    <div className='subjectPage'>
      <h1 style={{textAlign:'center'}}>{currentSubject}</h1>
      <div className="subjectDetails">
        <div className="detail">
          <div className="details-title">Total Days counted</div>
          <div className="details-info">{totalDays}</div>
        </div>
        <div className="detail">
          <div className="details-title">Total Days attended</div>
          <div className="details-info">{daysAttended}</div>
        </div>
        <div className="detail">
          <div className="details-title">Total %</div>
          <div className="details-info">{totalDays === 0?0:Math.round(daysAttended*100/totalDays*10)/10}%</div>
        </div>
      </div>
        <h2 style={{textAlign:'center',marginTop:'25px'}}>You can click specific dates to check/mark your attendance on that day</h2>
        <div className="calendar">
          <Calendar tileDisabled={tileDisabled}
          onChange={onCalendarChange} value={date}/>
          <div className="infoOnDay">
            {showsInfo()}
          </div>
        </div>

    </div>
  )
}

export default ShowsSubject