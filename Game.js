'use strict'
var Thing = require('./Thing');
var UpdateEntry = require('./UpdateEntry');
var jsdom = require('jsdom');

class Game extends Thing{

  static getUrl(id) {
    return 'http://store.steampowered.com/app/'+ id;
  }

  constructor(id, name, desc, tags, updates){
    super('Game');
    this._id = id;
    this._name = name;
    this._desc = desc;
    this._tags = tags;
    this._updates = updates;
  }

  get id(){
    return this._id;
  }

  get name(){
    return this._name;
  }

  get description() {
    return this._desc;
  }

  get desc() {
    return this._desc;
  }

  get tags() {
    return this._tags;
  }

  get updates() {
    return this._updates;
  }

  fetchData(){
    var self = this;

    return new Promise(function(resolve, reject){

      if (!self._id){
        reject("Id of game is null" + self);
      }

      jsdom.env({
        url: Game.getUrl(self._id),
        scripts: ['http://code.jquery.com/jquery.js'],
        done: function (err, window) {
          if(err){
            reject(err);
          }
          var $J = window.$;

          //consume name
          var name = $J('.apphub_AppName').text();
          //consume description 
          var description = $J('.game_description_snippet').text();
          //consume tags
          var tags = [];
          $J('.app_tag').each(
            function(e,i){tags.push(i.innerHTML.trim())}
          );  
          tags.pop();

          //consume updated :/
          var titles = [];
          $J('.announcement').each(
          function(i,e){
            titles.push($J('a.large_title', e)[0].text);
          });
          var links = [];
          $J('.announcement').each(
          function(i,e){
            links.push($J('a.large_title', e)[0].href);
          })
          var dates = [];
          $J('.announcement').each(
          function(i,e){
            var myRegexp = /.+\-/g;
            var date = $J('div.announcement_byline',e).text();
            var match = myRegexp.exec(date);
            var d = match[0];

            obj.date = d.substring(0,d.length-1).trim();

            dates.push(date);
          })
          var updates = [];
          $J('.announcement').each(
          function(i,e){
            updates.push($J('.bodytext', e).text());
          })
          var updateLog = [];   
          for(var i =0; i < titles.length; i++){
            var updateEntry = new UpdateEntry(
              (titles[i]).trim(),
              (dates[i]).trim(),
              links[i],
              (updates[i]).trim());
            updateLog.push(updateEntry);
          }

          self._name = name;
          self._desc = description;
          self._tags = tags;
          self._updates = updateLog;
          
          resolve(self);
        }

      });
    })
  } 

  write(outputStream){
     return outputStream.write(JSON.stringify(this));
  } 
}

module.exports = Game;