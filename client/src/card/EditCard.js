import React,{Component } from "react";
import axios from "axios";
import "./card.css";

class EditCard extends Component {

  state = {
    user_id: "",
    items: [],
    userName: "",
    email: "",
    desc: "",
    phone: 0,
  }
  
  componentDidMount = async () => {
    let id = this.props.match.params.user_id;
    // console.log(id);
    this.setState({user_id: id});
    try {
      const res = await axios.get(`http://localhost:5000/api/user/${id}`);
      // console.log(res.data);
      
      this.setState({
        items: res.data,
      });
    } catch (err) {
      console.error(err.message);
    }
    this.state.items.map( e => (
      this.setState({
        userName : e.name,
        email: e.email,
        desc: e.description,
        phone: e.mobile
      })
    )
  )
  };
 
  handleChange = e => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value,
		});
  };
  
  handleSubmit = async(e) =>{
    e.preventDefault();
    const { userName, user_id, email, desc, phone } = this.state;
    try {
      const res = await axios.put(`/api/user/${user_id}`, {
        userName, email, desc, phone
      });
      
      
      this.setState({
        items: res.data,
      });
      alert ("Updated Successfully")
    } catch (err) {
      alert(err.message);
    }
  }
  render(){
    // console.log(this.state.user_id);
    return(
      <div>
        <form className="edit-card-wrapper" onSubmit={this.handleSubmit}>
          <div>
            <label>Name</label>
            <input value={this.state.userName} name="userName"onChange={this.handleChange}/>
          </div>
          <div>
            <label>Email</label>
            <input value={this.state.email} name="email"onChange={this.handleChange}/>
          </div>
          <div>
            <label>Description</label>
            <input value={this.state.desc} name="desc"onChange={this.handleChange}/>
          </div>
          <div>
            <label>Mobile</label>
            <input value={this.state.phone} name="phone"onChange={this.handleChange}/>
          </div>
          
          <input type="submit" value="UPDATE"/>
        </form>
        
      </div>
  
    )
  }
};

export default EditCard;
