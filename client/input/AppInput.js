import Rx from 'rx';
import SingletonMixin from 'singleton-mixin';

import {onError} from 'input/subscriptions/error';
import {onKeypress} from 'input/subscriptions/keypress';
import {onTimer} from 'input/subscriptions/timer';
import {calculateMillisecondsPerFrame} from 'lib/util';


export default class AppInput {

  constructor() {
    let pauser = new Rx.Subject();

    let timerSource = Rx.Observable
      .timer(0, calculateMillisecondsPerFrame())
      .timeInterval()
      .map((data) => {
        pauser.onNext(true);
        return data;
      })
    ;

    let wrappedHandler;
    let keypressSource = Rx.Observable
      .fromEventPattern(
        (handler) => {
          wrappedHandler = function(chr, key) {
            if (!key) {
              key = {
                name: chr,
                ctrl: false,
                sequence: chr
              };
            }
            handler(key);
          };
          process.stdin.addListener('keypress', wrappedHandler);
        },
        () => {
          process.stdin.removeListener('keypress', wrappedHandler);
        }
      )
      .pausable(pauser)
      .filter(function() {
        var isStopped = pauser.isStopped;
        pauser.onNext(false);
        return !isStopped;
      })
    ;

    this._timerSubscription = timerSource.subscribe(
      onTimer,
      onError
    );
    this._keypressSubscription = keypressSource.subscribe(
      onKeypress,
      onError
    );
  }

  _destructor() {
    this._timerSubscription.dispose();
    this._keypressSubscription.dispose();
  }

  // TODO: Created for testing, but not working..
  //emitKeypress(keyName, isShift = false, isControl = false) {
  //  process.stdin.emit('keypress', keyName, {
  //    name: keyName,
  //    sequence: isShift ? keyName.toUpperCase() : keyName,
  //    ctrl: isControl,
  //  });
  //}
}

Object.assign(AppInput, SingletonMixin, {
  destructInstance() {
    this._instance._destructor();
  }
});
