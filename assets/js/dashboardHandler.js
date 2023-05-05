
// creating variables for all screens in dashboard

let homeScreen = document.getElementById("dashboard-home");
let addUsersScreen = document.getElementById("dashboard-add-users")


let deafultScreen = document.querySelector(".active");

// sets the home screen to visible

if(deafultScreen === null) {

    homeScreen.classList.add("active")

}

//hides active screen 

function hideActive() {
    let activeScreen = document.querySelector(".active") //gets active screen
    activeScreen.classList.remove("active")
}

// hides all screens and shows home screen when btn is clicked

function getHome() {
    hideActive();
    homeScreen.classList.add('active')
}

//hides all screens and shows add users screen when btn is clicked

function addUsers () {
    
    hideActive();
    addUsersScreen.classList.add("active") // sets add users screen as active.


}