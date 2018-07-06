# In A Pinch
> In a Pinch provides a quick and simple way to find a clean bathroom when you need to go, on the go. Just open the app and you will get a display of all the toilets near you. Like your experience?  Would never step foot in that retsroom again?  Write a review to promote or warn others!
<br />
<br />
## Heroku Link
Coming Soon!
<br />
<br />
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes:
<br />
Clone the In A Pinch repository (https://github.com/taw1313/inApinch) and then create a MySQL database called dookiedb.
<br />
<br />
## Screenshots
Welcome to the In A Pinch, mobile responsive application! Let's start the user experience from teh beginning:
<br />
After the website loads, the user can sign in to leave a restroom review, or they can continue as a guest.
![signinscreen](https://user-images.githubusercontent.com/35079979/42400701-a62ebab0-8140-11e8-8402-824c95b139b7.png)
<br />
Once the user finds their location, they can click on a pin to read previous reviews.
![seepriorreviews](https://user-images.githubusercontent.com/35079979/42400716-b1f1c57c-8140-11e8-8d1c-2f5e9ec860d6.png)
<br />
At this point, they can close the modal to review other locations, or sign in to leave their own bathroom experience.
![addareviewnocomments](https://user-images.githubusercontent.com/35079979/42400662-80f581f2-8140-11e8-8ded-d7981970243c.png)
<br />
To leave a review, the user will need to rate the bathroom and write a comment.
![addareview](https://user-images.githubusercontent.com/35079979/42400653-73383942-8140-11e8-9bae-9556fb8e6ab9.png)
<br />
Afterwards, their review will be saved in our database and will update the customer reviews modal.
![reviewadded](https://user-images.githubusercontent.com/35079979/42400648-68883c5e-8140-11e8-9f02-293805e5d389.png)
<br />
If a location is showing, the user can 'add a location' or 'drop a pin' on a location so they can highlight the first experience.
![addalocation](https://user-images.githubusercontent.com/35079979/42400672-8c0edb56-8140-11e8-901b-0a189524b31e.png)
<br />
Once the user has finished using our web application, they can finally 'Sign Out', until they return to check out local restrooms closeby again.
![signout](https://user-images.githubusercontent.com/35079979/42400633-59639e58-8140-11e8-94a8-3cd44ef39fb1.png)
<br />
<br />
## NPM Dependencies
Run ```npm install``` in the terminal/command line:
<br />
@google/maps: ^0.5.3
<br />
body-parser: ^1.18.3
<br />
chai: ^4.1.2
<br />
dotenv: ^6.0.0
<br />
express: ^4.16.3
<br />
firebase: ^5.2.0
<br />
mocha: ^5.2.0
<br />
mysql2: ^1.5.3
<br />
sequelize: ^4.38.0
<br />
<br />
## Step-by-Step
Run ```node server.js``` (starts the server, creates the tables in dookiedb).
<br />
Visit localhost:8080
<br />
<br />
## Deployment
In a Pinch was deployed using Heroku and it's JawsDB add-on:
<br />
https://elements.heroku.com/addons/jawsdb
<br />
<br />
## Built With
Bootstrap
<br />
Node.js
<br />
MySQL
<br />
Sequelize
<br />
Express Handlebars
<br />
Express
<br />
Heroku
<br />
Firebase
<br />
<br />
## Authors
Todd Wilson - (https://github.com/taw1313)
<br />
Kevin Godwin - (https://github.com/kgodwin88)
<br />
Nataliia Frank - (https://github.com/nataliiafrank)
<br />
Tyler Staples - (https://github.com/TylerJStaples)
<br />
Candace Buchanan - (https://github.com/buchananc)
<br />
<br />
## Presentation Link
Click here: (https://www.emaze.com/@AOIFQZZFR/in-a-pinch)
<br />
<br />
## Acknowledgments
Hat tip to the TA's and instructors who were kind enough to help us out along the way!