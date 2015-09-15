import _s from 'underscore.string';


export default class VehicleComponent extends React.Component {

  render() {

    let props = {
      top: this.props.top,
      left: this.props.left,
      width: 30,
      height: 26,
      tags: true,
      border: {
        type: 'line',
      },
      style: {
        fg: 'white',
        bg: 'black',
        border: {
          fg: 'white',
        }
      },
    };

    let content = [
      '[{magenta-fg}1{/}] Gatling Gun +3',
      ' 12 {green-fg}######{/}#########',
      '[{magenta-fg}2{/}] Cannon +1',
      ' 20 {green-fg}###################{/}##',
      '[{magenta-fg}3{/}] Machine Gun Br,Cb',
      '  5 {green-fg}#{/}#######',
      '[{magenta-fg}4{/}] Fire Lance -1',
      '  8 ################',
      _s.repeat('\u2500', 28),
      '[{magenta-fg}f{/}] Wagon +1,Fr',
      ' 25 w0500/1500',
      '[{magenta-fg}a{/}] Iron Plate',
      '    022/025|02',
      '[{magenta-fg}s{/}] Light Steering +2',
      '  8 ####',
      '[{magenta-fg}e{/}] V8 Engine',
      ' 17 ############',
      _s.repeat('\u2500', 28),
      '[{magenta-fg}A{/}](12)=a/fx',
      '[{magenta-fg}B{/}](08)=2/op',
      '[{magenta-fg}C{/}](02)=R',
    ].join('\n');

    props.content = content;

    return (
      <box {...props}>
      </box>
    );
  }
}

Object.assign(VehicleComponent, {

  propTypes: {
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired,
  }
});
