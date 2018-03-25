import React from 'react';

const Menu = (props) => (
   <div className="fixed-header-panel items-step">
   <div className="header"><span className="title">Menu "nhà cà phê"</span><span className="small">(Bước 3/4)</span><i className="fa fa-angle-left"></i></div>
   <div className="content">
      <div className="collapsible">
         <div className="title">
            <div className="group-title">Món nổi bật</div>
         </div>
         <div></div>
      </div>
      <div className="collapsible">
         <div className="title">
            <div className="group-title">Cà Phê</div>
         </div>
         <div></div>
      </div>
      <div className="collapsible">
         <div className="title">
            <div className="group-title">Sô Cô La</div>
         </div>
         <div></div>
      </div>
      <div className="collapsible">
         <div className="title">
            <div className="group-title">Thức Uống Trái Cây</div>
         </div>
         <div></div>
      </div>
      <div className="collapsible">
         <div className="title">
            <div className="group-title">Trà Đặc Biệt</div>
         </div>
         <div></div>
      </div>
   </div>
</div>
)

export default Menu;
