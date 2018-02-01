import React, { Component } from 'react';
import styles from './GroceryStoreApp.css';
import { connect } from 'react-redux';

import { purchaseProduct, starProduct } from '../actions/ProductActions';
import { ProductList } from '../components';

class GroceryStoreApp extends Component {
  render () {
    const { productList } = this.props;

    const actions = {
      purchaseProduct: this.props.purchaseProduct,
      starProduct: this.props.starProduct
    };

    return (
      <div className={styles.groceryStoreApp}>
        <h1>Grocery store</h1>
        <ProductList products={productList} actions={actions} />
      </div>
    );
  }
}

const mapStateToProps = ({ productList }) => ({ productList });

export default connect(mapStateToProps, {
  purchaseProduct,
  starProduct
})(GroceryStoreApp);
