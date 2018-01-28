/* global jest expect */
import {
    getDisplayName,
    assertlisteners
} from '../../src/utils';

describe('Utils', () => {
  describe('getDisplayName()', () => {
    it('should return the component display name', () => {
        const displayName = getDisplayName({
            displayName: 'foo'
        });

        expect(displayName).toEqual('TrackEventProvider(foo)');

        const name = getDisplayName({
            name: 'foo'
        });

        expect(name).toEqual('TrackEventProvider(foo)');
    });

    it('should return the default naming if no display name found', () => {
        const name = getDisplayName({});

        expect(name).toEqual('TrackEventProvider(Component)');
    })
});
});