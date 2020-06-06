# Quasars_Bobal_FP

## PROJECT CONTRIBUTORS

Abhishek Santhosh Jaya <br>
Prakash Rana <br>
Raghav Bobal <br>

## PROJECT DESCRIPTION
Bobal is a website that empowers local communities to make new playpals, organize playgroups, share information/experiences and discover sporting venues/activities. So, no more excuses now...don your sneakers and get ready to play!

## PROJECT STRUCTURE
We have used the following folders and files to implement our website:<br>

### *HTML files*<br>
* **index.html**: Landing page
* **signin.html**: Allows users to sign in once they have registered.
* **register.html**: Contains a registration form for users to fill in so that they can have an account on our site.
* **addVenue.html**: Contains a form that allows addition of venues.
* **services.html**: Page that allows users to see the venues they have added along with its information.
* **contact.html**: A html page containing a form that allows users to send a message to the site owners.
* **about.html**: Contains information about our services.

### *JS files*<br>
* **db.js**: Contains database compatibility checks and initiliaziing operations
* **index.js**: Removes cookies once a user logs out.
* **login.js**: Gets the user inputs from the email and password field and checks them against the stored email and hashed password
* **register.js**: Stores the user information from the form to the database.
* **profile.js**: Displays user information along with messages and booked games.
* **passwordUtil.js**: Generates a hashed password using a salt.
* **main.js**: Contains methods to create, read and delete cookies. 
* **contact.js**: Stores message information to the database.
* **addVenue.js**: Stores venue information to the database.

### *CSS files*<br>
* **contact.css**: Contains styling for the contact page.
* **form.css**: Contains default styling for forms.
* **main.css and main2.css**: Contains styling for the initial design and final designs of the content pages.
* **profile.css**: Contains styling information for the use profile.
* **search.css**: Contains styles for the search boxes.
* **spinner.css**: Generates a loading spinner effect.

## REFERENCES
* [Freecodecamp.org](https://www.freecodecamp.org/news/a-quick-but-complete-guide-to-indexeddb-25f030425501/) - Working with Indexeddb
* [Developers.google.com](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/indexeddb-best-practices) - Best practicies for using web storage
* [Dribbble.org](https://dribbble.com/) - For site design ideas
