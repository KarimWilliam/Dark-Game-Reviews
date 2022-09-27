//import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from "react-router-dom";
import bannerimg from "../images/gaming.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Header() {
  const refresh = () => {
    window.location.reload(true);
  };
  return (
    <>
      {/* navbar */}
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-2 px-4 fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <LazyLoadImage
              src={require("../images/yoyologosmall.png")}
              alt="logo"
              width="60"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  {/* style={{'float':"right"}} */}
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* showcase */}
      <section className="bg-dark text-light  text-sm-start">
        <div className="container">
          <div className="d-sm-flex align-items-center  justify-content-between">
            <div>
              <h1>Game Reviews </h1>
              <p className="lead">
                I hope you enjoy my game reviews.
                <br />
                feel free to look around and let me know what you think!
              </p>
            </div>

            <LazyLoadImage
              src={bannerimg}
              alt="game reviews banner"
              className="img-fluid my-3  d-none  d-sm-block"
              style={{ maxHeight: 150 + "px" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
