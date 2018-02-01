import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// tracking
import { withTracking } from 'react-tracker';
import { purchaseEvent } from '../tracking/events/productEvents';

import styles from './Product.css';

const Product = ({
  id,
  name,
  price,
  starred,
  purchase,
  starProduct,
  purchaseProduct,
  trackPurchaseProduct,  
}) => {

    return (
      <li className={styles.Product}>
        <div className={styles.productInfos}>
          <div>
            <span className="Product__name">
              {name}
            </span>
          </div>
          <div>
            <span className="Friend__price">
              {price} $
            </span>
          </div>
        </div>
        <div className={styles.productActions}>
          <button title="Star this product" className={`btn btn-default ${styles.btnAction}`}
                  onClick={() => starProduct(id)}>
            <i className={classnames('fa', {
              'fa-star': starred,
              'fa-star-o': !starred
            })} />
          </button>
          <button title="Purchase this product" className={`btn btn-default ${styles.btnAction}`}
                  onClick={() => {
                    // In additional to dispatch redux action to add product to cart with given id
                    // And since we configured our middleware will also
                    // fire the event listener with eventType 'PURCHASE_PRODUCT'
                    // Redux action object will be passed to the event listener as first argument
                    purchaseProduct(id);

                    // Imagine that purchase product is not a redux action
                    // so you need to track this manually!
                    trackPurchaseProduct(id);

                    // So this event will be tracked twice !!
                    } }>
            <i className="fa fa-plus" />
          </button>
        </div>
      </li>
    );
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  starred: PropTypes.bool,
  starProduct: PropTypes.func.isRequired
};

const mapTrackingToProps = trackEvent => ({
  trackPurchaseProduct: (id, name, price) =>
    trackEvent(purchaseEvent(id, name, price))
});

const ProductWithTracking = withTracking(mapTrackingToProps)(Product)

export default ProductWithTracking;
