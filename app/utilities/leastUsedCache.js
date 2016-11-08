// caches x amount of searches.
// config allows kwarg parameters to provide parameter flexibility to the function

// creating doubly Linked List nodes
var Node = function Node(config){
  config = config || {};
  this.value = config.value;
  this.next = config.next;
  this.prev = config.prev;
};

// creating cachelist with a cacheMap to search for cache.
// doubly linked list is more efficient in storage than a linked list
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
  if(this.cacheCount > this.maxCaches) return false;

  // creates node with value equal to the param
  // places new node at the front of the CacheList
  var newCache = new Node({'value':value});
  // validate that there is a head node
  if(this.head){
    // sets pointers on this.head and new node
    newCache.next = this.head;
    this.head.prev = newCache;
    this.head = newCache;
  }
  // checks if the cache is empty.
  else if(this.cacheCount === 0){
    //sets the new node(cache) to both head and tail
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
    else if(!node.next){
      // if true, move to head
      node.next = this.head;
      this.head.prev = node;
      this.tail = node.prev;
      this.tail.next = void 0;
      node.prev = void 0;
      this.head = node;
      return true;
    }
    // validate if node.next and node.prev is a node
    else if (node.next && node.prev){
      // if true, reset node's next and prev node pointers to point at each other
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

// autocomplete dataset format utility in cityInputContainer
// autocomplete requires format(data: {textKey:searchVal,valueKey:searchVal})
CacheList.prototype.autoFill = function(){
  var node = this.head;
  var data = [];

  while(node){
    var textValObject = {textKey:node.value, valueKey:node.value}
    data.push(textValObject)
    node = node.next;
  }
  return data;
};

module.exports = {
  Node:Node,
  CacheList:CacheList
}
