import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { googleConfig } from '../../config/app';
import Maps from './Maps';

class CustonmerLocation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locationName: googleConfig.defaultAddress,
			locationLatLng: googleConfig.defaultCenter,
			locationSelected: true,
		};
		this.handleLocationMapChange = this.handleLocationMapChange.bind(this);

		this.handleBlurLocation = this.handleBlurLocation.bind(this);
		this.handleLocationBoxChange = this.handleLocationBoxChange.bind(this);
		this.handleLocationBoxSelect = this.handleLocationBoxSelect.bind(this);
	}

	handleLocationMapChange(location) {
		this.setState({
			locationName: location.formatted_address,
		});
	}

	handleLocationBoxChange(location) {
    this.setState({
			locationSelected: false,
			locationName: location,
		});
	}

	handleLocationBoxSelect(location) {
    this.setState({
			locationSelected: true,
			locationName: location,
		});
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({ locationLatLng: latLng });
      }).catch(error => console.log(error));
	}
	
	handleBlurLocation() {
    if (!this.state.locationSelected) {
      this.setState({ locationName: '' });
    }
  }

	render() {
		const inputProps = {
			value: this.state.locationName,
			onChange: this.handleLocationBoxChange,
			placeholder: 'Search your location',
			onBlur: this.handleBlurLocation,
		};
		const googlePlacesOptions = {
			componentRestrictions: {
				country: googleConfig.currentCountry,
			},
		};
		return (
			<div className="fixed-header-panel location-step">
				<div className="header">
					<span className="title">Where is where?</span>
					<span className="small">(Step 2/4)</span>
					<i className="fa fa-angle-left pointer" onClick={() => this.props.goBack()}></i>
				</div>
				<div className="content">
					<div className="form-panel">
						<div className="form">
							<div className="form-group">
								<PlacesAutocomplete
									className="form-control"
									inputProps={inputProps}
									options={googlePlacesOptions}
									onSelect={this.handleLocationBoxSelect}
									clearItemsOnError
									debounce={300}
            		/>
							</div>
						</div>
					</div>
					<Maps
						onLocationMapChange={this.handleLocationMapChange}
						center={this.state.locationLatLng}
					/>
				</div>
			</div>
		);
	}
}

export default CustonmerLocation;
