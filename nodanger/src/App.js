import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css'

import Query from "./components/Query"
import Map from "./components/Map"

class App extends Component {

    componentDidMount() {
      console.log('start dummy request');
      fetch('http:localhost:8080/data')
        .then(response=> response.text())
        .then(r => {
alert('r',r)
          console.log(r);
          console.log('received');
        }
        )
        .catch(err=>console.log('ERR', err));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Welcome to No Danger 404, a future without risk
                    </p>

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
