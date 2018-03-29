import React, { Component } from 'react';
import GoogleMaps from './GoogleMaps';
import { googleConfig } from '../../../config/app';

const { google } = window;
const geocoder = new google.maps.Geocoder;

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: {
        position: googleConfig.defaultCenter,
      },
      geolocation: {},
      currentLocation: {},
    };
    // Map
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapDragEnd = this.handleMapDragEnd.bind(this);
  }

  handleMapLoad(map) {
    this.map = map;
  }

  handleMapDragEnd(event) {
    geocoder.geocode({'location': event.latLng}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.setState({ currentLocation: results[0] });
        }
      }
    });
  }

  render() {
    return (
      <GoogleMaps
        containerElement={
          <div className="google-maps-container" />
        }
        mapElement={
          <div style={{ height: '100%' }} />
        }
        defaultZoom={googleConfig.defaultZoom}
        onMapLoad={this.handleMapLoad}
        onMapClick={this.handleMapClick}
        onMapDragEnd={this.handleMapDragEnd}
      />
    );
  }
}

export default Maps;
