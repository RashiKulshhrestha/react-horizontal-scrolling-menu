import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import axios from "axios";
import './App.css';
import EditCard from "./card/EditCard";
require("dotenv").config();

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route exact path="/edit-details/:user_id" component={EditCard}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
