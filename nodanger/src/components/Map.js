import React, { Component } from "react"
import GoogleMapReact from 'google-map-react'
import Start from "./markers/Start"
import Dest from "./markers/Dest"
import Crime from "./markers/Crime"

class Map extends Component {
    static defaultProps = {
        center: {
            lat: 40.1105883,
            lng: -88.2220708
        },
        zoom: 15
    }

    createStartDest(start, dest, key) {
        const startMkr = <Start key={key} lat={start.lat} lng={start.lng} text={'Start'} />
        const destMkr = <Dest key={key+1} lat={dest.lat} lng={dest.lng} text={'Dest'} />
        return [startMkr, destMkr]
    }

    createCrimeMkrs(crimes) {
        let crimeMkrs = []
        for (let i=0; i<crimes.length; i++) {
            crimeMkrs.push(<Crime
                                key={i+2}
                                lat={crimes[i].lat}
                                lng={crimes[i].lng}
                                text={'Crime!!!!!'}
                            />)
        }
        return crimeMkrs
    }

    render() {
        let startend = this.createStartDest(this.props.start, this.props.dest, 0)
        let crimes = this.createCrimeMkrs(this.props.crimes)

        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyC333_Ypsvtldad3Je6VglYXjB7OUf-a1Y" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                {startend}
                {crimes}
                </GoogleMapReact>
            </div>
        )
    }
}

export default Map
