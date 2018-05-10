import React from 'react';
import GoogleMaps from './GoogleMaps';
import { googleConfig } from '../../../config/app';
import ShopService from '../../../services/Shop';

const { google } = window;
const geocoder = new google.maps.Geocoder();

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
    };
  }

  componentDidMount() {
    ShopService.getShops().then((res) => {
      if (res.data.shops) {
        this.setState({
          shops: res.data.shops,
        });
      }
    });
  }

  handleMapClick = (event) => {
    geocoder.geocode({'location': event.latLng}, (results, status) => {
      if (status === 'OK' && results[0]) {
        this.props.onLocationMapChange(results[0]);
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
        center={this.props.center}
        defaultZoom={googleConfig.defaultZoom}
        onMapClick={this.handleMapClick}
        markers={this.state.shops}
      />
    );
  }
}

export default Maps;
