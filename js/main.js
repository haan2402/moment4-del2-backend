"use strict";

//hanterar formulär för nya användare
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('register-form');
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await getUsers();
        });
    }

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
});



window.onload = init;




//hämtar användare
async function getUsers() {
    try {
        const response = await fetch("http://localhost:3000/api/register")

        if(response.ok) {
            const data = await response.json();

            writeUser(data);
        }
    } catch(error) {
        console.log("Gick inte att hämta data...")
    }
}