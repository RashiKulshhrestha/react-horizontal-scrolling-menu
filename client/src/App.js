import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import './App.css';
import EditCard from "./card/EditCard";

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
