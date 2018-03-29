import React, { Component } from 'react';
import { googleConfig } from '../../config/app';
import Maps from './Maps';

class CustonmerLocation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locationName: '',
			locationLatLng: googleConfig.defaultCenter,
		};
		this.handleLocationMapChange = this.handleLocationMapChange.bind(this);
	}

	handleLocationMapChange() {

	} 

	render() {
		return (
			<div className="fixed-header-panel location-step">
				<div className="header">
					<span className="title">Where should we deliver to?</span>
					<span className="small">(Step 2/4)</span>
					<i className="fa fa-angle-left pointer" onClick={() => this.props.goBack()}></i>
				</div>
				<div className="content">
					<div className="form-panel">
						<div className="form">
							<div className="form-group">
								<input
									className="form-control"
									placeholder="Search your location"
									name="customer_location"/>
							</div>
						</div>
					</div>
					<Maps
						onLocationMapChange={this.handleLocationMapChange}
					/>
				</div>
			</div>
		);
	}
}

export default CustonmerLocation;
