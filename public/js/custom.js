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
        emailElement.placeholder = "Please enter your email here";
        
        console.log("Empty Request");
        return;    
    }
    else if (!isValid){                                // Bad Email
        emailElement.style.border = "2px solid red";   //width style color|initial|inherit
        emailElement.value = null;
        emailElement.placeholder = "Try Again";
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
    newRequest.set("source", "Webpage/Warp_V1.0");

    newRequest.save(null, {
      success: function(newRequest) {
          emailElement.value = null;
          emailElement.placeholder = "Cool! Check your inbox!";
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
    
    var disabled_buttonValue = "Signed Up!" + buttonAddonTag;
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