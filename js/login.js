import { drawGame } from "./snake.js";
let userInput = document.querySelector("#userName");
let passInput = document.querySelector("#inputPassword");
let loginNav = document.querySelector("#login-nav");
let loginDiv = document.querySelector(".login");
let submitLogin = document.querySelector("#submitLogin");
export let getUser;


 function login() {
  getUser = JSON.parse(localStorage.getItem(userInput.value))||{};
  console.log(getUser);
  if (getUser.pass == passInput.value) {
    loginDiv.style.display = "none";
    drawGame();
    return  getUser;
  }
  if(getUser.pass){
  if (getUser.pass != passInput.value) {
    loginDiv.innerHTML += /*html*/ `
        <p class='bg-danger text-white'>the password or user name is unforced</p>`;
  } }else {
    loginDiv.innerHTML += /*html*/ `
        <p>You need to <a class="text-decoration-none" href="signIn.html">sign in</a></p>`;
  }
}

loginNav.addEventListener("click", function () {
  loginDiv.style.display = "block";
});
submitLogin.addEventListener("click", login);
 