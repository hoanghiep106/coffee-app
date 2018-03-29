import React from 'react';
import Category from './Category';

const Menu = (props) => {
  const Categories = props.categories.map(category =>
    <Category
      key={category.id}
      title={category.name}
      items={category.products}
    />
  );
  return(
    <div className="fixed-header-panel items-step">
      <div className="header">
        <span className="title">Menu "nhà cà phê"</span>
        <span className="small">(Bước 3/4)</span>
        <i className="fa fa-angle-left" onClick={() => props.goBack()} />
      </div>
      <div className="content">
        {Categories}
      </div>
    </div>
  );
};

export default Menu;
