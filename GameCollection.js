'use strict'
var Thing = require('./Thing');
var Game = require('./Game');

class GameCollection extends Thing{
  constructor(){
    super("Stuff needs to be done");
    this._games = new Set();
  }

  length(){
    return this._games.size;
  }
}

module.exports = GameCollection;