# Calenso

**Smart Scheduling Made Simple** – A full-stack meeting scheduling platform with public booking pages, availability management, and a modern dashboard.

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=flat-square&logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)
![Status](https://img.shields.io/badge/Status-Production-success?style=flat-square)

---

## Table of Contents

- [Overview](#overview)
- [Target Users](#target-users)
- [Problem Statement](#problem-statement)
- [Solution Summary](#solution-summary)
- [Key Features](#key-features)
- [Platform Modules](#platform-modules)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Design System](#design-system)
- [UI/UX Guidelines](#uiux-guidelines)
- [Responsiveness & Breakpoints](#responsiveness--breakpoints)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Configuration Guide](#configuration-guide)
- [Local Setup](#local-setup)
- [Development Workflow](#development-workflow)
- [Build & Scripts](#build--scripts)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication Flow](#authentication-flow)
- [Authorization & Roles](#authorization--roles)
- [Security Practices](#security-practices)
- [Compliance & Data Privacy](#compliance--data-privacy)
- [Deployment Guide](#deployment-guide)
- [Hosting Architecture](#hosting-architecture)
- [CI/CD Pipeline](#cicd-pipeline)
- [Performance Optimization](#performance-optimization)
- [Monitoring & Logging](#monitoring--logging)
- [Error Handling Strategy](#error-handling-strategy)
- [Roadmap](#roadmap)
- [Changelog](#changelog)
- [Contribution Guidelines](#contribution-guidelines)
- [Code Standards](#code-standards)
- [License Details](#license-details)
- [Credits & Maintainers](#credits--maintainers)
- [Contact & Support](#contact--support)

---

## Overview

Calenso is a free, open-source scheduling platform that eliminates the back-and-forth emails typically required to schedule meetings. Users can create custom event types, define their availability, and share personalized booking pages. The platform automatically generates Google Meet links and manages calendar events, streamlining the scheduling process for professionals, consultants, and businesses.

**Live URL**: https://calenso.thinkpixel.org/

**Product Type**: SaaS / Scheduling Platform

**Maintainer**: Think Pixel / Hardik Saxena

**License**: MIT License

---

## Target Users

- **Freelancers & Consultants**: Professionals who need to schedule client meetings efficiently
- **Small Businesses**: Teams requiring simple appointment booking without complex enterprise solutions
- **Educators**: Teachers and tutors managing student sessions
- **Healthcare Providers**: Doctors, therapists, and counselors managing patient appointments
- **Sales Teams**: Professionals scheduling product demos and sales calls
- **Remote Teams**: Distributed teams coordinating across time zones

---

## Problem Statement

Traditional scheduling methods suffer from several inefficiencies:

1. **Email Tag**: Endless back-and-forth emails to find mutually convenient times
2. **Time Zone Confusion**: Manual conversion between different time zones leading to missed meetings
3. **Double Booking**: Lack of real-time availability updates causing scheduling conflicts
4. **Inconsistent Processes**: No standardized approach to meeting types and durations
5. **No Automation**: Manual calendar entry and meeting link generation
6. **Poor User Experience**: Complex booking forms and unclear availability

---

## Solution Summary

Calenso provides a unified platform that:

- **Automates Scheduling**: Share a single booking link that always reflects current availability
- **Eliminates Conflicts**: Real-time availability prevents double bookings
- **Standardizes Events**: Create reusable event types with fixed durations and descriptions
- **Integrates Seamlessly**: Automatic Google Meet link generation and calendar event creation
- **Simplifies UX**: Intuitive booking flow with clear time slot selection
- **Scales Globally**: Time zone-aware scheduling for international teams

---

## Key Features

### Core Functionality

- **Public Booking Pages**: Shareable URLs (e.g., `calenso.thinkpixel.org/username`) for each user
- **Event Types**: Create multiple event types with custom durations (15min to 8 hours), descriptions, and privacy settings
- **Availability Management**: Define working hours per day with configurable time gaps between bookings
- **Smart Time Slots**: Automatic generation of available slots based on availability and existing bookings
- **Instant Confirmations**: Automatic email confirmations with meeting details and video links
- **Dashboard Analytics**: Track total events, bookings, upcoming meetings, and recent activity

### Authentication & Security

- **Email Verification**: OTP-based email verification during registration
- **JWT Authentication**: Secure token-based authentication with httpOnly cookies
- **Password Recovery**: Forgot password flow with secure reset tokens
- **Session Management**: 7-day token expiration with automatic refresh

### User Experience

- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Dark Mode**: Built-in theme toggle with system preference detection
- **Smooth Animations**: Framer Motion-powered page transitions and micro-interactions
- **Accessibility**: WCAG-compliant design with keyboard navigation and screen reader support
- **SEO Optimized**: Structured data, meta tags, and sitemap for search engine visibility

---

## Platform Modules

### Frontend Modules

- **Landing Page**: Marketing homepage with feature highlights and call-to-action
- **Authentication**: Login, signup, OTP verification, and password reset flows
- **Dashboard**: Central hub with analytics, upcoming meetings, and quick actions
- **Events Management**: Create, edit, and delete event types with duration settings
- **Availability Settings**: Configure weekly schedule with day-specific working hours
- **Meetings View**: List of upcoming and past meetings with booking details
- **Public Booking**: Guest-facing booking flow for scheduling appointments
- **User Profiles**: Public profile pages displaying available events

### Backend Modules

- **Authentication Service**: JWT token generation, validation, and user session management
- **User Service**: User profile management, username updates, and user synchronization
- **Event Service**: CRUD operations for event types with validation and authorization
- **Booking Service**: Booking creation, cancellation, and conflict detection
- **Availability Service**: Schedule management and time slot generation algorithms
- **Dashboard Service**: Analytics aggregation and meeting retrieval
- **Email Service**: OTP delivery and password reset email notifications
- **Logging Service**: Winston-based structured logging with file and console outputs

---

## System Architecture

### Architecture Overview

Calenso follows a monorepo architecture with separate frontend and backend applications communicating via REST API. The backend serves as the single source of truth for all data, while the frontend handles user interaction and presentation.

```mermaid
graph TB
    subgraph "Client Layer"
        A[User Browser]
        B[Mobile Browser]
    end
    
    subgraph "Frontend Layer"
        C[React SPA]
        D[TanStack Query Cache]
        E[Auth Context]
    end
    
    subgraph "API Layer"
        F[Express Server]
        G[JWT Middleware]
        H[Route Handlers]
    end
    
    subgraph "Business Logic Layer"
        I[Auth Service]
        J[Event Service]
        K[Booking Service]
        L[Availability Service]
    end
    
    subgraph "Data Layer"
        M[Prisma ORM]
        N[PostgreSQL Database]
    end
    
    subgraph "External Services"
        O[SMTP Server]
        P[Google Meet API]
    end
    
    A --> C
    B --> C
    C --> D
    C --> E
    C --> F
    D --> F
    E --> F
    F --> G
    G --> H
    H --> I
    H --> J
    H --> K
    H --> L
    I --> M
    J --> M
    K --> M
    L --> M
    M --> N
    I --> O
    K --> P
```

### Data Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant DB
    participant Email
    
    User->>Frontend: Request Booking
    Frontend->>API: GET /api/availability/slots
    API->>DB: Query Availability & Bookings
    DB-->>API: Return Data
    API-->>Frontend: Available Slots
    Frontend-->>User: Display Time Slots
    
    User->>Frontend: Select Slot & Submit
    Frontend->>API: POST /api/bookings
    API->>DB: Create Booking
    API->>DB: Generate Meet Link
    API->>Email: Send Confirmation
    API-->>Frontend: Booking Confirmation
    Frontend-->>User: Success Message
```

### Request Lifecycle

1. **Client Request**: User action triggers API call via TanStack Query
2. **Authentication**: JWT token extracted from httpOnly cookie and validated
3. **Authorization**: User permissions verified against resource ownership
4. **Validation**: Request payload validated using Zod schemas
5. **Business Logic**: Service layer processes request with business rules
6. **Data Access**: Prisma ORM executes database operations
7. **Response**: Data formatted and returned with appropriate status codes
8. **Logging**: Request/response logged to Winston transports
9. **Error Handling**: Errors caught, logged, and returned with user-friendly messages

---

## Technology Stack

### Frontend

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | React | 19.2.0 | UI library |
| **Build Tool** | Vite | 7.2.4 | Build system & dev server |
| **Routing** | React Router | 7.10.1 | Client-side routing |
| **State Management** | TanStack Query | 5.90.12 | Server state management |
| **Styling** | Tailwind CSS | 4.1.17 | Utility-first CSS |
| **UI Components** | Radix UI | Various | Accessible component primitives |
| **Animations** | Framer Motion | 12.23.25 | Animation library |
| **Icons** | Lucide React | 0.556.0 | Icon library |
| **Forms** | React Hook Form | 7.68.0 | Form management |
| **Validation** | Zod | 4.1.13 | Schema validation |
| **Date Handling** | date-fns | 4.1.0 | Date manipulation |
| **Calendar** | react-day-picker | 9.12.0 | Date picker component |
| **SEO** | react-helmet-async | 2.0.5 | Document head management |

### Backend

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Runtime** | Node.js | 18+ | JavaScript runtime |
| **Framework** | Express | 4.21.0 | Web framework |
| **ORM** | Prisma | 5.19.0 | Database ORM |
| **Database** | PostgreSQL | 15+ | Relational database |
| **Authentication** | jsonwebtoken | 9.0.3 | JWT token handling |
| **Password Hashing** | bcrypt | 6.0.0 | Password encryption |
| **Validation** | zod | 3.23.8 | Request validation |
| **Security** | helmet | 7.1.0 | Security headers |
| **CORS** | cors | 2.8.5 | Cross-origin resource sharing |
| **Compression** | compression | 1.7.4 | Response compression |
| **Logging** | winston | 3.19.0 | Structured logging |
| **HTTP Logging** | morgan | 1.11.0 | HTTP request logging |
| **Email** | nodemailer | 9.0.5 | Email sending |
| **Environment** | dotenv | 16.4.5 | Environment variables |
| **Cookies** | cookie-parser | 1.4.7 | Cookie parsing |

### Infrastructure

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Containerization** | Docker | Application containerization |
| **Orchestration** | docker-compose | Local development orchestration |
| **Hosting** | Netlify | Frontend static hosting |
| **Database** | PostgreSQL | Production database |
| **Reverse Proxy** | Nginx | (Configured in deployment) |

### DevOps

| Category | Technology | Status |
|----------|-----------|--------|
| **CI/CD** | Not Implemented | Manual deployment |
| **Version Control** | Git | Source control |
| **Package Manager** | npm | Dependency management |

---

## Design System

### Color System

The design system uses a modern, tech-inspired color palette with HSL values for easy theming.

#### Light Mode Colors

```css
--color-primary: hsl(250 95% 60%);      /* Electric Blue */
--color-secondary: hsl(280 80% 55%);    /* Refined Purple */
--color-accent: hsl(180 70% 45%);      /* Subtle Teal */
--color-success: hsl(150 70% 40%);     /* Green */
--color-warning: hsl(40 90% 50%);      /* Amber */
--color-destructive: hsl(0 85% 55%);  /* Red */
--color-background: hsl(0 0% 100%);    /* White */
--color-foreground: hsl(220 20% 10%);  /* Dark Gray */
```

#### Dark Mode Colors

```css
--color-primary: hsl(250 95% 65%);      /* Lighter Electric Blue */
--color-secondary: hsl(280 80% 60%);    /* Lighter Purple */
--color-accent: hsl(180 70% 50%);      /* Lighter Teal */
--color-background: hsl(220 20% 8%);    /* Dark Background */
--color-foreground: hsl(220 15% 95%);  /* Light Text */
```

### Typography

**Font Family**: Inter (Google Fonts)

**Type Scale**:
- **Display**: 3rem (48px) - Hero headings
- **H1**: 2.25rem (36px) - Page titles
- **H2**: 1.875rem (30px) - Section headings
- **H3**: 1.5rem (24px) - Subsection headings
- **Body Large**: 1.125rem (18px) - Emphasized body text
- **Body Base**: 1rem (16px) - Standard body text
- **Body Small**: 0.875rem (14px) - Secondary text
- **Caption**: 0.75rem (12px) - Labels and metadata

### Component Architecture

Components follow a hierarchical structure:

```
components/
├── layout/          # Layout components (Header, Footer, Layout)
├── theme/           # Theme providers (ThemeProvider)
├── ui/              # Reusable UI primitives (Button, Input, Card)
└── [feature]/       # Feature-specific components
```

**Component Principles**:
- **Composition**: Components compose smaller primitives
- **Reusability**: UI components are framework-agnostic
- **Accessibility**: All components support keyboard navigation
- **Theming**: Components use CSS custom properties for theming

### Layout Principles

- **Container System**: Responsive containers with max-width breakpoints
- **Grid System**: CSS Grid for complex layouts, Flexbox for alignment
- **Spacing**: 8px base unit with utility classes
- **Responsive**: Mobile-first approach with progressive enhancement

---

## UI/UX Guidelines

### Accessibility

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Semantic HTML with ARIA labels
- **Focus Management**: Visible focus indicators with `:focus-visible`
- **Color Contrast**: WCAG AA compliant color ratios
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **Skip Links**: "Skip to main content" link for keyboard users

### Navigation

- **Breadcrumbs**: Breadcrumb navigation on multi-level pages
- **Back Navigation**: Consistent back button behavior
- **Active States**: Clear indication of current page/section
- **Loading States**: Skeleton loaders during data fetching
- **Error States**: User-friendly error messages with recovery actions

### User Flows

**Booking Flow**:
1. User visits booking page
2. Selects event type
3. Chooses date from calendar
4. Selects available time slot
5. Fills in booking details
6. Receives confirmation

**Authentication Flow**:
1. User enters email and password
2. System validates credentials
3. JWT token issued and stored in httpOnly cookie
4. User redirected to dashboard

### Design Consistency

- **Component Library**: Radix UI primitives with custom styling
- **Animation System**: Framer Motion with consistent easing curves
- **Icon System**: Lucide React icons with consistent sizing
- **Form Patterns**: Consistent form layouts and validation patterns

---

## Responsiveness & Breakpoints

### Breakpoint System

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| **Mobile** | < 640px | Smartphones |
| **Tablet** | 640px - 1024px | Tablets, small laptops |
| **Desktop** | 1024px - 1280px | Desktop computers |
| **Large Desktop** | > 1280px | Large monitors |

### Responsive Patterns

- **Mobile**: Single column, stacked layouts, touch-optimized targets
- **Tablet**: Two-column grids, adjusted spacing
- **Desktop**: Multi-column layouts, hover interactions
- **Large Desktop**: Maximum width containers, enhanced spacing

### Container Widths

```css
/* Mobile First */
max-width: 100%;           /* Mobile */
max-width: 640px;          /* Small Tablet */
max-width: 768px;          /* Tablet */
max-width: 1024px;         /* Desktop */
max-width: 1280px;         /* Large Desktop */
max-width: 1400px;         /* Wide Screens */
```

---

## Folder Structure

```
Calenso-Private/
├── backend/                           # Backend application
│   ├── actions/                       # Business logic actions
│   │   ├── availability.js           # Availability operations
│   │   ├── bookings.js               # Booking operations
│   │   ├── dashboard.js              # Dashboard operations
│   │   ├── events.js                 # Event operations
│   │   ├── meetings.js               # Meeting operations
│   │   └── users.js                  # User operations
│   ├── lib/                          # Utility libraries
│   │   ├── email.js                  # Email service
│   │   ├── prisma.js                 # Prisma client
│   │   └── utils.js                  # Utility functions
│   ├── logs/                         # Application logs
│   │   ├── combined.log              # Combined log file
│   │   └── error.log                 # Error log file
│   ├── middleware/                   # Express middleware
│   │   └── auth.js                   # Authentication middleware
│   ├── prisma/                       # Database schema
│   │   └── schema.prisma             # Prisma schema definition
│   ├── src/                          # Source code
│   │   ├── index.js                  # Application entry point
│   │   ├── lib/                      # Source libraries
│   │   │   ├── logger.js             # Winston logger
│   │   │   └── prisma.js             # Prisma client
│   │   └── routes/                   # API routes
│   │       ├── auth.js               # Authentication endpoints
│   │       ├── availability.js       # Availability endpoints
│   │       ├── bookings.js           # Booking endpoints
│   │       ├── dashboard.js          # Dashboard endpoints
│   │       ├── events.js             # Event endpoints
│   │       └── users.js              # User endpoints
│   ├── .env.example                  # Environment variables template
│   ├── .gitignore                    # Git ignore rules
│   ├── package.json                  # Backend dependencies
│   └── package-lock.json             # Locked dependencies
│
├── frontend/                          # Frontend application
│   ├── public/                       # Static assets
│   │   ├── _headers                  # Netlify headers
│   │   ├── _redirects                # Netlify redirects
│   │   ├── favicon.svg               # Favicon
│   │   ├── robots.txt                # Robots.txt
│   │   ├── sitemap.xml               # Sitemap
│   │   └── site.webmanifest          # Web app manifest
│   ├── src/                          # Source code
│   │   ├── assets/                   # Static assets
│   │   ├── components/               # React components
│   │   │   ├── layout/               # Layout components
│   │   │   │   ├── Footer.jsx        # Footer component
│   │   │   │   ├── Header.jsx        # Header component
│   │   │   │   ├── Layout.jsx        # Main layout
│   │   │   │   └── PageTransition.jsx # Page transitions
│   │   │   ├── theme/                # Theme components
│   │   │   │   └── ThemeProvider.jsx # Theme provider
│   │   │   ├── ui/                   # UI components
│   │   │   │   ├── avatar.jsx        # Avatar component
│   │   │   │   ├── badge.jsx         # Badge component
│   │   │   │   ├── button.jsx        # Button component
│   │   │   │   ├── card.jsx          # Card component
│   │   │   │   ├── checkbox.jsx      # Checkbox component
│   │   │   │   ├── dialog.jsx        # Dialog component
│   │   │   │   ├── divider.jsx       # Divider component
│   │   │   │   ├── dropdown-menu.jsx # Dropdown menu
│   │   │   │   ├── empty-state.jsx   # Empty state
│   │   │   │   ├── input.jsx         # Input component
│   │   │   │   ├── label.jsx         # Label component
│   │   │   │   ├── progress-indicator.jsx # Progress
│   │   │   │   ├── select.jsx        # Select component
│   │   │   │   ├── section.jsx       # Section component
│   │   │   │   ├── skeleton.jsx      # Skeleton loader
│   │   │   │   ├── spinner.jsx       # Spinner component
│   │   │   │   ├── surface.jsx       # Surface component
│   │   │   │   ├── tabs.jsx          # Tabs component
│   │   │   │   ├── textarea.jsx      # Textarea component
│   │   │   │   └── theme-toggle.jsx  # Theme toggle
│   │   │   ├── ProtectedRoute.jsx    # Route protection
│   │   │   └── SEO.jsx               # SEO component
│   │   ├── contexts/                 # React contexts
│   │   │   └── AuthContext.jsx       # Authentication context
│   │   ├── hooks/                    # Custom hooks
│   │   │   ├── useReducedMotion.jsx  # Reduced motion hook
│   │   │   └── useScrollAnimation.jsx # Scroll animation
│   │   ├── lib/                      # Libraries
│   │   │   ├── api.js                # API client
│   │   │   ├── seo.js                # SEO configuration
│   │   │   └── utils.js              # Utility functions
│   │   ├── pages/                    # Page components
│   │   │   ├── Availability.jsx       # Availability page
│   │   │   ├── BookingPage.jsx       # Booking page
│   │   │   ├── Dashboard.jsx         # Dashboard page
│   │   │   ├── Events.jsx            # Events page
│   │   │   ├── ForgotPassword.jsx    # Forgot password page
│   │   │   ├── Landing.jsx           # Landing page
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Meetings.jsx          # Meetings page
│   │   │   ├── ResetPassword.jsx     # Reset password page
│   │   │   ├── Signup.jsx            # Signup page
│   │   │   └── UserProfile.jsx       # User profile page
│   │   ├── App.jsx                   # Main app component
│   │   ├── index.css                 # Global styles
│   │   └── main.jsx                  # Entry point
│   ├── .env.example                  # Environment variables template
│   ├── .gitignore                    # Git ignore rules
│   ├── .npmrc                        # npm configuration
│   ├── eslint.config.js              # ESLint configuration
│   ├── index.html                    # HTML template
│   ├── package.json                  # Frontend dependencies
│   ├── package-lock.json             # Locked dependencies
│   ├── postcss.config.js             # PostCSS configuration
│   ├── tailwind.config.js            # Tailwind configuration
│   └── vite.config.js                # Vite configuration
│
├── .gitattributes                     # Git attributes
├── .gitignore                         # Root git ignore
├── Dockerfile                        # Multi-stage Dockerfile
├── docker-compose.yml                # Docker compose configuration
├── LICENSE                           # MIT License
└── README.md                         # This file
```

### Directory Ownership

- **backend/**: Backend team / API developers
- **frontend/**: Frontend team / UI developers
- **Shared**: Database schema, environment configuration

### Dependencies

- **Frontend** depends on **Backend** API
- **Backend** depends on **PostgreSQL** database
- **Both** depend on shared environment configuration

---

## Environment Variables

### Backend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment mode | `production` |
| `PORT` | Yes | Server port | `3000` |
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgresql://user:password@host:5432/calenso` |
| `FRONTEND_URL` | Yes | Frontend URL for CORS | `https://calenso.thinkpixel.org` |
| `JWT_SECRET` | Yes | Secret for JWT token signing | `your_jwt_secret_here` |
| `SMTP_HOST` | Yes | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | Yes | SMTP server port | `587` |
| `SMTP_USER` | Yes | SMTP username | `your_email@gmail.com` |
| `SMTP_PASS` | Yes | SMTP password | `your_app_password` |
| `SMTP_SECURE` | No | Use SSL for SMTP | `false` |
| `MAIL_FROM_NAME` | No | From name for emails | `Calenso` |
| `MAIL_FROM_EMAIL` | No | From email address | `noreply@calenso.thinkpixel.org` |

### Frontend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_URL` | Yes | Backend API URL | `https://calenso.thinkpixel.org` |
| `VITE_APP_URL` | No | Application URL for SEO | `https://calenso.thinkpixel.org` |

---

## Configuration Guide

### Runtime Configuration

**Backend**:
- Configuration loaded from environment variables via `dotenv`
- Database connection established on startup
- Logger configured based on `NODE_ENV`
- CORS configured with allowed origins

**Frontend**:
- Configuration loaded from Vite environment variables
- API client configured with base URL
- SEO configuration loaded from `lib/seo.js`

### Build Configuration

**Frontend Vite Config**:
- **Code Splitting**: Manual chunks for React, UI libraries, and data fetching
- **Minification**: esbuild for faster builds
- **Source Maps**: Disabled in production
- **Asset Inlining**: 4KB threshold
- **CSS Splitting**: Enabled for better caching

### Environment Configuration

**Development**:
- Debug logging enabled
- CORS allows localhost
- Source maps enabled
- Hot module replacement active

**Production**:
- Info-level logging only
- Strict CORS configuration
- Source maps disabled
- Asset optimization enabled

### Feature Flags

**Not Implemented**: No feature flag system currently in place. All features are always enabled.

---

## Local Setup

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** (comes with Node.js)
- **PostgreSQL** 15+
- **Git** for version control

### Installation Steps

1. **Clone the repository**:
```bash
git clone https://github.com/Vamp415/Calenso-Private.git
cd Calenso-Private
```

2. **Set up PostgreSQL**:
```bash
# Create database
createdb calenso

# Or using Docker
docker run --name calenso-postgres \
  -e POSTGRES_USER=calenso \
  -e POSTGRES_PASSWORD=calenso_password \
  -e POSTGRES_DB=calenso \
  -p 5432:5432 \
  -d postgres:15-alpine
```

3. **Install backend dependencies**:
```bash
cd backend
npm install
```

4. **Configure backend environment**:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Set up database**:
```bash
npm run db:generate
npm run db:push
```

6. **Install frontend dependencies**:
```bash
cd ../frontend
npm install
```

7. **Configure frontend environment**:
```bash
cp .env.example .env
# Edit .env with your configuration
```

8. **Start backend**:
```bash
cd ../backend
npm run dev
```

9. **Start frontend** (in new terminal):
```bash
cd frontend
npm run dev
```

10. **Access the application**:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health check: http://localhost:3000/api/health

### Docker Setup

1. **Build and run with Docker Compose**:
```bash
docker-compose up -d
```

2. **Access the application**:
- Application: http://localhost:3000
- Database: localhost:5432

3. **View logs**:
```bash
docker-compose logs -f
```

4. **Stop containers**:
```bash
docker-compose down
```

---

## Development Workflow

### Branching Strategy

**Not Implemented**: No formal branching strategy documented. Recommended:

- `main` - Production code
- `develop` - Integration branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Production hotfixes

### Coding Flow

1. Create feature branch from `develop`
2. Make changes with atomic commits
3. Test locally with Docker Compose
4. Run linting and formatting
5. Commit with conventional commits
6. Push to remote
7. Create pull request
8. Code review
9. Merge to `develop`

### Testing Flow

**Not Implemented**: No automated testing currently in place. Recommended:

- Unit tests for business logic
- Integration tests for API endpoints
- E2E tests for critical user flows
- Manual testing before deployment

### Review Flow

**Not Implemented**: No formal code review process. Recommended:

- Peer review for all changes
- Security review for auth changes
- Performance review for database changes
- Accessibility review for UI changes

---

## Build & Scripts

### Frontend Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server |
| `build` | `vite build` | Build for production |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint .` | Run ESLint |

### Backend Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `server` | `nodemon src/index.js` | Start with nodemon (dev) |
| `start` | `node src/index.js` | Start with Node (prod) |
| `db:generate` | `prisma generate` | Generate Prisma client |
| `db:push` | `prisma db push` | Push schema to database |
| `db:migrate` | `prisma migrate dev` | Run Prisma migrations |
| `db:studio` | `prisma studio` | Open Prisma Studio |

### Docker Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `docker:up` | `docker-compose up -d` | Start containers |
| `docker:down` | `docker-compose down` | Stop containers |
| `docker:logs` | `docker-compose logs -f` | View logs |
| `docker:build` | `docker-compose build` | Rebuild containers |

---

## API Documentation

### Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://calenso.thinkpixel.org/api`

### Authentication

Most endpoints require JWT authentication via httpOnly cookie. Protected endpoints use the `authenticate` middleware.

### Endpoints

#### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register new user | No |
| POST | `/auth/verify-otp` | Verify email OTP | No |
| POST | `/auth/resend-otp` | Resend OTP | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/logout` | Logout user | No |
| GET | `/auth/me` | Get current user | Yes |
| POST | `/auth/forgot-password` | Request password reset | No |
| POST | `/auth/reset-password` | Reset password | No |

#### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/:username` | Get user by username | No |
| POST | `/users/sync` | Sync user data | No |
| PUT | `/users/username` | Update username | Yes |

#### Events

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/events` | Get user events | Yes |
| POST | `/events` | Create event | Yes |
| GET | `/events/:username/:eventId` | Get event details | No |
| DELETE | `/events/:eventId` | Delete event | Yes |

#### Bookings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/bookings` | Create booking | No |
| GET | `/bookings/event/:eventId` | Get event bookings | No |
| DELETE | `/bookings/:bookingId` | Cancel booking | No |

#### Availability

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/availability` | Get user availability | Yes |
| PUT | `/availability` | Update availability | Yes |
| GET | `/availability/slots` | Get available slots | No |

#### Dashboard

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/dashboard/updates` | Get dashboard updates | Yes |
| GET | `/dashboard/meetings` | Get meetings | Yes |
| GET | `/dashboard/analytics` | Get analytics | Yes |

#### Health

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check | No |

### Request/Response Examples

#### Signup

**Request**:
```json
POST /api/auth/signup
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe",
  "username": "johndoe"
}
```

**Response**:
```json
{
  "message": "Account created. Please verify your email with the OTP sent to your email.",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "username": "johndoe",
    "isVerified": false
  }
}
```

#### Create Event

**Request**:
```json
POST /api/events
{
  "title": "30 Minute Consultation",
  "description": "A quick consultation call",
  "duration": 30,
  "isPrivate": false
}
```

**Response**:
```json
{
  "id": "uuid",
  "title": "30 Minute Consultation",
  "description": "A quick consultation call",
  "duration": 30,
  "isPrivate": false,
  "userId": "uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Create Booking

**Request**:
```json
POST /api/bookings
{
  "eventId": "uuid",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "startTime": "2024-01-01T10:00:00.000Z",
  "endTime": "2024-01-01T10:30:00.000Z",
  "additionalInfo": "Discuss project requirements"
}
```

**Response**:
```json
{
  "id": "uuid",
  "eventId": "uuid",
  "userId": "uuid",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "startTime": "2024-01-01T10:00:00.000Z",
  "endTime": "2024-01-01T10:30:00.000Z",
  "meetLink": "https://meet.google.com/abc123",
  "googleEventId": "cal_1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Database Schema

### Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ Event : "UserEvents"
    User ||--o{ Booking : "UserBookings"
    User ||--|| Availability : "owns"
    Event ||--o{ Booking : "has"
    Availability ||--o{ DayAvailability : "contains"
    
    User {
        string id PK
        string email UK
        string username UK
        string name
        string imageUrl
        string password
        boolean isVerified
        string otp
        datetime otpExpiry
        datetime createdAt
        datetime updatedAt
    }
    
    Event {
        string id PK
        string title
        string description
        int duration
        string userId FK
        boolean isPrivate
        datetime createdAt
        datetime updatedAt
    }
    
    Booking {
        string id PK
        string eventId FK
        string userId FK
        string name
        string email
        string additionalInfo
        datetime startTime
        datetime endTime
        string meetLink
        string googleEventId
        datetime createdAt
        datetime updatedAt
    }
    
    Availability {
        string id PK
        string userId FK UK
        int timeGap
        datetime createdAt
        datetime updatedAt
    }
    
    DayAvailability {
        string id PK
        string availabilityId FK
        DayOfWeek day
        datetime startTime
        datetime endTime
    }
```

### Tables

#### User

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | String | Primary Key, UUID | User identifier |
| `email` | String | Unique | User email |
| `username` | String | Unique, Optional | Username for booking pages |
| `name` | String | Optional | Display name |
| `imageUrl` | String | Optional | Profile image URL |
| `password` | String | Optional | Hashed password |
| `isVerified` | Boolean | Default: false | Email verification status |
| `otp` | String | Optional | Email verification OTP |
| `otpExpiry` | DateTime | Optional | OTP expiration time |
| `createdAt` | DateTime | Default: now() | Creation timestamp |
| `updatedAt` | DateTime | Auto-update | Last update timestamp |

#### Event

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | String | Primary Key, UUID | Event identifier |
| `title` | String | Required | Event title |
| `description` | String | Optional | Event description |
| `duration` | Int | Required | Duration in minutes |
| `userId` | String | Foreign Key | Owner user ID |
| `isPrivate` | Boolean | Default: true | Privacy setting |
| `createdAt` | DateTime | Default: now() | Creation timestamp |
| `updatedAt` | DateTime | Auto-update | Last update timestamp |

#### Booking

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | String | Primary Key, UUID | Booking identifier |
| `eventId` | String | Foreign Key, Cascade | Event ID |
| `userId` | String | Foreign Key | User ID |
| `name` | String | Required | Attendee name |
| `email` | String | Required | Attendee email |
| `additionalInfo` | String | Optional | Additional notes |
| `startTime` | DateTime | Required | Meeting start time |
| `endTime` | DateTime | Required | Meeting end time |
| `meetLink` | String | Required | Google Meet link |
| `googleEventId` | String | Required | Google Calendar event ID |
| `createdAt` | DateTime | Default: now() | Creation timestamp |
| `updatedAt` | DateTime | Auto-update | Last update timestamp |

#### Availability

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | String | Primary Key, UUID | Availability identifier |
| `userId` | String | Foreign Key, Unique | User ID |
| `timeGap` | Int | Required | Gap between bookings (minutes) |
| `createdAt` | DateTime | Default: now() | Creation timestamp |
| `updatedAt` | DateTime | Auto-update | Last update timestamp |

#### DayAvailability

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | String | Primary Key, UUID | Day availability ID |
| `availabilityId` | String | Foreign Key, Cascade | Availability ID |
| `day` | DayOfWeek | Required | Day of week |
| `startTime` | DateTime | Required | Start time |
| `endTime` | DateTime | Required | End time |

### Relationships

- **User → Event**: One-to-many (UserEvents)
- **User → Booking**: One-to-many (UserBookings)
- **User → Availability**: One-to-one
- **Event → Booking**: One-to-many
- **Availability → DayAvailability**: One-to-many

### Indexes

- **User**: `email` (unique), `username` (unique)
- **Event**: `userId` (index)
- **Booking**: `eventId` (index), `userId` (index), `startTime` (index)
- **Availability**: `userId` (unique)
- **DayAvailability**: `availabilityId` (index), `day` (index)

---

## Authentication Flow

### Authentication Architecture

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    participant Email
    
    User->>Frontend: Signup Request
    Frontend->>Backend: POST /auth/signup
    Backend->>Database: Check existing user
    Database-->>Backend: User not found
    Backend->>Backend: Hash password
    Backend->>Backend: Generate OTP
    Backend->>Database: Create user with OTP
    Backend->>Email: Send OTP email
    Backend-->>Frontend: Success response
    Frontend-->>User: Enter OTP
    
    User->>Frontend: Submit OTP
    Frontend->>Backend: POST /auth/verify-otp
    Backend->>Database: Verify OTP
    Database-->>Backend: OTP valid
    Backend->>Database: Mark user verified
    Backend-->>Frontend: Success response
    Frontend-->>User: Login now
    
    User->>Frontend: Login Request
    Frontend->>Backend: POST /auth/login
    Backend->>Database: Find user
    Database-->>Backend: User found
    Backend->>Backend: Verify password
    Backend->>Backend: Generate JWT
    Backend-->>Frontend: Set httpOnly cookie
    Backend-->>Frontend: User data
    Frontend->>Frontend: Update auth context
    Frontend-->>User: Redirect to dashboard
```

### JWT Token Structure

**Payload**:
```json
{
  "userId": "uuid",
  "iat": 1234567890,
  "exp": 1235172690
}
```

**Configuration**:
- **Algorithm**: HS256
- **Secret**: `JWT_SECRET` environment variable
- **Expiration**: 7 days
- **Storage**: httpOnly cookie

### Password Security

- **Hashing**: bcrypt with salt rounds of 10
- **Validation**: Minimum 8 characters
- **Storage**: Hashed only, never plain text

### Session Management

- **Token Storage**: httpOnly cookie
- **Cookie Security**: Secure flag in production, SameSite=lax
- **Token Refresh**: Not implemented (re-login required after 7 days)
- **Logout**: Cookie cleared on server and client

---

## Authorization & Roles

### User Roles

**Not Implemented**: Single user type only. No role-based access control.

### Permissions

**Current Implementation**:
- **Resource Ownership**: Users can only access their own resources
- **Public Access**: Booking pages and event details are publicly accessible
- **Authentication Required**: Dashboard, events, availability, and meetings require authentication

### Access Matrix

| Resource | Public | Authenticated | Owner Only |
|----------|--------|---------------|------------|
| Landing Page | ✅ | ✅ | ✅ |
| User Profile | ✅ | ✅ | ✅ |
| Booking Page | ✅ | ✅ | ✅ |
| Dashboard | ❌ | ✅ | ✅ |
| Events | ❌ | ✅ | ✅ |
| Availability | ❌ | ✅ | ✅ |
| Meetings | ❌ | ✅ | ✅ |
| Create Event | ❌ | ✅ | ✅ |
| Delete Event | ❌ | ❌ | ✅ |
| Update Availability | ❌ | ❌ | ✅ |

---

## Security Practices

### Authentication

- **JWT Tokens**: Secure token-based authentication
- **httpOnly Cookies**: Prevents XSS token theft
- **Password Hashing**: bcrypt with salt rounds
- **OTP Verification**: Email verification required
- **Session Expiration**: 7-day token expiration

### Authorization

- **Resource Ownership**: Middleware verifies user owns resource
- **Route Protection**: ProtectedRoute component for frontend
- **API Protection**: authenticate middleware for backend

### Secrets Handling

- **Environment Variables**: All secrets in .env files
- **Git Ignore**: .env files excluded from version control
- **No Hardcoding**: No secrets in source code
- **Docker Secrets**: Environment variables in docker-compose

### Rate Limiting

**Not Implemented**: No rate limiting currently in place. Recommended implementation:

- API rate limiting per IP
- Authentication attempt limiting
- OTP request limiting

### Validation

- **Input Validation**: Zod schemas for all inputs
- **Output Validation**: Type-safe database queries
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **XSS Prevention**: React automatic escaping

### XSS Protection

- **React Escaping**: Automatic XSS protection
- **Content Security Policy**: CSP headers in Netlify
- **Sanitization**: User input validation

### CSRF Protection

**Not Implemented**: No CSRF protection currently. Recommended:

- CSRF tokens for state-changing operations
- SameSite cookie attribute
- Origin header validation

### Secure Headers

- **Helmet**: Security headers middleware
- **CORS**: Configured allowed origins
- **HSTS**: Strict-Transport-Security header
- **X-Frame-Options**: DENY to prevent clickjacking
- **X-Content-Type-Options**: nosniff
- **Referrer-Policy**: strict-origin-when-cross-origin

---

## Compliance & Data Privacy

### GDPR Readiness

**Not Implemented**: No GDPR compliance features currently in place.

**Recommended Implementation**:
- Data export functionality
- Data deletion requests
- Cookie consent management
- Privacy policy page
- Data processing agreements

### Data Retention

**Not Implemented**: No automated data retention policies.

**Recommended Implementation**:
- Automated data archival
- User data deletion after account closure
- Booking data retention policies
- Log retention policies

### User Consent

**Not Implemented**: No explicit consent management system.

**Recommended Implementation**:
- Cookie consent banner
- Privacy policy acceptance
- Terms of service agreement
- Marketing opt-in/opt-out

### Security Policies

**Implemented**:
- Password hashing with bcrypt
- Secure JWT token management
- HTTPS enforcement via HSTS
- Security headers configuration
- Input validation and sanitization

**Not Implemented**:
- Regular security audits
- Penetration testing
- Vulnerability scanning
- Incident response plan

---

## Deployment Guide

### Production Deployment

#### Backend Deployment

1. **Prepare Production Environment**:
```bash
# Set production environment variables
export NODE_ENV=production
export PORT=3000
export DATABASE_URL=postgresql://...
export JWT_SECRET=your_production_secret
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USER=your_email@gmail.com
export SMTP_PASS=your_app_password
```

2. **Build and Start**:
```bash
cd backend
npm install
npm run db:generate
npm run db:push
npm start
```

3. **Docker Deployment**:
```bash
# Build image
docker build -t calenso-backend .

# Run container
docker run -d \
  --name calenso-backend \
  -p 3000:3000 \
  --env-file .env \
  calenso-backend
```

#### Frontend Deployment

1. **Build for Production**:
```bash
cd frontend
npm install
npm run build
```

2. **Deploy to Netlify**:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

3. **Environment Variables**:
- Set `VITE_API_URL` in Netlify dashboard
- Set `VITE_APP_URL` in Netlify dashboard

#### Database Deployment

1. **PostgreSQL Setup**:
```bash
# Using cloud provider (e.g., Railway, Supabase, AWS RDS)
# Update DATABASE_URL in production environment
```

2. **Run Migrations**:
```bash
cd backend
npm run db:push
```

### Docker Deployment

1. **Build and Run with Docker Compose**:
```bash
docker-compose up -d
```

2. **View Logs**:
```bash
docker-compose logs -f
```

3. **Stop Services**:
```bash
docker-compose down
```

### Health Checks

- **Backend Health**: `GET /api/health`
- **Response**: `{ "status": "ok", "message": "Calenso API is running" }`
- **Docker Healthcheck**: Configured in Dockerfile (30s interval)

---

## Hosting Architecture

### Current Architecture

```mermaid
graph TB
    subgraph "Client"
        A[User Browser]
    end
    
    subgraph "Frontend Hosting"
        B[Netlify CDN]
        C[Static Assets]
    end
    
    subgraph "Backend Hosting"
        D[Node.js Server]
        E[Express API]
    end
    
    subgraph "Database"
        F[PostgreSQL]
    end
    
    subgraph "Email Service"
        G[SMTP Server]
    end
    
    A --> B
    B --> C
    A --> D
    D --> E
    E --> F
    E --> G
```

### Infrastructure Components

- **Frontend**: Netlify (static hosting with CDN)
- **Backend**: Node.js server (VPS or cloud hosting)
- **Database**: PostgreSQL (managed database service)
- **Email**: SMTP service (Gmail, SendGrid, or similar)
- **Reverse Proxy**: Nginx (recommended for production)

### Network Configuration

- **Frontend URL**: https://calenso.thinkpixel.org
- **Backend API**: Same-origin deployment (/api path)
- **Database**: Private network access
- **SMTP**: TLS encrypted connection

### CDN Configuration

Netlify CDN automatically handles:
- **Global Edge Network**: 200+ PoPs worldwide
- **Asset Caching**: Aggressive caching for static assets
- **HTTP/2**: Enabled by default
- **Compression**: Gzip and Brotli compression

---

## CI/CD Pipeline

### Current Status

**Not Implemented**: Calendo does not currently have an automated CI/CD pipeline. Deployment is manual.

### Recommended CI/CD Setup

#### GitHub Actions Workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd backend && npm install
          cd ../frontend && npm install
      - name: Run tests
        run: npm test
      - name: Run linting
        run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build frontend
        run: |
          cd frontend
          npm install
          npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2.0
        with:
          publish-dir: './frontend/dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
```

### Deployment Stages

**Recommended**:
1. **Development**: Auto-deploy on push to `develop`
2. **Staging**: Auto-deploy on PR to `main`
3. **Production**: Manual approval after staging tests

---

## Performance Optimization

### Frontend Optimization

#### Code Splitting

- **Route-based splitting**: Lazy loading with React.lazy()
- **Vendor chunks**: Separate bundles for React, UI libraries, data fetching
- **Dynamic imports**: On-demand loading for heavy components

#### Asset Optimization

- **Image optimization**: WebP format, lazy loading
- **Font optimization**: Subset fonts, preload critical fonts
- **CSS optimization**: PurgeCSS for unused styles, minification
- **JS minification**: esbuild for faster builds

#### Caching Strategy

- **Static assets**: 1-year cache with immutable flag
- **HTML files**: No-cache for SPA routing
- **API responses**: TanStack Query with 5-minute stale time
- **Browser caching**: Service worker (future scope)

### Backend Optimization

#### Database Optimization

- **Connection pooling**: Prisma connection pool
- **Query optimization**: Selective field selection
- **Indexing**: Strategic indexes on foreign keys
- **N+1 prevention**: Prisma include/select optimization

#### Response Optimization

- **Compression**: Gzip compression middleware
- **Response size limits**: 10kb body parser limit
- **Static file serving**: Express static middleware
- **HTTP caching**: Cache-Control headers

### Monitoring Performance

**Not Implemented**: No performance monitoring currently. Recommended:

- **Frontend**: Web Vitals monitoring
- **Backend**: Response time tracking
- **Database**: Query performance analysis
- **CDN**: Cache hit rate monitoring

---

## Monitoring & Logging

### Logging System

#### Backend Logging (Winston)

**Log Levels**:
- **Error**: Critical errors requiring attention
- **Warn**: Warning messages for potential issues
- **Info**: General information about application flow
- **Debug**: Detailed debugging information (development only)

**Log Transports**:
- **Console**: Standard output for all environments
- **File**: Combined log file (`logs/combined.log`)
- **Error File**: Error-specific log file (`logs/error.log`)

**Log Format**:
```json
{
  "level": "info",
  "message": "User logged in",
  "timestamp": "2025-01-01T00:00:00Z",
  "userId": "uuid",
  "email": "user@example.com"
}
```

#### HTTP Logging (Morgan)

- **Format**: Combined Apache log format
- **Output**: Piped to Winston logger
- **Includes**: Method, URL, status, response time, user-agent

### Error Tracking

**Not Implemented**: No centralized error tracking. Recommended:

- **Sentry**: Real-time error tracking
- **LogRocket**: Session replay for debugging
- **Datadog**: Infrastructure monitoring

### Metrics Collection

**Not Implemented**: No metrics collection. Recommended:

- **Application Metrics**: Request count, response time, error rate
- **Business Metrics**: Booking count, user registrations, active users
- **Infrastructure Metrics**: CPU, memory, disk usage

### Alerting

**Not Implemented**: No automated alerting. Recommended:

- **Error Alerts**: Email/Slack for critical errors
- **Performance Alerts**: Response time thresholds
- **Availability Alerts**: Uptime monitoring

---

## Error Handling Strategy

### Frontend Error Handling

#### Component Error Boundaries

**Not Implemented**: No React error boundaries. Recommended:

- **Error Boundary Component**: Catch React component errors
- **Fallback UI**: User-friendly error messages
- **Error Reporting**: Send errors to backend

#### API Error Handling

- **TanStack Query Error Callbacks**: Handle API errors globally
- **User Messages**: Display user-friendly error messages
- **Retry Logic**: Automatic retry for failed requests
- **Error Logging**: Console logging for debugging

#### Form Validation

- **Client-side Validation**: Zod schema validation
- **Field-level Errors**: Display errors per field
- **Form-level Errors**: Display form-wide errors
- **Validation Feedback**: Real-time validation feedback

### Backend Error Handling

#### Global Error Handler

```javascript
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { 
    error: err.message, 
    stack: err.stack, 
    url: req.url, 
    method: req.method 
  });
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
```

#### Validation Errors

- **Zod Validation**: Return 400 with validation errors
- **Error Messages**: User-friendly validation messages
- **Field-level Errors**: Specific field error details

#### Authentication Errors

- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: Insufficient permissions
- **Token Expiry**: Clear cookie and redirect to login

#### Database Errors

- **Connection Errors**: Log and return 500
- **Query Errors**: Log and return 500
- **Constraint Violations**: Return 400 with specific message

### API Error Responses

#### Standard Error Format

```json
{
  "error": "Error message",
  "details": {
    "field": "Specific error details"
  }
}
```

#### HTTP Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (authentication required)
- **403**: Forbidden (authorization required)
- **404**: Not Found
- **500**: Internal Server Error

---

## Roadmap

### Implemented Features

- ✅ User registration with email verification
- ✅ JWT-based authentication
- ✅ Event type management
- ✅ Availability scheduling
- ✅ Booking creation and management
- ✅ Dashboard with analytics
- ✅ Public booking pages
- ✅ Email notifications (OTP, password reset)
- ✅ Responsive design with dark mode
- ✅ Google Meet link generation

### Planned Features

#### Short Term (Q1 2025)

- [ ] Automated testing suite
- [ ] CI/CD pipeline setup
- [ ] Rate limiting implementation
- [ ] Calendar integration (Google Calendar API)
- [ ] Time zone detection and conversion
- [ ] Booking cancellation with email notifications
- [ ] Recurring events support

#### Medium Term (Q2 2025)

- [ ] Role-based access control
- [ ] Team scheduling features
- [ ] Analytics dashboard improvements
- [ ] Mobile app (React Native)
- [ ] Webhook integrations
- [ ] Custom domain support
- [ ] Branding customization

#### Long Term (Q3-Q4 2025)

- [ ] Video conferencing integrations (Zoom, Teams)
- [ ] Payment processing for paid events
- [ ] Advanced analytics and reporting
- [ ] API for third-party integrations
- [ ] Enterprise features (SSO, audit logs)
- [ ] Multi-language support
- [ ] White-label solution

---

## Changelog

### Version 1.0.0 (Current)

**Added**:
- Initial release of Calenso scheduling platform
- User authentication with JWT and email verification
- Event type management with custom durations
- Availability scheduling with weekly configuration
- Booking system with Google Meet integration
- Dashboard with analytics and meeting management
- Public booking pages with shareable URLs
- Responsive design with dark mode support
- Email notifications for OTP and password reset

**Technical**:
- Backend: Node.js 18+, Express 4.21.0, Prisma 5.19.0
- Frontend: React 19.2.0, Vite 7.2.4, Tailwind CSS 4.1.17
- Database: PostgreSQL 15+
- Deployment: Docker support, Netlify hosting

---

## Contribution Guidelines

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Standards

**Recommended**: Follow conventional commits format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:** Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Pull Request Process

1. Update documentation for changes
2. Ensure all tests pass
3. Update CHANGELOG.md
4. Request review from maintainers
5. Address review feedback
6. Merge after approval

### Code Review Guidelines

- **Security**: Review authentication and authorization changes
- **Performance**: Review database queries and API responses
- **Accessibility**: Review UI changes for accessibility compliance
- **Testing**: Ensure adequate test coverage for new features

---

## Code Standards

### Naming Conventions

- **Files**: kebab-case (`user-profile.jsx`, `api-client.js`)
- **Components**: PascalCase (`UserProfile`, `ApiClient`)
- **Functions**: camelCase (`getUserData`, `calculateSlots`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_BOOKINGS`)
- **Database**: camelCase for tables, PascalCase for models

### Architecture Conventions

- **Frontend**: Component-based architecture with separation of concerns
- **Backend**: Layered architecture (routes → services → data access)
- **Database**: Prisma ORM with schema-first approach
- **API**: RESTful design with consistent response formats

### Best Practices

- **DRY**: Don't Repeat Yourself - extract reusable code
- **KISS**: Keep It Simple, Stupid - avoid over-engineering
- **YAGNI**: You Aren't Gonna Need It - avoid premature optimization
- **SOLID**: Follow SOLID principles for object-oriented design
- **Error Handling**: Always handle errors gracefully
- **Logging**: Log important events and errors
- **Security**: Never expose sensitive data
- **Performance**: Optimize database queries and API responses

---

## License Details

### MIT License

Copyright (c) 2025 Vamp415

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### Usage Rights

- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

### Attribution

While not required, attribution is appreciated:
- Link to the original repository
- Mention the original authors
- Indicate modifications made

---

## Credits & Maintainers

### Maintainer

- **Think Pixel / Hardik Saxena**
- **Role**: Lead Developer & Maintainer
- **Contact**: Available via GitHub issues

### Contributors

This project is open to contributions from the community. See [Contribution Guidelines](#contribution-guidelines) for details.

### Technology Credits

- **React**: Meta Platforms, Inc.
- **Express**: TJ Holowaychuk
- **Prisma**: Prisma Data Inc.
- **Tailwind CSS**: Adam Wathan
- **Radix UI**: WorkOS
- **PostgreSQL**: PostgreSQL Global Development Group

### Design Credits

- **Design System**: Custom implementation based on modern design principles
- **Icons**: Lucide Icons by Feather Icons
- **Typography**: Inter font family by Rasmus Andersson

---

## Contact & Support

### Getting Help

- **Documentation**: This README.md file
- **Issues**: GitHub Issues for bug reports and feature requests
- **Discussions**: GitHub Discussions for questions and community support
- **Email**: Contact via project maintainers

### Reporting Issues

When reporting issues, please include:

- **Description**: Clear description of the problem
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: OS, Node.js version, browser version
- **Screenshots**: If applicable, include screenshots

### Feature Requests

For feature requests:

- **Use Case**: Describe the use case for the feature
- **Benefits**: Explain the benefits of the feature
- **Alternatives**: Mention any alternative solutions considered
- **Implementation**: If possible, suggest implementation approach

### Security Issues

For security vulnerabilities:

- **Do NOT** open a public issue
- **Email**: Contact maintainers directly
- **Details**: Provide detailed information about the vulnerability
- **Response**: Maintainers will respond within 48 hours

---

## Disclaimer

This software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.

---

## Branding Footer

**Calenso** - Smart Scheduling Made Simple

© 2025 Think Pixel / Hardik Saxena. All rights reserved.

Built with ❤️ using React, Node.js, and PostgreSQL.

[GitHub](https://github.com/Vamp415/Calenso-Private) | [Live Demo](https://calenso.thinkpixel.org) | [License](LICENSE)
