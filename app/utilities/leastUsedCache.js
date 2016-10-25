//caches x amount of searches.
//config allows kwarg parameters to provide parameter flexibility to the function


var Node = function Node(config){
  config = config || {};
  this.value = config.value;
  this.next = config.next;
  this.prev = config.prev;
};
var CacheList = function CacheList(config){
  config = config || {};
  this.cacheMap = {};
  this.maxCaches = config.maxCaches;
  this.cacheCount = 0;
  this.head;
  this.tail;
};
//passes search values into function to add or move values around dataset
CacheList.prototype.set = function(search){
  var cache = this.cacheMap[search];
  //validates if search value is in dataset
  if(!cache){
    //if incremented count is not equal to our maxcache, we create a cache
    if(this.cacheCount !== this.maxCaches){
      //if createcache returns true, added node(value) is placed in cacheMap
      if(this.createCache(search)){
        this.cacheMap[search] = this.head;
      }
    } else {
      // write over tail value with `search`
      // then move tail to head
      var oldTailValue = this.tail.value;
      delete this.cacheMap[this.tail.value];
      this.tail.value = search;
      if (this.moveCache(this.tail)){
        this.cacheMap[search] = this.head;
      } else {
        this.tail.value = oldTailValue;
      }
    }
  } else {
    // move cache to front
    this.moveCache(cache);
  }
};

CacheList.prototype.createCache = function(value){
  // creates node with value equal to the param
  // places new node at the front of the CacheList
  if(this.cacheCount > this.maxCaches) return false;

  var newCache = new Node({'value':value});
  // validate that there is a head node
  // sets pointers on this.head and new node
  if(this.head){
    newCache.next = this.head;
    this.head.prev = newCache
    this.head = newCache;
  }
  // if cacheCount === 0 set this.tail equal to this.head
  else if(this.cacheCount === 0){
    this.tail = this.head = newCache;
  }
  this.cacheCount += 1;
  return true;
};

CacheList.prototype.moveCache = function(node){
    // validate that node.next is a node
    // if true, keep node at head
    if(!node.prev){
      return true;
    }
    // validate that node.prev is a node
    // if true, move to head
    else if(!node.next){
      node.next = this.head;
      this.tail = node.prev;
      node.prev = void 0;
      this.head = node;
      return true;
    }
    // validate if node.next and node.prev is a node
    // if true, reset node's next and prev node pointers to point at each other
    else if (node.next && node.prev){
      var nextNode = node.next;
      var prevNode = node.prev;
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      node.next = this.head;
      node.prev = void 0;
      this.head = node;
      return true;
    }
    else {
      return false;
    }

};

module.exports = {
  Node:Node,
  CacheList:CacheList
}
// croton, ossining, tarrytown, irvington, dobbs ferry, hastings, yonkers, new york, tokyo, paris, munich, oslo, bergen, white plains, nyack
// var cacheList = new CacheList({"maxCaches":4});
// cacheList.set('Tarrytown')
// cacheList.set('Toronto')
// cacheList.set('Oslo')
// cacheList.set('New York')
// cacheList.set('Irvington')
// // console.log(cacheList)
// var cacheMapp = cacheList.cacheMap
// cacheArray = Object.keys(cacheMapp)
// for(i = 0;i < cacheArray.length ;i++){
//   console.log(cacheArray[i])
//   }
