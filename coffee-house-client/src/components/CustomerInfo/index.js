import React from 'react';
import './index.css'

class CustomerInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {
        deliver_now: true
      },

    }
  }
  render() {
    const { customer } = this.state;
    return (
      <div className="customer-info-step">
        <div className="header">
          <div className="">
            <img src="assets/img/logo_tch_black.png"/>
          </div>

          <div className="text">
            <span>Thông tin người nhận </span>
            <span className="small">(Bước 1/4)</span>
          </div>

        </div>

        <div className="form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Tên"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Số điện thoại"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label className="delivery-time-radio"
              
            >
              <img
                src={customer.deliver_now ? `assets/img/option_active.png` : `assets/img/option_inactive.png`} className="option-radio"
              />
              Giao hàng ngay
            </label>
            <label className="delivery-time-radio"
              
            >
              <img
                src={!customer.deliver_now ? `assets/img/option_active.png` : `assets/img/option_inactive.png`} className="option-radio"
              />
              Chọn thời gian
            </label>
          </div>
        </div>
      </div>
    )
  }
}

export default CustomerInfo;