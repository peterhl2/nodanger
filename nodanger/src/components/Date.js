import React from "react"

function Date(props) {
    return (
        <div className="date">
            <input className="col-10"
                   name="startDate"
                   type="text"
                   placeholder="Earliest Crime Date"
                   value={this.props.startDate}
                   onChange={this.props.handleDateChange}
            />
            <input className="col-10"
                   name="endDate"
                   type="text"
                   placeholder="Latest Crime Date"
                   value={this.props.endDate}
                   onChange={this.props.handleDateChange}
            />
        </div>
    )
}

export default Date
