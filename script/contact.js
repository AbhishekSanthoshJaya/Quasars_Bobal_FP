$("button[type=submit]").click(function (e) { 
    e.preventDefault();
   

    //get the datas

    let name = $("#name").val();
    console.log(name);

    let email = $("#email").val();
    let emailCookie = readCookie("email");
    if(emailCookie != undefined){
        email = emailCookie
    }

    console.log(email);

    let subject = $("#subject").val();
    console.log(subject);

   

    let description = $("#description").val();
    console.log(description);



    let ob = {
        name: name,
        email: email,
        subject: subject,
        description:description,
        sentDate: new Date().toLocaleDateString("en-US")
     
    };
    // Save to venue table

    let trans = db.transaction([DB_MESSAGES_STORE], 'readwrite');
    let addReq = trans.objectStore(DB_MESSAGES_STORE).add(ob);

    addReq.onerror = function(e) {
        console.log('error storing data');
        console.error(e);
    }

    trans.oncomplete = function(e) {
        console.log('data stored');
        showSnackBar("Message Sent", "green");
        window.setTimeout(function(){

            // Move to a new location or you can do something else
            window.location = 'profile.html';
    
        }, 1000);
    }

    // get the db access ---------------------->
    

});