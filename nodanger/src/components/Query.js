import React, { Component } from "react"
import QueryResults from "./QueryResults"

class Query extends Component {
    constructor() {
        super()
        this.state = {
            query: "",
            queryData: []
        }
        this.handleQuery = this.handleQuery.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleQuery(event) {
        const {id} = event.target
        const value = this.state.query
        console.log(id, value)
    }

    handleChange(event) {
        const {value} = event.target
        this.setState({query: value})
    }

    render() {
        return (
            <div className="query">
                <div className="row">
                    <div className="col" />
                    <input className="col-10" type="text" placeholder="Query" value={this.state.query} onChange={this.handleChange}/>
                    <div className="col" />
                </div>

                <button onClick={this.handleQuery} id="query_time" className="btn btn-primary" style={{"margin": "10px"}}>Time</button>
                <button onClick={this.handleQuery} id="query_date" className="btn btn-primary" style={{"margin": "10px"}}>Date</button>
                <button onClick={this.handleQuery} id="query_type" className="btn btn-primary" style={{"margin": "10px"}}>Type</button>
                <button onClick={this.handleQuery} id="query_location" className="btn btn-primary" style={{"margin": "10px"}}>Location</button>

                <QueryResults queryData={this.state.queryData}/>
            </div>
        )
    }
}

export default Query
