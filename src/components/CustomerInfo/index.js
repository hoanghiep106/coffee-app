import React from 'react';

const CustomerInfo = (props) => {
  const handleChange = (e) => {
    props.handleChange(e.target.name, e.target.value);
  };

  return (
    <div className="customer-info-step">
      <div className="header">
        <div className="">
          <img src="assets/img/logo_tch_black.png"/>
        </div>
        <div className="text">
          <span>Thông tin người nhận</span>
          <span className="small">(Bước 1/4)</span>
        </div>
      </div>
      <div className="form">
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Tên"
            name="customer_name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Số điện thoại"
            name="customer_phone"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Email"
            name="customer_email"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
};

export default CustomerInfo;
