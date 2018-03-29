import React from 'react';

const Cart = (props) => (
    <div className="fixed-header-panel summary-step">
        <div className="header">
            <span className="title">Only These? Really?</span>
            <span className="small">(Step 4/4)</span>
            <i className="fa fa-angle-left pointer" onClick={() => props.goBack()}></i>
        </div>
        <div className="content">
        <div className="header-separator"></div>
        <div className="bill-items">
            <div className="bill-item">
                <div className="product-name">1. Affogato đá xay cà phê</div>
                <div className="sizes">
                    <div className="size">
                    <div className="name-price">Small(59000)</div>
                    <div className="qty">
                        <i className="fa fa-minus-square icon-minus-order"></i>
                        <div className="center">x 1</div>
                        <i className="fa fa-plus-square icon-plus-order"></i>
                    </div>
                    <div className="total">59000</div>
                    </div>
                </div>
            </div>
            <hr/>
            Nhập mã coupon
            <hr/>
            Thành tiền:59000
        </div>
        <div className="">Pham Hoang Anh - 0986999666</div>
        <div className="">Phuc Xa, HN</div>
        </div>
    </div>
)

export default Cart;
