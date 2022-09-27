import React from "react";

function About() {
  return (
    <section className="p-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md">
            <h2 className="text-center mb-4"> </h2>
            <ul className="list-group list-group-flush lead">
              <li className="list-group-item">
                <h2 className=" ">Contact info </h2>
              </li>
              <li className="list-group-item">
                <span className="fw-bold">FreeLancer: </span> Karim William
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Fiverr: </span> darkarim
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Email: </span>{" "}
                karim.william7@gmail.com
              </li>
              <li className="list-group-item bg-dark">
                <span className="fw-bold text-info ">
                  {" "}
                  I will professionally build your desired website with up to
                  date technology and industry standard methodology.
                  <br /> Contact me now... Or later whenever is convenient{" "}
                </span>
              </li>
            </ul>
          </div>
          <div className="col-md text-center">
            <img
              src={require("../images/yoyologo.png")}
              alt="logo"
              width="400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
