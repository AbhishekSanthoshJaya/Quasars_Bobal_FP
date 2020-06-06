$(document).ready(function () {
    
    let email = readCookie("email");

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


        function addBookingsToLister(venueObj){


          
    
            
           
    
            var txt = 
            `<div class="result">
           
    
            <div class="detail-container">
                <div class="upper-deck">
                    
                    <div class="card-title">
                        <div>`+
                            venueObj.venueName+
                        `</div>
                        
                    </div>
                    
                   
                    
    
                </div>
                
    
            </div>
                
            </div>`
    
        $(txt).appendTo(".lister");
        }

});

