let user = document.querySelector("#InputUser");
let email = document.querySelector("#InputEmail1");
let pass = document.querySelector("#InputPassword");
let submit = document.querySelector("#submit");
let loginBody = document.querySelector(".login-body");


function setUser() {
  let userData = {
    userName: user.value,
    email: email.value,
    pass: pass.value,
    score:0
    
  };

  if (
    JSON.parse(localStorage.getItem(user.value)) != null &&
    JSON.parse(localStorage.getItem(user.value)).userName == user.value
  ) {
    console.log("x");
    loginBody.innerHTML += /*html*/ `<p class='text-danger'>This username is already selected Please select a different user name</p>`;
    return;
  }

  if (
    !userData.userName == "" ||
    !userData.email == "" ||
    !userData.pass == ""
  ) {
    localStorage.setItem(user.value, JSON.stringify(userData));
    user.value = "";
    email.value = "";
    pass.value = "";
    window.location.href = "../home.html";
  }
}

submit.addEventListener("click", setUser);
