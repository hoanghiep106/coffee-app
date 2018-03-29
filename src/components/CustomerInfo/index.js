import React from 'react';

const CustomerInfo = (props) => {
  const handleChange = (e) => {
    props.handleChange(e.target.name, e.target.value);
  };

  const renderErrorMessage = (message) => message && (
    <div>{`(*) ${message}`}</div>
  );

  return (
    <div className="customer-info-step">
      <div className="header">
        <div className="">
          <img src="assets/img/logo-grey.png"/>
        </div>
        <div className="text">
          <span>Who will have a good day?</span>
          <span className="small">(Step 1/4)</span>
        </div>
      </div>
      <div className="form">
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Name"
            name="customer_name"
            onChange={handleChange}
            value={props.orderInfo.customer_name}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Phone number"
            name="customer_phone"
            onChange={handleChange}
            value={props.orderInfo.customer_phone}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Email"
            name="customer_email"
            onChange={handleChange}
            value={props.orderInfo.customer_email}
          />
        </div>
      </div>
      <div className="errors">
        {renderErrorMessage(props.errors.customer_name)}
        {renderErrorMessage(props.errors.customer_phone)}
        {renderErrorMessage(props.errors.customer_email)}
      </div>
    </div>
  )
};

export default CustomerInfo;
