import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css'

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

                    <Query />

                    <Map />
                </header>
            </div>
        );
    }
}

export default App;
