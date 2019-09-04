//Global variables
var array = [];
var age;

//Function to show Play Game Button
  function showButton() {
    document.getElementById("start").style.display = "inline-block";
  }

//Create a submit function
function submitInfo() {
    document.getElementById("age").innerHTML = "";
    console.log("button was clicked");
    age = document.getElementById("age").value;
    array.push(age);
    
    //If player is under 8 then give them an alert and re-route to a different url
    console.log(age);
    if (age < 8) {
        //window.location = "window-location.html";
        document.getElementById("userinput").style.display = "none";
        document.getElementById("tooyoung").innerHTML = "Please come back when you are a little bit older!"
    }
        else {
        document.getElementById("userinput").style.display = "none";
        showButton();
        }
}
//When the submit button is clicked, begin audio and also submit age to localforage
document.querySelector("#submit").addEventListener("click", function () {
    event.preventDefault(); //not sure why but if I remove this then the audio doesn't work
    localforage.clear().then(submitInfo()); //cleared localforage here so it only saves age once
    //make an object to put the array
    let dataIn = {
        age: age,
    }
    localforage.getItem("saved").then(function (result) {
        if (!result) {
        result = [];
        }
        result.push(dataIn);
        localforage.setItem("saved", result)
        .then(function () {
            console.log(result);
            displayAgeResult();
    });
    });
});
function displayAgeResult(){
    localforage.getItem("saved").then(function (result) {
      console.log(result);
      if (!result) {
        result = [];
      }
      localforage.setItem("saved", result)
        .then(function () {
          console.log(result);
          for(var i=0; i<result.length;i++){
            console.log(result[i]);
            // if (i<8) {
                // alert("Please come back when you are a little bit older!");
                // window.location.href = "window-location.html";
            // } tried to get the age to work at the end but couldn't get it to function right.
          }   
        });
    });
  };
   
  displayAgeResult();