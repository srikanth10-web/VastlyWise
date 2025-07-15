-- SQL Script to Create User Table for Registration
-- This script creates the User table that handles user registration and authentication

-- Create User table
CREATE TABLE "User" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX "User_email_idx" ON "User"("email");
CREATE INDEX "User_username_idx" ON "User"("username");
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- Add comments for documentation
COMMENT ON TABLE "User" IS 'Stores user account information for registration and authentication';
COMMENT ON COLUMN "User"."id" IS 'Primary key, auto-incrementing user ID';
COMMENT ON COLUMN "User"."email" IS 'User email address (unique)';
COMMENT ON COLUMN "User"."username" IS 'User username (unique)';
COMMENT ON COLUMN "User"."password" IS 'Hashed password using bcrypt';
COMMENT ON COLUMN "User"."firstName" IS 'User first name';
COMMENT ON COLUMN "User"."lastName" IS 'User last name';
COMMENT ON COLUMN "User"."createdAt" IS 'Timestamp when user account was created';

-- Optional: Create a view for user data without password
CREATE VIEW "UserPublic" AS
SELECT 
    "id",
    "email",
    "username",
    "firstName",
    "lastName",
    "createdAt"
FROM "User";

-- Optional: Insert a test user (password: test123)
-- INSERT INTO "User" ("email", "username", "password", "firstName", "lastName")
-- VALUES (
--     'test@example.com',
--     'testuser',
--     '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- hashed 'test123'
--     'Test',
--     'User'
-- ); 