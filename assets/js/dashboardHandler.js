
// creating variables for all screens in dashboard

const homeScreen = document.getElementById("dashboard-home");
const addUsersScreen = document.getElementById("dashboard-add-users")
const addUsersBtn = document.getElementById("addUsersBtn")

let deafultScreen = document.querySelector(".active");
let activeScreen = sessionStorage.getItem("activeScreen");

console.log(activeScreen)

// sets the home screen to visible

if(activeScreen === null) {

    homeScreen.classList.add("active")
    // sessionStorage.setItem('activeScreen', "dashboard-home");
    setActiveScreen("dashboard-home")
}
else {
    document.getElementById(activeScreen).classList.add('active');
}


//sets session storage to current screen

function setActiveScreen(screen) {
    sessionStorage.setItem('activeScreen', screen);
}

//hides active screen 

function hideActive() {
    let activeScreen = document.querySelector(".active") //gets active screen
    activeScreen.classList.remove("active")
}

// hides all screens and shows home screen when btn is clicked

function getHome() {
    hideActive();
    homeScreen.classList.add('active');
    setActiveScreen("dashboard-home");
}

//hides all screens and shows add users screen when btn is clicked

function addUsers () {
    
    hideActive();
    addUsersScreen.classList.add("active"); // sets add users screen as active.
    setActiveScreen("dashboard-add-users");

}