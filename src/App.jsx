import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext'
import HalamanDetail from './pages/HalamanDetail'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/surat/:id' element={<HalamanDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App