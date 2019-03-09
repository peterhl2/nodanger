import React, { Component } from "react"

class QueryResults extends Component {
    // Returns table component of the data
    getTable() {
        const data = this.props.queryData

        return (<div />)
    }

    render() {
        const table = this.getTable()
        return (
            <div className="queryResults">
                {table}
            </div>
        )
    }
}

export default QueryResults
