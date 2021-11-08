import React, { useEffect, useState } from 'react'
import axios from 'axios'
function WhatsHappening() {
    //const [accountNum, setAccountData] = useState();
    const [suggestionNum, setSuggestionNum] = useState();
    useEffect(() => {
        /*axios.post('postUserinfo')
            .then(res => {
                console.log(res);
                setAccountData(res.data.length)
            }).catch(err => {
                console.log(err);
            })*/
        axios.post('postSuggestion')
            .then(res => {
                console.log(res);
                setSuggestionNum(res.data.length)
            }).catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <div className="home_news">
            <div className="home_fHeader">
                <h3>Summary of Data</h3>
            </div>
            <div class="admin_cards">
                <div class="card-single">
                    <div>
                        <h1>5</h1>
                        <span>Pending Reservations</span>
                    </div>
                    <div>
                        <i class="las la-calendar-check"></i>
                    </div>
                </div>
                <div class="card-single">
                    <div>
                        <h1>4</h1>
                        <span>Pending Accounts</span>
                    </div>
                    <div>
                        <span class="las la-user"></span>
                    </div>
                </div>
                <div class="card-single">
                    <div>
                        <h1>1</h1>
                        <span>Vehicles</span>
                    </div>
                    <div>
                        <span class="las la-car"></span>
                    </div>
                </div>
                <div class="card-single">
                    <div>
                        <h1>2</h1>
                        <span>Pets</span>
                    </div>
                    <div>
                        <span class="las la-dog"></span>
                    </div>
                </div>
                <div class="card-single">
                    <div>
                        <h1>3</h1>
                        <span>Transactions</span>
                    </div>
                    <div>
                        <span class="las la-receipt"></span>
                    </div>
                </div>
                <div class="card-single">
                    <div>
                        <h1>{suggestionNum}</h1>
                        <span>Suggestions</span>
                    </div>
                    <div>
                        <span class="las la-bullhorn"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhatsHappening
