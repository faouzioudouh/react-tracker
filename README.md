# ![React tracker Logo](http://pichoster.net/images/2018/01/07/32e65824cf5bdee238722112b9e95a10.png)

# react-tracker [![build status](https://img.shields.io/travis/reactjs/react-redux/master.svg?style=flat-square)](https://travis-ci.org/faouzioudouh/react-tracker) [![npm version](https://badge.fury.io/js/react-tracker.svg)](https://badge.fury.io/js/react-tracker)

## What?
- React specific tracking library, usable as a higher-order component
- Flexible-scalable solution for tracking in React Apps
- Easy to use (Redux-like)
- Can be pluged with any Analytics platform agnostic lib (You can mainly do anything in the event listeners callback)

## Why not redux middleware?
- Tracking is not a __state__
- Not the all the tracking events are redux actions!
- Redux should only take care of your UI state!

## Installation

```
$ npm install --save react-tracker
```
This assumes you are using [npm](https://www.npmjs.com/) as your package manager.  

## Demo

To see the react-tracker in action please visit the link below.

[Link](https://faouzioudouh.github.io/react-tracker/)

## Running demo in this repository

```
$ git clone https://github.com/faouzioudouh/react-tracker.git

$ cd demo

$ npm install

$ npm run start
```

## The Gist

The idea is to only provide one Tracker!
Why? because at some point you'll need to apply some restriction on some events E.g. :
 - Track product click only once!
 - Track product click only if page views is already tracked
in these case we need to have the tracking history.. that's why we keep the history synced by providing the **same instance of tracker to all components**

```js
import { Tracker } from 'react-tracker';

/**
 * This is an event listner, a pure function with (event, eventsHistory) => tracking goes here.
 * It describes what to do with the just-fired event.
 *
 * There is two types of event listeners
 * 1- Listener with eventType specified it will be called when the given eventType is fired/dispatched
 * 2- Listener with no eventType it will be called whenevent an event fired/dispatched
 * Think of the last type of listeners as `jQuery.on('*', callback)`
 * You can use `switch` statement to handle multiple events in one listener
 */

// Listener-per-event example
function trackAddToCartClick(event = {}, eventsHistory) {
    // Call DataLayer or you tracking provider...
    // Source: https://developers.google.com/tag-manager/enhanced-ecommerce
      dataLayer.push({
        'event': 'addToCart',
        'ecommerce': {
          'addToCart': {
            'product': [{
              'id': event.data.id,
              'name': event.data.name,
              'price': event.data.price,
              'currency': event.data.currency
            }]
          }
        }
      });
    }

    // Or call FB pixle
    fbq('track', 'Purchase', {'price': event.data.price ,'currency': event.data.currency});

    // If you want save this event, just return it, otherwise it will be ignored.
    return event
  }
}

// Allow `trackAddToCartClick` to listen only on `ADD_TO_CART_BUTTON_CLICK` event!
trackAddToCartClick.eventType = 'ADD_TO_CART_BUTTON_CLICK';

// Create a Tracker holding the tracked events History of your app.
// Its API is { on, trackEvent, getHistory }.
let tracker = new Tracker([trackAddToCartClick, trackCartEvents])

// In additional to to intialize the tracker with event listeners.
// You can add a an event listener using `on()`

// Listen on `PRODUCT_CLICK`events.
tracker.on('PRODUCT_CLICK', (event, eventsHistory) =>
  console.log(event)
);

// Listen on all events
tracker.on('*', (event, eventsHistory) =>
  console.log(event)
);


// And then you can fire an events using `trackEvent` function :

// Fire `ADD_TO_CART_EVENT`
tracker.trackEvent({ type: 'ADD_TO_CART_EVENT' })

// Fire `ADD_TO_CART_EVENT`
tracker.trackEvent({ type: 'ADD_TO_CART_EVENT' })

// Fire `PRODUCT_CLICK`
tracker.trackEvent({ type: 'PRODUCT_CLICK' })
```

## Usage with React

#### `components/Product.js`

```js
import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ onClick, title, price, currency }) => (
  <li
    onClick={onClick}
  >
    {title}
    <span> {price} {currency} </span>
  </li>
)

Product.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.bool.isRequired,
  price: PropTypes.string.isRequired
  currency: PropTypes.string.isRequired
}

export default Product
```

#### `components/ProductList.js`

```js
import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

const ProductList = ({ products, trackProductClick }) => (
  <ul>
    {products.map(product => (
      <Product key={product.id} {...product} onClick={() => trackProductClick(product.id, product.price)} />
    ))}
  </ul>
)

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  trackProductClick: PropTypes.func.isRequired
}

export default ProductList
```

### Implementing Container Components

Now it's tracking time..
To use `withTracking()`, you need to define a special function (react-redux-like) called `mapTrackingToProps` that tells how to pass the trackEvent function to the props.
For example, we need to track product click with Product ID and price, so we need to fire the event on the procut click!

#### `.../tracking/listeners/cart.js`

```js
function trackProductClick(event = {}, eventsHistory) {
  if (event.type) {
      // Call GTM or you tracking provider...

    // If you want save this event, just return it, otherwise it will be ignored.
    return event
  }
}

// scope `trackProductClick` to listen only on `PRODUCT_CLICK` event!
trackProductClick.eventType = 'PRODUCT_CLICK';
```

#### `.../tracking/events/cart.js`

```js
function getProductClickEvent(id, price) {
  return {
      type: 'PRODUCT_CLICK',
      data: {
          id: id,
          price: price
      }
  }
};
```

```js
const mapTrackingToProps = trackEvent => {
  return {
    trackProductClick: (id, price) => {
      trackEvent(getProductClickEvent(id, price))
    }
  }
}
```
Finally, we create the `ProductsList` by calling `withTracking()` and passing our `mapTrackingToProps`:

```js
import { withTracking } from 'react-tracker'

const ProductsListWithTracking = withTracking(mapTrackingToProps)(ProductsList)

export default ProductsListWithTracking
```


## Let React meet our Tracker

All container components need access to the tracker so they can fire events.

We will use the `<Provider>` to [magically](https://facebook.github.io/react/docs/context.html) make the tracker available to all container components in the application without passing it explicitly.
You only need to use it once when you render the root component:

#### `index.js`

```js
import React from 'react'
import { render } from 'react-dom'
import { TrackerProvider, Tracker } from 'react-tracker'
import { trackProductClick } from './tracking/listeners/cart'
import ProductsList from './components/ProductsList'

let tracker = new Tracker([trackProductClick /*, other event listeners goes here*/])

render(
  <TrackerProvider tracker={tracker}>
    <ProductsList products={someProducts} />
  </TrackerProvider>,
  document.getElementById('root')
)
```

## Contribution

This project is in its early stages, I'd be very happy if you can help :)


## License

MIT
