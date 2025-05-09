"use strict";

//skyddar admin sidan och dirigerar om till logga in sidan
if(!localStorage.getItem("token")) {
    window.location.href = "login.html";
}