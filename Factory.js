'use strict'
var Thing = require('./Thing');

class Factory extends Thing{
  constructor(c){
    var className = c || "Factory";
    super(className);
    this._games = new Set();
  }
}

module.exports = Factory;