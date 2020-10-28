import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import axios from "axios";
import Card from "../card/Card";
import "./dashboard.css";
  
  const Arrow = ({ text, className }) => {
    return (
      <div
        className={className}
      >{text}</div>
    );
  };
  
  const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
  const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
  
  class Dashboard extends Component {
    constructor(props) {
      super(props);
      // call it again if items count changes
   
      this.state = {
        list : [],
      }
      
    }
    componentDidMount = async () => {
        try {
          const res = await axios.get("/api/user");
          // console.log(res.data);
          this.setState({
            list: res.data,
          });
        } catch (err) {
          console.error(err.message);
        }
      };
  
    render() {
      // Create menu from items
      
      return (
        <div className="dashboard-wrapper">
          <ScrollMenu
            data={this.state.list.map(e=>
                <Card
                      key = {e._id}
                     id={e._id}
                     title={e.name}
                     email={e.email}
                     desc={e.description}
                     mobile={e.mobile}
                     date = {e.date}
                     time= {e.time}
                     image = {e.pic}
                     step1 = {e.step1}
                     step2 ={e.step2}
                     step3 = {e.step3}
                 />
                 )}
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            
          />
        </div>
      );
    }
  }
export default Dashboard;
