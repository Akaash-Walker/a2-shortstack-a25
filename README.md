## Akaash's Web Application
I created a web application that allows users to input their information to be stored on the site. A user can input their name and DOB, which is then stored into a table. User's can delete their information by inputting their name and DOB, which will remove their information from the table. They can also change their DOB by inputting their name , which will allow them to update their DOB in the table.

### HTML 
1. 3 different HTML forms that allows users to input their name and DOB.
2. A table that displays the user's name, DOB, and age.
3. The age field is automatically calculated based on the DOB input.
4. Age is computed using DOB in the calculateAge() function.

### CSS
1. CSS used to style the web app. 
   1. Element selectors use to style the body, table, th, td, and form elements.
   2. ID selectors used for the table.
   3. Class selectors used for the flex containers.
5. CSS used to style the web app.
   1. Flex containers used to align the forms in a row.
   2. [Futura](https://fonts.adobe.com/fonts/futura-pt) font used for the entire web app, sources from Adobe Fonts.
   3. CSS contained is in a separate file (main.css).

### JavaScript
1. Front end JS used to make GET and POST requests to the backend server.
2. JS used to dynamically update the table when a user adds, deletes, or updates their information.

### Node.js
1. Handles all GET and POST requests from the front end.
2. Creates derived field (age) based on user input (DOB).

### Technical Achievements
1. web app is a single page application (SPA) that dynamically updates the table without refreshing the page.
2. User can modify the table by changing their DOB.

### Design/UX
1.  User interface testing to ensure the web app is user-friendly and easy to navigate.
2. Test 1: 
   1. Testing done with student Norris
   2. Norris was given the task of updating his DOB in the table. He was able to successfully update his DOB without any issues, with some confusion on how the update form worked. 
   3. Norris also determined that the web app allowed users to submit blank forms into the table.
   4. Issues resolved by adding clearer labels to each form and adding input validation to prevent blank forms from being submitted.
3. Test 2