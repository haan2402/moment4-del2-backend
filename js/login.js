"use strict";

//hanterar formulär för inloggning
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('login-form');
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await loginUsers();
        });
    }
});

//logga in användare
async function loginUsers() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const message = document.getElementById("message");
    
        //kontroll att alla fält måste vara ifylld, returnerar ett meddelande annars
        if(!username || !password) {
            message.textContent = "Alla fält måste vara ifyllda!";
            message.style.color = 'red';
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });
    
            const userData = await response.json(); 

            //om inloggning ok - skickas till admin-sidan
            if(response.ok) {
                sessionStorage.setItem("token", userData.response.token);

                window.location.href = "admin.html";
                
            } else {
                message.textContent = userData.error || "Fel användarnamn/lösenord";
                message.style.color = 'red';
            }
        } catch(error) {
            console.error("Något gick fel - försök igen", error);
            message.textContent = "Något gick fel - försök igen";
            message.style.color = 'red';
        }
}