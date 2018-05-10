import React from 'react';
import Category from './Category';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.categories,
    };
    this.orderItems = [];
  }

  handleAddItem = (item) => {
    const categories = [...this.state.categories];
    if (categories[item.categoryIndex].products[item.productIndex].product_details[item.index].quantity) {
      categories[item.categoryIndex].products[item.productIndex].product_details[item.index].quantity ++;
    } else {
      categories[item.categoryIndex].products[item.productIndex].product_details[item.index].quantity = 1;
    }
    if (this.orderItems.filter(orderItem => orderItem.product_detail_id === item.productDetailId).length !== 0) {
      this.orderItems.forEach(orderItem => {
        if (orderItem.product_detail_id === item.productDetailId) {
          orderItem.quantity = categories[item.categoryIndex].products[item.productIndex].product_details[item.index].quantity;
        }
      });
    } else {
      this.orderItems.push({
        product_detail_id: item.productDetailId,
        product_id: item.productId,
        quantity: categories[item.categoryIndex].products[item.productIndex].product_details[item.index].quantity,
      });
    }
    this.props.handleChange('order_items', this.orderItems);
    this.setState({ categories });
  }

  render() {
    const Categories = this.state.categories.map((category, index) =>
      <Category
        key={category.id}
        category={{ ...category, index }}
        items={category.products}
        onAddItem={this.handleAddItem}
      />
    );
    return(
      <div className="fixed-header-panel items-step">
        <div className="header">
          <span className="title">Picking all huh?</span>
          <span className="small">(Step 3/4)</span>
          <i className="fa fa-angle-left pointer" onClick={() => this.props.goBack()} />
        </div>
        <div className="content">
          {Categories}
        </div>
      </div>
    );
  }
}

export default Menu;
