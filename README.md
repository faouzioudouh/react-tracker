# ![React tracker Logo](http://pichoster.net/images/2018/01/07/32e65824cf5bdee238722112b9e95a10.png)

# react-tracker [![build status](https://img.shields.io/travis/reactjs/react-redux/master.svg?style=flat-square)](https://travis-ci.org/faouzioudouh/react-tracker) [![npm version](https://badge.fury.io/js/react-tracker.svg)](https://badge.fury.io/js/react-tracker)

## What?
- React specific tracking library, usable as a higher-order component
- Flexible-scalable solution for tracking
- Easy to use (Redux-like)
- Can be pluged with any Analytics platform agnostic lib (You can mainly do anything in the event listeners callback)

## Why providing Redux Middleware?
- Sometimes its better to track events based on the correspondent redux action!
- [Demo](https://github.com/faouzioudouh/react-tracker/blob/master/demo/src/components/FriendListItem.js#L48)

## Why not Middleware only?
- Not all the tracking events are necessarily redux actions!
- [Demo](https://github.com/faouzioudouh/react-tracker/blob/master/demo/src/components/FriendListItem.js#L54)

## Installation

```
$ npm install --save react-tracker
```
This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

## Documentation

* [Initialize the Tracker](#initialize-tracker)
* [Create your first event listener](https://redux-actions.js.org/docs/api/index.html)
* [Create your first event creator](https://redux-actions.js.org/docs/api/index.html)
* [Middleware](https://redux-actions.js.org/docs/middleware/index.html)
* [External Resources](https://redux-actions.js.org/docs/ExternalResources.html)
* Usage in React
  * [Contributors](https://redux-actions.js.org/docs/Contributors.html)
  * [Contributors](https://redux-actions.js.org/docs/Contributors.html)
  * [Contributors](https://redux-actions.js.org/docs/Contributors.html)

## Demo

To see the react-tracker in action please visit the link below.

[Link](https://faouzioudouh.github.io/react-tracker/)

## [Event listener](#event-listener)

#### [Listen on one event](#listen-on-one-event)
```js
/**
 * This is an event listner, a pure function with (event, eventsHistory) => tracking goes here.
 * It describes what to do with the just-fired event.
 * Listener with eventType specified it will be called when the given eventType is fired/dispatched
 */

// Listener-per-event example
function trackAddToCartClick(event = {}, eventsHistory) {
    // Call DataLayer or you tracking provider (E.g. Pixel, GTM..)
    dataLayer.push(...event.data);

    // If you want save this event in the events history, just return it
    // otherwise it will be ignored.
    return event
}

// Allow `trackAddToCartClick` to listen only on `ADD_TO_CART_BUTTON_CLICK` event!
trackAddToCartClick.eventType = 'ADD_TO_CART_BUTTON_CLICK';
```

#### Listen on all events
```js
/**
 * This is an event listner, a pure function with (event, eventsHistory) => tracking goes here.
 * It describes what to do with the just-fired event.
 * Listener with (*) eventType it will be called whenevent an event fired/dispatched
 * Think of it as `jQuery.on('*', callback)`
 * You can use `switch` statement to handle multiple events in one listener
 */

// Listener-per-event example
function trackCartEvents(event = {}, eventsHistory) {
    switch(event.type) {
      case 'ADD_TO_CART_BUTTON_CLICK':
        // Call DataLayer or you tracking provider (E.g. Pixel, GTM..)
        dataLayer.push(...event.data);
        break;
      
      default:
        // Silence
    }
}
```

## Initialize the Tracker!
Create a Tracker holding the tracked events History of your app.
Tracker API is `{ on, trackEvent, getHistory }`.

- You can pass your event listeners to the constructor like so:

```js
let tracker = new Tracker([trackAddToCartClick, trackCartEvents])
```

- Or you can listen-on-the-go like using `on()`:

```js
let tracker = new Tracker();

// Listen on `PRODUCT_CLICK`events.
tracker.on('PRODUCT_CLICK', (event, eventsHistory) =>
  console.log(event)
);

// Listen on all events
tracker.on('*', (event, eventsHistory) =>
  console.log(event)
);
```

## Time to dispatch events!

You can dispatch/fire events using `trackEvent` function:

- Fire `ADD_TO_CART_EVENT`
```js
tracker.trackEvent({ type: 'ADD_TO_CART_EVENT' })
```

- Fire `ADD_TO_CART_EVENT`
```js
tracker.trackEvent({ type: 'ADD_TO_CART_EVENT' })
```

- Fire `PRODUCT_CLICK`
```js
tracker.trackEvent({ type: 'PRODUCT_CLICK' })
```

## Usage with React

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

### Create Product List Component `components/ProductList.js`

```js
import Product from './Product'

const ProductList = ({ products, trackProductClick }) => (
  <ul>
    {products.map(product => (
      <Product key={product.id} {...product} onClick={() => trackProductClick(product.id, product.price)} />
    ))}
  </ul>
)

ProductList.propTypes = {
  // ...
  trackProductClick: PropTypes.func
}

export default ProductList
```

### Create Event Listener `.../tracking/listeners/cart.js`

```js
function trackProductClick(event = {}, eventsHistory) {
    dataLayer.push(...event);
    return event
}

// scope `trackProductClick` to listen only on `PRODUCT_CLICK` event!
trackProductClick.eventType = 'PRODUCT_CLICK';
```

### Event creator `.../tracking/events/cart.js`
Event creator (Something like Redux action) should return an object that describ the event (Type and data)!

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

### Create mapTrackingToProps
`mapTrackingToProps` should return an object which will be merged with the component Props.

```js
const mapTrackingToProps = trackEvent => {
  return {
    trackProductClick: (id, price) => {
      trackEvent(getProductClickEvent(id, price))
    }
  }
}
```

### Pass mapTrackingToProps to `withTracking` HOC
`withTracking` accepet the `mapTrackingToProps` and then return a function that accept a component
and return the Enhanced component!

Finally, we create the `ProductsList` by calling `withTracking()` and passing our `mapTrackingToProps`

```js
import { withTracking } from 'react-tracker'

const ProductsListWithTracking = withTracking(mapTrackingToProps)(ProductsList)

export default ProductsListWithTracking
```


### Let React meet our Tracker

All container components need access to the tracker so they can fire events.

We will use the `<TrackerProvider>` to [magically](https://facebook.github.io/react/docs/context.html) make the tracker available to all container components in the application without passing it explicitly.
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

## Use it as Redux middleware

```js
import { createStore, applyMiddleware } from 'redux';
import { trackingMiddleware, Tracker } from 'react-tracker'

const tracker = new Tracker();

const store =  createStore(
  reducers,
  {}, // initialState
  applyMiddleware(trackingMiddleware(tracker))
);

// That's All ;)

// The function [trackEvent] will be called whenever a redux action dispatched and it will call the matched Action With Event (Action.type === Event.eventType)
```


## Contribution

This project is in its early stages, I'd be very happy if you can help :)


## License

MIT
