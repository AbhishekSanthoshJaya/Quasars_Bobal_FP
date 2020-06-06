$(document).ready(function () {
    checkLoginCookie();

    $(".search button").click(function (e) { 
        e.preventDefault();
        console.log("clicked");


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
            }
         };

        req.oncomplete = function(e) {
            console.log('data read');
        }
        
    });


    function addResultToLister(venueObj){


        var sportsStr = ""
        if(venueObj.sports.length ==1){
            sportsStr = venueObj.sports[0]
        }
        else{
            sportsStr = sportsStr = venueObj.sports[0] + " & "+ (venueObj.sports.length -1) + " more"
        }


        $(".lister").append(

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
                
                <a class="card-btn cta-btn">
                    Book
                </a>

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
            
    </div>`);
    }

});