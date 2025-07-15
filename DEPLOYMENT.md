# Production Deployment Guide

## Step 1: Set Up Production Database

### Option A: PlanetScale (Recommended - Free Tier)
1. Go to [planetscale.com](https://planetscale.com)
2. Sign up and create a new database
3. Get your connection string from the dashboard
4. Copy the connection string

### Option B: Supabase (Free Tier)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string

### Option C: Railway (Free Tier)
1. Go to [railway.app](https://railway.app)
2. Create a new PostgreSQL database
3. Copy the connection string

## Step 2: Deploy to Vercel

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository

### 3. Configure Environment Variables
In Vercel dashboard, add these environment variables:

```
DATABASE_URL=your-production-database-connection-string
JWT_SECRET=your-super-secure-jwt-secret
NODE_ENV=production
```

### 4. Deploy
1. Click "Deploy"
2. Vercel will automatically build and deploy your app

## Step 3: Set Up Database Schema

After deployment, run database migrations:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to production database
npx prisma db push
```

## Step 4: Verify Deployment

1. Check your Vercel deployment URL
2. Test registration and login
3. Verify database connection

## Environment Variables Reference

### Required Variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secure random string for JWT tokens
- `NODE_ENV`: Set to "production"

### Example .env.production:
```
DATABASE_URL="postgresql://username:password@host:5432/database"
JWT_SECRET="your-super-secure-jwt-secret-for-production"
NODE_ENV="production"
```

## Troubleshooting

### Common Issues:
1. **Database Connection Failed**: Check DATABASE_URL format
2. **Build Errors**: Ensure all dependencies are in package.json
3. **JWT Errors**: Verify JWT_SECRET is set correctly

### Debug Commands:
```bash
# Check Prisma connection
npx prisma db pull

# View database schema
npx prisma studio

# Generate Prisma client
npx prisma generate
```

## Security Checklist

- [ ] JWT_SECRET is a strong random string
- [ ] DATABASE_URL uses SSL in production
- [ ] No sensitive data in code
- [ ] Environment variables are set in Vercel
- [ ] Database credentials are secure

## Next Steps

After successful deployment:
1. Set up custom domain (optional)
2. Configure monitoring and analytics
3. Set up CI/CD pipeline
4. Add backup strategies 