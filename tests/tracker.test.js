/* global jest expect */

import { Tracker } from '../src';

describe('Tracker', () => {
  describe('trackEvent()', () => {
    const subscriber = jest.fn(event => event);
    subscriber.eventType = 'EVENT_TEST';

    const subscribers = [subscriber];
    const tracker = new Tracker(subscribers);

    beforeEach(() => {
      subscriber.mockClear();
    });

    it('should tracker have three public functions trackEvent and subscribe and on', () => {
      expect(typeof tracker.trackEvent).toBe('function');
      expect(typeof tracker.on).toBe('function');
      expect(typeof tracker.on).toBe('function');
    });

    it('should call all the subscribers on event dispatch', () => {
      tracker.trackEvent({
        type: 'EVENT_TEST',
        data: 'hello',
      });

      expect(subscriber).toHaveBeenCalledWith({
        type: 'EVENT_TEST',
        data: 'hello',
      }, []);
    });

    it('should call all the subscribers on event dispatch with history', () => {
      tracker.trackEvent({
        type: 'EVENT_TEST',
        data: 'an other hello',
      });

      expect(subscriber).toHaveBeenCalledWith({
        type: 'EVENT_TEST',
        data: 'an other hello',
      }, [{
        type: 'EVENT_TEST',
        data: 'hello',
      }]);
    });

    it('should save the event if the subscriber returned it', () => {
      const newTracker = new Tracker(subscribers);

      newTracker.trackEvent({
        type: 'EVENT_TEST',
        data: 're-hello',
      });

      expect(newTracker.getHistory()).toEqual([{
        type: 'EVENT_TEST',
        data: 're-hello',
      }]);
    });

    it('should not save the event if the subscriber return falsy value', () => {
      const newSubscriber = jest.fn(() => null);

      const newTracker = new Tracker([newSubscriber]);

      newTracker.trackEvent({
        type: 'EVENT_TEST',
        data: 're-hello',
      });

      expect(newTracker.getHistory()).toEqual([]);
    });

    it('should add the given callback to the subscribers queue', () => {
      const subscribeToAdd = jest.fn(() => null);

      const newTracker = new Tracker([]);

      newTracker.on('EVENT_TEST', subscribeToAdd);

      newTracker.trackEvent({
        type: 'EVENT_TEST'
      });

      expect(subscribeToAdd).toHaveBeenCalled();
    });

    it('should throw if the given callback is not a function', () => {
      const subscribeToAdd = 'not a function';
      const newTracker = new Tracker([]);

      expect(() => {newTracker.on('EVENT_TEST', subscribeToAdd)})
        .toThrow('Expected onClick listener to be a function, instead got type string');
    });

    it('should throw if the given event type is not valid', () => {
      const subscribeToAdd = jest.fn();
      const newTracker = new Tracker([]);

      expect(() => {newTracker.on(undefined, subscribeToAdd)})
        .toThrow('No event type is specified. (*) to listen on all events');
    });

    it('should getHistory return the current history of tracked events', () => {
      const newTracker = new Tracker([]);
      expect(newTracker.getHistory()).toEqual([]);
    });

    it('should call listeners with no eventType specified', () => {
      const subscriberWithNoEvent = jest.fn();

      const newTracker = new Tracker([subscriberWithNoEvent]);
      newTracker.trackEvent({
        type: 'EVENT_TEST'
      });

      expect(subscriberWithNoEvent).toHaveBeenCalled();
    });

    it('should not call listeners if event dispatched have no type', () => {
      const subscriberWithNoEvent = jest.fn();

      const newTracker = new Tracker([subscriberWithNoEvent]);
      newTracker.trackEvent({
        NoType: 'EVENT_TEST'
      });

      expect(subscriberWithNoEvent).not.toHaveBeenCalled();
    });
  });
});