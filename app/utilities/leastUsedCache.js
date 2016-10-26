// caches x amount of searches.
// config allows kwarg parameters to provide parameter flexibility to the function

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

// passes search values into function to add or move values around dataset
CacheList.prototype.set = function(search){
  var cache = this.cacheMap[search];
  // validates if search value is not in dataset
  if(!cache){
    // if incremented count is not equal to our maxcache, we create a cache
    if(this.cacheCount !== this.maxCaches){
      // if createcache returns true, added node(value) is placed in cacheMap
      if(this.createCache(search)){
        this.cacheMap[search] = this.head;
      }
    } else {
      // if search is in the map, we move it to the head.
      // deletes the map reference to tail
      // write over tail value with `search`
      // then move tail to head
      var oldTailValue = this.tail.value; //holds removed tail value in the event of possible failure
      delete this.cacheMap[this.tail.value];
      this.tail.value = search;
      // if move cache returns true, we finalize the move towards the head
      if (this.moveCache(this.tail)){
        this.cacheMap[search] = this.head;
      // if there is an error we will keep the old value declared above
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
  // checks if the cache is empty.
  //sets the new node(cache) to both head and tail
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
      this.head.prev = node;
      this.tail = node.prev;
      this.tail.next = void 0;
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

// autocomplete utility
CacheList.prototype.autoFill = function() {
  var node = this.tail;
  var data = {}

  while(node){
    data[node.value] = null;
    node = node.prev;
  }
  return data;
};

module.exports = {
  Node:Node,
  CacheList:CacheList
}
