"use client";

const blogPosts = [
  {
    id: 1,
    title: "How AI is Transforming Industries",
    excerpt: "Discover how artificial intelligence is revolutionizing various sectors, from healthcare to finance, and what it means for the future of work.",
    image: "/placeholder.jpg",
    author: "Jane Doe",
    date: "2024-06-01",
    readingTime: "5 min read",
  },
  {
    id: 2,
    title: "5 Tips for Effective Remote Collaboration",
    excerpt: "Learn practical strategies to boost productivity and maintain team spirit while working remotely.",
    image: "/placeholder-user.jpg",
    author: "John Smith",
    date: "2024-05-15",
    readingTime: "3 min read",
  },
  {
    id: 3,
    title: "The Future of Cloud Computing",
    excerpt: "Explore the latest trends in cloud technology and how businesses can leverage them for growth and innovation.",
    image: "/placeholder-logo.png",
    author: "Alex Lee",
    date: "2024-04-20",
    readingTime: "4 min read",
  },
  // Add more posts as needed
];

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
      <p className="text-lg text-gray-600 mb-8">
        Welcome to our blog! Here you'll find the latest news, insights, and updates from our team.
      </p>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
            <div className="h-48 w-full rounded-t-lg overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="flex-1 flex flex-col p-6">
              <h2 className="text-2xl font-semibold text-blue-900 mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                <span>By {post.author}</span>
                <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 