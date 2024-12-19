import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { AttendanceProvider } from './context/AttendanceContext.jsx'

createRoot(document.getElementById('root')).render(
  // <AttendanceProvider>
  <UserProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </UserProvider>
  //</AttendanceProvider>
)
