import React from 'react'
import ArrowupCircle from "../images/arrow-up-circle.svg"

function Footer() {
  return (
    <footer className=' d-flex bg-dark text-white text-center  position-relative'>
           <a  href="#" className="position-absolute bottom-0 end-0 m-2 "> <img className='imf-fluid' src={ArrowupCircle} alt="go up" /></a>
      <div className="container">
        <p className="lead">Copyright &copy; 2022 Dark Game Reviews</p>

   
        
      </div>
    </footer>
    



    
  )
  
}

export default Footer

//      {/* <Link to='/about'> About</Link> */}