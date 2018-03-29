import React from 'react';

const Item = (props) => {
  const Details = props.product_details.map(detail =>
    <div
      key={detail.id}
      className={`pointer size size-${detail.size === 0 ? 's': 'm'}`}
    >
      <div className="icon"><img src={`assets/img/cup/coffe-cup-${detail.size === 0 ? 's': 'm'}-a.png`} /></div>
      <div className="price">{detail.price}</div>
    </div>
  )
  return (
    <div className="product">
      <div className="show-off" style={{ backgroundImage: 'url(&quot;https://api.tch.vn/images/products/1421.jpg&quot;)'}}>
        <div className="name">{props.name}</div>
      </div>
      <div className={`selector selector-${props.product_details.length}`}>
        {Details}
      </div>
    </div>
  );
}

export default Item;
