import _s from 'underscore.string';

import shared from '../shared';
import VehicleComponent from '../VehicleComponent';


class StatusBar extends React.Component {

  render() {

    let underlineProps = {
      key: 'underline',
      top: 1,
      left: 0,
      width: '100%',
      height: 1,
      tags: true,
      style: {
        fg: 'white',
        bg: 'black',
      },
      content: _s.repeat('\u2500', 100),
    };

    let props = {
      top: 0,
      left: 0,
      width: '100%',
      height: 2,
      tags: true,
      style: {
        fg: 'white',
        bg: 'black',
      },
    };

    let content = '';
    // Mileage
    content += () => {
      return ` ${_s.pad(this.props.mileage, 4)}/${_s.pad(this.props.maxMileage, 4)} km \u2502 `;
    }();
    // Others
    content += [
      `Fuel:${_s.pad(this.props.fuel, 2)}`,
      `Ammo:${_s.pad(this.props.ammo, 2)}`,
    ].join(', ');
    props.content = content;

    return (
      <box {...props}>
        <box {...underlineProps} />
      </box>
    );
  }
}


export default class GamePageComponent extends React.Component {

  render() {

    const props = Object.assign({
      // tmp
      mileage: 199,
      maxMileage: 9999,
      fuel: 18,
      ammo: 72,
    }, shared.pageProps);

    const statusBarProps = Object.assign({
      key: 'status_bar',
    }, props);

    const playerVehicleProps = {
      key: 'player_vehicle',
      top: 4,
      left: 2,
    };

    return (
      <box {...props}>
        <StatusBar {...statusBarProps} />
        <VehicleComponent {...playerVehicleProps} />
      </box>
    );
  }
}
