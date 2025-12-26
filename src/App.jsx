import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminScreen from './pages/AdminScreen'
import AudienceRating from './pages/AudienceRating'
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AudienceRating />} />
        <Route path="/admin" element={<AdminScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

