

$(document).ready(function () {
    
    $("button[type=submit]").click(function (e) { 
        e.preventDefault();
       

        //ge the datas

        let email = $("#email").val();
        console.log(email);

        let firstname = $("#firstname").val();
        console.log(firstname);

        let lastname = $("#lastname").val();
        console.log(lastname);

        let password = $("#password").val();
        console.log(password);

        let repassword = $("#repassword").val();
        console.log(repassword);


        if(password != repassword){
            // alert("Both Passwords are not same.")
            showSnackBar("Both Passwords are not same.", "red");
            return
        }

        let dob = $("#dob").val();
        console.log(dob);

        let gender =$("input:radio[name ='gender']:checked").val();
        console.log(gender);

        let userType =$("input:radio[name ='user-type']:checked").val();
        console.log(userType);

    
        let hashPasswordDict = hashPassword(password)
        let hashedPassword = hashPasswordDict.hash;
        let salt = hashPasswordDict.salt;
        


        let ob = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword,
            salt:salt,
            dob:dob,
            gender: gender,
            userType: userType
        };
        // Save to venue table

        let trans = db.transaction([DB_USER_STORE], 'readwrite');
        let addReq = trans.objectStore(DB_USER_STORE).add(ob);

        addReq.onerror = function(e) {
            console.log('error storing data');
            console.error(e);
        }

        trans.oncomplete = function(e) {
            console.log('data stored');
            showSnackBar("Account Created", "green");

        }

        // get the db access ---------------------->
        

    });
});











