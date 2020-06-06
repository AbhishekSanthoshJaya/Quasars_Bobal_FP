$(document).ready(function () {
    
    let email = readCookie("email");
    updateProfile();

    let userType;

    $("#logout").click(function (e) { 
        e.preventDefault();
        eraseCookie('email');
        window.location ="signin.html";
        
    });


    function updateProfile(){

        
        var transaction = db.transaction([DB_USER_STORE]);
        var objectStore = transaction.objectStore(DB_USER_STORE);
        var request = objectStore.get(email);
        request.onerror = function(event) {
            console.log("Error while reading");
        };
        request.onsuccess = function(event) {
            // Do something with the request.result!
            let email = readCookie("email");
            $("#profile-name").text(request.result.firstname +" " + request.result.lastname+" | "+request.result.userType);
            $("#gender").text(request.result.gender);
            $("#mail").text(request.result.email);
            $("#dob").text(request.result.dob);

            userType = request.result.userType;
            if(userType == "owner"){
                $("#add-venue").toggleClass("hidden");
            }



        };

    }

    let trans = db.transaction([DB_BOOKING_STORE], 'readwrite');
        let req = trans.objectStore(DB_BOOKING_STORE).openCursor();

        req.onerror = function(e) {
            console.log('error reading data');
            console.error(e);
        }

        req.onsuccess = function(event) {
            let cursor = event.target.result;
            if (cursor) {
                let key = cursor.primaryKey;
                let value = cursor.value;
                if(userType == 'admin'  || value.email == email){
                    console.log(key, value);
                    addBookingsToLister(value);
                }
                
                // addResultToLister(value);
                cursor.continue();
            }
            else {
                // no more results
               
               
               
            }
         };

        req.oncomplete = function(e) {
            console.log('data read');
            
        }



        // update messages
        let trans1 = db.transaction([DB_MESSAGES_STORE], 'readwrite');
        let req1 = trans1.objectStore(DB_MESSAGES_STORE).openCursor();

        req1.onerror = function(e) {
            console.log('error reading data');
            console.error(e);
        }

        req1.onsuccess = function(event) {
            let cursor = event.target.result;
            if (cursor) {
                let key = cursor.primaryKey;
                let value = cursor.value;
                if(userType == 'admin'  || value.email == email){
                    console.log(key, value);
                    addMessagesToLister(value);
                }
                
                cursor.continue();
            }
            else {
                // no more results
               
               
               
            }
         };

         req1.oncomplete = function(e) {
            console.log('data read');
            
        }


        function addBookingsToLister(venueObj){

            var txt = 
            `<div class="result">
           
    
            <div class="detail-container">
               
                <div class="lower-deck">
                    <div class="first-type">
                        Venue:
                        <span class="first-name">`+
                        venueObj.venueName+
                        `</span>
                    </div>
    
                    <div class="second-type">
                        <i></i>
                        Booking Date:
                        <span class="second-name">`+
                        venueObj.bookingDate + `
                        </span>
                    </div>
    
                    
    
                    
    
                </div>
    
            </div>
                
        </div>`
        $(txt).appendTo("#booking-lister");
        }

        function addMessagesToLister(messageObj){

            var txt = 
            `<div class="result">
           
    
            <div class="detail-container">
               
                <div class="lower-deck">
                    <div class="first-type">
                        Name:
                        <span class="first-name" style="font-size:bold">`+
                        messageObj.name+
                        `</span>
                    </div>
    
                    <div class="second-type">
                        <i></i>
                        title:
                        <span class="second-name">`+
                        messageObj.subject + `
                        </span>
                    </div>

                    <div class="third-type">
                        <i></i>
                        Date:
                        <span class="third-name">`+
                        messageObj.sentDate + `
                        </span>
                    </div>
    
                    
    
                    
    
                </div>

                <div class="lower-deck">
                <div class="first-type">
                    Desc:
                    <span class="first-name">`+
                    messageObj.description+
                    `</span>
                </div>
                </div>


                <div class="lower-deck">
                <div class="first-type">
                    Email:
                    <span class="first-name">`+
                    messageObj.email+
                    `</span>
                </div>
                </div>



            </div>
    
            </div>
                
        </div>`
        $(txt).appendTo("#messages-lister");
        }

});

