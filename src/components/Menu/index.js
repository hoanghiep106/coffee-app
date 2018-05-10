import React from 'react';
import Category from './Category';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    }
  }

  handleAddItem = (item) => {
    if (this.state.cart && this.state.cart.length > 0) {
      const existedIds = this.state.cart.map(item => item.id);
      if (!existedIds.includes(item.product_detail_id)) {
        this.setState({ cart: [...this.state.cart, { ...item, quantity: 1 }] });
      } else {
        this.setState({
          cart: this.state.cart.map(item => ({ ...item, quantity: item.quantity + 1 })),
        });
      }
    }
  }

  render() {
    const Categories = this.props.categories.map(category =>
      <Category
        key={category.id}
        title={category.name}
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
