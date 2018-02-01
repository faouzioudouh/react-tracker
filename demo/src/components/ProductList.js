import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ProductList.css';
import Product from './Product';

// tracking
import { withTracking } from 'react-tracker';
import { pageView } from '../tracking/events/productEvents';

class ProductList extends Component {

  componentDidMount() {
    // Let's track pageView on component mount
    this.props.trackPageView(this.props.products.length);
  }

  render () {
    return (
      <div className="ProductList__wrapper">
        <ul className={styles.productList}>
          {
            this.props.products.map(({id, name, price, starred}, index) => {
              return (
                <Product
                  key={id}
                  id={id}
                  name={name}
                  price={price}
                  starred={starred}
                  {...this.props.actions} />
              );
            })
          }
        </ul>
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapTrackingToProps = trackEvent => ({
  trackPageView: productsCount => trackEvent(pageView(productsCount))
});

const ProductListWithTracking = withTracking(mapTrackingToProps)(ProductList)

export default ProductListWithTracking;
