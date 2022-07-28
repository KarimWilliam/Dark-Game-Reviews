import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Me from './pages/Me'
import Footer from './components/Footer'
import About from './pages/About'

function App() {
  return (
    <>
      <Router>
        <div className='bg-light justify-content-between d-flex flex-column min-vh-100'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/Me' element={<Me />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
