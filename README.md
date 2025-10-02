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
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd beije-case

# Install dependencies for all packages
npm run install:all

# Start development servers
npm run dev
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

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start both frontend and backend
npm run build        # Build all projects
npm run test         # Run all tests
npm run lint         # Lint all code
```

## 📚 API Documentation

### Endpoints

#### POST /user/register
Register a new user and send verification email.

#### GET /user/verify-email/:username/:token
Verify user email address.

#### GET /user/check-verification/:username
Check if user is verified.

## 🧪 Testing

This project includes comprehensive testing:
- Unit tests for components and services
- Integration tests for API endpoints
- E2E tests for critical user flows

## 🤖 AI Assistance

This project was developed with assistance from:
- ChatGPT, Gemini 2.5 Pro for architecture decisions and code generation
- Cursor for code completion and suggestions (Claude 4.5 Sonnet)

Detailed logs of AI assistance can be found in [docs/ai-usage-log.md](docs/ai-usage-log.md).

## 🚀 Deployment

Instructions for deploying to production environments.

## 🤝 Contributing

Guidelines for contributing to this project.

## 📄 License

This project is licensed under the MIT License.
