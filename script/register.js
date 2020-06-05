


$( document ).ready(function() {

    //listener for register button
    $("#register-btn").click(function (e) { 
        e.preventDefault();
        registerUser();
    });

});





var readUserInput = function(){
    let email = $("#email").val();
    let password = $("#psw").val();
    let dob = $("#dob").val();
    let gender = $("input[name='gender']:checked").val();

    let hashPasswordDict = hashPassword(password)
    let hashedPassword = hashPasswordDict.hash;
    let salt = hashPasswordDict.salt;
    return {email: email, password: hashedPassword, dob: dob, gender: gender, salt: salt}

}



var registerUser = function(version, currentCallback){
    console.log("openDb ...");

    var db;
    // open the db
    var req = indexedDB.open(DB_NAME, DB_VERSION);

    // On success assigne the db variable 
    req.onsuccess = function (evt) {
        // Equal to: db = req.result;
        db = req.result;
        var tx = db.transaction(DB_USER_STORE,"readwrite");
        var store = tx.objectStore(DB_USER_STORE);
        
        db.onerror = function(e){
                console.log("ERROR "+ e.target.errorCode);
        }
    
        data = readUserInput();
        store.put(data);
        tx.oncomplete = function () {
            db.close();
          };
    
        
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

