import React from 'react';

const CustonmerLocation = (props) => (
    <div className="fixed-header-panel location-step">
        <div className="header"><span className="title">Địa điểm giao hàng</span>
        <span className="small">(Bước 2/4)</span><i className="fa fa-angle-left"></i></div>
        <div className="content">
            <div className="form-panel">
                <div className="form">
                    <div className="form-group"><input className="form-control" value="Chung cư cao cấp Ecolife Captiol, Tố Hữu, Trung Văn"/></div>
                    <div className="dual-panel">
                    <div className="form-group"><input className="form-control" value="Từ Liêm"/></div>
                    <div className="form-group"><input className="form-control" value="Hà Nội"/></div>
                    </div>
                </div>
            </div>
            <div className="mock-map"></div>
        </div>
    </div>
)

export default CustonmerLocation;
