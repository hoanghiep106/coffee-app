import React from 'react';
import Category from './Category';

const Menu = (props) => {
  console.log(props.categories)
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
        <span className="title">Picking all huh?</span>
        <span className="small">(Step 3/4)</span>
        <i className="fa fa-angle-left pointer" onClick={() => props.goBack()} />
      </div>
      <div className="content">
        {Categories}
      </div>
    </div>
  );
};

export default Menu;
