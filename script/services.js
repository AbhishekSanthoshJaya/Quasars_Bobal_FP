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
        $(".lister").append('<div class="result">'+venueObj.venueName+'</div>');

    }

});