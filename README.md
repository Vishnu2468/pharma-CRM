# pharma-CRM

Pharmaceutical CRM System
A production-ready Pharmaceutical CRM System designed to streamline marketing operations for pharmaceutical companies. This comprehensive solution empowers company owners and employees with tools to manage doctor visits, attendance, schedules, products, and analytics. Built with a modern tech stack, it features a React Vite web application, a React Native mobile app, and a Django REST API backend, delivering a professional, user-friendly experience across platforms.

Table of Contents

Project Overview
Features
Employee Features
Company Owner Features
Attendance & Leave Management


Tech Stack
Design Highlights
Project Structure
Setup Instructions
Prerequisites
Backend Setup (Django)
Frontend Setup (React Vite)
Mobile App Setup (React Native)


Running the Application
API Documentation
Testing
Contributing
License
Contact
Acknowledgements


Project Overview
The Pharmaceutical CRM System is a robust platform tailored for pharmaceutical companies to manage marketing activities efficiently. It provides role-based interfaces for company owners (to oversee operations and analytics) and employees (to handle visits, schedules, and attendance). The system ensures secure, company-centric data isolation, modern design, and cross-platform functionality.
Key objectives:

Simplify doctor visit scheduling and tracking.
Streamline attendance and leave management.
Provide real-time analytics for business insights.
Deliver a professional, responsive UI across web and mobile.
Ensure secure authentication and role-based access.

The project is production-ready, featuring a clean, pharmaceutical-inspired aesthetic with blue gradients, Bootstrap 5 styling, and intuitive navigation.

Features
Employee Features

Authentication: Login with credentials created by the company owner.
Dashboard: Personal statistics, recent visits, and upcoming schedules.
Visit Management: Schedule and track doctor visits, view visit history, and manage associated products.
Attendance Tracking: Check-in/check-out with timestamps, view attendance history, and request leaves (sick, casual, vacation, emergency, other).
Schedules: Manage personal schedules with calendar and list views.
Organizations: View assigned healthcare organizations.
Products: Access the company’s product catalog.
Profile Management: Update personal details, view company information, and change password.

Company Owner Features

Employee Management: Create, view, edit, and manage employee accounts.
Product Management: Add, edit, and delete products in the company catalog.
Organization Management: Manage healthcare organizations and assign them to employees.
Doctor Management: Add and manage doctors for employee visits.
Analytics Dashboard: Company-wide statistics on visits, employee performance, and attendance.
Leave Approval: Approve or reject employee leave requests.
Visit Tracking: Monitor all employee visits with detailed analytics.
Company Management: Automatic company creation during signup, with data isolation for all operations.

Attendance & Leave Management

Daily Attendance: Employees can check-in and check-out with timestamps.
Leave Requests: Submit leave applications with types (sick, casual, vacation, emergency, other).
Leave Approval Workflow: Owners can approve or reject leave requests with comments.
Attendance Statistics: Track present, absent, partial, and leave days.
Status Indicators: Color-coded badges for attendance and leave statuses.


Tech Stack

Frontend (Web):
React (Vite, JSX)
Bootstrap 5.3.2 for styling
Lucide React for icons
React Router DOM for navigation
React Hot Toast for notifications


Mobile App:
React Native (cross-platform for iOS and Android)
Native components for performance


Backend:
Django with Django REST Framework
Simple JWT for authentication
PostgreSQL (recommended) or SQLite (development)
Django CORS Headers for cross-origin requests


Other Tools:
Git for version control
npm/Yarn for frontend/mobile package management
pip for Python dependencies
Axios for API requests




Design Highlights

Aesthetic: Modern pharmaceutical industry design with blue gradients (#1E3A8A to #60A5FA) for trust and professionalism.
Responsive Layout: Mobile-first design with Bootstrap’s grid system, optimized for all screen sizes.
Interactive Elements: Smooth animations, hover effects, and modal-based forms for enhanced UX.
Navigation: Role-based sidebar (web) and tab-based navigation (mobile) for intuitive access.
Feedback: Toast notifications, loading states, and user-friendly error messages.
Components: Professional cards with shadow effects, status badges, and interactive calendars.
Typography: Clean, sans-serif fonts (e.g., Poppins, Roboto) for readability.
Tagline: "Made with love by Vishnu" in the footer for a personal touch.


Project Structure
pharma-crm/
├── backend/                     # Django backend
│   ├── api/                     # API views, serializers, and URLs
│   ├── core/                    # Models, authentication, and utilities
│   ├── manage.py
│   ├── requirements.txt         # Python dependencies
│   └── settings.py              # Django settings
├── frontend/                    # React Vite web app
│   ├── src/
│   │   ├── assets/              # Images, fonts, etc.
│   │   ├── components/          # Reusable components (e.g., EmployeesPage.jsx)
│   │   ├── services/            # API service (e.g., dataService.js)
│   │   ├── contexts/            # Auth context
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json             # Node dependencies
│   └── vite.config.js           # Vite configuration
├── mobile-app/                  # React Native mobile app
│   ├── src/
│   │   ├── assets/              # Images, fonts, etc.
│   │   ├── components/          # Reusable components
│   │   ├── services/            # API service
│   │   ├── screens/             # App screens (e.g., Dashboard, Visits)
│   │   └── App.js
│   ├── android/                 # Android-specific files
│   ├── ios/                     # iOS-specific files
│   ├── package.json             # Node dependencies
│   └── metro.config.js          # Metro bundler configuration
├── README.md                    # Project documentation
└── .gitignore                   # Git ignore file


Setup Instructions
Prerequisites

Python: 3.8 or higher
Node.js: 16 or higher
npm: 8 or higher (or Yarn)
PostgreSQL: Recommended for production (SQLite for development)
Git: For cloning the repository
Android Studio: For Android emulator (mobile app)
Xcode: For iOS simulator (mobile app, macOS only)
React Native CLI: For mobile app development

Install global tools:
npm install -g react-native-cli

Backend Setup (Django)

Navigate to the backend directory:
cd backend


Create and activate a virtual environment:
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


Install dependencies:
pip install -r requirements.txt


Configure environment variables:

Create a .env file in the backend directory:SECRET_KEY=your-django-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3  # Or postgres://user:pass@localhost/dbname
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173




Apply migrations:
python manage.py makemigrations
python manage.py migrate


Create a superuser (optional, for admin access):
python manage.py createsuperuser


Run the development server:
python manage.py runserver


Backend runs at http://localhost:8000.



Frontend Setup (React Vite)

Navigate to the frontend directory:
cd frontend


Install dependencies:
npm install


Configure API base URL:

Update src/services/api.js or create a .env file:VITE_API_BASE_URL=http://localhost:8000/api




Run the development server:
npm run dev


Frontend runs at http://localhost:5173 (default Vite port).



Mobile App Setup (React Native)

Navigate to the mobile app directory:
cd mobile-app


Install dependencies:
npm install


Configure API base URL:

Update src/services/api.js with the appropriate backend URL:
Android Emulator: http://10.0.2.2:8000/api
iOS Simulator: http://localhost:8000/api
Physical Device: Use your machine’s IP (e.g., http://192.168.x.x:8000/api)




Start the Metro bundler:
npm start


Run the app:

For Android:npx react-native run-android


For iOS (macOS only):npx react-native run-ios






Running the Application

Backend: Run python manage.py runserver in the backend directory.
Frontend: Run npm run dev in the frontend directory.
Mobile App: Run npm start and npx react-native run-android or run-ios in the mobile-app directory.

Access the app:

Web: http://localhost:5173
Mobile: Via emulator/simulator or physical device
Admin Panel: http://localhost:8000/admin (login with superuser credentials)

Initial Steps:

Sign up as a company owner to create a company.
Log in as an owner to create employee accounts.
Log in as an employee to access the employee dashboard.


API Documentation
The backend exposes a RESTful API with endpoints for all entities. Key endpoints include:

Authentication:
POST /api/token/: Obtain JWT token (login)
POST /api/token/refresh/: Refresh JWT token
POST /api/register/: User registration (creates company for owners)


Employees:
GET /api/employees/: List employees (owner only)
POST /api/employees/create/: Create employee (owner only)


Visits:
GET /api/visits/: List visits
POST /api/visits/: Create visit


Attendance:
POST /api/attendance/mark/: Mark attendance
POST /api/leaves/: Submit leave request
POST /api/leaves/{id}/approve/: Approve/reject leave


Other:
Organizations: /api/organizations/
Products: /api/products/
Doctors: /api/doctors/
Schedules: /api/schedules/



Authentication: Use JWT tokens in the Authorization header:
Authorization: Bearer <token>

For detailed API documentation, run the backend and access /api/schema/ or use tools like Swagger/Postman to explore endpoints.

Testing

Backend:

Run Django tests:python manage.py test


Ensure all models, views, and serializers pass validation.


Frontend:

Test components with Jest and React Testing Library:npm test


Verify routing, API integration, and UI rendering.


Mobile App:

Test on emulators (Android Studio, Xcode) and physical devices.
Check navigation, API calls, and offline handling.


Manual Testing:

Test owner signup and employee creation.
Verify visit scheduling, attendance marking, and leave requests.
Check responsive design on various screen sizes.
Test error handling for invalid inputs and API failures.




Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch:git checkout -b feature/your-feature


Commit changes:git commit -m "Add your feature"


Push to the branch:git push origin feature/your-feature


Open a pull request with a detailed description.

Guidelines:

Follow PEP 8 for Python, ESLint for JavaScript.
Write clear commit messages.
Add tests for new features.
Update documentation as needed.


License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact

Author: Vishnu
Email: your-email@example.com (replace with your email)
GitHub:  (replace with your GitHub profile)
LinkedIn:  (replace with your LinkedIn profile)

For questions, feedback, or collaboration opportunities, feel free to reach out!

Acknowledgements

Django: For a robust backend framework.
React & Vite: For a fast, modern frontend.
React Native: For cross-platform mobile development.
Bootstrap: For professional, responsive styling.
Lucide React: For beautiful icons.
Tech Community: For inspiration and resources.

Made with love by Vishnu.
