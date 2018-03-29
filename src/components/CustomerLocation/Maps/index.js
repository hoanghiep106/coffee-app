import React from 'react';
import GoogleMaps from './GoogleMaps';
import { googleConfig } from '../../../config/app';

const { google } = window;
const geocoder = new google.maps.Geocoder;

const Maps = (props) => {
  const handleMapDragEnd = (event) => {
    geocoder.geocode({'location': event.latLng}, (results, status) => {
      if (status === 'OK' && results[0]) {
        props.onLocationMapChange(results[0]);
      }
    });
  };
  const handleMapDrag = (event) => {
    props.handleMapDrag(event.latLng);
  }
  return (
    <GoogleMaps
      containerElement={
        <div className="google-maps-container" />
      }
      mapElement={
        <div style={{ height: '100%' }} />
      }
      center={props.center}
      defaultZoom={googleConfig.defaultZoom}
      onMapDragEnd={handleMapDragEnd}
      onMapDrag={handleMapDrag}
    />
  );
}

export default Maps;
