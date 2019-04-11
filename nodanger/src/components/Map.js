import React, { Component } from "react"
import GoogleMapReact from 'google-map-react'
import Crime from "./markers/Crime"
import Location from "./markers/Location"

const lengthDiff = 0.00318
const startLat = 40.116264
const startLng = -88.208665

class Map extends Component {
    static defaultProps = {
        center: {
            lat: 40.1105883,
            lng: -88.2220708
        },
        zoom: 15
    }

    constructor() {
        super()
        this.state = {
            pickStart: true,
            start: {},
            startIdx: 0,
            dest: {},
            destIdx: 0,
        }
        this.mapClick = this.mapClick.bind(this)
    }

    mapClick(key, childProps) {
        if (this.state.pickStart) {
            this.setState({pickStart: false, start: childProps, startIdx: key})
        } else {
            this.setState({pickStart: true, dest: childProps, destIdx: key})
        }
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

    createLocationMkrs() {
        let mkrs = []
        const numWidth = 11
        const numHeight = 12

        for (let i=0; i<numWidth; i++) {
            for (let j=0; j<numHeight; j++) {
                let key = j+i*numHeight
                mkrs.push(<Location
                                key={key}
                                idx={key}
                                lat={startLat - i*lengthDiff}
                                lng={startLng - j*lengthDiff}
                                text={""}
                                startIdx={this.state.startIdx}
                                destIdx={this.state.destIdx}
                            />)
            }
        }
        return mkrs
    }

    render() {
        let crimes = this.createCrimeMkrs(this.props.crimes)
        let locations = this.createLocationMkrs()

        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyC333_Ypsvtldad3Je6VglYXjB7OUf-a1Y" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    onChildClick={this.mapClick}
                >
                {crimes}
                {locations}
                </GoogleMapReact>
            </div>
        )
    }
}

export default Map
