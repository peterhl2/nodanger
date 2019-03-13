import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css'

import User from "./components/User"
import Query from "./components/Query"
import Map from "./components/Map"

class App extends Component {
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
