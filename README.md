# Cleanit MVP - Full Stack Application

A platform connecting citizens who fund cleanup campaigns with cleaners who complete them.

## Project Structure

```
cleanit-mvp/
├── backend/          # Node.js/Express API
├── apps/
│   ├── web/         # Next.js Web App
│   └── admin/       # Admin Dashboard
├── packages/        # Shared packages
└── infrastructure/  # Terraform configs
```

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15

### Development Setup

1. Clone the repository
```bash
git clone https://github.com/your-org/cleanit-mvp.git
cd cleanit-mvp
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your values
```

4. Start services with Docker
```bash
docker-compose up -d
```

5. Run database migrations
```bash
cd backend
npx prisma migrate dev
```

6. Start development servers
```bash
npm run dev
```

The services will be available at:
- Backend API: http://localhost:5000
- Web App: http://localhost:3000
- Admin Dashboard: http://localhost:3001

## Technology Stack

### Backend
- Node.js + Express
- PostgreSQL + Prisma ORM
- Redis for caching
- AWS S3 for file storage
- Razorpay for payments

### Frontend
- Next.js 14
- Chakra UI
- React Hook Form
- Zustand for state management

### Infrastructure
- Docker & Docker Compose
- AWS (ECS, RDS, S3)
- Terraform for IaC
- GitHub Actions for CI/CD

## API Documentation

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login
- POST /api/auth/refresh - Refresh token

### Campaigns
- GET /api/campaigns - List campaigns
- GET /api/campaigns/:id - Get campaign details
- POST /api/campaigns - Create campaign (auth required)
- PATCH /api/campaigns/:id - Update campaign (auth required)

### Contributions
- POST /api/contributions/create-order - Create payment order
- POST /api/contributions/verify - Verify payment

### Jobs
- GET /api/jobs/available - List available jobs (cleaner only)
- POST /api/jobs/:id/claim - Claim a job (cleaner only)
- POST /api/jobs/:id/complete - Submit completion proof

### Admin
- GET /api/admin/dashboard/stats - Dashboard statistics
- GET /api/admin/jobs/pending - Jobs pending verification
- POST /api/admin/jobs/:id/verify - Verify completed job
- POST /api/admin/jobs/:id/reject - Reject job

## Deployment

### Backend Deployment (AWS ECS)
```bash
cd infrastructure/terraform
terraform init
terraform apply
```

### Web App Deployment (Vercel)
```bash
cd apps/web
vercel --prod
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test`
4. Submit a pull request

## License

MIT License
