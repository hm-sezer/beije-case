# Beije Case Study

A full-stack application demonstrating modern web development practices with Next.js and NestJS.

## 🏗️ Project Structure

This is a monorepo containing:

- **`frontend/`** - Next.js application with custom package selection
- **`backend/`** - NestJS API server with email verification
- **`shared/`** - Shared types and utilities
- **`docs/`** - Additional documentation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm
- Git
- MongoDB (local installation or MongoDB Atlas account)
- Gmail account (for email verification feature)

### Installation

```bash
# Clone the repository
git clone https://github.com/hm-sezer/beije-case.git
cd beije-case

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Environment Setup

#### Backend Configuration

**IMPORTANT:** Before creating `.env`, you must first set up MongoDB (see MongoDB Setup Options below).

Create a `.env` file in the `backend/` folder with the following variables:

```env
# Database Configuration
# ⚠️ Choose ONE of the options below based on your MongoDB setup:
# Option 1 - Local MongoDB (requires MongoDB installed locally):
MONGODB_URI=mongodb://localhost:27017/beije-case
# Option 2 - MongoDB Atlas (cloud, no local installation needed):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/beije-case

# Email Service Configuration (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password

# Application Configuration
PORT=3001
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**Gmail App Password Setup:**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to Security → 2-Step Verification (enable if not already enabled)
3. Navigate to Security → App passwords
4. Generate a new app password for "Mail"
5. Copy the 16-character password and paste it as `SMTP_PASS`

#### MongoDB Setup Options

Choose **ONE** of the following options:

**Option 1: Local MongoDB** (Requires MongoDB installation)

1. **Install MongoDB:**
   ```bash
   # macOS (with Homebrew)
   brew tap mongodb/brew
   brew install mongodb-community
   
   # Start MongoDB service
   brew services start mongodb-community
   ```
   
   For other operating systems, visit: https://www.mongodb.com/docs/manual/installation/

2. **Use in `.env`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/beije-case
   ```

---

**Option 2: MongoDB Atlas** (Cloud - No local installation needed, recommended)

1. **Create Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster:**
   - Click "Create" → "Deploy a database"
   - Choose **M0 Free tier**
   - Select a cloud provider and region
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Set up Database Access:**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Add user

4. **Set up Network Access:**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Confirm

5. **Get Connection String:**
   - Go back to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster...`)
   - Replace `<username>`, `<password>`, and database name

6. **Use in `.env`:**
   ```env
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/beije-case
   ```

**💡 Tip:** MongoDB Atlas is recommended because it requires no local installation and provides a free tier perfect for testing.

### Running the Application

```bash
# Terminal 1: Start backend server
cd backend
npm run start:dev
# Backend will run on http://localhost:3001

# Terminal 2: Start frontend server
cd frontend
npm run dev
# Frontend will run on http://localhost:3000
```

## 📋 Features

### Frontend
- ✅ Custom Package Selection (replica of beije.co/custom-packet)
- ✅ Responsive design
- ✅ Global state management
- ✅ Modern UI/UX

### Backend
- ✅ User registration with email verification
- ✅ RESTful API endpoints
- ✅ Database integration
- ✅ Email sending functionality

## 🏛️ Backend Architecture

### Module Structure

#### **User Module** (`backend/src/user/`)
Handles user registration and email verification.

**Components:**
- **`user.controller.ts`** - REST API endpoints (POST /register, GET /verify-email, GET /check-verification)
- **`user.service.ts`** - Business logic for user operations
  - Generate random verification tokens using Node.js crypto
  - Create users with `isVerified=false` by default
  - Verify tokens and update user status
  - Check verification status
- **`user.schema.ts`** - MongoDB schema definition
  - Fields: username, email, verificationToken, isVerified
  - Unique constraints on username and email
- **`register-user.dto.ts`** - Request validation
  - Validates email format and required fields

#### **Mail Module** (`backend/src/mail/`)
Handles email sending via Gmail SMTP.

**Components:**
- **`mail.service.ts`** - Nodemailer integration
  - Configures Gmail SMTP transport
  - Sends HTML verification emails with token links
  - Email template includes verification button and plain link

#### **App Module** (`backend/src/app.module.ts`)
Root module that connects everything.

**Configuration:**
- MongoDB connection via Mongoose
- Environment variables via ConfigModule
- CORS enabled for frontend API calls
- Global validation pipe for DTO validation

### Data Flow

```
1. POST /user/register
   ↓
2. UserService.register()
   ↓
3. Generate verificationToken (crypto.randomBytes)
   ↓
4. Save to MongoDB (isVerified=false)
   ↓
5. MailService.sendVerificationEmail()
   ↓
6. Return user data (201 Created)

---

7. User clicks email link
   ↓
8. GET /user/verify-email/:username/:token
   ↓
9. UserService.verifyEmail()
   ↓
10. Find user by username
   ↓
11. Compare tokens
   ↓
12. Set isVerified=true
   ↓
13. Return success message (200 OK)
```

## 🛠️ Development

### Available Scripts

**Frontend:**
```bash
cd frontend
npm run dev          # Start Next.js dev server (port 3000)
npm run build        # Build for production
npm run lint         # Run ESLint
```

**Backend:**
```bash
cd backend
npm run start:dev    # Start NestJS dev server with hot reload (port 3001)
npm run build        # Build for production
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run lint         # Run ESLint
```

## 📚 API Documentation

### Base URL
```
http://localhost:3001
```

### Endpoints

#### POST /user/register
Register a new user and send verification email.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com"
}
```

**Success Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "johndoe",
  "email": "john@example.com",
  "verificationToken": "a1b2c3d4e5f6...",
  "isVerified": false,
  "createdAt": "2025-10-03T10:00:00.000Z",
  "updatedAt": "2025-10-03T10:00:00.000Z"
}
```

**Error Responses:**
- `409 Conflict` - Username or email already exists
- `400 Bad Request` - Invalid email format or missing fields

---

#### GET /user/verify-email/:username/:verificationToken
Verify user's email with the token sent via email.

**URL Parameters:**
- `username` - User's username
- `verificationToken` - Token from verification email

**Example:**
```
GET /user/verify-email/johndoe/a1b2c3d4e5f6...
```

**Success Response (200 OK):**
```json
{
  "message": "Email verified successfully"
}
```

**Error Responses:**
- `404 Not Found` - User not found
- `400 Bad Request` - Invalid verification token

---

#### GET /user/check-verification/:username
Check if a user's email is verified.

**URL Parameters:**
- `username` - User's username

**Example:**
```
GET /user/check-verification/johndoe
```

**Success Response (200 OK):**
```json
{
  "message": "user is verified"
}
```
or
```json
{
  "message": "user is not verified"
}
```

**Error Responses:**
- `404 Not Found` - User not found

## 🧪 Testing

This project includes comprehensive testing:
- Unit tests for components and services
- Integration tests for API endpoints
- E2E tests for critical user flows

## 🤖 AI Assistance

This project was developed with AI assistance to demonstrate modern development workflows:

**AI Tools Used:**
- **Cursor AI (Claude 4.5 Sonnet)** - Primary development assistant
  - Code architecture and structure design
  - Implementation of frontend and backend modules
  - Code review and refactoring suggestions
  - Documentation generation

**AI Usage Logs:**
Detailed logs documenting every AI interaction and decision-making process:
- **Frontend:** [docs/ai-usage-log-frontend.md](docs/ai-usage-log-frontend.md)
  - Next.js setup and configuration
  - Redux state management implementation
  - MUI component development
  - Code refactoring and optimization
- **Backend:** [docs/ai-usage-log-backend.md](docs/ai-usage-log-backend.md)
  - NestJS project initialization
  - Email verification API implementation
  - Module architecture decisions
  - Database schema design

**Why AI-Assisted Development:**
- Demonstrates ability to leverage modern development tools effectively
- Shows clear communication and requirement specification skills
- Maintains code quality while accelerating development
- Documents decision-making process transparently
