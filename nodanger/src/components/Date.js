import React from "react"

function Date(props) {
    return (
        <div className="date">
            <input className="col-10"
                   name="startDate"
                   type="text"
                   placeholder="Earliest Crime Date"
                   value={props.startDate}
                   onChange={props.handleDateChange}
            />
            <input className="col-10"
                   name="endDate"
                   type="text"
                   placeholder="Latest Crime Date"
                   value={props.endDate}
                   onChange={props.handleDateChange}
            />
        </div>
    )
}

export default Date
