# HireSync - Job Board Interface

A comprehensive job search platform with advanced filtering, application tracking, and company profiles. Built as Project 38: Job Board Interface with complete implementation of modern React patterns and best practices.

## Team 38

| Roll Number | Name               | GitHub |
| ----------- | ------------------ | ------ |
| SE23UCSE111 | Mitta Pranav Reddy | [@PranavReddyy](https://github.com/PranavReddyy) |
| SE23UCSE119 | Sudhiksha Narayan  | [@Sudhiksha-Narayanrao](https://github.com/Sudhiksha-Narayanrao) |
| SE23UCSE160 | Ankit Reddy        | [@ankitsblade](https://github.com/ankitsblade) |
| SE23UCSE108 | Manjari Pandey     | [@manjaripandey](https://github.com/manjaripandey) |
| SE23UCSE100 | Kushpreet Singh    | [@kushhhh13](https://github.com/kushhhh13) |

## Project Overview

This job board application addresses the assignment requirements by implementing a full-featured job search interface with advanced filtering capabilities, saved jobs functionality, application tracking with status updates, and detailed company profiles. The application demonstrates proper state management, reusable component architecture, and efficient navigation patterns.

## Tech Stack

**Core Technologies**

- React 18 with Vite for optimal development experience
- React Router v6 for multi-page navigation between listings, details, and saved jobs
- Axios for efficient job data fetching from Supabase REST API
- Supabase PostgreSQL database for backend data persistence

**State Management**

- React Context API for global filter state management
- Custom hooks for filtering and pagination logic
- localStorage for persisting saved jobs across sessions

**Styling and UI**

- Tailwind CSS for responsive design system
- Custom component library with reusable UI elements
- Dark mode interface optimized for extended browsing

## Features

**Advanced Filtering System**

- Location-based search across major Indian cities
- Salary range filtering (0-50 LPA with adjustable sliders)
- Experience level filtering
- Job type filtering (Full-time, Contract, Internship, Part-time)
- Work mode filtering (Remote, On-site, Hybrid)
- Real-time search across job titles and company names

**Job Management**

- Saved jobs functionality with localStorage persistence
- Application tracking dashboard with status updates
- Job detail pages with comprehensive information
- Bookmark system for quick access to preferred listings

**Company Profiles**

- Dedicated company pages with job listings
- Company information and details
- Related job postings from same employer

**User Interface**

- Responsive job cards with key information at a glance
- Reusable filter panel components
- Clean navigation between pages
- Loading states and error handling
- Optimized mobile and desktop layouts

## Project Structure

```
src/
├── components/
│   ├── jobs/
│   │   ├── JobCard.jsx          # Reusable job listing card
│   │   ├── JobFilter.jsx        # Filter panel with all controls
│   │   └── JobList.jsx          # Job grid with loading states
│   ├── layout/
│   │   ├── Navbar.jsx           # Navigation header
│   │   └── Footer.jsx           # Site footer
│   └── ui/
│       ├── CustomSelect.jsx     # Reusable dropdown component
│       ├── Toast.jsx            # Notification system
│       └── ToastContainer.jsx   # Toast provider
├── context/
│   ├── JobContext.jsx           # Filter state management
│   ├── AuthContext.jsx          # Authentication state
│   └── ToastContext.jsx         # Notification context
├── hooks/
│   ├── useFetchJobs.js          # Job data fetching with filters
│   ├── useSavedJobs.js          # Saved jobs localStorage logic
│   ├── useJobContext.js         # Filter context consumer
│   └── useToast.js              # Toast notification hook
├── pages/
│   ├── Home.jsx                 # Job listings with filters
│   ├── JobDetails.jsx           # Individual job view
│   ├── SavedJobs.jsx            # Saved jobs page
│   ├── Dashboard.jsx            # Application tracking
│   ├── CompanyProfile.jsx       # Company details page
│   ├── Login.jsx                # User authentication
│   └── Register.jsx             # User registration
├── utils/
│   └── constants.js             # App configuration and constants
├── App.jsx                      # React Router configuration
└── main.jsx                     # Entry point with providers
```

## Installation

**Prerequisites**

- Node.js 16+ and npm

**Setup Steps**

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables by creating a `.env` file:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. Run the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Key Implementation Details

**State Management**

- JobContext provides centralized filter state accessible throughout the app
- Custom useFetchJobs hook handles data fetching with dynamic query parameters
- localStorage integration for persistent saved jobs across sessions

**Routing Architecture**

- React Router v6 handles navigation between job listings, details, and saved jobs
- Protected routes for authenticated user features
- Dynamic routes for job and company detail pages

**Component Reusability**

- JobCard component used consistently across listings and saved jobs
- Filter panel components shared between different views
- Custom UI components (Select, Toast) reused throughout application

**Data Fetching**

- Axios-based requests to Supabase REST API
- Query parameter construction for advanced filtering
- Proper error handling and loading states

**Filter Implementation**

- Real-time filter updates with debounced search input
- Multiple simultaneous filters (location AND salary AND type)
- Reset functionality to clear all filters
- URL-based filter persistence (optional enhancement)

## Assignment Requirements Coverage

**Advanced Filtering** - Implemented location, salary range (with slider), experience level, and job type filters with real-time updates

**Saved Jobs Functionality** - Complete bookmark system using localStorage with add/remove capabilities

**Application Tracking** - Dashboard page with status updates showing Applied, Shortlisted, and Interview Scheduled states

**Company Profiles** - Dedicated company pages with information and related job listings

**React Router Navigation** - Multi-page application with routes for listings, details, saved jobs, and dashboard

**State Management** - React Context for filters, custom hooks for business logic, localStorage for persistence

**Reusable Components** - JobCard and filter panel components used across multiple pages

**Pagination/Infinite Scroll** - Efficient job listing display with loading states

This project demonstrates comprehensive understanding of React development patterns, state management strategies, and modern web application architecture.
