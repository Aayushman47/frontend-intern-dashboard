# Frontend Developer Assignment 





## Scalable Web App with Authentication \& Dashboard



This project is a full-stack web application built as part of the Frontend Developer Intern assignment.  

It demonstrates modern frontend practices, secure authentication, backend API integration, and a responsive dashboard with full CRUD functionality.







### Features



##### Authentication



\- User registration and login

\- JWT-based authentication

\- Password hashing using bcrypt

\- Clear, user-friendly error messages

\- Protected routes (dashboard accessible only after login)



##### Dashboard



\- Displays logged-in user information

\- Full CRUD operations on tasks:

&nbsp; - Create task

&nbsp; - Read tasks

&nbsp; - Update task (inline edit)

&nbsp; - Delete task

\- Real-time task search / filter

\- Responsive and modern UI using Material UI



##### Security



\- JWT authentication middleware

\- Secure password storage

\- Route-level authorization

\- Proper HTTP status codes and validation



---



### Tech Stack



##### Frontend

\- React (Vite)

\- Material UI (MUI)

\- React Router

\- Axios

\- Context API for authentication state



##### Backend

\- Node.js

\- Express.js

\- MongoDB with Mongoose

\- JWT for authentication

\- bcryptjs for password hashing

\- express-validator for validation



---



### Project Structure



frontend-intern-dashboard/

│

├── backend/

│ ├── src/

│ │ ├── controllers/

│ │ ├── routes/

│ │ ├── models/

│ │ ├── validators/

│ │ ├── middleware/

│ │ └── app.js

│ └── server.js

│

└── frontend/

└── src/

├── pages/

├── components/

├── context/

├── services/

└── routes/



---



### Setup Instructions



1. Clone the Repository: git clone <your-github-repo-url>

&nbsp;			cd frontend-intern-dashboard



2\. Backend Setup:cd backend

&nbsp;		npm install



3\. Create a .env file: PORT=5000

&nbsp;		MONGO\_URI=your\_mongodb\_connection\_string

&nbsp;		JWT\_SECRET=your\_secret\_key



4\. Start backend: npm run dev(backend runs on http://localhost:5000)



5\. Frontend Setup: cd frontend

&nbsp;		   npm install

&nbsp;		   npm run dev(frontend runs on http://localhost:5173)



---



### API Endpoints



Auth



* POST /api/auth/register – Register user



* POST /api/auth/login – Login user



User



* GET /api/user/me – Get logged-in user (protected)



Tasks



* GET /api/tasks – Fetch tasks



* POST /api/tasks – Create task



* PUT /api/tasks/:id – Update task



* DELETE /api/tasks/:id – Delete task



---



### Error Handling and Validation



1. Backend validation using express-validator
   
2. Backend error messages are forwarded directly to frontend
   
3. Clear UX for cases like:

* Password too short



* User already exists



* Incorrect password



* User not found



---



### API Testing





* All APIs were tested using Postman.



* JWT tokens are passed via Authorization headers for protected routes.



Screenshots of Frontend:
1.[Login Page](screenshots/Login.png)
2.[Register Page](screenshots/Register.png)
3.[Dashboard Page](screenshots/Dashboard.png)




Author



Aayushman Saini









