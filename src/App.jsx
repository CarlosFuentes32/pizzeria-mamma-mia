import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [currentView, setCurrentView] = useState('home')

  const renderView = () => {
    if (currentView === 'login') {
      return <Login />
    }

    if (currentView === 'register') {
      return <Register />
    }

    return <Home />
  }

  return (
    <div className="app">
      <Navbar onNavigate={setCurrentView} currentView={currentView} />
      {renderView()}
      <Footer />
    </div>
  )
}

export default App
