import {
    PURCHASE_PRODUCT,
    STAR_PRODUCT,
    PAGE_VIEW,
} from '../constants'

/**
 * get purchase event object!
 * @param {Number} friendId 
 */
export const purchaseEvent = productId => ({
    type: PURCHASE_PRODUCT,
    data: {
        productId  
    }
});

/**
 * get star product event object!
 * @param {Number} friendId 
 */
export const starProductEvent = productId => ({
    type: STAR_PRODUCT,
    data: {
        productId
    }
});

/**
 * get page view event object!
 * @param {Number} friendId 
 */
export const pageView = productsCount => ({
    type: PAGE_VIEW,
    data: {
        pageName: 'Home',
        productsCount,
    }
})