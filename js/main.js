"use strict";

const menu = document.getElementById("menu");

//hanterar formulär för nya användare
document.addEventListener('DOMContentLoaded', () => {
    getMenu();
    getUsers();

    const form = document.getElementById('register-form');
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await registerUsers();
        });
    }
});

//för att ändra menyn om man är inloggad eller inte
function getMenu() {
    if(!menu) return;

    if(localStorage.getItem("token")) {
        //denna meny visas om en admin är inloggad
        menu.innerHTML = `
        <li><a href="index.html">Start</a></li>
        <li><a href="register.html">Registrera</a></li>
        <li><a href="admin.html">Admin</a></li>
        <li><button id="logout-btn" class="logout-btn">Logga ut</button></li>
        `;

        const logoutButton = document.getElementById("logout-btn");
        if(logoutButton) {
            logoutButton.addEventListener("click", () => {
                localStorage.removeItem("token");
                window.location.href = "login.html";
            });
        }
    } else {
        //denna visas om admin inte är inloggad
        menu.innerHTML = `
        <li><a href="index.html">Start</a></li>
        <li><a href="register.html">Registrera</a></li>
        <li><a href="login.html">Logga in</a></li>
        `;
    }
}

//funktionen lägger till ny användare
async function registerUsers() {
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

//funktion för att hämta registrerade användare
async function getUsers() {
    //meddelande som visar att man inte är inloggad i konsollen
    const token = localStorage.getItem("token");
    if(!token) {
        console.error("Användaren är inte inloggad");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/users", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        const data = await response.json();
        writeUsers(data.users);

    } catch(error) {
        console.error("Något gick fel - försök igen", error);
    }
}

//funktion för att skriva ut de registrerade användarna på admin sidan
function writeUsers(users) {
    const userContainer = document.getElementById("protected");

    if(!userContainer) return;

    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
        ${user.fullname}, ${user.username} - ${user.email};
        `;
    
        userContainer.appendChild(li);
    });
}
