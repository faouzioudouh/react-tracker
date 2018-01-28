import { Tracker } from 'react-tracker'
import trackingListeners from './listeners';

const configureStore = () => new Tracker(trackingListeners);

export default configureStore();
