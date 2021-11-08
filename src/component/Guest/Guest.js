import React from 'react'
import './Guest.css'
import picture1 from '../../images/basketball.jpg'
import first from '../../images/Clubhouse.jpg'
import second from '../../images/third.jpg'
import third from '../../images/6.jpg'
import picture2 from '../../images/playground.jpg'
import picture3 from '../../images/swimming.jpg'

function Guest() {

    return (
        <div>
            <div className="gFirst">
                <div className="gOuter">
                    <div className="gText">
                        <h1>Welcome to Villa Caceres</h1>
                        <a href="/Visitor" className="gVisitBtn">Are you a visitor? Click Here</a>
                    </div>
                </div>
            </div>
            {/*Second Content*/}

            {/*Third Content*/}
            <div className="gThird">
                <h1>Our Subdivision</h1>
                <p>Villa Caceres is a residential community developed by Moldex Reality Inc. In Brgy. Dila in Sta. Rosa, Laguna</p>

                <div className="g3-row">
                    <div className="g3-col">
                        <img src={first} />
                        <div className="g3-layer">
                            <h3>Clubhouse</h3>
                        </div>
                    </div>
                    <div className="g3-col">
                        <img src={second} />
                        <div className="g3-layer">
                            <h3>House</h3>
                        </div>
                    </div>
                    <div className="g3-col">
                        <img src={third} />
                        <div className="g3-layer">
                            <h3>House</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/*Fourth Content*/}
            <div className="gFourth">
                <h1>Our Facilities</h1>
                <p>Villa Caceres is a residential Subdivision that promises a wide range of facilities and amenities for it's Home Owners </p>

                <div className="g4-row">
                    <div className="g4-col">
                        <img src={picture1} />
                        <h3>Basketball Court</h3>
                    </div>
                    <div className="g4-col">
                        <img src={picture2} />
                        <h3>Playground</h3>
                    </div>
                    <div className="g4-col">
                        <img src={picture3} />
                        <h3>Swimming Pool</h3>
                    </div>
                </div>
            </div>

            {/*Fifth Content*/}
            <div className="gFifth">
                <h1>Please send us a message by clicking this button. Thank you and have a good day!</h1>
                <a href="/Contact-Us" className="g5-Contact">Contact Us</a>
            </div>
        </div>
    )
}


export default Guest
