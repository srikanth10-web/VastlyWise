# VastlyWise

A modern Next.js application with authentication, built with Prisma, SQLite, and TypeScript.

## 🚀 Features

- **Authentication**: JWT-based user registration and login
- **Database**: SQLite database for local development
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Type Safety**: Full TypeScript support
- **API Routes**: RESTful API endpoints for authentication

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Database**: SQLite
- **ORM**: Prisma
- **Authentication**: JWT with bcryptjs
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+ 
- pnpm

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd VastlyWise
pnpm install
```

### 2. Environment Setup

Create `.env.local`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-for-local-development-only"
NODE_ENV="development"
```

### 3. Database Setup

```bash
# Set up local database
pnpm db:push
pnpm db:seed

# Start Prisma Studio
pnpm db:studio
```

### 4. Run Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
VastlyWise/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── app-header.tsx    # Application header
│   ├── app-sidebar.tsx   # Application sidebar
│   └── ...
├── lib/                  # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── database.ts       # Database utilities
│   └── utils.ts          # General utilities
├── prisma/               # Database schema and migrations
│   └── schema.prisma     # Database schema (SQLite)
└── types/                # TypeScript type definitions
```

## 🔧 Available Scripts

### Database Commands
- `pnpm db:push` - Push schema to SQLite database
- `pnpm db:studio` - Open Prisma Studio for database
- `pnpm db:seed` - Seed database with test data
- `pnpm db:reset` - Reset database

### Development Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🔐 Authentication

The application uses JWT-based authentication with the following endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Example Usage

```typescript
// Register a new user
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    username: 'username',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe'
  })
});

// Login
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});
```

## 🗄️ Database Schema

The application includes the following models:

- **User**: Authentication and user management
- **Post**: Blog posts and content
- **Category**: Post categories
- **Tag**: Post tags
- **Comment**: Post comments with nested replies
- **FileUpload**: File upload management
- **Analytics**: User analytics tracking
- **Notification**: User notifications
- **Setting**: Application settings

## 🌐 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`: Your database connection string
   - `JWT_SECRET`: A secure random string
   - `NODE_ENV`: "production"
3. Deploy

## 🔒 Security

- Environment variables are properly secured
- JWT secrets are different for local and production
- Database credentials are not committed to version control
- `.env*` files are ignored by git

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---

Built with ❤️ using Next.js, Prisma, and SQLite 