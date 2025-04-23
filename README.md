# 🚀 TNS Frontend

## 📋 Overview
This project is an Angular-based frontend application designed to interface with a .NET 8 backend API and PostgreSQL database. It provides a clean and intuitive interface for managing departments and users within an organization.

## 🛠 Tools Used
- ⚡ Angular (v19)
- 📝 TypeScript
- 🔄 RxJS for reactive programming
- 🛣️ Angular Router for navigation
- 🎨 CSS for styling
- 📱 Responsive design principles

## 📁 Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── departments/
│   │   │   ├── department-list/
│   │   │   └── department-form/
│   │   ├── users/
│   │   │   ├── user-list/
│   │   │   └── user-form/
│   │   └── nav/
│   ├── models/
│   │   ├── department.model.ts
│   │   └── user.model.ts
│   ├── services/
│   │   └── api.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   └── app.routes.ts
├── global_styles.css
└── main.ts
```

## ✨ Features

### 🏢 Department Management
- 📋 View all departments in a responsive table
- ➕ Add new departments
- ✏️ Edit existing departments
- 🗑️ Delete departments

### 👥 User Management
- 📋 View all users with their associated departments
- ➕ Add new users with department selection
- ✏️ Edit existing users
- 🗑️ Delete users

## 🔧 Key Components

### 📊 Models
- **Department**: Represents a department with ID, name, and description
- **User**: Represents a user with ID, first name, last name, email, and department association

### ⚙️ Services
- **ApiService**: Handles all HTTP communication with the backend API

### 🎯 Components
- **Department List/Form**: For listing and managing departments
- **User List/Form**: For listing and managing users
- **Nav**: Navigation component for the application

### 🎨 Design Elements
- 🎯 Modern, clean interface with a professional color scheme
- 📱 Responsive design that works on mobile, tablet, and desktop
- ✅ Form validation for data integrity
- 🔄 Loading states and error handling
- ⚠️ Confirmation dialogs for destructive actions

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI

### Installation Steps
1. 📥 Clone the repository
```bash
git clone <repository-url>
cd tns-frontend
```

2. 📦 Install dependencies
```bash
npm install
```

3. ⚙️ Update the API URL in `src/app/services/api.service.ts` to match your backend

4. 🏃 Start the development server
```bash
ng serve
```

5. 🌐 Navigate to `http://localhost:4200/` in your browser

## 📄 License
This project is licensed under the MIT License