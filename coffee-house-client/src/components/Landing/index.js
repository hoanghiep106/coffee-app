import React from 'react';

const Landing = props => (
  <div class="main clarfix">
    <div class="title">
      <h3>ĐẶT HÀNG VÀ GIAO TẬN NƠI TẠI</h3>
      <h2>THE COFFEE HOUSE DELIVERY</h2>
      <p>Đừng quên
        <span class="cam" id="login-href"> Đăng nhập </span> vào tài khoản
        <span class="cam"> The Coffee House Rewards</span> của bạn để tích điểm và nhận các ưu đãi nhé!</p>
    </div>
    <div class="content">
      <div class="content-left">
        <img class="tch" src="/assets/img/tch.jpg" alt="Giao hang tan noi" />
      </div>
      <div class="content-right">
        <ul style={{listStyleType: 'none'}}>
          <li class="first">Các bước đặt món</li>
          <li>
            <span class="icon">1</span> Điền thông tin nhận hàng (tên, số điện thoại, địa chỉ nhận hàng)</li>
          <li>
            <span class="icon">2</span> Chọn món yêu thích</li>
          <li>
            <span class="icon">3</span> Tối đa 30 phút
            <span class="cam">(*)</span> bạn sẽ có ngay món uống yêu thích!</li>
        </ul>
        <div class="notes cam">(*) Thời gian có thể khác nhau tùy thuộc vào vị trí và giao thông tại thời điểm đặt hàng</div>
        <div class="notes cam">Thời gian phục vụ : 7h-20h</div>
      </div>
    </div>
  </div>
);

export default Landing;
