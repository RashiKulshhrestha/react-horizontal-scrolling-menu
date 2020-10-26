import React, { Component } from "react";
import "./card.css";

class Card extends Component{
    render(){
        return(
            <div className="card-wrapper">
                <img src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                     alt="image1"
                     height="100px"
                     width="100px"/>
                <div>{this.props.title}</div>
                <div>{this.props.email}</div>
                <div>{this.props.desc}</div>
                <div>{this.props.molbile}</div>
            </div>
        )
    }
};

export default Card;