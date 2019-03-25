import React, { Component } from "react"
import QueryResults from "./QueryResults"
import { Button, Popup } from 'semantic-ui-react'

const server_uri = 'http://localhost:8080'

class Query extends Component {
    constructor() {
        super()
        this.state = {
            query: "",
            queryData: [],
            start: "",
            dest: "",
        }
        this.handleQuery = this.handleQuery.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleQuery(event) {
        const {id} = event.target
        const value = this.state.query
        console.log(id, value)

        let queryObj;
        if (id === "columns") {
            queryObj = {type: "columns"}
        } else if (id === "crimes") {
            queryObj = {type: "crimes"}
        } else {
            queryObj = {
                type: "query",
                where: [value],
            }
        }
        const fetch_uri = `${server_uri}/senddata`
        fetch(fetch_uri, {
            method: 'POST',
            body: JSON.stringify(queryObj)
        })
          .then(response=> response.json())
          .then(console.log)
          .catch(console.err);
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]: [value]})
    }

    render() {
        return (
            <div className="query">
                <div className="row">
                    <input className="col-10"
                           name="query"
                           type="text"
                           placeholder="Query"
                           value={this.state.query}
                           onChange={this.handleChange}/>
                </div>
                <div className="row">
                    <input className="col-10"
                          name="start"
                          type="text"
                          placeholder="Start Location"
                          value={this.state.start}
                          onChange={this.handleChange}/>
                </div>
                <div className="row">
                    <input className="col-10"
                         name="dest"
                         type="text"
                         placeholder="Destination"
                         value={this.state.dest}
                         onChange={this.handleChange}/>
                </div>

                <Popup trigger={<button onClick={this.handleQuery} id="columns" className="ui icon btn btn-danger" style={{"margin": "10px"}}>Columns</button>}
                       position="bottom center"
                       content="List Col names" />
                <Popup trigger={<button onClick={this.handleQuery} id="crimes" className="ui icon btn btn-danger" style={{"margin": "10px"}}>Crimes</button>}
                       position="bottom center"
                       content="List Crime Types" />
                <Popup trigger={<button onClick={this.handleQuery} id="query_date" className="ui icon btn btn-primary" style={{"margin": "10px"}}>Date</button>}
                       position="bottom center"
                       content="mm/dd/yyyy" />
                <Popup trigger={<button onClick={this.handleQuery} id="query_time" className="ui icon btn btn-primary" style={{"margin": "10px"}}>Time</button>}
                       position="bottom center"
                       content="24 hour system" />
                <Popup trigger={<button onClick={this.handleQuery} id="query_date" className="ui icon btn btn-primary" style={{"margin": "10px"}}>Date</button>}
                       position="bottom center"
                       content="mm/dd/yyyy" />
                <Popup trigger={<button onClick={this.handleQuery} id="query_type" className="ui icon btn btn-primary" style={{"margin": "10px"}}>Type</button>}
                       position="bottom center"
                       content="Theft, Car, MIP" />
                <Popup trigger={<button onClick={this.handleQuery} id="query_location" className="ui icon btn btn-primary" style={{"margin": "10px"}}>Location</button>}
                       position="bottom center"
                       content="Grainger, ECEB, Bardeen" />

                <QueryResults queryData={this.state.queryData}/>
            </div>
        )
    }
}

export default Query
