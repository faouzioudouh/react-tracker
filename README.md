# ![React tracker Logo](http://pichoster.net/images/2018/01/07/32e65824cf5bdee238722112b9e95a10.png)

# react-tracker [![build status](https://img.shields.io/travis/reactjs/react-redux/master.svg?style=flat-square)](https://travis-ci.org/faouzioudouh/react-tracker) [![npm version](https://badge.fury.io/js/react-tracker.svg)](https://badge.fury.io/js/react-tracker) [![codecov](https://codecov.io/gh/faouzioudouh/react-tracker/branch/master/graph/badge.svg)](https://codecov.io/gh/faouzioudouh/react-tracker)

_Track user interaction with minimal API_

## What?
- React specific tracking library, usable as a higher-order component
- Flexible-scalable solution for tracking
- Can be pluged with any Analytics platform :
  - Google Tag Manager
  - Facebook Pixel
  - You can mainly do anything in the event listeners callback..
- Easy to use (Redux-like)

## Installation
```
$ npm install --save react-tracker
```
This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

## Demo
To see the react-tracker in action please visit the link below.

[Link](https://faouzioudouh.github.io/react-tracker/)

## Documentation

* [Initialize the Tracker](#initialize-the-tracker)
* [Create event listener](#create-event-istener)
  * [Listen on one event](#listen-on-one-event)
  * [Listen on all events](#listen-on-all-events)
* [Create event creator](#create-event-creator)
* [Track Events](#track-events)
* [Usage in React](#usage-with-react)
  * [Provide Tracker to the root component](#provide-tracker-to-the-root-component)
  * [Create Add to Cart Event Listener](#create-add-to-cart-event-listener)
  * [Add to Cart Event creator](#add-to-cart-event-creator)
  * [Create Product Component](#create-product-component)
  * [Create Product List Component](#create-products-list-component)
  * [Create mapTrackingToProps function and pass it to withTracking HOC](#create-mapTrackingToProps-function-and-pass-it-to-withTracking-hoc)
* [Create Redux middleware to track redux actions](#create-redux-middleware-for-redux-based-apps)

## Initialize the Tracker
Create a Tracker holding the tracked events History of your app.

Tracker API is `{ on, trackEvent, getHistory }`.

- You can pass your already defined event listeners to the constructor like so:

```js
const tracker = new Tracker([trackAddToCart])
```

- Or you can listen-on-the-go using `on()`:

```js
const tracker = new Tracker();

// Listen on `PRODUCT_CLICK`event.
tracker.on('PRODUCT_CLICK', (event, eventsHistory) =>
  console.log(event)
);

// Listen on all events
tracker.on('*', (event, eventsHistory) =>
  console.log(event)
);
```

## Create Event listener
Event listner is a pure function with `(event, eventsHistory) => tracking goes here`.

It describes what to do with the just-fired event.

Why providing the eventsHistory as second parameter ?

=> because in some cases you'll need to apply some restrictions on some events E.g:
 - Track product click only once!
 - Track product click only if pageView is already tracked
 - etc

### Listen on one event
```js
/**
 * Listener with eventType specified it will be called when the given eventType is dispatched
 */
function trackAddToCart(event, eventsHistory) {
    // Call DataLayer or your tracking provider (E.g. Pixel, GTM..)
    window.dataLayer.push(...event.data);

    // If you want save this event in the events history, just return it
    // otherwise it will be ignored.
    return event
}

// Allow `trackAddToCart` to listen only on `ADD_TO_CART` event
trackAddToCart.eventType = 'ADD_TO_CART';
```

### Listen on all events
```js
/**
 * Since no eventType was specified it will be called whenever an event dispatched
 * You can use `switch` statement to handle multiple events in one listener
 */
function trackCartEvents(event, eventsHistory) {
    switch(event.type) {
      case 'ADD_TO_CART':
        // Call DataLayer or your tracking provider (E.g. Pixel, GTM..)
        window.dataLayer.push(...event);
        break;

      default:
        // Silence
    }
}
```

## Track Events
`trackEvent` is a function that accept an object describes the event as argument.

- Track event `ADD_TO_CART_EVENT` with data.
```js
tracker.trackEvent({
  type: 'ADD_TO_CART_EVENT',
  data: {
    productId: '12345',
    quantity: 5
  }
})
```

- Track event `PRODUCT_CLICK` with no associated data.
```js
tracker.trackEvent({ type: 'PRODUCT_CLICK' })
```

## Usage with React
### Provide tracker to the root component

All container components need access to the tracker so they can track events.

We will use the `<TrackerProvider>` to [magically](https://facebook.github.io/react/docs/context.html) make the tracker available to all container components in the application without passing it explicitly.

You only need to use it once when you render the root component:

#### `index.js`

```js
import React from 'react'
import { render } from 'react-dom'
import { TrackerProvider, Tracker } from 'react-tracker'
import { trackProductClick } from './tracking/listeners/cart'
import ProductsList from './components/ProductsList'

const tracker = new Tracker([trackProductClick])

render(
  <TrackerProvider tracker={tracker}>
    <ProductsList products={someProducts} />
  </TrackerProvider>,
  document.getElementById('root')
)
```

### Create Add to Cart Event Listener `.../tracking/listeners/cart.js`

```js
function trackAddToCart(event, eventsHistory) {
    window.dataLayer.push(...event);
    return event
}

// Allow `trackAddToCart` to listen only on `ADD_TO_CART` event
trackAddToCart.eventType = 'ADD_TO_CART';

export default trackAddToCart;
```

### Add To Cart Event creator `.../tracking/events/cart.js`
Event creator should return an object that describe the event (Type and data).

- type: string (Required)
- data: Any (Optional)

```js
function getAddToCartEvent(id, price) {
  return {
      type: 'ADD_TO_CART',
      data: {
          id: id,
          price: price
      }
  }
};
```

### Create Product Component `components/Product.js`

```js
import React from 'react'

const Product = ({ onClick, title, price, currency }) => (
  <li
    onClick={onClick}
  >
    {title}
    <span> {price} {currency} </span>
  </li>
)

export default Product
```

### Create Products List Component `components/ProductList.js`

```js
import Product from './Product'

const ProductList = ({ products, trackAddToCart }) => (
  <ul>
    {products.map(product => (
      <Product key={product.id} {...product} onClick={() => trackAddToCart(product.id, product.price)} />
    ))}
  </ul>
)

ProductList.propTypes = {
  // ...
  trackAddToCart: PropTypes.func
}

export default ProductList
```

### Create mapTrackingToProps function and pass it to withTracking HOC `.../compoenets/ProductListContainer.js`

`mapTrackingToProps` should return an object which will be merged with the component Props.

```js
import React from 'react';
import { withTracking } from 'react-tracker';
import { getAddToCartEvent } from '.../tracking/events/cart';
import ProductsList from './ProductsList';

const mapTrackingToProps = trackEvent => {
  return {
    trackAddToCart: (id, price) => {
      trackEvent(getAddToCartEvent(id, price))
    }
  }
}

// Finally, we create the `ProductsList` by calling `withTracking()` and passing our `mapTrackingToProps`
const ProductsListWithTracking = withTracking(mapTrackingToProps)(ProductsList)

export default ProductsListWithTracking
```

## Create redux middleware for redux-based apps
If your app is using redux for state managment, you might want to track redux actions directly.

Let's create our [Redux middleware](https://redux.js.org/docs/advanced/Middleware.html) to take the tracker as argument and call trackEvent on every redux action dispatched.

```js
/**
 * Simple redux middleware to use redux actions as input of tracking!
 * this will call the track function from the provided instance of tracker on every action
 * and use the action type as the event type and the action payload as the event data
 * @param {Object} tracker 
 */
const trackingMiddleware = tracker => () => next => action => {
    tracker.trackEvent(action);
    next(action);
};

export default trackingMiddleware;
```

```js
import { createStore, applyMiddleware } from 'redux';
import { Tracker } from 'react-redux';
import { trackingMiddleware, Tracker } from '../trackingMiddleware'

const tracker = new Tracker();

const store =  createStore(
  reducers,
  {}, // initialState
  applyMiddleware(trackingMiddleware(tracker))
);

// That's All ;)
```

## Contribution

This project is in its early stages, I'd be very happy if you can help :)


## License

MIT
