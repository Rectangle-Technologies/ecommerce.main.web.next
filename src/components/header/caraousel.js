import React from "react";

const Caraousel = (props) => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img loading="lazy" style={{ aspectRatio: 1.65, objectFit: "cover", width: "100%" }} className="d-block w-100" src="/BANNER1.jpeg" alt="First slide"/>
                </div>
                <div className="carousel-item">
                    <img loading="lazy" style={{ aspectRatio: 1.65, width: "100%" }} className="d-block w-100" src="/IMAGE3.jpg" alt="First slide"/>
                </div>
                <div className="carousel-item">
                    <img loading="lazy" style={{ aspectRatio: 1.65, width: "100%" }} className="d-block w-100" src="/IMAGE4.jpg" alt="First slide"/>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export default Caraousel;