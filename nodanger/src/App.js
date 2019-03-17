import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css'

import User from "./components/User"
import Query from "./components/Query"
import Map from "./components/Map"

const server_uri = 'http://localhost:8080'

class App extends Component {

    // here is an example on how to call server.py's get_data
    componentDidMount() {

        this.getRequest();
        this.postRequest();
    }

    getRequest() {
      const fetch_uri = `${server_uri}/getdata`
      fetch(fetch_uri)
        .then(response=> response.json())
        .then(console.log)
        .catch(console.err);
    }

    postRequest() {
      const fetch_uri = `${server_uri}/senddata`
      fetch(fetch_uri, {
          method: 'POST',
          body: JSON.stringify({key: 5})
      })
        .then(response=> response.json())
        .then(console.log)
        .catch(console.err);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Welcome to No Danger 404, a future without risk
                    </p>

                    <User />

                    <Query />

                    <Map    start={{"lat":"40.1", "lng":"-88.24"}}
                            dest={{"lat":"40.12", "lng":"-88.21"}}
                            crimes={[{"lat":"40.1105883", "lng":"-88.2220708"}, {"lat":"40.110", "lng":"-88.22"}]}/>
                </header>
            </div>
        );
    }
}

export default App;
