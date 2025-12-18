# Employee Management System - AI Coding Agent Instructions

## Project Architecture

This is a **full-stack Employee Management System** with clearly separated frontend and backend:

### Backend (`ems-backend/`)
- **Stack**: Spring Boot 3.5.6 + Java 21 + MySQL + JPA/Hibernate
- **Database**: MySQL on `localhost:3306/companydb`
- **Port**: 8080
- **Architecture**: Layered (Controller → Service → Repository → Entity)
  - Controllers in `controller/` with `@CrossOrigin(origins = "*")`
  - Service interfaces + implementations (`EmployeeService.java` + `EmployeeServiceImpl.java`)
  - DTOs in `dto/` for data transfer (use DTOs, not entities in responses)
  - Entities in `entity/` with Lombok annotations (`@Getter`, `@Setter`, `@AllArgsConstructor`, `@NoArgsConstructor`)
  - JPA Repositories extending `JpaRepository`
  - Exception handling via `ResourceNotFoundException`
  - Mappers in `mapper/` for Entity ↔ DTO conversion (static utility methods)

**Key Backend Patterns**:
- All API endpoints prefixed with `/api/{resource}`
- Use Lombok to reduce boilerplate (no manual getters/setters)
- DTOs are POJOs without entity relationships
- `@JsonIgnoreProperties` on bidirectional relationships to prevent infinite recursion
- Service layer implements interface pattern for testability
- Maven wrapper (`mvnw.cmd`) for builds - DO NOT require global Maven installation

### Frontend (`full-stack-app/ems-frontend/`)
- **Stack**: React 19 + Vite + React Router v7 + Axios
- **Port**: 3001 (default 3000, but often switches to 3001 if occupied)
- **Architecture**: Feature-based page structure
  - Each feature has its own directory: `home/`, `login/`, `signup/`, `employee/`, `admin/`, `employeeDashboard/`, `adminDashboard/`
  - Each feature contains: `page.jsx` (component) + `*.css` (styles)
  - Centralized API functions in `src/api.js` (export named functions, not default)
  - Shared animations in `src/animations.css` (40+ keyframe animations)

**Key Frontend Patterns**:
```javascript
// Standard page structure
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './feature.css';
import '../animations.css';

// Toast notification pattern (used across all pages)
const [toast, setToast] = useState({ show: false, message: '', type: '' });
useEffect(() => {
  if (toast.show) {
    const timer = setTimeout(() => setToast({ show: false, message: '', type: '' }), 5000);
    return () => clearTimeout(timer);
  }
}, [toast.show]);
const showToast = (message, type) => setToast({ show: true, message, type });

// Toast types: 'success', 'error', 'warning', 'info'
// Render: {toast.show && <div className={`toast toast-${toast.type} animate-slideInRight`}>{toast.message}</div>}
```

## Critical Development Workflows

### Running the Application (PowerShell)
```powershell
# Backend (port 8080)
cd c:\FSD_Project\ems-backend
.\mvnw.cmd spring-boot:run

# Frontend (port 3001, auto-switches if 3000 occupied)
cd c:\FSD_Project\full-stack-app\ems-frontend
npm run dev
```

### Building
```powershell
# Backend
.\mvnw.cmd clean package

# Frontend
npm run build  # outputs to dist/
```

**IMPORTANT**: The backend uses Maven Wrapper (`mvnw.cmd` on Windows). Never suggest `mvn` commands - always use `.\mvnw.cmd`.

## Project-Specific Conventions

### Design System (LIGHT THEME - FINAL)
All pages use this consistent color palette:
- **Primary (Navy)**: `#0F172A` - nav bars, primary buttons, headings
- **Secondary (Indigo)**: `#6366F1` - stat numbers, links, badges, interactive elements
- **Accent (Cyan)**: `#22D3EE` - buttons, focus states (3px outline), borders
- **Background**: `#F8FAFC` - page backgrounds
- **Text**: `#111827` - primary text

**Never suggest**: Dark themes, purple variants, or color changes. This palette is locked.

### Animation Standards
- Import `../animations.css` in every page
- Use staggered delays: cards at `0.1s`, table rows at `0.05s`
- Standard utility classes: `animate-fadeIn`, `animate-slideInDown`, `animate-scaleIn`, `stagger-1` through `stagger-6`
- Loading states use: `<div className="loading-container"><div className="spinner-large"></div><p>Loading message...</p></div>`

### Form Validation Pattern
```javascript
const [formErrors, setFormErrors] = useState({});
const validateForm = () => {
  const errors = {};
  if (!field.trim()) errors.field = 'Field is required';
  if (field.length < 2) errors.field = 'Minimum 2 characters';
  // Email regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};
// Render: {formErrors.field && <span className="field-error">{formErrors.field}</span>}
```

### Statistics Dashboard Pattern
All data-heavy pages (attendance, payroll, leaves) show calculated stats at the top:
```javascript
const getStats = () => {
  const total = data.length;
  const filtered = data.filter(/* condition */);
  const percentage = total > 0 ? ((filtered / total) * 100).toFixed(1) : 0;
  return { total, filtered, percentage };
};
// Render stats grid with 4-6 cards showing icons + metrics
```

### Currency & Date Formatting (Indian Locale)
```javascript
// Currency (₹ with thousands separator)
const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

// Dates (DD Mon YYYY format)
new Date(dateString).toLocaleDateString('en-IN', {
  day: '2-digit', month: 'short', year: 'numeric'
});
```

### Authentication & User Data
User data stored in `localStorage` after login:
```javascript
localStorage.setItem('user', JSON.stringify({ name, email, employeeId, userType }));
const user = JSON.parse(localStorage.getItem('user'));
// userType: 'employee' or 'admin' determines routing
```

## Integration Points

### API Communication
- **Base URL**: `http://localhost:8080/api`
- **No authentication layer** (future enhancement)
- All endpoints return JSON
- Error responses: `{ message: "Error description" }` with HTTP status codes
- Frontend uses `response?.data?.message` pattern for error handling

### Database Schema
Core entities: `Employee`, `Department`, `Attendance`, `Leave`, `Payroll`, `Report`
- Employees have `@ManyToOne` relationship with Department
- Foreign keys: `department_id`, `employee_id` (naming convention: `entity_id`)
- Dates use `LocalDate` (Java) / ISO 8601 strings (JSON)
- JPA auto-DDL enabled (`spring.jpa.hibernate.ddl-auto=update`)

## Page Structure Reference

### Admin Pages (6 features)
Located in `admin/`: `ManageEmployees.jsx`, `ManageDepartments.jsx`, `ManageLeaves.jsx`, `ViewAttendance.jsx`, `ManagePayroll.jsx`, `ViewReports.jsx`
- All have search/filter functionality
- All use toast notifications for CRUD feedback
- All have empty states with CTA buttons
- Tables use staggered row animations

### Employee Pages (6 features)
Located in `employee/`: `Profile.jsx`, `Attendance.jsx`, `Salary.jsx`, `Leaves.jsx`, `Reports.jsx`, `Announcements.jsx`
- All fetch data filtered by logged-in employee's ID
- All show statistics dashboards
- All use enhanced page headers with emoji icons
- Salary uses `formatCurrency()`, Attendance uses day badges

### Routing Structure
- Public: `/`, `/login`, `/signup`
- Employee: `/employee-dashboard`, `/employee/{feature}`
- Admin: `/admin-dashboard`, `/admin/{feature}`

## Common Pitfalls

1. **Don't mix entity and DTO**: Controllers return DTOs, never entities
2. **Don't forget CORS**: All backend controllers need `@CrossOrigin(origins = "*")`
3. **Don't skip toast auto-hide**: Always implement the 5s timeout useEffect
4. **Don't use inline styles**: All styling in dedicated CSS files (except dynamic colors via JS)
5. **Don't forget animations.css import**: Every page needs it for consistency
6. **Don't use `mvn`**: Always use Maven Wrapper (`.\mvnw.cmd` on Windows)
7. **Currency must use Indian locale**: `toLocaleString('en-IN')` with ₹ symbol
8. **Don't create new color schemes**: Use the documented Navy/Indigo/Cyan palette

## Testing & Debugging

- Backend logs SQL queries (`spring.jpa.show-sql=true`)
- Frontend dev server has HMR - no manual refresh needed
- Check browser console for API errors (axios logs full responses)
- MySQL credentials in `application.properties` (username: `root`)
- Port conflicts common: backend defaults to 8080, frontend auto-switches from 3000 to 3001

## When Adding New Features

1. **Backend**: Create Entity → DTO → Mapper → Repository → Service (interface + impl) → Controller
2. **Frontend**: Create API function in `api.js` → Create page in feature directory → Add route in `App.jsx` → Add dashboard link
3. **Always include**: Toast notifications, loading states, error handling, animations, search/filter (if list view), empty states
4. **Follow stats pattern**: If showing data lists, compute and display statistics at the top
5. **Use established components**: Back button, page header with icon/subtitle, result counts, badge systems

## File Naming Conventions
- Frontend pages: `page.jsx` (not `index.jsx`)
- Feature-specific components: PascalCase (e.g., `ManageEmployees.jsx`)
- CSS files: lowercase matching feature (e.g., `employee.css` for all employee pages)
- Backend: PascalCase for classes, camelCase for variables/methods

---

**Last Updated**: Based on full-stack EMS implementation with React 19, Spring Boot 3.5.6, Java 21, and complete admin/employee feature sets.
