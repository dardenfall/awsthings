'use strict'

var Thing = require('./Thing');

class UpdateEntry extends Thing{

  constructor(title, date, text, links){
    super("UpdateEntry");
    this._title = title;
    this._date = date;
    this._text = text;
    this._links = links;
  }

  get title(){
    return this._title;
  }

  get date(){
    return this._title;
  }

  get text(){
    return this._title;
  }

  get links(){
    return this._links;
  }
}

module.exports = UpdateEntry;