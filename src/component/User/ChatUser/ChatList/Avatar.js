import React, { Component } from 'react'

export class Avatar extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div class = "avatar">
                <div class = "avatar-img">
                    <img src = {this.props.image} alt = '#' />
                </div>                
                <span class = {`isOnline ${this.props.isOnline}`}/>
            </div>
        )
    }
}

export default Avatar
