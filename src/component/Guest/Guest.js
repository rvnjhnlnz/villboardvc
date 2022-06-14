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
import {Helmet} from "react-helmet";

function Guest() {

    return (
        <div class="guest_page">
        <Helmet>
                <meta charSet="utf-8" />
                <title>Villboard</title>
            </Helmet>
            <header class="villa_header">
                <div class="header-content">
                    <h3>Welcome to </h3>
                    <div class="line"></div>
                    <h1>Villa Caceres</h1>
                    <a href="/Visitor" class="gVisitBtn">Visitor Registration</a>
                </div>
            </header>
            <section class="tours">
                <div class="row">
                    <div class="col image-col">
                        <div class="image-gallery">
                            <img src={one} alt="" />
                            <img src={picture1} alt="" />
                            <img src={picture2} alt="" />
                            <img src={two} alt="" />
                        </div>
                    </div>
                    <div class="col content-col">
                        <h1>Villa Caceres Facilities</h1>
                        <div class="line"></div>
                        <p>Villa Caceres' principal goal is the development of high-quality houses and communities.
                            If you wish to learn more, consider how far advanced the development of the chosen project is.</p>
                    </div>
                </div>
            </section>
            <section class="explore">
                <div class="explore-content">
                    <h1>About Villa Caceres</h1>
                    <div class="line"></div>
                    <p>Villa Caceres is a residential community developed by Moldex Realty Inc. in Brgy. Dila in Sta. Rosa, Laguna. This
                        house and lot community is therefore located at the heart of Laguna. This housing development is built in
                        partnership by Armed Forces of the Philippines Retirement Separation Benefits System with that of Moldex Realty
                        Inc. This partnership community takes inspiration from Spain in order to transform you to a Spanish Mediterranean
                        feel with its beautifully designed homes. The entire development spans a total land area of 53 hectares. It is the
                        perfect nesting place for those who want to experience an idyllic lifestyle.
                    </p>
                    <div class="line"></div>
                    <p>The inspiration from Spain is specifically traced to the city of Caceres, to which the housing development is named
                        after. This is a first-class and exclusive residential subdivision that makes for a favorable investment due to its great
                        location and the peaceful neighborhood it is a part of. All of these factors combine to bring an idyllic community
                        combined with the suburban conveniences. There is also a commercial complex located within the subdivision
                        premises that would be perfect for those who seek commercial investments, too.
                    </p>
                </div>
            </section>

            <section class="tours">
                <div class="row">
                    <div class="col content-col">
                        <h1>Villa Caceres Highlights</h1>
                        <div class="line"></div>
                        <p>Our residential real estate companies provide your family with a variety of future houses built for a large market segment. There are a variety of property kinds available, each suited to particular desires and lifestyles.</p>

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
