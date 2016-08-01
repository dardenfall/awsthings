'use strict'
var Factory = require('./Factory');
var Game = require('./Game');
var jsdom = require('jsdom');

class GameFactory extends Factory{
  constructor(){
    super("GameFactory");
    this._games = new Set();
  }

  static createGame (id) {

    var promiseChain = [];

    var titlePromise = Game.retrieveName(id);
    var descPromise = Game.retrieveName(id);
    
    var tagsPromise, updatePromise, reviewsPromise;
    var getEmptyPromise = function() {
      return new Promise(function(resolve, reject){resolve()});
    }

    promiseChain.push(titlePromise);
    promiseChain.push(descPromise);
    // promiseChain.push(tagsPromise);
    // promiseChain.push(updatePromise);
    // promiseChain.push(reviewsPromise);

    var wrapper = new Promise(function(resolve2, reject){
      Promise.all(promiseChain).then(function(data){
        var title = data[0];
        var desc = data[1];
        var game = new Game(id, title, desc);
        resolve2(game);
      });
    }); 

    return wrapper;
  }
}

module.exports = GameFactory;