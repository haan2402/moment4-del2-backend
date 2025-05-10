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
});

//funktionen lägger till ny användare
async function getUsers() {
    //variabler för input-fälten
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;

    //gör ett objekt av ny användare
    const userInfo = { username, password, fullname, email };
    const message = document.getElementById("message");

    //kontroll att alla fält måste vara ifylld, returnerar ett meddelande annars
    if(!username || !password || !fullname || !email) {
        message.textContent = "Alla fält måste vara ifyllda!";
        message.style.color = 'red';
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });

        //om registrering ok - skickas till inloggningssidan
        if(response.ok) {
            window.location.href = "login.html";
        }
    } catch(error) {
        console.error("Något gick fel - försök igen", error);
    }
}
