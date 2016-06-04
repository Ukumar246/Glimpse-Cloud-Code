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
    // DOM ID's
    var ID_emailTextInput = "emailTextInput";
    var ID_signupButton = "signupButton";
    
    var emailElement = document.getElementById(ID_emailTextInput);
    var buttonElement = document.getElementById(ID_signupButton);
    var buttonAddonTag = "<i class=\"fa fa-send\">";    // Static tag for that image 
    
    var email = emailElement.value;
    
    var isValid = validateEmail(email);
    console.log("Email is ", isValid);
    
    if (email == null || email == "")                   // Empty Form
    {   
        // CSS Changes to input box
        emailElement.style.border = "2px solid red";   //width style color|initial|inherit
        emailElement.placeholder = "Please enter your email";
        
        console.log("Empty Request");
        return;    
    }
    else if (!isValid){                                // Bad Email
        emailElement.style.border = "2px solid red";   //width style color|initial|inherit
        emailElement.value = null;
        emailElement.placeholder = "Try again";
        console.log("Bad Email");
        return;
    }
    
    // Revert CSS Changes
    emailElement.style.border = "1px solid #ccc";      //width style color|initial|inherit
    
    console.log("Signing up user " + email);
    var Request = Parse.Object.extend("SignupRequest");
    var newRequest = new Request();

    newRequest.set("name", "Unknown");
    newRequest.set("email", email);
    newRequest.set("source", "Webpage/Glimpse/1.0");

    newRequest.save(null, {
      success: function(newRequest) {
          emailElement.value = null;
          emailElement.placeholder = "Sweet! You're on the list.";
          buttonElement.innerHTML = "Signed Up!" + buttonAddonTag;
          buttonElement.state = 0;
          
          //emailElement.removeEventListener("keydown", keyHandler);
      },
      error: function(newRequest, error) {
          var errorMessage = error.message;
          emailElement.value = null;
          emailElement.placeholder = errorMessage;
      }
    });
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function ParseInit()
{
    var appID = "0R6LwrHMNcPYkNbXZ7Opm6W34am82n0x2r49Xhg0";
    var jsKey = "F6HFSkJideOsyt5hsxeo8wktfJ5pjiXV8bkWFZYH";
    Parse.initialize(appID, jsKey);
    console.log("Connected to database.");
}

function attachKeyBindings()
{
    var ID_emailTextInput = "emailTextInput";
    var emailElement = document.getElementById(ID_emailTextInput);
    
    // Enter key
    emailElement.addEventListener("keydown", keyHandler);
    emailElement.addEventListener("click", clickHandler);
    
}

function clickHandler() {
    var ID_signupButton = "signupButton";
    var buttonElement = document.getElementById(ID_signupButton);
    var buttonAddonTag = "<i class=\"fa fa-send\">";                // Static tag for that image 
    
    var buttonTitle = buttonElement.innerHTML;
    
    if (buttonElement.state == 0)            // Disabled Button Text
    {
        buttonElement.innerHTML = "Signup" + buttonAddonTag;
        buttonElement.state = 1;            // Don't repeatedly come back here
    }
    
    return;
}

function keyHandler(e)
{
    if (e.keyCode === 13) 
    {  //checks whether the pressed key is "Enter"
            parseSignupRequest();
    }
}

function fetchAllPosts(){
    var Post = Parse.Object.extend("Post");
    var query = new Parse.Query(Post);
    
    query.find({
        success: function(results) {
            console.log("* Found " + results.length + " Posts");
            
            var locations = [];
            
            for (var a=0; a< results.length; a++){
                var post = results[a];
                var comment = post.get("comment");
                console.log(" - Title: " + comment);
                
                var geoPoint = post.get("location");
                // [Locations] > ['Maroubra Beach', -33.950198, 151.259302, 1]
                var postProperty = [comment, geoPoint.latitude, geoPoint.longitude, 1];
                
                locations.push(postProperty);
            }
            populateMap(locations);
        },
        error: function(error) {
            console.log("! No Posts Found!");
        }
    });
}

function centerMap(){
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(43.644647, -79.384847),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}

function populateMap(locations){
    
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(43.644647, -79.384847),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) 
    { 
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}