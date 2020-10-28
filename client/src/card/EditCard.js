import React,{Component } from "react";
import axios from "axios";

class EditCard extends Component {

  state = {
    user_id: "",
    items: [],
    userName: ""
    }
  
  componentDidMount = async () => {
    let id = this.props.match.params.user_id;
    console.log(id);
    this.setState({user_id: id});
    try {
      const res = await axios.get(`http://localhost:5000/api/user/${id}`);
      console.log(res.data);
      
      this.setState({
        items: res.data,
      });
    } catch (err) {
      console.error(err.message);
    }
    this.state.items.map( e => (
      this.setState({
        userName : e.name
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
    const { userName, user_id } = this.state;
    try {
      const res = await axios.put(`http://localhost:5000/api/user/${user_id}`, {
        userName
      });
      console.log(res.data);
      
      this.setState({
        items: res.data,
      });
    } catch (err) {
      console.error(err.message);
    }
  }
  render(){
    console.log(this.state.user_id);
    return(
      <div>
        
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.userName} name="userName"onChange={this.handleChange}/>
          <input type="submit" value="SUBMIT"/>
        </form>
        
      </div>
  
    )
  }
};

export default EditCard;
