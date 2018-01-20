import {
    getUrlParam,
    setUrlParam
} from '../../src/libs/location';

const mockGlobalProperty = name => key => value => {
    Object.defineProperty(window[name], key, {
        value,
        writable: true
    });
};

const mockLocationProperty = mockGlobalProperty('location');

describe('libs/location', () => {
    describe('getUrlParam()', () => {
        it('should return the value of given key', () => {
            mockLocationProperty('hash')('page=5&foo=bar');
            expect(getUrlParam('page')).toEqual("5");
            expect(getUrlParam('foo')).toEqual('bar');
        });
    });

    describe('setUrlParam()', () => {
        it('should call history.pushState with new value ', () => {
            const pushState = jest.fn();
            mockGlobalProperty('history')('pushState')(pushState);

            setUrlParam('page', 10);
            expect(pushState).toBeCalledWith(
                null,
                null,
                '#foo=bar&page=10'
            );
        });

        it('should mutate location.hash if history.pushState is not defined', () => {
            mockGlobalProperty('history')('pushState')(null);
            mockLocationProperty('hash')('something');

            setUrlParam('page', 10);
            expect(window.location.hash).toBe('page=10&something');
        });
    });
});
