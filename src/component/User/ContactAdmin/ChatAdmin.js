import React from 'react'
import './ChatAdmin.css'
function Chat() {
    return (
    <div className = "CA_body1">
        <div className = "CA_container">
            <div className = "CA_header">
                <h1>Admin</h1>
            </div>
            <div className = "CA_body">
                <p className = "message">Hello!! How may i help you?</p>
                <p className = "message user_message">May i ask when is the schedule of the vaccination?</p>
            </div>
            <div className = "CA_footer">
                <form>
                    <input type = "text" name = ""></input>
                    <button>Send</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Chat