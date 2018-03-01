import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        let formdata = new URLSearchParams();
        formdata.append("username", this.state.username);
        formdata.append("password", this.state.password);
        fetch('http://localhost:8090/login', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: formdata
        }).then((response) => response.json())
            .then((responseJson) => {
                alert(JSON.stringify(responseJson));
            })
            .catch(err => {
            console.log(err)
        }) ;
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
          <div className="Login">
              <form onSubmit={this.handleSubmit}>
                  <FormGroup controlId="username" bsSize="large">
                      <ControlLabel>Username</ControlLabel>
                      <FormControl
                          autoFocus
                          type="text"
                          value={this.state.username}
                          onChange={this.handleChange}
                      />
                  </FormGroup>
                  <FormGroup controlId="password" bsSize="large">
                      <ControlLabel>Password</ControlLabel>
                      <FormControl
                          value={this.state.password}
                          onChange={this.handleChange}
                          type="password"
                      />
                  </FormGroup>
                  <Button
                      block
                      bsSize="large"
                      disabled={!this.validateForm()}
                      type="submit"
                  >
                      Login
                  </Button>
              </form>
          </div>
      </div>

    );
  }
}

export default App;
