'use strict'

var Thing = require('./Thing');

class Source extends Thing{
  constructor (className) {
    super('Source');
  }

}

module.exports = Source;