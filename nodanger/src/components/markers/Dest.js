import React from "react"

import "./Marker.css"

function Dest(props) {
    return (
        <div lat={props.lat}
             lng={props.lng}>

             <span className="dest">
                {props.text}
             </span>
        </div>
    )
}

export default Dest
