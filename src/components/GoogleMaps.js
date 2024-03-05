import React from "react";
import GoogleMapReact from 'google-map-react';
import Keys from "../utils/maps";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status) => {
    return <h1>{status}</h1>;
};

const GoogleMap = (props) => {
    const location = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 37.42216,
        lng: -122.08427,
    }


    return (
        <Wrapper apiKey={Keys.GOOGLE_API_KEY} render={render}>
            <Map />
        </Wrapper>
        //     <GoogleMapReact
        //     bootstrapURLKeys={{ key: Keys.GOOGLE_API_KEY }}
        //     defaultCenter={location}
        //     defaultZoom={10}
        //   >
        //     {/* <LocationPin
        //       lat={location.lat}
        //       lng={location.lng}
        //       text={location.address}
        //     /> */}
        //     </GoogleMapReact>
    )
}

const Map = () => {
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);
    return <div ref={ref} />
}

export default GoogleMap;