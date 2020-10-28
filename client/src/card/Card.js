import React, { Component } from "react";
import { Link } from "react-router-dom";
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
                <div>{this.props.mobile}</div>
                <div>{this.props.date}</div>
                <div>{this.props.time}</div>
                
                <Link to={`/edit-details/${this.props.id}`}>
                  <abbr title="Edit">
                    <img
                      src="https://www.kindpng.com/picc/m/154-1541177_edit-document-button-comments-edit-button-icon-png.png"
                      id={this.props.id}
                      alt="Edit logo"
                      className="file-delete-icon edit-icon"
                      onClick={this.editCard}
                      style={{ width: "10%"}}
                    />
                  </abbr>
                </Link>
            </div>
        )
    }
};

export default Card;