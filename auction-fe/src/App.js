import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import AuthService from "./services/auth.service";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    return (
      <Switch>
        <Route exact path={["/", "/register"]} component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
      </Switch>
    );
  }
}
export default App;