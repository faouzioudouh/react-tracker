import propTypes from 'prop-types';

const Types = Object.assign({}, propTypes, {
  tracker: propTypes.shape({
    subscribe: propTypes.func.isRequired,
    dispatch: propTypes.func.isRequired,
  })
});

export default Types;
