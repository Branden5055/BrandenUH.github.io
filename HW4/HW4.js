/* 
 Name: Branden Brar
 File: hw4.js
 Date Created: 2025-10-12
 Date Updated: 2025-11-14
 Purpose: JavaScript for Homework 4 

*/

var error_flag = 0; 

function setup() {
    error_flag = 0; 
    console.log(error_flag);
}

function getdata1() {
    
    var formcontents = document.getElementById("signup");
    var datatype;
    var i;
    var formoutput = "<table border='1'><tr><th>Name of Data</th><th>Type</th><th>Current Value</th></tr>";
    for (i = 0; i < formcontents.elements.length; i++) {
        console.log("item: " + i + " " + formcontents.elements[i].name + " = " + formcontents.elements[i].value);

        
        if (formcontents.elements[i].value !== "") {
            datatype = formcontents.elements[i].type;

            switch (datatype) {
                case "checkbox":
                    if (formcontents.elements[i].checked) {
                        let label = document.querySelector(`label[for="${formcontents.elements[i].id}"]`);
                        let labelText = label ? label.textContent.trim() : formcontents.elements[i].value;

                        formoutput += `<tr><td>${formcontents.elements[i].name}</td>`;
                        formoutput += `<td>${datatype}</td>`;
                        formoutput += `<td>${labelText} (Checked)</td></tr>`;
                    }
                    break;
                case "radio":
                    if (formcontents.elements[i].checked) {
                        formoutput += "<tr><td>" + formcontents.elements[i].name + "</td>";
                        formoutput += "<td>" + datatype + "</td>";
                        formoutput += "<td>" + formcontents.elements[i].value + "</td></tr>";
                    }
                    break;
                case "button":
                case "submit":
                case "reset":
                    break;

                default:
                    formoutput += "<tr><td>" + formcontents.elements[i].name + "</td>";
                    formoutput += "<td>" + datatype + "</td>";
                    formoutput += "<td>" + formcontents.elements[i].value + "</td></tr>";
            }
        }
    }

    formoutput += "</table>";

    var outputDiv = document.getElementById("outputformdata");

    if (outputDiv) {
        outputDiv.innerHTML = formoutput;
    } else {
        console.error("Output div not found!");
    }
}

// Pain Level Range Slider
var slider = document.getElementById("painlevel");
var output = document.getElementById("paindisplay");
if (slider && output) {
  output.innerHTML = slider.value;
  slider.oninput = function() {
      output.innerHTML = this.value;
      localStorage.setItem("painlevel", this.value);
  }
}

//checking for password validation

function checkForMatch() {
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("password2").value;
    var message = document.getElementById("matchMessage");

    if (confirm === "") {
        message.textContent = "";
    } else if (password === confirm) {
        message.textContent = "Passwords match!";
        message.style.color = "green";
    } else {
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
        error_flag = 1;
    }
}

function validatePassword() {
    var password = document.getElementById("password").value;
    var message = document.getElementById("passwordMessage");
    var userID = document.getElementById("userID").value;


    // Have at least 8 chars, 1 uppercase, 1 lowercase, and 1 number and 1 special character.
    var strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_=+\\\/><.,`~]).{8,30}$/;

    if (password === "") {
        message.textContent = "";
        return false;
    } else if (password === userID) {
        message.textContent = "Password cannot be the same as the username!";
        message.style.color = "red";
        error_flag = 1;
        return false;

    } else if (strongRegex.test(password)) {
        message.textContent = "Strong password!";
        message.style.color = "green";
        return true;
    }
    else {
        message.textContent = "Password must be at least 8 characters with uppercase, lowercase, and numbers and a special character.";
        message.style.color = "red";
        error_flag = 1;
        return false;
    }
}


//Checking for Date of Birth
function checkDOB() {
    var input = document.getElementById("dob").value;
    var errorMessage = document.getElementById("dobErrorMessage");

    if (!input) {
        errorMessage.innerHTML = "Please enter your date of birth.";
        error_flag = 1;
        return;
    }

    var dob = new Date(input);
    var today = new Date();
    today.setHours(0, 0, 0, 0); 

    var age = today.getFullYear() - dob.getFullYear();
    var month = today.getMonth() - dob.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
        age--; 
    }

    if (dob > today) {
        errorMessage.innerHTML = "Date of birth cannot be in the future.";
        error_flag = 1;
    } else if (age > 120) {
        errorMessage.innerHTML = "Date of Birth cannot be before 120 years from today.";
        error_flag = 1;
    } else {
        errorMessage.innerHTML = ""; 


        localStorage.setItem("dob", input);
     
    }
}


function checkFirstName() {
    var x = document.getElementById("firstName").value;
    if (x.length < 2) {
        document.getElementById("firstNameMessage").innerHTML = "Invalid first name too short.";
        error_flag = 1;
    }
    else {
        if (x.match(/^[a-zA-Z\s'-]+$/)) {
            document.getElementById("firstNameMessage").innerHTML = "";   
            setCookie("firstNameCookie", x, 1);
         
            localStorage.setItem("firstName", x);
         
        }
        else {
            document.getElementById("firstNameMessage").innerHTML = "Invalid characters in name.";
            error_flag = 1;
        }
    }
}



function checkMiddle() {
    let x = document.getElementById("middleInitial").value;
    if (x.length > 0) {
        if (x.match(/^[A-Za-z]$/)) {
            document.getElementById("middleInitialMessage").innerHTML = "";
         
            localStorage.setItem("middleInitial", x);

        }
        else {
            document.getElementById("middleInitialMessage").innerHTML = "Invalid characters in middle name.";
            error_flag = 1;
         
        }
    }
}



function checkLastName() {
    let x = document.getElementById("lastName").value;
    if (x.length < 2) {
        document.getElementById("lastNameMessage").innerHTML = "Invalid last name too short.";
        error_flag = 1;
    }
    else {
        if (x.match(/^[A-Za-z\s'-]{2,}$/)) {
            document.getElementById("lastNameMessage").innerHTML = "";
         
            localStorage.setItem("lastName", x);

        }
        else {
            document.getElementById("lastNameMessage").innerHTML = "Invalid characters in last name.";
            error_flag = 1;
         
        }
    }
}



function checkUserID() {
    var x = document.getElementById("userID").value;
    var userIDMessage = document.getElementById("userIDMessage");

    if (x.match(/^[A-Za-z][A-Za-z0-9_-]{4,19}$/)) {
        userIDMessage.innerHTML = "";
     
        localStorage.setItem("userID", x);
     
    } else {
        userIDMessage.innerHTML = "User ID must start with a letter and be at least 5 characters long but not longer than 20.";
        error_flag = 1;
  
    }
}


function checkAddress1() {
    let x = document.getElementById("address1").value;
    if (x.length < 2) {
        document.getElementById("addressOneMessage").innerHTML = "Enter at least two characters on Address Line 1";
        error_flag = 1;   
    }
    else {
        document.getElementById("addressOneMessage").innerHTML = "";
        localStorage.setItem("address1", x);
    }
}

function checkAddress2() {
    let x = document.getElementById("address2").value;
    if (x.length < 2 && x.length > 0) {
        document.getElementById("addressTwoMessage").innerHTML = "Enter at least two characters on Address Line 2";
        error_flag = 1;      
    }
    else {
        document.getElementById("addressTwoMessage").innerHTML = "";
        localStorage.setItem("address2", x);
    }

}

function checkcity() {

    let x = document.getElementById("city").value;
 
    if (x.match(/^[A-Za-z\s'-]{2,}$/)) {
        document.getElementById("city_message").innerHTML = "";
     
        localStorage.setItem("city", x);

    }
    else {
        document.getElementById("city_message").innerHTML = "Invalid characters in City name.";
        error_flag = 1;
     
    }
}

function checkEmail() {
 let email = document.getElementById("email");
 let message = document.getElementById("emailMessage");

 email.value = email.value.toLowerCase();
 let emailValue = email.value;

 let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/;

 if (emailValue === "") {
  message.innerHTML = "Email is required.";
  error_flag = 1;
 }
 else if (!regex.test(emailValue)) {
  message.innerHTML = "Invalid Email Format.";
  error_flag = 1;
 }
 else {
  message.innerHTML = "";
 }
}

function checkForErrors() {
    if (error_flag === 0) {
        document.getElementById("submit").disabled = false;
    } else {
        document.getElementById("submit").disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('signup');
  if (form) {
    form.addEventListener('input', validateForm);
  }
});

// Start of Cookies Code
function setCookie(cookieName, cookieValue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + ";" + expires + ";path=/;SameSite=Strict";
}


function checkCookie() {
    let firstNameCookie = getCookie("firstNameCookie");
    if (firstNameCookie != "" && document.getElementById("popupMessage") && document.getElementById("customPopup")) {
        document.getElementById("popupMessage").textContent = "Welcome back " + firstNameCookie + 
            ".\nPress OK to confirm or Cancel if this isn't " + firstNameCookie + ".";
        
        document.getElementById("customPopup").style.display = "block";
        
        document.getElementById("popupConfirm").onclick = function() {
            document.getElementById("firstName").value = firstNameCookie;
            readBackForm();
            document.getElementById("customPopup").style.display = "none";
        };
        
        document.getElementById("popupCancel").onclick = function() {
            setCookie("firstNameCookie", "", 0);
            document.getElementById("customPopup").style.display = "none";
            localStorage.clear();
        }
    }
}

function getCookie(cookieName) {
    let name = cookieName + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(name.length, c.length));
        }
    }
    return "";
}

function deleteCookie(cookieName) {
    setCookie(cookieName, "", -1);
}

document.addEventListener("DOMContentLoaded", function () {
    fetchStates();
    checkCookie();
});

function readBackForm() {
    if (localStorage.getItem("firstName")) {
        document.getElementById("firstName").value = localStorage.getItem("firstName");
    }
    if (localStorage.getItem("middleInitial")) {
        document.getElementById("middleInitial").value = localStorage.getItem("middleInitial");
    }
    if (localStorage.getItem("lastName")) {
        document.getElementById("lastName").value = localStorage.getItem("lastName");
    }
    if (localStorage.getItem("dob")) {
        document.getElementById("dob").value = localStorage.getItem("dob");
    }
    if (localStorage.getItem("userID")) {
        document.getElementById("userID").value = localStorage.getItem("userID");
    }
    if (localStorage.getItem("address1")) {
        document.getElementById("address1").value = localStorage.getItem("address1");
    }
    if (localStorage.getItem("address2")) {
        document.getElementById("address2").value = localStorage.getItem("address2");
    }
    if (localStorage.getItem("city")) {
        document.getElementById("city").value = localStorage.getItem("city");
    }
    if (localStorage.getItem("painlevel")) {
        document.getElementById("painlevel").value = localStorage.getItem("painlevel");
        document.getElementById("paindisplay").innerHTML = localStorage.getItem("painlevel");
    }
}

function timeClock() {
 const now = new Date();
 const formattedDateTime = now.toLocaleString();
 document.getElementById("today").textContent = formattedDateTime;
}
 setInterval(timeClock, 1000);
 timeClock();

async function fetchStates() {
 try {
  const response = await fetch("states.txt");

  if (!response.ok) {
   throw new Error("Error loading states: " + response.status);
  }

  const text = await response.text();
  document.getElementById("state").innerHTML = text;

 } catch (error) {
  document.getElementById("state").innerHTML = '<option value="">Unable to load states</option>';
 }
}


function validateForm() {
    error_flag = 0;

    checkFirstName();
    checkLastName();
    checkMiddle();
    checkDOB();
    checkUserID();
    validatePassword();
    checkForMatch();
    checkAddress1();
    checkAddress2();
    checkcity();
    checkEmail();
    checkForErrors();
}
