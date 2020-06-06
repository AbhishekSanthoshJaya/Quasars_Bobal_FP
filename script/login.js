$(document).ready(function () {
    


    $("button[type=submit]").click(function (e) { 
        e.preventDefault();
        isValid();

    });








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

}