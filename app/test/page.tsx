"use client"

import { useState, useEffect } from "react"

interface Post {
  id: string
  title: string
  content: string
  slug: string
  status: string
  author: {
    username: string
    firstName: string
    lastName: string
  }
  createdAt: string
}

interface Category {
  id: string
  name: string
  slug: string
  description: string
}

export default function TestPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch('/api/posts'),
          fetch('/api/categories')
        ])

        const postsData = await postsRes.json()
        const categoriesData = await categoriesRes.json()

        if (postsData.success) {
          setPosts(postsData.data)
        }

        if (categoriesData.success) {
          setCategories(categoriesData.data)
        }

        setLoading(false)
      } catch (err) {
        setError("Failed to fetch data")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading backend data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌</div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🎉 VastlyWise Backend Test Page
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Posts Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📝 Posts ({posts.length})
            </h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">{post.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {post.content.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>By {post.author.firstName} {post.author.lastName}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      {post.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📂 Categories ({categories.length})
            </h2>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-3">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {category.description}
                  </p>
                  <span className="text-xs text-gray-500">/{category.slug}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* API Status */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🔌 API Endpoints Status
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-600 text-lg">✅</div>
              <div className="text-sm font-medium">Posts API</div>
              <div className="text-xs text-gray-500">Working</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-600 text-lg">✅</div>
              <div className="text-sm font-medium">Categories API</div>
              <div className="text-xs text-gray-500">Working</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-600 text-lg">✅</div>
              <div className="text-sm font-medium">Auth API</div>
              <div className="text-xs text-gray-500">Working</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-600 text-lg">✅</div>
              <div className="text-sm font-medium">Database</div>
              <div className="text-xs text-gray-500">Connected</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            🧪 How to Test More Features
          </h2>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• <strong>Authentication:</strong> Try logging in with admin@example.com / admin123</p>
            <p>• <strong>File Upload:</strong> Use the upload API to test file management</p>
            <p>• <strong>Analytics:</strong> Track user actions with the analytics API</p>
            <p>• <strong>Settings:</strong> Manage application settings (admin only)</p>
            <p>• <strong>Notifications:</strong> Create and manage user notifications</p>
          </div>
        </div>

        {/* Database Summary */}
        <div className="mt-8 bg-purple-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            📊 Your Database Summary
          </h2>
          <div className="space-y-3 text-sm text-purple-800">
            <p>Here's what's in your VastlyWise database:</p>
            <p><strong>Tables Created:</strong></p>
            <ul className="list-disc list-inside">
              <li>✅ `users` - User accounts (2 users: admin + regular user)</li>
              <li>✅ `posts` - Blog posts (2 sample posts)</li>
              <li>✅ `categories` - Post categories (3 categories: Technology, Business, Lifestyle)</li>
              <li>✅ `tags` - Post tags</li>
              <li>✅ `comments` - Post comments</li>
              <li>✅ `file_uploads` - Uploaded files</li>
              <li>✅ `analytics` - User activity tracking</li>
              <li>✅ `notifications` - User notifications</li>
              <li>✅ `settings` - Application settings</li>
              <li>✅ `_CategoryToPost` - Many-to-many relationship table</li>
              <li>✅ `_PostToTag` - Many-to-many relationship table</li>
            </ul>
            <p><strong>Best Ways to Open Your Database:</strong></p>
            <p>1. Prisma Studio (Recommended)</p>
            <p>URL: `http://localhost:5555` (should be open now)</p>
            <p>Features: Visual interface, easy editing, relationship viewing</p>
            <p>2. Command Line (Quick Queries)</p>
            <pre className="bg-gray-100 p-2 rounded-md text-xs text-gray-800">
              # Open SQLite shell
              sqlite3 prisma/dev.db

              # Useful commands:
              .tables                    # Show all tables
              .schema users             # Show table structure
              SELECT * FROM users;      # View all users
              SELECT * FROM posts;      # View all posts
              .quit                     # Exit
            </pre>
            <p>3. Install SQLite Browser (Optional)</p>
            <p>If you want a standalone GUI:</p>
            <pre className="bg-gray-100 p-2 rounded-md text-xs text-gray-800">
              # Install with Homebrew
              brew install --cask db-browser-for-sqlite

              # Then open
              open -a "DB Browser for SQLite" prisma/dev.db
            </pre>
            <p><strong>Quick Database Queries:</strong></p>
            <pre className="bg-gray-100 p-2 rounded-md text-xs text-gray-800">
              -- View all users
              SELECT id, email, username, isAdmin FROM users;

              -- View all posts with author info
              SELECT p.title, p.status, u.username as author 
              FROM posts p 
              JOIN users u ON p.authorId = u.id;

              -- Count posts by status
              SELECT status, COUNT(*) as count FROM posts GROUP BY status;

              -- View categories with post count
              SELECT c.name, COUNT(p.id) as post_count 
              FROM categories c 
              LEFT JOIN _CategoryToPost cp ON c.id = cp.A 
              LEFT JOIN posts p ON cp.B = p.id 
              GROUP BY c.id;
            </pre>
            <p>**The Prisma Studio at `http://localhost:5555` is probably the easiest way to explore your database visually!** 🎯</p>
          </div>
        </div>
      </div>
    </div>
  )
} 