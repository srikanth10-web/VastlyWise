#!/bin/bash

# VastlyWise Database Deployment Script
# This script helps manage database deployments for local and production environments

set -e

echo "🚀 VastlyWise Database Deployment Script"
echo "========================================"

# Function to display usage
show_usage() {
    echo "Usage: $0 [local|production|both]"
    echo ""
    echo "Commands:"
    echo "  local       - Deploy to local SQLite database"
    echo "  production  - Deploy to production PostgreSQL database"
    echo "  both        - Deploy to both local and production databases"
    echo ""
    echo "Environment Variables:"
    echo "  DATABASE_URL - Required for production deployment"
    echo "  JWT_SECRET   - Required for production deployment"
}

# Function to deploy to local database
deploy_local() {
    echo "📦 Deploying to local SQLite database..."
    
    # Check if .env.local exists
    if [ ! -f ".env.local" ]; then
        echo "❌ Error: .env.local file not found"
        echo "Please create .env.local with your local environment variables"
        exit 1
    fi
    
    # Deploy to local database
    echo "🔄 Pushing schema to local database..."
    pnpm db:push
    
    echo "🌱 Seeding local database..."
    pnpm db:seed
    
    echo "✅ Local deployment completed successfully!"
    echo "💡 You can now run 'pnpm db:studio' to view your local database"
}

# Function to deploy to production database
deploy_production() {
    echo "🌐 Deploying to production PostgreSQL database..."
    
    # Check if DATABASE_URL is set
    if [ -z "$DATABASE_URL" ]; then
        echo "❌ Error: DATABASE_URL environment variable is not set"
        echo "Please set your Supabase PostgreSQL connection string:"
        echo "export DATABASE_URL='postgresql://postgres:password@host:port/database'"
        exit 1
    fi
    
    # Check if JWT_SECRET is set
    if [ -z "$JWT_SECRET" ]; then
        echo "❌ Error: JWT_SECRET environment variable is not set"
        echo "Please set your JWT secret:"
        echo "export JWT_SECRET='your-secure-jwt-secret'"
        exit 1
    fi
    
    # Deploy to production database
    echo "🔄 Pushing schema to production database..."
    pnpm db:production:push
    
    echo "✅ Production deployment completed successfully!"
    echo "💡 Your production database is now ready"
}

# Function to deploy to both environments
deploy_both() {
    echo "🔄 Deploying to both local and production databases..."
    
    deploy_local
    echo ""
    deploy_production
}

# Main script logic
case "${1:-}" in
    "local")
        deploy_local
        ;;
    "production")
        deploy_production
        ;;
    "both")
        deploy_both
        ;;
    *)
        show_usage
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment completed!" 