import values from 'lodash/values';

import * as friendEvents from './friendEventsListener';

export default [
    ...values(friendEvents)
];