# Cleanit - Gamifying India's Cleanup Movement



## 🌟 Overview

Cleanit is a platform that gamifies environmental cleanup in India by connecting three key stakeholders:

- **Citizens/Donors**: Fund cleanup campaigns in their communities
- **Cleaners**: Accept paid jobs to complete cleanup work
- **Admins**: Verify work quality and manage the platform

### Key Features

1. **Campaign System**: Citizens create geo-tagged cleanup campaigns with funding goals
2. **Job Marketplace**: Cleaners browse and claim available cleanup jobs
3. **Escrow & Payments**: Secure fund management with Razorpay integration
4. **Verification Workflow**: Admin approval system with photo verification
5. **CleanTip Social Feature**: Share cleanup stories and receive tips from the community
6. **Automated Payouts**: Scheduled disbursements to cleaners after verification

## 📁 Project Structure

```
Cleanit_project/
├── backend/                      # Node.js/Express REST API
│   ├── src/
│   │   ├── controllers/         # Business logic
│   │   ├── routes/              # API endpoints
│   │   ├── middleware/          # Auth, validation, etc.
│   │   ├── services/            # External integrations (S3, Razorpay)
│   │   └── cron/                # Background jobs
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   └── Dockerfile
│
├── Design Cleanit Web UI/       # Next.js 14 Web Application (NEW)
│   ├── app/                     # App Router pages
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── contexts/            # Auth & Theme contexts
│   │   └── pages/               # Page components
│   └── next.config.js
│
├── apps/
│   ├── web/                     # Old Next.js app (legacy)
│   └── admin/                   # Admin dashboard
│
├── docker-compose.yml           # Multi-service orchestration
└── new-implementation-guide/    # FastAPI + Next.js rewrite docs
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15
- Redis 7
- AWS Account (for S3)
- Razorpay Account (for payments)

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/skyfaiz/CleanitLegacy.git
cd CleanitLegacy
```

2. **Install dependencies**
```bash
npm install
cd backend && npm install
cd "../Design Cleanit Web UI" && npm install
```

3. **Set up environment variables**

Create `backend/.env`:
```env
DATABASE_URL="postgresql://cleanit:cleanit_password@localhost:5432/cleanit_db"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000

# AWS S3
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="ap-south-1"
AWS_S3_BUCKET="cleanit-uploads"

# Razorpay
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"

# Redis
REDIS_URL="redis://localhost:6379"

FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

Create `Design Cleanit Web UI/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. **Start services with Docker**
```bash
docker-compose up -d
```

This starts:
- PostgreSQL (port 5432)
- Redis (port 6379)
- Backend API (port 5000)

5. **Run database migrations**
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

6. **Start the new Next.js frontend**
```bash
cd "Design Cleanit Web UI"
npm run dev
```

### Access Points
- **Backend API**: http://localhost:5000
- **New Web UI**: http://localhost:3000
- **API Health**: http://localhost:5000/health
- **Prisma Studio**: `npx prisma studio` (database GUI)

## 💻 Technology Stack

### Backend (Current - Node.js)
- **Framework**: Express.js
- **Database**: PostgreSQL 15 with Prisma ORM
- **Cache**: Redis 7
- **File Storage**: AWS S3
- **Payments**: Razorpay (India)
- **Authentication**: JWT with bcrypt
- **Security**: Helmet, CORS, Rate Limiting
- **Background Jobs**: node-cron
- **Validation**: express-validator

### Frontend (Current - Next.js)
- **Framework**: Next.js 14 with App Router
- **UI Library**: Radix UI + Tailwind CSS
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: Sonner
- **State**: React Context API

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL (containerized)
- **Cache**: Redis (containerized)
- **Cloud**: AWS (S3 for storage)

### Future Stack (Planned Rewrite)
- **Backend**: FastAPI (Python)
- **Frontend**: Next.js 15 (TypeScript)
- **Database**: PostgreSQL with SQLAlchemy
- **See**: `/new-implementation-guide/` for details

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login and get JWT token
GET    /api/auth/me                - Get current user info
```

### Campaigns
```
GET    /api/campaigns              - List all campaigns (with filters)
GET    /api/campaigns/:id          - Get campaign details
POST   /api/campaigns              - Create campaign (auth required)
PUT    /api/campaigns/:id          - Update campaign (owner only)
DELETE /api/campaigns/:id/cancel   - Cancel campaign (owner only)
```

### Contributions
```
POST   /api/contributions/create-order  - Create Razorpay order
POST   /api/contributions/verify        - Verify payment
GET    /api/contributions/my            - Get user's contributions
```

### Jobs
```
GET    /api/jobs/available         - List available jobs (cleaner)
POST   /api/jobs/:id/claim         - Claim a job (cleaner)
POST   /api/jobs/:id/submit        - Submit completion proof
GET    /api/jobs/my                - Get cleaner's jobs
```

### CleanTips (NEW)
```
POST   /api/cleantips              - Create CleanTip post
GET    /api/cleantips              - List approved CleanTips
GET    /api/cleantips/:id          - Get CleanTip details
POST   /api/tips/create-order      - Create tip payment order
POST   /api/tips/verify-payment    - Verify tip payment
GET    /api/tips/my-received       - Get received tips
```

### Admin
```
GET    /api/admin/campaigns        - Manage campaigns
POST   /api/admin/campaigns/:id/approve  - Approve campaign
GET    /api/admin/jobs/pending     - Jobs pending verification
POST   /api/admin/jobs/:id/verify  - Verify completed job
POST   /api/admin/jobs/:id/reject  - Reject job
GET    /api/admin/payouts          - Manage payouts
POST   /api/admin/payouts/process  - Process scheduled payouts
```

### Notifications
```
GET    /api/notifications          - Get user notifications
PUT    /api/notifications/:id/read - Mark as read
```

## 🔄 Workflow

### Campaign to Payout Flow
1. **Citizen creates campaign** → Status: DRAFT (if first-time user)
2. **Admin approves** → Status: ACTIVE
3. **Users contribute** → Funds held in escrow
4. **Campaign reaches goal** → Status: FUNDED, Job auto-created
5. **Cleaner claims job** → 7-day deadline starts
6. **Cleaner submits proof** → Photo with EXIF data
7. **Admin verifies** → Job status: VERIFIED
8. **Payout scheduled** → 24-hour cooling period
9. **Cron job processes payout** → Money sent to cleaner
10. **Escrow released** → Transaction complete

## 🐳 Docker Services

The `docker-compose.yml` orchestrates:
- **PostgreSQL**: Main database (port 5432)
- **Redis**: Caching and sessions (port 6379)
- **Backend**: Express API (port 5000)
- **Web** (legacy): Old Next.js app (port 3000)
- **Admin**: Admin dashboard (port 3001)

## 🔐 Security Features

- JWT authentication with secure token storage
- Password hashing with bcrypt (10 rounds)
- Rate limiting (100 requests per 15 minutes)
- Helmet security headers
- CORS configuration
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)
- XSS protection
- Payment signature verification (Razorpay)

## 🧪 Testing

```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
cd "Design Cleanit Web UI"
npm test
```



## 📝 Contributing

This is a legacy codebase. For the new implementation:
1. Check `/new-implementation-guide/` for architecture
2. New contributions should target the FastAPI + Next.js rewrite
3. Bug fixes for this codebase are still accepted

## 📄 License

MIT License

## 🔗 Links

- **GitHub**: https://github.com/skyfaiz/CleanitLegacy
- 

## ⚠️ Known Issues

- CleanTip feature requires database migration to activate
- Image upload endpoint needs to be added
- Some admin features are work in progress
- Testing coverage is incomplete

## 📞 Support

For issues or questions, please open a GitHub issue.
