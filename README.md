# VastlyWise Backend API

A comprehensive backend API for the VastlyWise admin platform built with Next.js 15, Prisma, and SQLite.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Content Management**: Full CRUD operations for posts, categories, and tags
- **File Upload**: Secure file upload with validation and storage
- **Analytics**: User activity tracking and reporting
- **Notifications**: Real-time notification system
- **Settings Management**: Application configuration management
- **Dashboard**: Aggregated statistics and overview data

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with HTTP-only cookies
- **Validation**: Zod schema validation
- **File Storage**: Local file system with organized uploads
- **TypeScript**: Full type safety

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

## 🔒 Security

### Environment Variables
This project uses environment variables for sensitive configuration. **Never commit your actual `.env` file to version control.**

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` with your actual secrets:
   - `JWT_SECRET`: Generate a strong random string for JWT signing
   - `DATABASE_URL`: Your database connection string
   - `ADMIN_PASSWORD` & `USER_PASSWORD`: Passwords for seed users (development only)

### Security Best Practices
- ✅ All `.env*` files are ignored by Git
- ✅ Database files (`*.db`) are ignored by Git
- ✅ No hardcoded secrets in source code
- ✅ JWT secrets use environment variables
- ✅ Passwords are properly hashed with bcrypt

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-production-secret-key-here"
NODE_ENV="development"
```

### 3. Database Setup

```bash
# Generate Prisma client
pnpm prisma generate

# Push schema to database
pnpm prisma db push

# Seed database with initial data
DATABASE_URL="file:./dev.db" npx tsx prisma/seed.ts
```

### 4. Start Development Server

```bash
pnpm dev
```

The API will be available at `http://localhost:3000/api`

## 🔐 Authentication

### Default Users

After seeding, you'll have these users:

- **Admin**: `admin@example.com` / `admin123`
- **User**: `user@example.com` / `user123`

### Authentication Flow

1. **Register**: `POST /api/auth/register`
2. **Login**: `POST /api/auth/login`
3. **Get Current User**: `GET /api/auth/me`
4. **Logout**: `POST /api/auth/logout`

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | User logout |

### Content Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | List posts with pagination |
| POST | `/api/posts` | Create new post |
| GET | `/api/posts/[id]` | Get specific post |
| PUT | `/api/posts/[id]` | Update post |
| DELETE | `/api/posts/[id]` | Delete post |

### Categories & Tags

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List categories |
| POST | `/api/categories` | Create category |
| GET | `/api/tags` | List tags |
| POST | `/api/tags` | Create tag |

### File Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload file |
| GET | `/api/upload` | List uploaded files |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics` | Get analytics data |
| POST | `/api/analytics` | Track user event |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications` | List user notifications |
| POST | `/api/notifications` | Create notification (admin) |
| PATCH | `/api/notifications/[id]` | Mark as read |
| DELETE | `/api/notifications/[id]` | Delete notification |

### Settings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/settings` | Get settings |
| POST | `/api/settings` | Update setting (admin) |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Get dashboard statistics |

## 🔧 Usage Examples

### Creating a Post

```javascript
const response = await fetch('/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My First Post',
    content: 'This is the content of my post...',
    slug: 'my-first-post',
    status: 'DRAFT',
    categoryIds: ['category-id'],
    tagIds: ['tag-id']
  })
})
```

### Uploading a File

```javascript
const formData = new FormData()
formData.append('file', fileInput.files[0])

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})
```

### Tracking Analytics

```javascript
const response = await fetch('/api/analytics', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    page: '/dashboard',
    action: 'view',
    metadata: { userId: '123' }
  })
})
```

## 🗄️ Database Schema

### Core Models

- **User**: Authentication and user management
- **Post**: Blog posts and content
- **Category**: Post categorization
- **Tag**: Post tagging system
- **Comment**: Post comments with threading
- **FileUpload**: File management
- **Analytics**: User activity tracking
- **Notification**: User notifications
- **Setting**: Application configuration

### Relationships

- Users can have multiple posts, comments, uploads, and notifications
- Posts belong to users and can have multiple categories and tags
- Comments can be threaded (parent-child relationships)
- Analytics track user actions across the platform

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **HTTP-only Cookies**: XSS protection for auth tokens
- **Input Validation**: Zod schema validation for all inputs
- **File Upload Security**: Type and size validation
- **Role-based Access**: Admin and user role separation
- **SQL Injection Protection**: Prisma ORM with parameterized queries

## 📊 Analytics & Monitoring

The platform includes comprehensive analytics tracking:

- **Page Views**: Track which pages users visit
- **User Actions**: Monitor user interactions
- **Content Performance**: Post and category analytics
- **User Behavior**: Activity patterns and trends

## 🚀 Deployment

### Production Setup

1. **Database**: Use PostgreSQL or MySQL for production
2. **File Storage**: Use cloud storage (AWS S3, Cloudinary, etc.)
3. **Environment Variables**: Set production JWT secret and database URL
4. **HTTPS**: Enable SSL/TLS for secure communication

### Environment Variables

```env
# Production
DATABASE_URL="postgresql://user:password@localhost:5432/vastlywise"
JWT_SECRET="your-production-secret-key-here"
NODE_ENV="production"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the API examples

---

**VastlyWise Backend API** - A powerful, scalable backend for modern admin platforms. 