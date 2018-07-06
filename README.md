# In A Pinch
> In a Pinch provides a quick and simple way to find a clean bathroom when you need to go, on the go. Just open the app and you will get a display of all the toilets near you. Like your experience? Would never step foot in that retsroom again? Write a review to promote or warn others!
## Deployed Heroku Link
[Click here](https://cryptic-spire-46281.herokuapp.com/) to see 'In A Pinch' live on the web!

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes:

Clone the 'In A Pinch' repository (https://github.com/taw1313/inApinch) and then create a MySQL database called dookiedb.

## Screenshots
**Welcome to the In A Pinch, mobile responsive application! Let's start the user experience from the beginning:**
<br/>
After the website loads, the user can sign in to leave a restroom review, or they can continue as a guest.
<br/>
![signin](https://lh3.googleusercontent.com/jbl6M5F-5Ph90XpDOdY7nR0ooibqDnA0NWHnL2HrDzQsaOYibrXdozwdeiE5i0Ava0o12Zs-2ONkkg "SignIn")
Once the user finds their location, they can click on a pin to read previous reviews.
<br/>
![seepriorreviews](https://lh3.googleusercontent.com/QYIOaf9kzMFwuNQjNWXVA0VEn3rS9qhX3fH2Rs4GGYSi1NizYNXUxgDAA09RNjuaiMrc-Zm1Bc8UxQ "SeePriorReviews")
At this point, they can close the modal to review other locations, or sign in to leave their own bathroom experience.
<br/>
![addareviewnocomments](https://lh3.googleusercontent.com/VS3mnuuffxAiyOgvnhp9XblfVt_oC6ZXdFxEZZMHLOJRnkcxfBsQLrT4n0WCeMnGLsRDM12fyaJV9g "AddAReviewNoComments")
To leave a review, the user will need to rate the bathroom and write a comment.
<br/>
![addareview](https://lh3.googleusercontent.com/7Me9w-055wrtgp5ISJAE01iyPwHGJa2stNkB--LlEa_A4UD80COaLx1u7QeHAcmpQhgk2QO2aFYhHQ "AddAReview")
Afterwards, their review will be saved in our database and will update the customer reviews modal.
<br/>
![reviewadded](https://lh3.googleusercontent.com/qjrcIU8yOHsYJDT3oRogX48uVlawSGQS9qQnR7nxt2gpPeT4A0rOMUechoxdhN8dUuhuw-szXbXr8g "ReviewAdded")
If a location is showing, the user can 'add a location' or 'drop a pin' on a location so they can highlight the first experience.
<br/>
![addalocation](https://lh3.googleusercontent.com/aGa-ZmTLjsaWGeC882Qv4TEkSW71pVCahNnk3wx22vd-bmQ72uUoKn8NgV94GExmNmbnCdEOZ62p9g "AddALocation")

Once the user has finished using our web application, they can finally 'Sign Out', until they return to check out local restrooms closeby again.
<br/>
![signout](https://lh3.googleusercontent.com/WUz8k5zoTzGOpVh0rwC85WxJKDeXa4grWpWaDMyfE8d5TZSfS4kesRQ31bfBgVQXbXf_CH0hXS3Rzg "SignOut")

## NPM Dependencies
**Run `npm install` in the terminal/command line:**
@google/maps: ^0.5.3
<br/>
body-parser: ^1.18.3
<br/>
chai: ^4.1.2
<br/>
dotenv: ^6.0.0
<br/>
express: ^4.16.3
<br/>
firebase: ^5.2.0
<br/>
mocha: ^5.2.0
<br/>
mysql2: ^1.5.3
<br/>
sequelize: ^4.38.0

## Step-by-Step
Run `node server.js` (starts the server, creates the tables in dookiedb).
<br/>
Visit localhost:8080

## Deployment
In a Pinch was deployed using Heroku and it's JawsDB add-on: https://elements.heroku.com/addons/jawsdb

## Built With
Bootstrap
<br/>
Node.js
<br/>
MySQL
<br/>
Sequelize
<br/>
Express Handlebars
<br/>
Express
<br/>
Heroku
<br/>
Firebase

## Authors
Todd Wilson - (https://github.com/taw1313)
<br/>
Kevin Godwin - (https://github.com/kgodwin88)
<br/>
Nataliia Frank - (https://github.com/nataliiafrank)
<br/>
Tyler Staples - (https://github.com/TylerJStaples)
<br/>
Candace Buchanan - (https://github.com/buchananc)

## Presentation Link
Click here: (https://www.emaze.com/@AOIFQZZFR/in-a-pinch)

## Acknowledgments
Hat tip to the TA's and instructors who were kind enough to help us out along the way!