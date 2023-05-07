
// creating variables for all screens in dashboard

const homeScreen = document.getElementById("dashboard-home");
const addUsersScreen = document.getElementById("dashboard-add-users");
const addUsersBtn = document.getElementById("addUsersBtn");
const invitationsScreen = document.getElementById("dashboard-invitations")


// menu btns

const menuHomeBtn = document.getElementById("menuHomeBtn");
const menuFeedbacksBtn = document.getElementById("menuFeedbacksBtn");
const menuInvitaionsBtn = document.getElementById("menuInvitationsBtn");
const menuAddUsersBtn = document.getElementById("menuAddUsersBtn");
const menuSignOutBtn = document.getElementById("menuSignOutBtn");

let deafultScreen = document.querySelector(".active");
let activeScreen = sessionStorage.getItem("activeScreen");



// sets the home screen to visible

if(activeScreen === null) {

    homeScreen.classList.add("active")
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

//menu buttons event listeners

// hides all screens and shows home screen when btn is clicked

menuHomeBtn.addEventListener('click', function (e) {
    hideActive();
    homeScreen.classList.add('active');
    setActiveScreen("dashboard-home");
})

//hides all screens and shows add users screen when btn is clicked

if(menuAddUsersBtn !== null) {
    menuAddUsersBtn.addEventListener('click', function(e) {

        hideActive();
        addUsersScreen.classList.add("active"); // sets add users screen as active.
        setActiveScreen("dashboard-add-users");
    })
}


// when user signs out clear the session storage

menuSignOutBtn.addEventListener('click', function () {
    sessionStorage.clear();
    window.location.replace("/profile/signout");
})


// when user clicks on invitaion btn

menuInvitaionsBtn.addEventListener('click', async function(e) {

    hideActive();
    invitationsScreen.classList.add('active');
    setActiveScreen("dashboard-invitations");

    let userType = e.target.dataset.type;

    let invitations = await fetch(`profile/getInvitations`)
    .then(res => res.json())

    let invitationsContainer = document.querySelector(".dashboard-invitations-container");

    for(let invite of invitations) {

        let inviteContainer = document.createElement('div')
        inviteContainer.classList.add('inviteContainer')

        inviteContainer.innerHTML = `

            <p>${invite.email}</p>
            <p>${invite.company.name}</p>
            <p>${invite.invitationBy.email}</p>

        `

        invitationsContainer.appendChild(inviteContainer)

    }
})