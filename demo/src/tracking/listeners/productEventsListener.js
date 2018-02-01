import {
    PURCHASE_PRODUCT,
    STAR_PRODUCT,
    PAGE_VIEW,
} from '../constants'

/**
 * Listener on purchase event
 * @param {Object} event 
 * @param {Array} eventsHistory 
 */
export const onPurchase = (event = {}, eventsHistory) => {
    // For example let's push the recieved event to our Datalyer!
    window.dataLayer.push(event)

    // In order to save this event in the history (so we can log it) we should return it!
    // otherwise it will be ignored!
    return event;
}
onPurchase.eventType = PURCHASE_PRODUCT;

/**
 * Listener on star product event
 * @param {Object} event 
 * @param {Array} eventsHistory 
 */
export const onStarProduct = (event = {}, eventsHistory) => {
    // For example let's push the recieved event to our Datalyer!
    window.dataLayer.push(event)
    
    // In order to save this event in the history (so we can log it) we should return it!
    // otherwise it will be ignored!
    return event;
}
onStarProduct.eventType = STAR_PRODUCT;

/**
 * Listener on page view
 * @param {Object} event 
 * @param {Array} eventsHistory 
 */
export const onPageView = (event = {}, eventsHistory) => {
    // For example let's push the recieved event to our Datalyer!
    window.dataLayer.push(event)
    
    // In order to save this event in the history (so we can log it) we should return it!
    // otherwise it will be ignored!
    return event;
}
onPageView.eventType = PAGE_VIEW;
