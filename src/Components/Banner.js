import React from 'react'

export default function Banner() {
  const bannerStyle={ 
    height: '700px', 
    width: 'auto' 
  };

  return (
    <>
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={process.env.PUBLIC_URL + '/study_banner.jpg'} style={bannerStyle} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h1>Learn!</h1>
              <p>Spend your day learning and upskilling!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={process.env.PUBLIC_URL + '/study_banner2.jpg'} style={bannerStyle} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h1>Journal your learnings!</h1>
              <p>Recap what you learnt today. Write it in your own words!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={process.env.PUBLIC_URL + '/study_banner3.jpg'} style={bannerStyle} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h1>Revise!</h1>
              <p>Get your content on multiple platforms to revise what you learnt previously!</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    
        {/* <div id="carousel" className="carousel slide">
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img src={process.env.PUBLIC_URL + '/study_banner.jpg'} style={{ height: '800px', width: 'auto' }} className="d-block w-100" alt="Simple notebook" />
            </div>
        </div>
        {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button> 
        </div> */}
    </>
  )
}
