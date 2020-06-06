$(document).ready(function () {
    
    let email = readCookie("email");


    $("#logout").click(function (e) { 
        e.preventDefault();
        eraseCookie('email');
        window.location ="signin.html";
        
    });

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
                if(value.email == email){
                    console.log(key, value);
                }
                addBookingsToLister(value);
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
                if(value.email == email){
                    console.log(key, value);
                }
                addMessagesToLister(value);
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
                        <div class="first-name">`+
                        venueObj.venueName+
                        `</div>
                    </div>
    
                    <div class="second-type">
                        <i></i>
                        Booking Date:
                        <div class="second-name">`+
                        venueObj.bookingDate + `
                        </div>
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
                        <div class="first-name">`+
                        messageObj.name+
                        `</div>
                    </div>
    
                    <div class="second-type">
                        <i></i>
                        title:
                        <div class="second-name">`+
                        messageObj.subject + `
                        </div>
                    </div>

                    <div class="third-type">
                        <i></i>
                        Date:
                        <div class="third-name">`+
                        messageObj.sentDate + `
                        </div>
                    </div>
    
                    
    
                    
    
                </div>

                <div class="lower-deck">
                <div class="first-type">
                    Desc:
                    <div class="first-name">`+
                    messageObj.description+
                    `</div>
                </div>
                </div>


                <div class="lower-deck">
                <div class="first-type">
                    Email:
                    <div class="first-name">`+
                    messageObj.email+
                    `</div>
                </div>
                </div>



            </div>
    
            </div>
                
        </div>`
        $(txt).appendTo("#messages-lister");
        }

});

