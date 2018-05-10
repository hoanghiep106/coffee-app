import React from 'react';

const Item = (props) => {
  const Details = props.product_details.map((detail) => {
    const item = {
      product_id: props.id,
      size: detail.size,
      price: detail.price,
      product_detail_id: detail.id,
    };
    return (
      <div
        key={detail.id}
        className={`pointer size size-${item.size === 0 ? 's': 'm'}`}
        onClick={() => props.onAddItem(item)}
      >
        <div className="icon"><img src={`assets/img/cup/coffe-cup-${detail.item === 1 ? 's': 'm'}-a.png`} alt="cup"/></div>
        <div className="price">{item.price}</div>
      </div>
    );
  });
  return (
    <div className="product">
      <div className="show-off" style={{ backgroundImage: `url(${props.image_url})`}}>
        <div className="name">{props.name}</div>
      </div>
      <div className={`selector selector-${props.product_details.length}`}>
        {Details}
      </div>
    </div>
  );
}

export default Item;
