import React from 'react'

export default function Banner() {
  return (
    <>
        <div id="carousel" className="carousel slide">
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img src="..\public\study_banner.jpg" className="d-block w-100" alt="Simple notebook image" />
            </div>
        </div>
        {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button> */}
        </div>
    </>
  )
}
