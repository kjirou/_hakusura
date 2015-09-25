export default {

  props: {
    left: 0,
    tags: true,
    style: {
      fg: 'white',
      bg: 'black',
    },
  },

  // FIXME: extended always by root props now
  propTypes: {
    top: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  },
};
