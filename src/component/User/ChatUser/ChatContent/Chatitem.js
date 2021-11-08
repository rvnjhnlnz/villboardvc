import React, { Component } from "react";
import Avatar from "../ChatList/Avatar";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat_item ${this.props.user ? this.props.user : ""}`}
      >
        <div className="chat_item_content">
          <div className="chat_msg">{this.props.msg}</div>
          <div className="chat_meta">
            <span>16 mins ago</span>
            <span> Seen 1:03PM</span>
          </div>
        </div>
        <Avatar isOnline="active" image={this.props.image} />
      </div>
    );
  }
}