# Doctor Appointment Booking App

A full-stack web application for booking doctor appointments with essential features like user registration, login, profile management for both users and doctors, and seamless booking functionality. Built using the MERN (MongoDB, Express, React, Node.js) stack.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Architecture](#architecture)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)

---

## Features

### User Features
1. **Registration**: Users can sign up with their details.
2. **Login**: Secure authentication using JSON Web Tokens (JWT).
3. **Profile Management**: Update user profile information.
4. **Doctor Booking**: Browse available doctors and book an appointment.

### Doctor Features
1. **Registration and Login**: Similar to users, doctors can register and log in.
2. **Profile Management**: Update profile details like specialization, availability, and contact.

### Core Functionalities
- Secure password storage with `bcryptjs`.
- Role-based profile management for users and doctors.
- End-to-end protected API routes with JWT.
- Database interactions using MongoDB.

---

## Technologies Used

### Frontend
- **React** with **Vite**: A fast and optimized development environment for React.
- **Tailwind CSS**: A utility-first CSS framework for creating sleek, responsive, and visually appealing designs.

### Backend
- **Node.js** with **Express.js**: Backend framework for handling API logic and server-side operations.
- **MongoDB**: Database for storing user, doctor, and booking data.

### Payment Integration
- **Stripe**: Integrated for secure, reliable, and seamless payment processing. Supports card payments and tracks transactions.

### Authentication & Security
- **JSON Web Token (JWT)**: Secure token-based authentication.
- **bcryptjs**: Password hashing for secure storage.

---

## Project Setup

### Prerequisites
- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB** (local or cloud-based like MongoDB Atlas)

### Frontend

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend

2. Create Vite Project:
   ```bash
   npm create vite@latest ./

3. Install Dependencies:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npm tailwindcss init -p
   npm i react-router-dom react-icons react-spinners react-toastify swiper

4. Start Server:
   ```bash
   npm run dev

### Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend

2. Initialize project:
   ```bash
   npm init

3. Install Dependencies:
   ```bash
   npm install express mongodb mongoose cors jsonwebtoken cookie-parser dotenv bcryptjs nodemon

4. Enviroment Setup (.env file):
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key

5. Start Server:
   ```bash
   npm run start-dev

---

## API Endpoints

### Authentication:
  - POST `/api/v1/auth/register` - Register a new user or doctor.
  - POST `/api/v1/auth/login` - Login and get a JWT.

### User:
  - GET `/api/v1/users` - Fetch user profile details (JWT protected).
  - PUT `/api/v1/users/{object._id}` - Update user profile details (JWT protected).

### Doctor:
  - GET `/api/v1/doctors/profile` - Fetch doctor profile details (JWT protected).
  - PUT `/api/v1/doctors/{object._id}` - Update doctor profile details (JWT protected).

### Booking:
  - POST `/api/bookings/create` - Book an appointment (JWT protected).
  - GET `/api/bookings/user` - Fetch user bookings (JWT protected).
  - GET `/api/bookings/doctor` - Fetch doctor appointments (JWT protected).

---

## Folder Structure:
```
DOCTOR-BOOKING-REACT-APP/
├── backend/
│   ├── auth/
│   │   └── verifyToken.js
│   ├── Controllers/
│   │   ├── authController.js         
│   │   ├── bookingController.js
│   │   ├── doctorController.js
│   │   ├── reviewController.js     
│   │   └── userController.js 
│   ├── models/
│   │   ├── UserSchema.js         
│   │   ├── DoctorSchema.js
│   │   ├── ReviewSchema.js       
│   │   └── BookingSchema.js      
│   ├── routes/
│   │   ├── auth.js         
│   │   ├── user.js        
│   │   ├── doctor.js     
│   │   └── booking.js      
│   ├── index.js           
│   └── .env             
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   |   └── data/
|   │   │   |   └── Images/
|   │   │   ├── doctors.js
|   │   │   ├── faqs.js
|   │   │   └── services.js
│   │   ├── Components/
│   │   |   ├── About/
|   |   │   │   └── About.jsx
│   │   |   ├── Doctors/
|   |   │   │   ├── DoctorCard.jsx
|   |   │   │   └── DoctorList.jsx
│   │   |   ├── Error/
|   |   │   │   └── Error.jsx
│   │   |   ├── Faq/
|   |   │   │   ├── FaqItem.jsx
|   |   │   │   └── FaqList.jsx
│   │   |   ├── Footer/
|   |   │   │   └── Footer.jsx
│   │   |   ├── Header/
|   |   │   │   └── Header.jsx
│   │   |   ├── Loader/
|   |   │   │   └── Loading.jsx
│   │   |   ├── Services/
|   |   │   │   ├── ServiceCard.jsx
|   |   │   │   └── ServiceList.jsx
│   │   |   ├── Testimonial/
|   |   │   │   └── Testimonial.jsx
│   │   ├── context/
│   │   |   └── AuthContext.jsx
│   │   ├── Dashboard/
│   │   |   ├── doctor-account/
|   |   │   │   ├── Appointments.jsx
|   |   │   │   ├── Dashboard.jsx
|   |   │   │   ├── Profile.jsx
|   |   │   │   └── Tabs.jsx
│   │   |   └── user-account/
|   |   │   │   ├── MyAccount.jsx
|   |   │   │   ├── MyBookings.jsx
|   |   │   │   └── Profile.jsx
│   │   ├── hooks/
│   │   |   └── useFetchData.jsx
│   │   ├── layout/
│   │   |   └── Layout.jsx
│   │   ├── pages/
│   │   |   └── Doctors/
|   |   │   │   ├── CheckoutSuccess.jsx
|   |   │   │   ├── DoctorAbout.jsx
|   |   │   │   ├── DoctorDetails.jsx
|   |   │   │   ├── Doctors.jsx
|   |   │   │   ├── Feedback.jsx
|   |   │   │   ├── FeedbackForm.jsx
|   |   │   │   └── SidePanel.jsx
|   |   │   ├── Contact.jsx
|   |   │   ├── Home.jsx
|   |   │   ├── Login.jsx
|   |   │   ├── Services.jsx
|   │   │   └── Signup.jsx
│   │   ├── routes/
|   |   │   ├── ProtectedRoute.jsx
|   │   │   └── Routers.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── config.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── utils/
│   │   ├── convertTime.js
│   │   ├── formateDate.js
│   │   └── uploadCloudinary.js
│   ├── public/
│   │   └── vite.svg
│   ├── .env.local
│   ├── eslint.config.js
│   ├── index.html
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── yarn.lock
│   └── package.json
```
---

## Architecture

### Frontend Architecture:

Framework and Tools:
  1. **React**: Utilized for building user interfaces with a component based architecture.
  2. **Vite** : A build tool that offers a fast development environment with Hot Module Replacement (HMR) and optimized builds.
  3. **Tailwind CSS** : A utility-first CSS framework for styling.
  4. **React Router** : For navigation and routing between different pages.
  5. **React Icons, Spinners, Toastify, Swiper** : For UI Components and user experience enhancemenets.

Vite Configuration:
  1. **Setup**: The project uses Vite with `@vitejs/plugin-react` for React-Specific Features and HMR.
  2. **Alternative Plugin**: `@vitejs/plugin-react-swc` can be used for fast builds with SWC.

### Backend Architecture:

Framework and Tools:
  1. **Node.js**: JavaScript runtime environment for server-side programming.
  2. **Express.js** : Web framework used for building RESTful APIs.
  3. **MongoDB** : NoSQL database for storing data.
  4. **Mongoose** : ODM (Object Data Modeling) library for MongoDB and Node.js.
  5. **jsonwebtoken (JWT)** : For secure authentication.
  6. **bcryptjs** : For password hashing.
  7. **dotenv** : For managing environment variables.

---

## Future Enhancements:
1. **Advanced Notifications** : Send reminders for upcoming appointments via email or sms.
2. **Analytics Dashboard** : Provide Insights for doctors and admins on user trends and appointments
3. **Multi-Language Support** : Enhance accessibility with language options for diverse.
4. **AI-Based Recommendations** : Suggest doctors based on patients history and preferences.
5. **Calender Integration** : Sync appointments with Google or Outlook calendars.

---

## Contributors

1. [Shanttoosh V](https://www.linkedin.com/in/shanttoosh-v-470484289/)
2. [Vineeth Kumar G](https://www.linkedin.com/in/vineeth-kumar-b1485b2a0/)
3. [Vishwa Moorthy S](https://www.linkedin.com/in/vishwa-moorthy-s-0006492a0/)
4. [Manikandan A](https://www.linkedin.com/in/manikandan-a-5629a52bb/)

## Future Contributions:
We welcome developers to check out and improve this project. Here's how you can get started:

1. **Clone the Repository:**
```bash
git clone https://github.com/VineethKumar-2003/Doctor-Booking-React-App.git
```

2. **Set Up the Project** : Follow the setup instructions in the documentation to run the frontend and backend locally.

3. **Understand the Architecture** : Explore the `React+Vite` frontend and Express backend codebases to familiarize yourself with the structure.

4. **Add Features or Fix Bugs** : We're always looking for enhancements! Whether it's optimizing performance, fixing bugs, or adding new features, your contributions are welcome.

### Guidelines for Contributors:
- Follow proper code formatting and use consistent naming conventions.
- Add comments where necessary for readability.
- Test thoroughly before submitting a pull request.

Feel free to reach out for any assistance or guidance.











