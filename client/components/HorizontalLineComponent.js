import _s from 'underscore.string';


export default class HorizontalLineComponent extends React.Component {
  render() {
    const props = {
      top: this.props.top,
      left: 0,
      width: this.props.width,
      height: 1,
      style: {
        fg: 'white',
        bg: 'black',
      },
      content: _s.repeat('\u2500', this.props.width),
    };
    return (
      <box { ...props } />
    );
  }
}

Object.assign(HorizontalLineComponent, {
  top: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
});
