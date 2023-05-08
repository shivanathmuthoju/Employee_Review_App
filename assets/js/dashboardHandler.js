
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


//object of screens and menu button combinations

const activsScreenBtns = {

    "dashboard-home" : "menuHomeBtn",
    "dashboard-add-users" : "menuAddUsersBtn",
    "dashboard-invitations" : "menuInvitationsBtn"

}


// sets the home screen to visible

if(activeScreen === null) {

    homeScreen.classList.add("active")
    setActiveScreen("dashboard-home")
}
else {
    document.getElementById(activeScreen).classList.add('active');
   
}

window.addEventListener('load', () => {
    document.getElementById(activsScreenBtns[activeScreen]).click();
})

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

    console.log("Invitaions")
    hideActive();
    invitationsScreen.classList.add('active');
    setActiveScreen("dashboard-invitations");

    let userType = e.target.dataset.type;
    let isAdmin = e.target.dataset.admin;

    let invitations = await fetch(`profile/getInvitations`)
        .then(res => res.json())

        let invitationsContainer = document.querySelector(".dashboard-invitations-container");
        invitationsContainer.innerHTML = ""

    if(userType == "Employee" && isAdmin == "false") {

        for(let invite of invitations) {

            let inviteContainer = document.createElement('div')
            inviteContainer.classList.add('inviteContainer')

            inviteContainer.innerHTML = `

            <div class="invite-status-container">
                <span class="invite-status-indicator"></span>
                <p class="invite-status-text">${invite.status}</p>
            </div>
            <div class="invite-info"> 
                <p><strong>Company : </strong> ${invite.company.name}</p>
                <p><strong>Position : </strong> ${invite.position}</p>
                <p><strong>Invited By : </strong>  ${invite.invitationBy.name}</p>
            </div>
            <div class="invite-button-container">
                <button class="invite-accept-button" data-inviteId=${invite._id}>Accept</button>
                <button class="invite-reject-button" data-inviteId=${invite._id}>Reject</button>
            </div>                

            `

            invitationsContainer.appendChild(inviteContainer)



    } 
    
} else {

        
        for(let invite of invitations) {

            let inviteContainer = document.createElement('div')
            inviteContainer.classList.add('inviteContainer')

            inviteContainer.innerHTML = `

            <div class="invite-status-container">
                <span class="invite-status-indicator"></span>
                <p class="invite-status-text">${invite.status}</p>
            </div>
            <div class="invite-info"> 
                <p><strong>Email: </strong> ${invite.email}</p>
                <p><strong>Position : </strong> ${invite.position}</p>
                <p><strong>Is Admin : </strong> ${invite.isAdmin} </p>
                <p><strong>Invited By : </strong>  ${invite.invitationBy.name}</p>
            </div>
                

            `

            invitationsContainer.appendChild(inviteContainer)

        }
    }

})