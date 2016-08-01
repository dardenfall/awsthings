'use strict'

class Thing {
  constructor (className) {
    this._className = className || "Thing";
  }

  get className (){
    return this._className;
  }

}

module.exports = Thing;