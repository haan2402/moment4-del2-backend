## Moment 4 Del 2
Denna delen av uppgiften går ut på att hämta data från del 1 med hjälp av Fetch API.
På sidan finns det en startsida, en sida för registrering där man kan lägga in nya användare, en logga in-sida där man kan logga in med användarnamn
och lösenord och sedan en skyddad sida admin som endast inloggade användare kan se.

### Upplägg
- **Startsida**: Sida med information om webbplatsen.
- **Registrera**: Sida med ett formulär där man kan registrera sig som ny användare, vid lyckad registrering dirigeras man om till inloggningssidan.
- **Logga in**: Inloggningsformulär, vid lyckad inloggning dirigeras man om till Admin-sidan.
- **Admin**: En skyddad sida som endast syns när man är inloggad, visar befintliga användare.

### Säkerhet 
JWT används för att skydda admin-sidan, token sparas i LocalStorage och skickas med vid varje anrop till den skyddade sidan. 

### Struktur i JavaScript
- `checkAuth.js`- kod för att skydda admin sidan från besökare som inte har inloggning.
- `login.js` - kod för att hantera inloggning.
- `main.js` - kod för att hantera registrering av ny användare, navigeringsmenyn och visa användare på admin.

#### Av
Hanna Angeria, haan2402@student.miun.se