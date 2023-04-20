let userTypeSection = document.getElementById("user_type_section");
let employeeRegisterSection = document.getElementById("employee_register_section");
let organizationRegisterSection = document.getElementById("organizations_register_section");
let organizationSetupSection = document.getElementById("organizations_setup_section");
let employeeRegistrationForm = document.getElementById("employeeRegistrationForm");
let organizationRegistrationForm = document.getElementById("organizationRegistrationForm")

// array containing all the sections 

let sections = [userTypeSection, employeeRegisterSection, organizationRegisterSection, organizationSetupSection]

// function to set all the heights to zero except for the active section

function hideAllSections(sectionToShow) {
    console.log("Function called")
    for(let section of sections) {
        console.log(section)
        section.style.height = "0";
    }
    sectionToShow.style.height = "100%";
}

// setting the initial height of all sections expcept the Usertype to zero;

hideAllSections(userTypeSection);

// when userTypeIcons are clicked 

document.getElementById("employeeBtn").addEventListener('click', () => {
    hideAllSections(employeeRegisterSection); //shows employee register section
})

document.getElementById("OrganizationBtn").addEventListener('click', () => {
    hideAllSections(organizationRegisterSection); //shows organization register section
})

// employee registration form 

employeeRegistrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let password = document.getElementById("PasswordEmployee").value;
    let confirmPassword = document.getElementById("ConfirmPasswordEmployee").value;
    if(password == confirmPassword) {
        employeeRegistrationForm.submit();
    }
    else {
        alert("Password Mismatch")
    }
})

organizationRegistrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let password = document.getElementById("PasswordOrganization").value;
    let confirmPassword = document.getElementById("ConfirmPasswordOrganization").value;
    if(password == confirmPassword) {
        employeeRegistrationForm.submit();
    }
    else {
        alert("Password Mismatch")
    }
})
