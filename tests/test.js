var assert = require('assert');
var Thing = require('../Thing');
var Game = require('../Game');
var Source = require('../Source');
var GameCollection = require('../GameCollection');
var Factory = require('../Factory');
var GameFactory = require('../GameFactory');
var UpdateEntry = require('../UpdateEntry')

describe('Thing', function () {
  const t = new Thing();

  it('should instantiate', function () {
    assert (t);
  });
  it('should be an instance (instanceof) of "Thing"', function () {
    assert(t instanceof Thing);
  });
  it('should have a classname of "Thing"', function () {
    assert(t.className === "Thing");
  });
})

function testClass(instantiatedObject, classType, className) {
  describe(className + ' class test', function () {

    it('should instantiate', function () {
      assert(instantiatedObject);
    });

    it('should be an instance (instanceof) of "Thing"', function () {
      assert(instantiatedObject instanceof Thing);
    });

    it('should be an instance (instanceof) of "' + className +'"', function () {
      assert(instantiatedObject instanceof classType);
    });

    it('should have a classname of "' + className + '"', function () {
      assert(instantiatedObject.className === className);
    });
  })
}

var tags = ['mystery', 'mississippi'];
const g = new Game(12, 'murder on the', 'game about twilia', tags);
testClass(g, Game, "Game");
describe('Game', function () {

  it('should have a id of 12', function () {
    assert(g.id === 12);
  });

  it('should have a name of "murder on the"', function () {
    assert(g.name === "murder on the");
  });

  it('should have disc with "twilia"', function () {
    assert(g.desc.indexOf("twilia") != -1);
  });

  it('should have discription with "twilia"', function () {
    assert(g.description.indexOf("twilia") != -1);
  });

  it('should have a tag with mystery', function () {
    assert(g.tags[0] === 'mystery');
  });

  it('should have a value for url', function () {
    assert(Game.getUrl(123) === 'http://store.steampowered.com/app/123');
  });

  const warOMine = new Game(282070);

  it('should have the correct name, desc, tags', function(done2){
    this.timeout(10000);    
    warOMine.fetchData().then(function(game){
      assert(warOMine.name === "This War of Mine");
      assert(warOMine.description.indexOf("civilians") !== -1);
      assert(warOMine.tags.indexOf("War") !== -1);
      done2();
    })
  });  
})

const s = new Source(12);
testClass(s, Source, "Source");
const f = new Factory();
testClass(f, Factory, "Factory");
const u = new UpdateEntry();
testClass(u, UpdateEntry, "UpdateEntry");
