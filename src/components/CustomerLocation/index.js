import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { googleConfig, maxShippingFee } from '../../config/app';
import OrderService from '../../services/Order';
import { numberWithCommas } from '../../utils';
import Maps from './Maps';

class CustonmerLocation extends Component {
	constructor(props) {
		super(props);
		const { orderInfo } = props;
		this.state = {
			locationName: orderInfo.customer_location ? (orderInfo.customer_location.title || '') : '',
			locationLatLng: orderInfo.customer_location
			&& orderInfo.customer_location.lat && orderInfo.customer_location.lng && {
				lat: orderInfo.customer_location.lat,
				lng: orderInfo.customer_location.lng,
			},
			distance: {},
			errors: props.errors,
			locationSelected: true,
			isSelecting: false,
		};
		this.handleLocationMapChange = this.handleLocationMapChange.bind(this);

		this.handleBlurLocation = this.handleBlurLocation.bind(this);
		this.handleLocationBoxChange = this.handleLocationBoxChange.bind(this);
		this.handleLocationBoxSelect = this.handleLocationBoxSelect.bind(this);

		this.clearInput = this.clearInput.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.errors !== this.props.errors) {
			this.setState({ errors: this.props.errors });
		}
	} 

	handleLocationMapChange(location) {
		this.setState({
			locationName: location.formatted_address,
			locationLatLng: location.geometry.location,
		});
		const lat = location.geometry.location.lat();
		const lng = location.geometry.location.lng();
		OrderService.getShippingFee(lat, lng).then((res) => {
			if (res.data.distances) {
				const { distances } = res.data;
				const distance = distances.sort((a, b) => a.distance > b.distance)[0];
				const values = {
					title: location.formatted_address,
					lat,
					lng,
					shop_id: distance.shop_id,
					fee: distance.fee,
				};
				this.setParentValues(values);
				this.setState({ distance });
			}
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
		this.setState({ isSelecting: true });
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
				this.setState({ locationLatLng: latLng });
				OrderService.getShippingFee(latLng.lat, latLng.lng).then((res) => {
					if (res.data.distances) {
						const { distances } = res.data;
						const distance = distances.sort((a, b) => a.distance > b.distance)[0];
						const values = {
							title: location,
							lat: latLng.lat,
							lng: latLng.lng,
							shop_id: distance.shop_id,
							fee: distance.fee,
						};
						this.setParentValues(values);
						this.setState({ distance });
					}
					this.setState({ isSelecting: false });
				}).catch(() => this.setState({ isSelecting: false }));
      }).catch(() => this.setState({ isSelecting: false }));
	}
	
	handleBlurLocation() {
    if (!this.state.locationSelected) {
      this.clearInput();
    }
	}
	
	clearInput() {
		this.setState({
			locationName: '',
			locationLatLng: null,
			distance: {},
		});
		this.setParentValues({});
	}

	setParentValues(values) {
		this.props.handleChange('customer_location', values);
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
								<span className="select-clear-zone py-2" onClick={this.clearInput}>
									<span className="select-clear">×</span>
								</span>
								{this.state.errors.customer_location ?
									<div className="red padding text-small">(*) {this.state.errors.customer_location}</div>
								:
									<div className="grey padding text-small">Click on map or put in your location in the box above</div>
								}
							</div>
						</div>
					</div>
					<Maps
						onLocationMapChange={this.state.isSelecting ? () => {} : this.handleLocationMapChange}
						center={this.state.locationLatLng}
					/>
					{this.state.distance && this.state.distance.fee !== null && this.state.distance.fee !== undefined &&
						(this.state.distance.fee < maxShippingFee ?
							<div className="ship-info grey">
								<span>
									Nearest shop distance: <span className="green">{(this.state.distance.distance / 1000).toFixed(1)} km</span>
								</span><br />
								<span>
									Shipping fee: <span className="green">{numberWithCommas(this.state.distance.fee)} VNĐ</span>
								</span>
							</div>
							:
							<div className="ship-info red">
								<span>Sorry! There's no shops around your place.</span>
							</div>
						)
					}
				</div>
			</div>
		);
	}
}

export default CustonmerLocation;
