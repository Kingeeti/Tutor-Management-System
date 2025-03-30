# Tutor Management System

## Project Overview
The Tutor Management System is a web-based platform that connects students with tutors. It provides essential features for managing tutor sessions, reviews, and wishlists. The system ensures seamless authentication, role-based navigation, and an intuitive user experience for both students and tutors.

## Features
- **User Authentication**: Secure login functionality for students and tutors.
- **Role-Based Dashboard**:
  - Students access session booking, searches, and wishlists.
  - Tutors manage their sessions, earnings, and profiles.
- **Admin Panel**: Handles pending tutor approvals, session management, and review moderation.
- **Session Management**: Students can book sessions, and tutors can track their schedules.
- **Review System**: Students can leave feedback for tutors.
- **Wishlist Feature**: Allows students to save their preferred tutors.

## File Structure
- **Backend (Server)**
  - Express.js-based server with routes for authentication, tutors, sessions, reviews, wishlists, and admin management.
  - MongoDB as the database, storing user information without password hashing.
  - API endpoints for handling authentication, session management, and user roles.
- **Frontend (Client)**
  - React-based UI with role-specific components.
  - Student components include session booking and wishlists.
  - Tutor components include earnings tracking and session management.
  - Admin panel for handling pending requests.
  
## Authentication Flow
- Users enter their credentials on the login page.
- Upon successful login, the system checks the user role.
- Depending on the role, users are redirected to the appropriate dashboard (student or tutor).

## Deployment Instructions
1. **Backend Setup**:
   - Install dependencies and run the Express.js server.
   - Ensure MongoDB is running locally or use a cloud-based database.
2. **Frontend Setup**:
   - Install dependencies and start the React application.
   - Ensure API calls correctly point to the backend server.
3. **Testing**:
   - Verify login functionality.
   - Test role-based redirections.
   - Check session bookings and wishlist features.

## Conclusion
This Tutor Management System provides an intuitive and efficient way for students to connect with tutors while offering robust management features for both users and admins. Future improvements will enhance security, scalability, and overall user experience.

