

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

const DB_NAME = 'bobal-play-storage';
const DB_VERSION = 1; 
const DB_USER_STORE = 'users'
// var db;
var openDB = function(version, currentCallback){
    console.log("openDb ...");

    var db;
    // open the db
    var req = indexedDB.open(DB_NAME, DB_VERSION);

    // On success assigne the db variable 
    req.onsuccess = function (evt) {
      // Equal to: db = req.result;
      db = req.result;
      console.log("openDb DONE");
      currentCallback(db);
    };

    // On error simply console for debug
    req.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
    };

    // create tables for the first time
    req.onupgradeneeded = function (evt) {
      console.log("openDb.onupgradeneeded");
      var store = evt.currentTarget.result.createObjectStore(
        DB_USER_STORE, { keyPath: 'email', autoIncrement: true });
    };


}


// inserts given data in given storeName


var insertData = function(storeName, data){
    
    var insertCallBack = function(db){
        var tx = db.transaction(storeName,"readwrite");
        var store = tx.objectStore(storeName);
        
        db.onerror = function(e){
                console.log("ERROR "+ e.target.errorCode);
        }
    
        store.put(data);
        tx.oncomplete = function () {
            db.close();
          };
    
    
    }
    openDB(DB_VERSION,insertCallBack);
}



var readData = function(storeName, key){
    
    var readCallBack = function(db){
        var tx = db.transaction(storeName,"readwrite");
        var store = tx.objectStore(storeName);
        
        db.onerror = function(e){
                console.log("ERROR "+ e.target.errorCode);
        }
    
        let q = store.get(key);
        
        q.onsuccess = function(){
            return q.result;
        }

        tx.oncomplete = function () {
            db.close();
          };
    
    
    }
    openDB(DB_VERSION,readCallBack);
}


