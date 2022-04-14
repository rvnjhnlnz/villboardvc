import React from 'react'
import './Guest.css'
import picture1 from '../../images/basketball.jpg'
import first from '../../images/Clubhouse.jpg'
import second from '../../images/third.jpg'
import third from '../../images/6.jpg'
import picture2 from '../../images/playground.jpg'
import picture3 from '../../images/swimming.jpg'
import one from '../../images/4.jpg'
import two from '../../images/2.jpg'

function Guest() {

    return (
        <div class ="guest_page">
            <header class="villa_header">
                <div class="header-content">
                    <h3>Welcome to </h3>
                    <div class="line"></div>
                    <h1>Villa Caceres</h1>
                    <a href="#" class="gVisitBtn">Visitor Registration</a>
                </div>
            </header>
            <section class="events">
                <div class="title">
                    <h1>Villa Caceres Facilities</h1>
                    <div class="line"></div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, repellendus sapiente ipsa reprehenderit suscipit iusto odit corrupti, quam velit eligendi laboriosam aspernatur tempore quaerat voluptate.</p>
                </div>
                <div class="col image-col1">
                    <div class="image-gallery">
                        <img src={picture3} alt="" />
                        <img src={picture1} alt="" />
                        <img src={picture2} alt="" />
                        <img src={first} alt="" />
                    </div>
                </div>
            </section>
            <section class="explore">
                <div class="explore-content">
                    <h1>About Villa Caceres</h1>
                    <div class="line"></div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, repellendus sapiente ipsa reprehenderit suscipit iusto odit corrupti, quam velit eligendi laboriosam aspernatur tempore quaerat voluptate.</p>
                </div>
            </section>

            <section class="tours">
                <div class="row">
                    <div class="col content-col">
                        <h1>Villa Caceres Highlights</h1>
                        <div class="line"></div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur quo dignissimos eius quidem culpa, beatae quasi ea cum minima reiciendis ut molestiae consequuntur doloribus aperiam neque eaque, at placeat natus.</p>

                    </div>
                    <div class="col image-col">
                        <div class="image-gallery">
                            <img src={one} alt="" />
                            <img src={picture1} alt="" />
                            <img src={picture2} alt="" />
                            <img src={two} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section class="footer">
                <p> B305 L2 Villa Caceres Balibago Sta. Rosa, Laguna, 4026 Philippines | Phone: 800-123-456 | Email: villacaceres@gmail.com</p>
            </section>
        </div>
    )
}


export default Guest
