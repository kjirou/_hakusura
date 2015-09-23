import _ from 'lodash';


export default class CursorCoverComponent extends React.Component {

  render() {

    let props = {
      top: this.props.top,
      left: 0,
      width: this.props.width,
      height: 1,
      style: {
        transparent: true,
      },
    };

    return (
      <box { ...props } >
      {
        _.range(this.props.width).map((idx) => {

          const style = {};
          if (idx === this.props.blinkingPosition) {
            style.bg = 'white';
          } else {
            style.transparent = true;
          }

          return <box { ...{
            key: 'dot-' + idx,
            top: 0,
            left: idx,
            width: 1,
            height: 1,
            style,
          } } />;
        })
      }
      </box>
    );
  }
}

Object.assign(CursorCoverComponent, {

  propTypes: {
    top: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    blinkingPosition: React.PropTypes.number.isRequired,
  }
});
