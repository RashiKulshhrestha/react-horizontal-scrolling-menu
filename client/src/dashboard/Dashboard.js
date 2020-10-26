import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import axios from "axios";
import Card from "../card/Card";
import "./dashboard.css";
  
  // One item component
  // selected prop will be passed
  const MenuItem = ({text, email, selected}) => {
      console.log(text+"MenuItem");
    return <div
      className={`menu-item ${selected ? 'active' : ''}`}
      >{text} {email}</div>;
  };
  
  // All items component
  // Important! add unique key
  export const Menu = (listItem, selected) =>
  
    listItem.map(el => {
      const {name, email} = el;
      console.log(el.name);
      return <MenuItem text={name} email={email} key={name} selected={selected} />;
    });
  
  const Arrow = ({ text, className }) => {
    return (
      <div
        className={className}
      >{text}</div>
    );
  };
  
  const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
  const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
  
const selected = 'Rashi';
  
  class Dashboard extends Component {
    constructor(props) {
      super(props);
      // call it again if items count changes
   
      this.state = {
        list : [],
        selected: ""
      }
      this.menuItems = Menu(this.state.list, selected);
      
    }
    componentDidMount = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/user");
        //   console.log(res.data);
          this.setState({
            list: res.data,
          });
        } catch (err) {
          console.error(err.message);
        }
      };
  
    onSelect = key => {
      this.setState({ selected: key });
    }
  
    render() {
      // Create menu from items
      const menu = this.state.list.map(e=> 
            <Card
                key={e._id}
                title={e.name}
                email={e.email}
                desc={e.description}
                mobile={e.mobile}
            />
            );
      return (
        <div className="App">
          <ScrollMenu
            data={menu}
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            selected={this.state.selected}
            onSelect={this.onSelect}
          />
        </div>
      );
    }
  }
export default Dashboard;
