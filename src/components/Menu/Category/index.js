import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Item from './Item';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.toggleItems = this.toggleItems.bind(this);
  }

  toggleItems() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const Items = this.props.items.map((item, index) =>
      <Item
        key={item.id}
        productIndex={index}
        categoryIndex={this.props.category.index}
        { ...item }
        onAddItem={this.props.onAddItem}
      />
    );
    return (
      <div className="collapsible">
        <div className="title pointer" onClick={this.toggleItems} >
          <div className="group-title">{this.props.category.name}</div>
        </div>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="collapse"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
        {this.state.expanded &&
          <div className="children">
            <div className="products">
              {Items}
            </div>
          </div>
        }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
};

export default Category;
