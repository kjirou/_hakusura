import AppStore from 'containers/AppStore';
import { calculateMillisecondsPerFrame } from 'lib/util';


export function onTimer({ value, interval }) {
  const { dispatchers } = AppStore.getInstance();

  dispatchers.time.forwardAppTime(calculateMillisecondsPerFrame());
}
