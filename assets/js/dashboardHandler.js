
// creating variables for all screens in dashboard

const homeScreen = document.getElementById("dashboard-home");
const addUsersScreen = document.getElementById("dashboard-add-users");
const addUsersBtn = document.getElementById("addUsersBtn");
const invitationsScreen = document.getElementById("dashboard-invitations")
const feedbacksScreen = document.getElementById("dashboard-feedbacks");

// menu btns

const menuHomeBtn = document.getElementById("menuHomeBtn");
const menuFeedbacksBtn = document.getElementById("menuFeedbacksBtn");
const menuInvitaionsBtn = document.getElementById("menuInvitationsBtn");
const menuAddUsersBtn = document.getElementById("menuAddUsersBtn");
const menuSignOutBtn = document.getElementById("menuSignOutBtn");


// let activeScreen = sessionStorage.getItem("activeScreen");

let  activeScreen;
//object of screens and menu button combinations

const activsScreenBtns = {

    "dashboard-home" : "menuHomeBtn",
    "dashboard-add-users" : "menuAddUsersBtn",
    "dashboard-invitations" : "menuInvitationsBtn",
    "dashboard-feedbacks" : "menuFeedbacksBtn"

}

setInitialScreen();
// sets the home screen to visible

function setInitialScreen() {

    
    activeScreen = sessionStorage.getItem("activeScreen");

    if(activeScreen === null) {

        homeScreen.classList.add("active")
        setActiveScreen("dashboard-home")
    }
    else {
        let screenToShow = document.getElementById(activeScreen);
        if(screenToShow == null) {
            sessionStorage.clear();
            setInitialScreen();
        }
        else {
            screenToShow.classList.add('active');
        }
       
    }

}

window.addEventListener('load', () => {
    let activeBtn = document.getElementById(activsScreenBtns[activeScreen]);
    if(activeBtn != null) {
        activeBtn.click();
    }
    
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

if(menuInvitaionsBtn !== null) {
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
    
        if(invitations.length == 0)
        {
            let inviteContainer = document.createElement('div');

            if(userType == "Employee" && isAdmin == "false") {
                
                inviteContainer.innerHTML = `
                    <h1>You have no invitations!!</h1>
                `
                invitationsContainer.appendChild(inviteContainer)
            }
            else {
                inviteContainer.innerHTML = `
                    <h1>You haven't invited anyone yet</h1>
                `
                invitationsContainer.appendChild(inviteContainer)
            }

        }
        else {

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
                        <button class="invite-btn invite-accept-button" data-inviteId=${invite._id} data-type="accept" ><i class="invite-icons fa-solid fa-check"></i> Accept</button>
                        <button class="invite-btn invite-reject-button" data-inviteId=${invite._id} data-type="reject" ><i class="invite-icons fa-solid fa-xmark"> </i>Reject</button>
                    </div>                
        
                    `
                    inviteContainer.setAttribute('data-inviteContainerId', invite._id);
        
                    invitationsContainer.appendChild(inviteContainer)
        
                } 
        
                
        
            
            } 
            
            else {
        
                
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
        
                    inviteContainer.setAttribute('data-id', invite._id);
        
                    invitationsContainer.appendChild(inviteContainer)
        
                }
            }
        }
    
    })
}


//when user accepts or rejects invitation

window.addEventListener('click', (e) => {
    if(e.target.classList.contains("invite-btn")) {
        let id = e.target.dataset.inviteid;
        let invitation = document.querySelector(`[data-invitecontainerid = "${id}"]`);
        invitation.style.display = "none";
        if(e.target.dataset.type == "accept") {

            fetch(`/profile/acceptInvitation?invite=${id}`, {
                method : "POST",
            })
            .then((res) => {
                window.location.replace('/');
            })

        }
        else if(e.target.dataset.type == "reject") {

            fetch(`/profile/rejectInvitation?invite=${id}`, {
                method : "POST",
            })
            .then((res) => window.location.reload());

        }
    }
});


//feedbacks screen

menuFeedbacksBtn.addEventListener('click', (e) => {
    
    hideActive();
    feedbacksScreen.classList.add("active"); // sets feedbacks screen as active.
    setActiveScreen("dashboard-feedbacks");
    

})