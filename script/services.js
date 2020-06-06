$(document).ready(function () {
    checkLoginCookie();
    var selectedVenueName = "";

    $(".search button").click(function (e) { 
        e.preventDefault();
        console.log("clicked");

        $(".lister").empty();
        $(".loader").toggleClass("hidden");
       


        // read from database

        let trans = db.transaction([DB_VENUE_STORE], 'readwrite');
        let req = trans.objectStore(DB_VENUE_STORE).openCursor();

        req.onerror = function(e) {
            console.log('error reading data');
            console.error(e);
        }

        req.onsuccess = function(event) {
            let cursor = event.target.result;
            if (cursor) {
                let key = cursor.primaryKey;
                let value = cursor.value;
                console.log(key, value);
                addResultToLister(value);
                cursor.continue();
            }
            else {
                // no more results
                $(".loader").toggleClass("hidden");
               
                $(".card-btn").click(function (e) { 
                    e.preventDefault();
                    selectedVenueName = $(this).attr("data");
                    console.log(selectedVenueName);
                    $("#booking-confirm-venue").text(selectedVenueName);
                    $("#confirmModal").modal('show');
                });
            }
         };

        req.oncomplete = function(e) {
            console.log('data read');
            
        }
        
    });

    $('.datepicker').datepicker();


    function addResultToLister(venueObj){


        var sportsStr = ""
        if(venueObj.sports.length ==1){
            sportsStr = venueObj.sports[0]
        }
        else{
            sportsStr = sportsStr = venueObj.sports[0] + " & "+ (venueObj.sports.length -1) + " more"
        }

        
       

        var txt = 
        `<div class="result">
        <div class="img-container">
        </div>

        <div class="detail-container">
            <div class="upper-deck">
                
                <div class="card-title">
                    <div>`+
                        venueObj.venueName+
                    `</div>
                    
                </div>
                
                <div class="book-btn"  data-toggle="modal" data-target="#confirmModal">
                <a class="card-btn cta-btn" data="`+venueObj.venueName +`" >
                    Book
                </a>
                </div>
                

            </div>
            <div class="lower-deck">
                <div class="first-type">
                    <i></i>
                    <div class="first-name">`+
                        sportsStr
                        +
                    `</div>
                </div>

                <div class="second-type">
                    <i></i>
                    <div class="second-name">`+
                    venueObj.venueRate + `$ /hr
                    </div>
                </div>

                <div class="third-type">
                    <i></i>
                    <div class="third-name">`
                         +venueObj.city+ `, `+ venueObj.state+
                    `</div>
                </div>

                

            </div>

        </div>
            
    </div>`

    $(txt).appendTo(".lister");
    }



    $('#confirmModal').on('hide.bs.modal', function (e) { 
        var tmpid = $(document.activeElement).attr('id'); 
        if(tmpid == "confirm-btn"){
            let email = readCookie("email");
            let bookingDate = $('.datepicker').datepicker().val();

            let ob = {venueName: selectedVenueName, email:email ,bookingDate:bookingDate}
            let trans = db.transaction([DB_BOOKING_STORE], 'readwrite');
            let addReq = trans.objectStore(DB_BOOKING_STORE).add(ob);
    
            addReq.onerror = function(e) {
                console.log('error storing data');
                console.error(e);
            }
    
            trans.oncomplete = function(e) {
                console.log('data stored');
            }


        }

    }); 

});