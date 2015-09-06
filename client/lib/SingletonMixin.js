const SingletomMixin = {

  _instance: null,

  getInstance(...args) {
    if (this._instance && this._instance instanceof this) {
      return this._instance;
    }
    this._instance = new this(...args);
    return this._instance;
  },

  _destructInstance() {
    // Overwrite
  },

  clearInstance() {
    this._destructInstance();
    this._instance = null;
  }
};


export default SingletomMixin;
