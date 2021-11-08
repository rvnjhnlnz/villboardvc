import React, { useState } from 'react'
import './CChat.css'
import axios from 'axios'
function CChat() {
    const [opName, setOpName] = useState('');
    const [suggestion, setSuggestion] = useState('');

    const handleSubmit = (event) => {
        const data = {
            name: opName,
            suggestions: suggestion
        };
        axios({
            method: 'post',
            url: '/addSuggestion',
            data: data
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div className="cc_container">
            <div class="cc_wrapper">
                <div className="cc_logo"></div>
                <div class="title">
                    CChat
                </div>
                <form className="form">
                    <label>Name: (Optional)</label>
                    <div class="inputfield">
                        <input type="text" className="form-control"
                            value={opName} onChange={(e) => setOpName(e.target.value)} />
                    </div>
                    <label>Suggestion/Complaint</label>
                    <div class="inputfield">
                        <textarea rows='4' className="form-control"
                            value={suggestion} onChange={(e) => setSuggestion(e.target.value)} />
                    </div>
                    <div class="inputfield">
                        <input type="submit" value="Submit" class="btn" onClick={handleSubmit} />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CChat