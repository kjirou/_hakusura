import {EventEmitter} from 'events';
import SingletonMixin from 'singleton-mixin';


export default class AppEvent {

  constructor() {

    this._emitter = new EventEmitter();
  }

  get emitter() {
    return this._emitter;
  }
}

Object.assign(AppEvent, SingletonMixin);
