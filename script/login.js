$(document).ready(function () {
    


    $("#login-btn").click(function (e) { 
        e.preventDefault();
        isValid();

    });

});

function getLoginInputs(){
    let email = $("#email").val();
    let password = $("#password").val();

    return {email:email, password:password};
}


function isValid(){

    
    let loginInputs = getLoginInputs();
        let email = loginInputs.email;
        let passwordAttempt = loginInputs.password;
        

        let db;
        // open the db
        var req = indexedDB.open(DB_NAME, DB_VERSION);

        // On success assigne the db variable 
        req.onsuccess = function (evt) {
            // Equal to: db = req.result;
            db = req.result;
            let tx = db.transaction(DB_USER_STORE,"readwrite");
            let store = tx.objectStore(DB_USER_STORE);
            
            var q = store.get(email);
            

            q.onerror = function(event) {
                console.log("ERROR in reading"+event);
              };

            q.onsuccess = function(event) {
            
                if(q.result == undefined){
                    alert("Username or Password didn't match");
                }
                else{
                    console.log( q.result.password);
                    if(isPasswordCorrect(q.result.password,q.result.salt,passwordAttempt)){
                        createCookie("email",email,1);
                        window.location = 'index.html';
                    }
                    else{
                        alert("Username or Password didn't match");

                    }
                }
                
            };



            db.onerror = function(e){
                    console.log("ERROR "+ e.target.errorCode);
            }
        
           

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