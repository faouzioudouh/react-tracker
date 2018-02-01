import values from 'lodash/values';

import * as productEventsListener from './productEventsListener';

export default [
    ...values(productEventsListener)
];