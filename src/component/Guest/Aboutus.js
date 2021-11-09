import React from 'react'
import Navbar from '../Navbar/Navbar'
import picture from '../../images/2.jpg'
import './aboutus.css'
function Aboutus() {
    return (
        <div className="First">
        <div>
            <div className="con-header">
                <h1>About Us</h1>
            </div>
            <section class="about-us">
              
                <div class="row">
                    <div class="about-col">
                        <img src={picture} />
                    </div>
                    <div class="about-col">
                        <h1>Villa Caceres</h1>
                        <p>Villa Caceres is a residential community developed by Moldex Realty Inc. in Brgy. Dila in Sta. Rosa, Laguna. This
                            house and lot community is therefore located at the heart of Laguna. This housing development is built in
                            partnership by Armed Forces of the Philippines Retirement Separation Benefits System with that of Moldex Realty
                            Inc. This partnership community takes inspiration from Spain in order to transform you to a Spanish Mediterranean
                            feel with its beautifully designed homes. The entire development spans a total land area of 53 hectares. It is the
                            perfect nesting place for those who want to experience an idyllic lifestyle.
                            </p>

                    </div>
                </div>
                <div class="row">
                    <div class="about-col">
                        <img src={picture} />
                    </div>
                    <div class="about-col">
                        <p>
                        The inspiration from Spain is specifically traced to the city of Caceres, to which the housing development is named
                        after. This is a first-class and exclusive residential subdivision that makes for a favorable investment due to its great
                        location and the peaceful neighborhood it is a part of. All of these factors combine to bring an idyllic community
                        combined with the suburban conveniences. There is also a commercial complex located within the subdivision
                        premises that would be perfect for those who seek commercial investments, too.
                        </p>
                    </div>
                </div>
                
            </section>
        </div>
        </div>
    )
}

export default Aboutus
