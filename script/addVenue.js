$(document).ready(function () {
    
    $("button[type=submit]").click(function (e) { 
        e.preventDefault();
       

        //ge the datas

        let venueName = $("#venue-name").val();
        console.log(venueName);

        let address = $("#address").val();
        console.log(address);

        let pincode = $("#pincode").val();
        console.log(pincode);

        let city = $("#city").val();
        console.log(city);

        let state = $("#state").val();
        console.log(state);

        let venueRate = $("#venue-rate").val();
        console.log(venueRate);

        let description = $("#description").val();
        console.log(description);

        let sports = $("#multiselect").val();
        console.log(sports);

        let images = $("#image-upload-input").prop('files');
        console.log(images);

        

        for(let i= 0; i< images.length ; i++){

            var reader = new FileReader();
            let element = images[i];
        
            reader.readAsBinaryString(element);

            reader.onload = function(e) {
                //alert(e.target.result);
                let bits = e.target.result;
                let ob = {
                    venueName: venueName,
                    data:bits
                };
        
                let trans = db.transaction([DB_IMAGE_STORE], 'readwrite');
                let addReq = trans.objectStore(DB_IMAGE_STORE).add(ob);
        
                addReq.onerror = function(e) {
                    console.log('error storing data');
                    console.error(e);
                }
        
                trans.oncomplete = function(e) {
                    console.log('data stored');
                }
            }

        }

        let ob = {
            venueName: venueName,
            address: address,
            pincode: pincode,
            city: city,
            state: state,
            description:description,
            sports: sports,
            venueRate: venueRate
        };
        // Save to venue table

        let trans = db.transaction([DB_VENUE_STORE], 'readwrite');
        let addReq = trans.objectStore(DB_VENUE_STORE).add(ob);

        addReq.onerror = function(e) {
            console.log('error storing data');
            console.error(e);
        }

        trans.oncomplete = function(e) {
            console.log('data stored');
        }

        // get the db access ---------------------->
        

    });
});