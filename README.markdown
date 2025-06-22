# Pharmaceutical CRM System

A production-ready **Pharmaceutical CRM System** designed to streamline marketing operations for pharmaceutical companies. This comprehensive solution empowers company owners and employees with tools to manage doctor visits, attendance, schedules, products, and analytics. Built with a modern tech stack, it features a **React Vite web application**, a **React Native mobile app**, and a **Django REST API backend**, delivering a professional, user-friendly experience across platforms.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
  - [Employee Features](#employee-features)
  - [Company Owner Features](#company-owner-features)
  - [Attendance & Leave Management](#attendance--leave-management)
- [Tech Stack](#tech-stack)
- [Design Highlights](#design-highlights)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (Django)](#backend-setup-django)
  - [Frontend Setup (React Vite)](#frontend-setup-react-vite)
  - [Mobile App Setup (React Native)](#mobile-app-setup-react-native)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

---

## Project Overview

The Pharmaceutical CRM System is a robust platform tailored for pharmaceutical companies to manage marketing activities efficiently. It provides role-based interfaces for **company owners** (to oversee operations and analytics) and **employees** (to handle visits, schedules, and attendance). The system ensures secure, company-centric data isolation, modern design, and cross-platform functionality.

**Key objectives**:
- Simplify doctor visit scheduling and tracking. 📅
- Streamline attendance and leave management. ⏰
- Provide real-time analytics for business insights. 📊
- Deliver a professional, responsive UI across web and mobile. 🌐
- Ensure secure authentication and role-based access. 🔒

The project is production-ready, featuring a clean, pharmaceutical-inspired aesthetic with blue gradients, Bootstrap 5 styling, and intuitive navigation.

---

## Features

### Employee Features
- **Authentication**: Login with credentials created by the company owner. 🔑
- **Dashboard**: Personal statistics, recent visits, and upcoming schedules. 📈
- **Visit Management**: Schedule and track doctor visits, view visit history, and manage associated products. 🩺
- **Attendance Tracking**: Check-in/check-out with timestamps, view attendance history, and request leaves (sick, casual, vacation, emergency, other). 🕒
- **Schedules**: Manage personal schedules with calendar and list views. 📆
- **Organizations**: View assigned healthcare organizations. 🏥
- **Products**: Access the company’s product catalog. 💊
- **Profile Management**: Update personal details, view company information, and change password. 👤

### Company Owner Features
- **Employee Management**: Create, view, edit, and manage employee accounts. 👥
- **Product Management**: Add, edit, and delete products in the company catalog. 📦
- **Organization Management**: Manage healthcare organizations and assign them to employees. 🏢
- **Doctor Management**: Add and manage doctors for employee visits. 👨‍⚕️
- **Analytics Dashboard**: Company-wide statistics on visits, employee performance, and attendance. 📉
- **Leave Approval**: Approve or reject employee leave requests. ✅❌
- **Visit Tracking**: Monitor all employee visits with detailed analytics. 🔍
- **Company Management**: Automatic company creation during signup, with data isolation for all operations. 🏬

### Attendance & Leave Management
- **Daily Attendance**: Employees can check-in and check-out with timestamps. 🕒
- **Leave Requests**: Submit leave applications with types (sick, casual, vacation, emergency, other). 📝
- **Leave Approval Workflow**: Owners can approve or reject leave requests with comments. ✔️
- **Attendance Statistics**: Track present, absent, partial, and leave days. 📊
- **Status Indicators**: Color-coded badges for attendance and leave statuses. 🟢🟠🔴

---

## Tech Stack

- **Frontend (Web)**:
  - React (Vite, JSX) ⚛️
  - Bootstrap 5.3.2 for styling 🎨
  - Lucide React for icons 🖼️
  - React Router DOM for navigation 🧭
  - React Hot Toast for notifications 🔔
- **Mobile App**:
  - React Native (cross-platform for iOS and Android) 📱
  - Native components for performance 🚀
- **Backend**:
  - Django with Django REST Framework 🐍
  - Simple JWT for authentication 🔐
  - PostgreSQL (recommended) or SQLite (development) 🗄️
  - Django CORS Headers for cross-origin requests 🌐
- **Other Tools**:
  - Git for version control 🗃️
  - npm/Yarn for frontend/mobile package management 📦
  - pip for Python dependencies 🛠️
  - Axios for API requests 📡

---

## Design Highlights

- **Aesthetic**: Modern pharmaceutical industry design with blue gradients (#1E3A8A to #60A5FA) for trust and professionalism. 💙
- **Responsive Layout**: Mobile-first design with Bootstrap’s grid system, optimized for all screen sizes. 📲
- **Interactive Elements**: Smooth animations, hover effects, and modal-based forms for enhanced UX. ✨
- **Navigation**: Role-based sidebar (web) and tab-based navigation (mobile) for intuitive access. 🧭
- **Feedback**: Toast notifications, loading states, and user-friendly error messages. 🔔
- **Components**: Professional cards with shadow effects, status badges, and interactive calendars. 🗂️
- **Typography**: Clean, sans-serif fonts (e.g., Poppins, Roboto) for readability. 🔠
- **Tagline**: "Made with love by Vishnu" in the footer for a personal touch. ❤️

---

## Project Structure

```plaintext
pharma-crm/
├── backend/                     # Django backend 🐍
│   ├── api/                     # API views, serializers, and URLs
│   ├── core/                    # Models, authentication, and utilities
│   ├── manage.py
│   ├── requirements.txt         # Python dependencies
│   └── settings.py              # Django settings
├── frontend/                    # React Vite web app ⚛️
│   ├── src/
│   │   ├── assets/              # Images, fonts, etc. 🖼️
│   │   ├── components/          # Reusable components (e.g., EmployeesPage.jsx)
│   │   ├── services/            # API service (e.g., dataService.js)
│   │   ├── contexts/            # Auth context
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json             # Node dependencies
│   └── vite.config.js           # Vite configuration
├── mobile-app/                  # React Native mobile app 📱
│   ├── src/
│   │   ├── assets/              # Images, fonts, etc. 🖼️
│   │   ├── components/          # Reusable components
│   │   ├── services/            # API service
│   │   ├── screens/             # App screens (e.g., Dashboard, Visits)
│   │   └── App.js
│   ├── android/                 # Android-specific files 🤖
│   ├── ios/                     # iOS-specific files 🍎
│   ├── package.json             # Node dependencies
│   └── metro.config.js          # Metro bundler configuration
├── README.md                    # Project documentation 📄
└── .gitignore                   # Git ignore file 🙈
```

---

## Setup Instructions

### Prerequisites

- **Python**: 3.8 or higher 🐍
- **Node.js**: 16 or higher 🌐
- **npm**: 8 or higher (or Yarn) 📦
- **PostgreSQL**: Recommended for production (SQLite for development) 🗄️
- **Git**: For cloning the repository 🗃️
- **Android Studio**: For Android emulator (mobile app) 🤖
- **Xcode**: For iOS simulator (mobile app, macOS only) 🍎
- **React Native CLI**: For mobile app development 📱

Install global tools:
```bash
npm install -g react-native-cli
```

### Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   - Create a `.env` file in the `backend` directory:
     ```plaintext
     SECRET_KEY=your-django-secret-key
     DEBUG=True
     DATABASE_URL=sqlite:///db.sqlite3  # Or postgres://user:pass@localhost/dbname
     ALLOWED_HOSTS=localhost,127.0.0.1
     CORS_ALLOWED_ORIGINS=http://localhost:5173
     ```

5. Apply migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Create a superuser (optional, for admin access):
   ```bash
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```bash
   python manage.py runserver
   ```
   - Backend runs at `http://localhost:8000`. 🌐

### Frontend Setup (React Vite)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API base URL:
   - Update `src/services/api.js` or create a `.env` file:
     ```plaintext
     VITE_API_BASE_URL=http://localhost:8000/api
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   - Frontend runs at `http://localhost:5173` (default Vite port). ⚛️

### Mobile App Setup (React Native)

1. Navigate to the mobile app directory:
   ```bash
   cd mobile-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API base URL:
   - Update `src/services/api.js` with the appropriate backend URL:
     - Android Emulator: `http://10.0.2.2:8000/api` 🤖
     - iOS Simulator: `http://localhost:8000/api` 🍎
     - Physical Device: Use your machine’s IP (e.g., `http://192.168.x.x:8000/api`) 📱

4. Start the Metro bundler:
   ```bash
   npm start
   ```

5. Run the app:
   - For Android:
     ```bash
     npx react-native run-android
     ```
   - For iOS (macOS only):
     ```bash
     npx react-native run-ios
     ```

---

## Running the Application

1. **Backend**: Run `python manage.py runserver` in the `backend` directory. 🐍
2. **Frontend**: Run `npm run dev` in the `frontend` directory. ⚛️
3. **Mobile App**: Run `npm start` and `npx react-native run-android` or `run-ios` in the `mobile-app` directory. 📱

**Access the app**:
- Web: `http://localhost:5173` 🌐
- Mobile: Via emulator/simulator or physical device 📲
- Admin Panel: `http://localhost:8000/admin` (login with superuser credentials) 🖥️

**Initial Steps**:
- Sign up as a company owner to create a company. 🏬
- Log in as an owner to create employee accounts. 👥
- Log in as an employee to access the employee dashboard. 📊

---

## API Documentation

The backend exposes a RESTful API with endpoints for all entities. Key endpoints include:

- **Authentication**:
  - `POST /api/token/`: Obtain JWT token (login) 🔑
  - `POST /api/token/refresh/`: Refresh JWT token 🔄
  - `POST /api/register/`: User registration (creates company for owners) 📝
- **Employees**:
  - `GET /api/employees/`: List employees (owner only) 👥
  - `POST /api/employees/create/`: Create employee (owner only) ➕
- **Visits**:
  - `GET /api/visits/`: List visits 🩺
  - `POST /api/visits/`: Create visit 📅
- **Attendance**:
  - `POST /api/attendance/mark/`: Mark attendance 🕒
  - `POST /api/leaves/`: Submit leave request 📝
  - `POST /api/leaves/{id}/approve/`: Approve/reject leave ✅❌
- **Other**:
  - Organizations: `/api/organizations/` 🏥
  - Products: `/api/products/` 💊
  - Doctors: `/api/doctors/` 👨‍⚕️
  - Schedules: `/api/schedules/` 📆

**Authentication**: Use JWT tokens in the `Authorization` header:
```
Authorization: Bearer <token>
```

For detailed API documentation, run the backend and access `/api/schema/` or use tools like Swagger/Postman to explore endpoints. 📡

---

## Testing

- **Backend**:
  - Run Django tests:
    ```bash
    python manage.py test
    ```
  - Ensure all models, views, and serializers pass validation. ✅

- **Frontend**:
  - Test components with Jest and React Testing Library:
    ```bash
    npm test
    ```
  - Verify routing, API integration, and UI rendering. ⚛️

- **Mobile App**:
  - Test on emulators (Android Studio, Xcode) and physical devices. 📱
  - Check navigation, API calls, and offline handling. 🌐

- **Manual Testing**:
  - Test owner signup and employee creation. 👥
  - Verify visit scheduling, attendance marking, and leave requests. 📅
  - Check responsive design on various screen sizes. 📲
  - Test error handling for invalid inputs and API failures. 🚫

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository. 🍴
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request with a detailed description. 📥

**Guidelines**:
- Follow PEP 8 for Python, ESLint for JavaScript. 📝
- Write clear commit messages. 💬
- Add tests for new features. ✅
- Update documentation as needed. 📄

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. 📜

---

## Contact

- **Author**: Vishnuvardhan Reddy Chandupatla
- **Email**: vishnuvvr2903@gmail.com 📧
- **Phone**: +91 9392700430 📞
- **LinkedIn**: [Vishnuvardhan Reddy Chandupatla](https://www.linkedin.com/in/vishnuvardhanreddychandupatla) 🔗
- **GitHub**: [Vishnu2468](https://github.com/Vishnu2468) 🐙
- **Portfolio**: [vishnuvardhanreddy.vercel.app](https://vishnuvardhanreddy.vercel.app/) 🌐

For questions, feedback, or collaboration opportunities, feel free to reach out! 💬

---

## Acknowledgements

- **Django**: For a robust backend framework. 🐍
- **React & Vite**: For a fast, modern frontend. ⚛️
- **React Native**: For cross-platform mobile development. 📱
- **Bootstrap**: For professional, responsive styling. 🎨
- **Lucide React**: For beautiful icons. 🖼️
- **Tech Community**: For inspiration and resources. 🌍

Made with ❤️ by Vishnu.
