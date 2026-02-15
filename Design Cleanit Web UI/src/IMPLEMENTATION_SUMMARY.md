# Cleanit - Platform Implementation Summary

## Overview
Cleanit is a comprehensive platform that connects citizens who fund city cleanup campaigns with cleaners who complete them and get paid. The platform includes a public web app and a separate admin dashboard.

## 🎨 Design System

### Color Palette
- **Primary Blue**: #0099CC - Used for primary actions and branding
- **Secondary Green**: #22C55E - Used for success states and secondary actions
- **Gradient**: `from-[#0099CC] to-[#22C55E]` - Featured in hero sections and CTAs
- **Accent Yellow**: #f9e08c - Used for card backgrounds (campaign cards)

### Typography
- **Font Family**: Inter (system default with fallbacks)
- **Headings**: Bold weight, responsive sizing
- **Body**: Regular weight, 16px base size

## 📱 Screens Implemented

### Main Web App (8 screens)

#### 1. **Public Landing / Home Page** (`/`)
- Hero section with gradient background and call-to-action buttons
- Stats section showing impact metrics (2M+ kgs collected, 2,500+ volunteers, etc.)
- Featured campaigns grid (3 active campaigns)
- "How It Works" section with 3-step process
- Full footer with links

#### 2. **Authentication Pages**
- **Login Page** (`/login`)
  - Email and password fields
  - Demo account credentials displayed for testing
  - Link to registration
  - Automatic role detection (admin@cleanit.com → admin role)

- **Register Page** (`/register`)
  - Full name, email, phone, password fields
  - Role selector (Citizen vs Cleaner) with descriptions
  - Clear visual differentiation between roles

#### 3. **User Dashboard** (`/dashboard`)
- Welcome header with user name
- Role-specific stats cards:
  - **Citizens**: Campaigns created, total contributed, active campaigns, impact score
  - **Cleaners**: Jobs completed, total earned, active jobs, rating
- "My Campaigns" or "My Jobs" section (role-dependent)
- Recent contributions/activity list

#### 4. **Campaigns List Page** (`/campaigns`)
- Browse all campaigns
- Filters: Status (All, Active, Funded, Completed)
- Sort options: Latest, Most Funded, Goal Amount
- Responsive grid layout
- Empty state with helpful message

#### 5. **Campaign Detail Page** (`/campaigns/:id`)
- Large hero image with status badge
- Campaign title, location, and creator info
- Full description and mission overview
- Fund allocation breakdown
- Funding summary sidebar:
  - Progress bar with percentage
  - Contributor count
  - Days remaining (for active campaigns)
  - "Contribute Now" button with modal
- Recent contributors list
- Location section with map placeholder

#### 6. **Jobs Pages for Cleaners**
- **Available Jobs** (`/jobs/available`)
  - Grid of available cleanup jobs
  - Job cards showing: image, title, location, estimated hours, payout
  - "Claim This Job" action button
  - Empty state when no jobs available

- **My Jobs** (`/jobs/my-jobs`)
  - Earnings summary cards (total earnings, jobs completed)
  - Tabbed interface:
    - **Active**: Currently claimed jobs with "Upload Photos" action
    - **Pending**: Awaiting verification
    - **Completed**: Verified and paid jobs with before/after photos
  - Empty states for each tab

#### 7. **Notifications Page** (`/notifications`)
- List of notification cards with type-specific icons
- Types: campaign_funded, job_verified, contribution, payout, reminder
- Unread badge and count
- "Mark all as read" action
- Individual notification actions: mark as read, delete
- Click to navigate to relevant page
- Time ago display (e.g., "3 hours ago")

#### 8. **Profile Page** (`/profile`)
- Profile card with avatar and role badge
- Editable fields: name, phone number
- Non-editable: email, role, member since date
- Edit mode with save/cancel actions
- Activity statistics section (role-specific metrics)

### Admin Dashboard (5 screens)

#### 9. **Admin Dashboard Landing** (`/admin`)
- Overview stats cards:
  - Total campaigns (with active count)
  - Total contributions
  - Amount raised
  - Jobs (pending vs completed)
- Recent campaigns list with images and status
- User statistics breakdown by role
- Growth metrics

#### 10. **Campaign Management** (`/admin/campaigns`)
- Search functionality (by name or location)
- Status filter dropdown
- Comprehensive data table:
  - Campaign thumbnail and title
  - Location, creator, funding progress
  - Status badge, created date
  - View action button
- Detail modal showing:
  - Full campaign information
  - Actions to activate or expire campaigns

#### 11. **User Management** (`/admin/users`)
- Search by name or email
- Role filter (All, Citizen, Cleaner, Admin)
- User table with:
  - Avatar, name, email, phone
  - Role badge (color-coded)
  - Joined date
  - Role change dropdown

#### 12. **Job Verification** (`/admin/verify-jobs`)
- Table of completed jobs awaiting verification
- Job information: campaign, cleaner, location, completion date, amount
- Review modal showing:
  - Before/After photo comparison
  - Cleaner details
  - Payout breakdown (campaign amount, 5% platform fee, 95% cleaner payout)
  - Approve/Reject actions
- Empty state when no jobs to verify

#### 13. **Payout Management** (`/admin/payouts`)
- Overview stats: Total paid out, pending payout, jobs pending
- Filter: Verified (pending) vs Paid jobs
- Payout table with:
  - Campaign and cleaner details
  - Amount breakdown (campaign amount, platform fee, cleaner payout)
  - Status badge
  - "Process Payout" button for verified jobs

## 🛠️ Technical Implementation

### Tech Stack
- **Framework**: React with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom component library (shadcn/ui pattern)
- **Icons**: Lucide React
- **Notifications**: Sonner toast library
- **State Management**: React Context API for authentication

### Key Features

#### Authentication System
- Context-based auth with `useAuth()` hook
- Protected routes with role-based access control
- Demo accounts for testing:
  - Admin: `admin@cleanit.com`
  - Cleaner: `cleaner@example.com`
  - Citizen: Any other email

#### Mock Data System
- Comprehensive mock data in `/data/mockData.ts`:
  - 6 campaigns with full details
  - 6 jobs in various states
  - 5 notifications
  - 6 users (citizens, cleaners, admin)

#### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid layouts adapt to screen size
- Hamburger menu patterns (where needed)

#### Component Architecture
- **Reusable Components**:
  - `Navbar`: Dynamic navigation based on auth state and route
  - `CampaignCard`: Displays campaign with progress, status, location
- **Page Components**: Each screen is a separate page component
- **UI Library**: Full shadcn/ui component set for consistency

### Navigation Structure

```
/ (Home)
├── /login
├── /register
├── /campaigns
│   └── /campaigns/:id (Campaign Detail)
├── /dashboard (Protected)
├── /jobs (Protected, Cleaners only)
│   ├── /jobs/available
│   └── /jobs/my-jobs
├── /notifications (Protected)
├── /profile (Protected)
└── /admin (Protected, Admins only)
    ├── /admin/campaigns
    ├── /admin/users
    ├── /admin/verify-jobs
    └── /admin/payouts
```

## 🎯 User Roles & Permissions

### Citizen/Donor
- Create and manage campaigns
- Contribute funds to any campaign
- Track contributions and impact
- View all public campaign information

### Cleaner
- Browse and claim available jobs
- Upload completion photos
- Track earnings and job history
- View payment status

### Admin
- Full platform oversight
- Manage all campaigns (activate/expire)
- Manage user roles
- Verify completed jobs
- Process payouts to cleaners

## 🎨 Design Highlights

### Visual Elements
- **Gradient backgrounds**: Signature blue-to-green gradient for hero sections
- **Card-based layouts**: Consistent use of cards with subtle shadows
- **Badge system**: Color-coded status badges (active, completed, funded)
- **Progress bars**: Visual funding progress on all campaign displays
- **Avatar system**: User profile pictures with fallbacks
- **Before/After comparisons**: Grid layout for job verification

### UX Patterns
- **Empty states**: Friendly messages with icons when no data
- **Loading states**: Disabled buttons during async operations
- **Toast notifications**: Success/error feedback for user actions
- **Confirmation dialogs**: Before critical actions (approve/reject jobs)
- **Filters and search**: Easy data discovery
- **Tabbed interfaces**: Organized content (My Jobs page)

## 📊 Key Metrics Displayed

### Platform-wide
- 2M+ Kgs Collected
- 2,500+ Volunteers
- 8,161+ Cleanups
- 79.1% Impact Rate

### Campaign Metrics
- Amount raised vs goal
- Progress percentage
- Contributor count
- Volunteer count
- Days remaining

### User Metrics (Citizens)
- Campaigns created
- Total contributed
- Active campaigns
- Impact score

### User Metrics (Cleaners)
- Jobs completed
- Total earned
- Active jobs
- Average rating

## 🚀 Getting Started

### Demo Accounts
1. **Admin Access**: 
   - Email: `admin@cleanit.com`
   - Password: anything
   - Access: Full admin dashboard

2. **Cleaner Account**:
   - Email: `cleaner@example.com`
   - Password: anything
   - Access: Job browsing and management

3. **Citizen Account**:
   - Email: any other email
   - Password: anything
   - Access: Campaign creation and contributions

### Navigation Tips
- Start at home page to see the public view
- Login to see role-specific dashboards
- Admins can switch between admin and main app via user menu
- All data is mock data for demonstration purposes

## 🎨 Color-Coded Elements

- **Blue (#0099CC)**: Primary actions, links, citizen role
- **Green (#22C55E)**: Success states, active status, cleaner role, monetary values
- **Purple**: Admin role, special permissions
- **Yellow**: Warning states, pending status
- **Red**: Error states, rejection actions
- **Gray**: Inactive/completed states

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column layouts, stacked navigation)
- **Tablet**: 640px - 1024px (2 column layouts, compact tables)
- **Desktop**: > 1024px (3+ column layouts, full tables, sidebars)

## ✨ Special Features

1. **Contribution Modal**: Quick amount selection with preset buttons
2. **Role Switcher**: Admin can navigate between admin and main app
3. **Photo Upload Simulation**: Upload buttons for job completion
4. **Real-time Calculations**: Platform fee (5%) and cleaner payout (95%)
5. **Time Display**: Relative timestamps (e.g., "3 hours ago")
6. **Empty States**: Contextual messages for every empty data scenario
7. **Status Badges**: Visual hierarchy for campaign and job statuses

## 🔄 User Workflows

### Campaign Creation Flow (Citizen)
1. Navigate to Campaigns → Create Campaign
2. Fill in campaign details, location, funding goal
3. Campaign appears in "My Campaigns"
4. Track funding progress
5. Campaign status updates as goal is reached

### Job Completion Flow (Cleaner)
1. Browse available jobs
2. Claim a job
3. Complete cleanup work
4. Upload before/after photos
5. Wait for admin verification
6. Receive payment upon approval

### Admin Verification Flow
1. Review pending jobs in verification queue
2. Compare before/after photos
3. Check payout breakdown
4. Approve or reject job
5. Process payout for approved jobs

---

**Built with ❤️ for a cleaner India**
