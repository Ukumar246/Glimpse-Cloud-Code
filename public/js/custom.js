/* Theme Name: The Project - Responsive Website Template
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Author e-mail:htmlcoder.me@gmail.com
 * Version:1.2.0
 * Created:March 2015
 * License URI:http://support.wrapbootstrap.com/
 * File Description: Place here your custom scripts
 */

function parseSignupRequest()
{      
    var email = document.getElementById("emailTextInput").value;
    if (email == null || email == "")
    {
        console.log("Empty Request");
        return;    
    }

    console.log("Signing up user " + email);
    var Request = Parse.Object.extend("SignupRequest");
    var newRequest = new Request();

    newRequest.set("name", "Unknown");
    newRequest.set("email", email);
    newRequest.set("source", "Webpage/Glimpse_V1.0");

    newRequest.save(null, {
      success: function(newRequest) {

        alert("Signup Successful!");
      },
      error: function(newRequest, error) {
        alert("Failed to signup!, with error code: " + error.message);
      }
    });
}

function ParseInit()
{
    var appID = "0R6LwrHMNcPYkNbXZ7Opm6W34am82n0x2r49Xhg0";
    var jsKey = "F6HFSkJideOsyt5hsxeo8wktfJ5pjiXV8bkWFZYH";
    Parse.initialize(appID, jsKey);
    console.log("Connected to database.");
}