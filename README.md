# NailBooker MVP - Simplified Development Checklist

## 🎯 MVP Scope (Simplified)
**Core Focus:** Customer booking + Basic salon management

**Team:** 1 Designer + 1 Backend + 1 Frontend
**Estimated Timeline:** 2-3 months

---

## 📱 Customer Mobile App (12 Screens)

### Authentication
- [ ] Login Screen
- [ ] Register Screen

### Booking Flow
- [ ] Home Dashboard
- [ ] Salon Search/Browse
- [ ] Salon Detail Page
- [ ] Services List
- [ ] Date Selection (Calendar)
- [ ] Time Slot Selection
- [ ] Booking Summary
- [ ] Booking Confirmation

### Account Management
- [ ] My Bookings List
- [ ] Booking Details View
- [ ] Profile Settings
- [ ] Basic Notifications

---

## 🏢 Salon Management App (8 Screens)

### Authentication
- [ ] Login Screen (Manager Only)

### Employee Management
- [x] Staff List
- [x] Add Employee
- [x] Employee Profile

### Nail Template Management
- [x] Nail Templates List
- [x] Add/Edit Template

### Booking Management
- [ ] Pending Bookings
- [ ] Booking Details & Approval
- [ ] Daily Schedule View

---

## 🔧 Core Features (MVP Only)

### User Management
- [ ] Customer Registration/Login
- [ ] Manager Registration/Login
- [ ] Basic Profile Management
- [ ] Simple Authentication (no 2FA)

### Booking System
- [ ] Service Selection
- [ ] Date/Time Selection
- [ ] Instant Booking (no payment)
- [ ] Booking Status (Pending/Confirmed/Cancelled)
- [ ] Basic Booking History

### Employee Management
- [ ] Add/Remove Employees
- [ ] Simple Employee Profiles
- [ ] Basic Role Assignment

### Nail Template System
- [ ] Template Gallery
- [ ] Add New Templates
- [ ] Template Categories
- [ ] Template Images

### Basic Notifications
- [ ] Booking Confirmations (in-app only)
- [ ] Simple Status Updates

---

## 🗄️ Database Schema (Simplified)

### Essential Tables Only
- [ ] **Users** (id, email, password, name, role, phone)
- [ ] **Salons** (id, name, address, phone, manager_id)
- [ ] **Employees** (id, salon_id, name, email, phone)
- [ ] **Services** (id, salon_id, name, price, duration)
- [ ] **NailTemplates** (id, salon_id, name, image_url, category)
- [ ] **Bookings** (id, customer_id, salon_id, employee_id, service_id, template_id, date, time, status)

---

## 📋 Development Sprint Plan

### Sprint 1 (Week 1-2): Foundation
**Backend:**
- [ ] Database setup
- [ ] User authentication API
- [ ] Basic CRUD endpoints

**Frontend:**
- [ ] Project setup
- [ ] Login/Register screens
- [ ] Basic navigation

**Designer:**
- [ ] UI/UX wireframes
- [ ] Design system
- [ ] Core screen designs

### Sprint 2 (Week 3-4): Customer Booking
**Backend:**
- [ ] Salon & Services API
- [ ] Booking creation API
- [ ] Basic search functionality

**Frontend:**
- [ ] Salon browsing
- [ ] Service selection
- [ ] Date/Time picker

**Designer:**
- [ ] Booking flow designs
- [ ] Customer dashboard

### Sprint 3 (Week 5-6): Salon Management
**Backend:**
- [ ] Employee management API
- [ ] Template management API
- [ ] Booking approval system

**Frontend:**
- [ ] Salon management screens
- [ ] Employee management
- [ ] Template gallery

**Designer:**
- [ ] Management interface designs
- [ ] Template management UI

### Sprint 4 (Week 7-8): Integration & Polish
**Backend:**
- [ ] API optimization
- [ ] Basic notifications
- [ ] Testing & bug fixes

**Frontend:**
- [ ] Booking management
- [ ] Notifications
- [ ] Testing & polish

**Designer:**
- [ ] Final UI polish
- [ ] User testing
- [ ] Design refinements

---

## 🚀 Technical Stack (Simplified)

### Backend
- [ ] Node.js + Express
- [ ] PostgreSQL database
- [ ] JWT authentication
- [ ] Basic file upload (images)

### Mobile App
- [ ] React Native
- [ ] Basic state management
- [ ] API integration
- [ ] Image picker/camera

### Deployment
- [ ] Simple cloud hosting
- [ ] Basic CI/CD
- [ ] App store deployment

---

## ✂️ Features REMOVED from Full Version

### Removed Customer Features
- ❌ Forgot Password
- ❌ OTP Verification  
- ❌ Staff Selection
- ❌ Payment Integration
- ❌ Favorites/Wishlist
- ❌ Reviews & Ratings
- ❌ Help & Support
- ❌ Location Services
- ❌ Push Notifications
- ❌ Social Login
- ❌ Advanced Search Filters

### Removed Salon Features
- ❌ Manager Dashboard/Analytics
- ❌ Staff Scheduling
- ❌ Business Hours Management
- ❌ Advanced Reporting
- ❌ Role Permissions
- ❌ Payment Management
- ❌ Customer Database
- ❌ Marketing Tools
- ❌ Multi-location Support

### Removed Technical Features
- ❌ Advanced Security
- ❌ Email/SMS Services
- ❌ Complex Analytics
- ❌ Offline Capabilities
- ❌ Advanced Caching
- ❌ Real-time Updates

---

## ⏱️ Time Estimation Breakdown

### Design (1 Designer)
- **Week 1:** Wireframes & User Flow - 40h
- **Week 2:** UI Design & Assets - 40h
- **Week 3-8:** Design Support & Iterations - 30h/week
- **Total:** 260 hours (6.5 weeks)

### Backend (1 Developer)
- **Week 1-2:** Setup & Auth - 80h
- **Week 3-4:** Core APIs - 80h  
- **Week 5-6:** Management Features - 80h
- **Week 7-8:** Integration & Testing - 80h
- **Total:** 320 hours (8 weeks)

### Frontend (1 Developer)
- **Week 1-2:** Setup & Auth Screens - 80h
- **Week 3-4:** Customer Booking Flow - 80h
- **Week 5-6:** Salon Management - 80h
- **Week 7-8:** Polish & Testing - 80h
- **Total:** 320 hours (8 weeks)

---

## 📊 MVP Success Metrics

### Technical Goals
- [ ] App loads in <5 seconds
- [ ] Basic functionality works
- [ ] No critical bugs
- [ ] Deployed to app stores

### Business Goals
- [ ] 10+ salons registered
- [ ] 100+ customer registrations
- [ ] 50+ successful bookings
- [ ] Basic user feedback collected

---

**Total Screens:** 20 screens (12 Customer + 8 Salon)
**Development Time:** 8-10 weeks
**Budget Estimate:** $30,000 - $40,000 (assuming $50/hour rates)# simple-remote-tv
