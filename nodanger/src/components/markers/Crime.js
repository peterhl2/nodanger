import React from "react"

import "./Marker.css"

function Crime(props) {
    return (
        <div lat={props.lat}
             lng={props.lng}>

             <span className="crime">
                 {props.text}
             </span>
        </div>
    )
}

export default Crime
