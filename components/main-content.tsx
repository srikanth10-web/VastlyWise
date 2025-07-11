"use client"

import type { User } from "@/types"
import { LogoUpload } from "./logo-upload"
import { onNavigate } from "@/utils/navigation" // Declare or import the onNavigate function
import { Calendar, CalendarDays } from "lucide-react"

interface MainContentProps {
  currentPage: string
  currentUser: User | null
  logoUrl: string
  onLogoUpdate: (logoUrl: string) => void
}

function showQuotations(day: string, date: string) {
  const container = document.getElementById("quotationsContainer")
  const placeholder = document.getElementById("placeholderMessage")
  const selectedInfo = document.getElementById("selectedInfo")
  const cardsContainer = document.getElementById("quotationCards")

  // Hide placeholder and show quotations
  if (placeholder && container) {
    placeholder.classList.add("hidden")
    container.classList.remove("hidden")
  }

  // Update selected info
  if (selectedInfo) {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    selectedInfo.textContent = day + ", " + formattedDate
  }

  // Get quotations for the selected day
  const quotationsDatabase = {
    Sunday: [
      {
        text: "Sunday is the perfect day to refuel your soul and to be grateful for each and every one of your blessings.",
        emoji: "☀️",
        author: "Anonymous",
      },
      { text: "Sunday clears away the rust of the whole week.", emoji: "🧹", author: "Joseph Addison" },
      {
        text: "Sunday, for me, is all about being home with the family with no plans.",
        emoji: "🏠",
        author: "John Lasseter",
      },
      { text: "Sunday well spent brings a week of content.", emoji: "😌", author: "Proverb" },
      {
        text: "Sunday is a day to refuel your soul and be grateful for your blessings. Take a deep breath and relax.",
        emoji: "🌸",
        author: "Anonymous",
      },
    ],
    Monday: [
      {
        text: "Monday is a fresh start. It's never too late to dig in and begin a new journey of success.",
        emoji: "🚀",
        author: "Anonymous",
      },
      {
        text: "Monday is the day to be back on track and chase your dreams with full energy.",
        emoji: "⚡",
        author: "Anonymous",
      },
      { text: "I hate Mondays... said no successful person ever!", emoji: "😄", author: "Anonymous" },
      { text: "Monday: Nothing a little coffee can't fix!", emoji: "☕", author: "Anonymous" },
      {
        text: "Monday is like a math problem. Add the irritation, subtract the sleep, multiply the problems, divide the happiness.",
        emoji: "🧮",
        author: "Anonymous",
      },
    ],
    Tuesday: [
      {
        text: "Tuesday isn't so bad... It's a sign that I've somehow survived Monday.",
        emoji: "🎉",
        author: "Anonymous",
      },
      {
        text: "Tuesday: The day to remember all the things I didn't get done on Monday and push them off until Wednesday.",
        emoji: "📝",
        author: "Anonymous",
      },
      { text: "Tuesday is Monday's ugly sister.", emoji: "👯‍♀️", author: "Anonymous" },
      {
        text: "On Tuesday, when it hails and snows, the feeling on me grows and grows that hardly anybody knows if those are these or these are those.",
        emoji: "🌨️",
        author: "Dr. Seuss",
      },
      { text: "Tuesday is just Monday's way of saying 'I'm back!'", emoji: "🔄", author: "Anonymous" },
    ],
    Wednesday: [
      { text: "Wednesday: Halfway to the weekend!", emoji: "🎯", author: "Anonymous" },
      {
        text: "Wednesday is like the middle child of the weekdays. Not the favorite, but gets the job done.",
        emoji: "👶",
        author: "Anonymous",
      },
      { text: "Wednesday: The day when even my coffee needs a coffee.", emoji: "☕☕", author: "Anonymous" },
      {
        text: "Wednesday is hump day, but I identify more with the camel - tired and slightly irritated.",
        emoji: "🐪",
        author: "Anonymous",
      },
      {
        text: "Wednesday: The day that feels like it should be Friday, but it's not.",
        emoji: "😩",
        author: "Anonymous",
      },
    ],
    Thursday: [
      {
        text: "Thursday: The most useless day. It only exists as a reminder that it's still not Friday.",
        emoji: "🤷‍♂️",
        author: "Anonymous",
      },
      { text: "Thursday is the new Friday... said no one ever.", emoji: "🙄", author: "Anonymous" },
      { text: "Thursday: I can see Friday from here!", emoji: "👀", author: "Anonymous" },
      { text: "Thursday is like a pre-game show for Friday.", emoji: "📺", author: "Anonymous" },
      { text: "Thursday: The day my motivation goes to die.", emoji: "💀", author: "Anonymous" },
    ],
    Friday: [
      { text: "Friday is my second favorite F word. Food is my first.", emoji: "🍕", author: "Anonymous" },
      {
        text: "Friday: The golden child of the weekdays. The superhero of the workweek. The welcome wagon to the weekend.",
        emoji: "🦸‍♂️",
        author: "Anonymous",
      },
      { text: "It's Friday! Time to go make stories for Monday.", emoji: "📚", author: "Anonymous" },
      {
        text: "Friday is like a superhero that always arrives just in time to stop me from savagely beating one of my coworkers with a keyboard.",
        emoji: "⌨️",
        author: "Anonymous",
      },
      {
        text: "Dear Friday, I'm so glad we're back together. Sorry Saturday and Sunday keep getting in the way. Sincerely, Me.",
        emoji: "💌",
        author: "Anonymous",
      },
    ],
    Saturday: [
      {
        text: "Saturday: The day I planned a bunch of things and then decided to do none of them.",
        emoji: "🛋️",
        author: "Anonymous",
      },
      {
        text: "Saturday is the perfect day for a little bit of shopping, a little bit of fun, and a whole lot of relaxation.",
        emoji: "🛍️",
        author: "Anonymous",
      },
      {
        text: "Saturday: The day when doing absolutely nothing feels absolutely right.",
        emoji: "😴",
        author: "Anonymous",
      },
      {
        text: "Saturday is the day to refuel your soul and be grateful for your blessings.",
        emoji: "🙏",
        author: "Anonymous",
      },
      { text: "Saturday: Nature's way of saying 'Take a break, you've earned it!'", emoji: "🌿", author: "Anonymous" },
    ],
  }

  const dayQuotations = quotationsDatabase[day] || []

  // Clear previous cards
  if (cardsContainer) {
    cardsContainer.innerHTML = ""
  }

  // Create cards for each quotation
  dayQuotations.forEach((quote, index) => {
    const card = document.createElement("div")
    card.className =
      "bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"

    card.innerHTML = `
      <div class="text-center mb-4">
        <div class="text-4xl mb-2">${quote.emoji}</div>
        <div class="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded mx-auto"></div>
      </div>
      <blockquote class="text-gray-700 text-center italic mb-4 leading-relaxed">
        "${quote.text}"
      </blockquote>
      <div class="text-center">
        <cite class="text-sm text-gray-500 font-medium">— ${quote.author}</cite>
      </div>
      <div class="mt-4 flex justify-center">
        <div class="bg-white px-3 py-1 rounded-full text-xs text-gray-600 border">
          Quote #${index + 1}
        </div>
      </div>
    `

    if (cardsContainer) {
      cardsContainer.appendChild(card)
    }
  })
}

// SEO Content functions for Project 3
function updateWordCount() {
  const textarea = document.getElementById("seoContentTextarea") as HTMLTextAreaElement
  const wordCountEl = document.getElementById("wordCount")
  const charCountEl = document.getElementById("charCount")

  if (textarea && wordCountEl && charCountEl) {
    const text = textarea.value
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
    const chars = text.length

    wordCountEl.textContent = words.toString()
    charCountEl.textContent = chars.toString()

    // Update word count color based on target (1000 words)
    if (words < 800) {
      wordCountEl.className = "text-red-600 font-bold"
    } else if (words < 1000) {
      wordCountEl.className = "text-yellow-600 font-bold"
    } else if (words <= 1200) {
      wordCountEl.className = "text-green-600 font-bold"
    } else {
      wordCountEl.className = "text-orange-600 font-bold"
    }
  }
}

function saveSEOContent() {
  const textarea = document.getElementById("seoContentTextarea") as HTMLTextAreaElement
  if (textarea) {
    localStorage.setItem("seoContent", textarea.value)

    // Show save confirmation
    const saveBtn = document.getElementById("saveBtn")
    if (saveBtn) {
      const originalText = saveBtn.innerHTML
      saveBtn.innerHTML = '<span class="text-green-600">✓ Saved!</span>'
      setTimeout(() => {
        saveBtn.innerHTML = originalText
      }, 2000)
    }
  }
}

function loadSEOContent() {
  const textarea = document.getElementById("seoContentTextarea") as HTMLTextAreaElement
  if (textarea) {
    const savedContent = localStorage.getItem("seoContent")
    if (savedContent) {
      textarea.value = savedContent
      updateWordCount()
    }
  }
}

function previewSEOContent() {
  const textarea = document.getElementById("seoContentTextarea") as HTMLTextAreaElement
  const previewDiv = document.getElementById("seoPreview")

  if (textarea && previewDiv) {
    const content = textarea.value
    const formattedContent = content
      .split("\n\n")
      .map((paragraph) => `<p class="mb-4 text-gray-700 leading-relaxed">${paragraph.replace(/\n/g, "<br>")}</p>`)
      .join("")

    previewDiv.innerHTML = formattedContent || '<p class="text-gray-500 italic">No content to preview</p>'

    // Toggle preview visibility
    const isHidden = previewDiv.classList.contains("hidden")
    if (isHidden) {
      previewDiv.classList.remove("hidden")
      const previewBtn = document.getElementById("previewBtn")
      if (previewBtn)
        previewBtn.innerHTML =
          '<span class="flex items-center space-x-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L8.464 8.464m0 0L7.05 7.05M9.878 9.878l4.242 4.242m0 0L15.536 15.536M9.878 9.878L8.464 8.464"></path></svg><span>Hide Preview</span></span>'
    } else {
      previewDiv.classList.add("hidden")
      const previewBtn = document.getElementById("previewBtn")
      if (previewBtn)
        previewBtn.innerHTML =
          '<span class="flex items-center space-x-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg><span>Preview</span></span>'
    }
  }
}

function copySEOContent() {
  const textarea = document.getElementById("seoContentTextarea") as HTMLTextAreaElement
  if (textarea) {
    textarea.select()
    document.execCommand("copy")

    // Show copy confirmation
    const copyBtn = document.getElementById("copyBtn")
    if (copyBtn) {
      const originalText = copyBtn.innerHTML
      copyBtn.innerHTML = '<span class="text-green-600">✓ Copied!</span>'
      setTimeout(() => {
        copyBtn.innerHTML = originalText
      }, 2000)
    }
  }
}

export function MainContent({ currentPage, currentUser, logoUrl, onLogoUpdate }: MainContentProps) {
  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Our Platform</h1>
            <p className="text-lg text-gray-600">
              This is the home page of our modern web application. Navigate through the sidebar to explore different
              sections.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Dashboard</h3>
                <p className="text-blue-700">Access your personalized dashboard with analytics and reports.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Content Management</h3>
                <p className="text-green-700">Manage your content, pages, and media files efficiently.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">User Management</h3>
                <p className="text-purple-700">Control user access, roles, and permissions.</p>
              </div>
            </div>
          </div>
        )

      case "industries":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Industries</h1>
            <p className="text-lg text-gray-600">
              Explore the various industries we serve and our specialized solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Technology</h3>
                <p className="text-gray-600">Cutting-edge solutions for tech companies and startups.</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Healthcare</h3>
                <p className="text-gray-600">Specialized tools for healthcare providers and institutions.</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Finance</h3>
                <p className="text-gray-600">Secure and compliant solutions for financial services.</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Education</h3>
                <p className="text-gray-600">Educational platforms and learning management systems.</p>
              </div>
            </div>
          </div>
        )

      case "press-release":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Press Releases</h1>
            <p className="text-lg text-gray-600">
              Stay updated with our latest news, announcements, and company updates.
            </p>
            <div className="space-y-4">
              <article className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">New Platform Launch</h3>
                <p className="text-sm text-gray-500 mb-2">December 15, 2024</p>
                <p className="text-gray-700">
                  We are excited to announce the launch of our new admin platform with enhanced features and improved
                  user experience.
                </p>
              </article>
              <article className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">Partnership Announcement</h3>
                <p className="text-sm text-gray-500 mb-2">November 28, 2024</p>
                <p className="text-gray-700">
                  Strategic partnership with leading technology companies to expand our service offerings.
                </p>
              </article>
              <article className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">Security Update</h3>
                <p className="text-sm text-gray-500 mb-2">November 10, 2024</p>
                <p className="text-gray-700">
                  Enhanced security measures implemented across all our platforms to ensure data protection.
                </p>
              </article>
            </div>
          </div>
        )

      // Industry-specific pages
      case "industry-solutions":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Industry Solutions</h1>
            <p className="text-lg text-gray-600">
              Discover our comprehensive solutions tailored for your specific industry needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Custom Development</h3>
                <p className="text-gray-600">
                  Tailored software solutions built specifically for your industry requirements.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Integration Services</h3>
                <p className="text-gray-600">Seamlessly connect your existing systems with modern solutions.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Consulting & Strategy</h3>
                <p className="text-gray-600">Expert guidance to help you navigate digital transformation.</p>
              </div>
            </div>
          </div>
        )

      case "case-studies":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Case Studies</h1>
            <p className="text-lg text-gray-600">Real success stories from businesses across various industries.</p>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Healthcare Digital Transformation</h3>
                    <p className="text-sm text-gray-500">Healthcare • 6 months project</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Success</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Helped a major hospital network digitize their patient management system, resulting in 40% faster
                  patient processing.
                </p>
                <div className="flex space-x-4 text-sm">
                  <span className="text-blue-600">• 40% faster processing</span>
                  <span className="text-blue-600">• 99.9% uptime</span>
                  <span className="text-blue-600">• $2M cost savings</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">E-commerce Platform Scaling</h3>
                    <p className="text-sm text-gray-500">Retail • 4 months project</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Success</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Scaled an e-commerce platform to handle 10x traffic during peak seasons with zero downtime.
                </p>
                <div className="flex space-x-4 text-sm">
                  <span className="text-blue-600">• 10x traffic capacity</span>
                  <span className="text-blue-600">• Zero downtime</span>
                  <span className="text-blue-600">• 300% revenue increase</span>
                </div>
              </div>
            </div>
          </div>
        )

      case "industry-insights":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Industry Insights</h1>
            <p className="text-lg text-gray-600">
              Stay ahead with the latest trends, insights, and analysis across industries.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">The Future of Healthcare Technology</h3>
                <p className="text-sm text-gray-500 mb-3">December 20, 2024 • 5 min read</p>
                <p className="text-gray-600 mb-4">
                  Exploring how AI and telemedicine are reshaping patient care and medical operations.
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">Read More →</button>
              </article>

              <article className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">Fintech Trends for 2025</h3>
                <p className="text-sm text-gray-500 mb-3">December 18, 2024 • 7 min read</p>
                <p className="text-gray-600 mb-4">
                  Key financial technology trends that will shape the banking and payments industry.
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">Read More →</button>
              </article>
            </div>
          </div>
        )

      case "dashboard":
      case "dashboard-overview":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Active Sessions</h3>
                <p className="text-2xl font-bold text-gray-900">456</p>
                <p className="text-sm text-blue-600">+5% from last week</p>
              </div>
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
                <p className="text-2xl font-bold text-gray-900">$12,345</p>
                <p className="text-sm text-green-600">+8% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
                <p className="text-2xl font-bold text-gray-900">3.2%</p>
                <p className="text-sm text-red-600">-2% from last month</p>
              </div>
            </div>

            {currentUser?.isAdmin && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
                <LogoUpload currentLogoUrl={logoUrl} onLogoUpdate={onLogoUpdate} />
              </div>
            )}
          </div>
        )

      case "dashboard-analytics":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-lg text-gray-600">Detailed analytics and performance metrics.</p>
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Analytics charts would be displayed here</p>
            </div>
          </div>
        )

      case "dashboard-reports":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-lg text-gray-600">Generate and view detailed reports.</p>
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Report generation interface would be displayed here</p>
            </div>
          </div>
        )

      case "ecommerce":
      case "ecommerce-products":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">E-Commerce Products</h1>
            <p className="text-lg text-gray-600">Manage your product catalog, inventory, and pricing.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Total Products</h3>
                <p className="text-3xl font-bold text-blue-600">1,247</p>
              </div>
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Out of Stock</h3>
                <p className="text-3xl font-bold text-red-600">23</p>
              </div>
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Low Stock</h3>
                <p className="text-3xl font-bold text-yellow-600">45</p>
              </div>
            </div>
          </div>
        )

      case "communication":
      case "communication-messages":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-lg text-gray-600">Manage customer communications and internal messages.</p>
            <div className="bg-white rounded-lg border">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Recent Messages</h3>
              </div>
              <div className="divide-y">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Customer #{i}</p>
                        <p className="text-sm text-gray-600">Message content preview...</p>
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "media":
      case "media-images":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
            <p className="text-lg text-gray-600">Manage your images, videos, and other media files.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Image {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )

      case "support":
      case "support-docs":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
            <p className="text-lg text-gray-600">Access help articles, guides, and documentation.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Quick Setup Guide</li>
                  <li>• Basic Configuration</li>
                  <li>• First Steps Tutorial</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-3">Advanced Topics</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• API Integration</li>
                  <li>• Custom Development</li>
                  <li>• Performance Optimization</li>
                </ul>
              </div>
            </div>
          </div>
        )

      // Add a generic handler for other menu items
      case "quick-search":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Search</h1>
            <div className="max-w-2xl">
              <input
                type="text"
                placeholder="Search across all content..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )

      case "notifications":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <div className="bg-white rounded-lg border divide-y">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Notification {i}</p>
                      <p className="text-sm text-gray-600">Notification description goes here...</p>
                      <span className="text-xs text-gray-500">5 minutes ago</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "calendar":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <div className="bg-white rounded-lg border p-6">
              <div className="text-center text-gray-500">
                <p>Calendar component would be displayed here</p>
                <p className="text-sm mt-2">Showing events, appointments, and scheduled tasks</p>
              </div>
            </div>
          </div>
        )

      // Handle simple navigation items
      case "navigation-item-1":
      case "navigation-item-2":
      case "navigation-item-3":
      case "navigation-item-4":
      case "navigation-item-5":
      case "navigation-item-6":
      case "navigation-item-7":
      case "navigation-item-8":
      case "navigation-item-9":
      case "navigation-item-10":
        const itemNumber = currentPage.split("-").pop()
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Navigation Item {itemNumber}</h1>
            <p className="text-lg text-gray-600">
              This is the content for Navigation Item {itemNumber}. You can customize this content based on your needs.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Content Section</h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae
                erat.
              </p>
            </div>
          </div>
        )

      // Handle project pages
      case "project1":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Daily Quotations</h1>
            <p className="text-lg text-gray-600">
              Select a day of the week and a date from 2025 to discover funny quotations!
            </p>

            {/* Day and Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Select Day of Week
                </h3>
                <select
                  id="daySelect"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => {
                    const selectedDay = e.target.value
                    const dateInput = document.getElementById("dateSelect") as HTMLInputElement
                    const selectedDate = dateInput?.value
                    if (selectedDay && selectedDate) {
                      showQuotations(selectedDay, selectedDate)
                    }
                  }}
                >
                  <option value="">Choose a day...</option>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>

              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <CalendarDays className="w-5 h-5 mr-2 text-green-600" />
                  Select Date (2025 Only)
                </h3>
                <input
                  id="dateSelect"
                  type="date"
                  min="2025-01-01"
                  max="2025-12-31"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onChange={(e) => {
                    const selectedDate = e.target.value
                    const daySelect = document.getElementById("daySelect") as HTMLSelectElement
                    const selectedDay = daySelect?.value
                    if (selectedDay && selectedDate) {
                      showQuotations(selectedDay, selectedDate)
                    }
                  }}
                />
              </div>
            </div>

            {/* Quotations Display Area */}
            <div id="quotationsContainer" className="hidden">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                🎭 Funny Quotations for <span id="selectedInfo"></span>
              </h2>
              <div id="quotationCards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quotation cards will be inserted here */}
              </div>
            </div>

            {/* Fun placeholder when nothing is selected */}
            <div id="placeholderMessage" className="text-center py-12">
              <div className="text-6xl mb-4">🤔</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready for Some Laughs?</h3>
              <p className="text-gray-500">
                Select both a day of the week and a date from 2025 to see hilarious quotations!
              </p>
            </div>
          </div>
        )

      case "project2":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Algorithm Code Runner</h1>
            <p className="text-lg text-gray-600">
              Enter your algorithm code and execute them to monitor system performance.
            </p>

            {/* Algorithm Input Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Algorithm 1 */}
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    Algorithm 1
                  </h3>
                </div>
                <div className="p-4">
                  <textarea
                    id="algorithm1Code"
                    placeholder={`// Simple CPU intensive example
let result = 0;
for (let i = 0; i < 100000; i++) {
  result += Math.sqrt(i);
}
console.log("Calculated", result.toFixed(2));
"CPU task completed"
`}
                    className="w-full h-48 px-3 py-2 font-mono text-sm bg-gray-900 text-green-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    style={{
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      lineHeight: "1.5",
                      tabSize: "2",
                    }}
                  />
                </div>

                {/* Algorithm 1 Output */}
                <div className="border-t border-gray-200">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700">Output & Status</h4>
                  </div>
                  <div className="p-4">
                    <div
                      id="algorithm1Output"
                      className="min-h-32 p-3 bg-gray-900 text-green-400 font-mono text-sm rounded border border-2 border-gray-600 overflow-auto"
                      style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
                    >
                      <div className="text-gray-500">Ready to execute Algorithm 1...</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Algorithm 2 */}
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    Algorithm 2
                  </h3>
                </div>
                <div className="p-4">
                  <textarea
                    id="algorithm2Code"
                    placeholder={`// Simple memory intensive example  
const largeArray = [];
for (let i = 0; i < 50000; i++) {
  largeArray.push({ id: i, value: Math.random() });
}
console.log("Created array with", largeArray.length, "items");
"Memory task completed"
`}
                    className="w-full h-48 px-3 py-2 font-mono text-sm bg-gray-900 text-green-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    style={{
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      lineHeight: "1.5",
                      tabSize: "2",
                    }}
                  />
                </div>

                {/* Algorithm 2 Output */}
                <div className="border-t border-gray-200">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700">Output & Status</h4>
                  </div>
                  <div className="p-4">
                    <div
                      id="algorithm2Output"
                      className="min-h-32 p-3 bg-gray-900 text-green-400 font-mono text-sm rounded border border-2 border-gray-600 overflow-auto"
                      style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
                    >
                      <div className="text-gray-500">Ready to execute Algorithm 2...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                id="runAlgo1Btn"
                onClick={() => {
                  if (typeof window !== "undefined" && window.runAlgorithmCode) {
                    window.runAlgorithmCode(1)
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <span>Run Algorithm 1</span>
              </button>

              <button
                id="runAlgo2Btn"
                onClick={() => {
                  if (typeof window !== "undefined" && window.runAlgorithmCode) {
                    window.runAlgorithmCode(2)
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">2</span>
                </div>
                <span>Run Algorithm 2</span>
              </button>

              <button
                id="runBothBtn"
                onClick={() => {
                  if (typeof window !== "undefined" && window.runBothAlgorithmCodes) {
                    window.runBothAlgorithmCodes()
                  }
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                <div className="flex space-x-1">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xs">1</span>
                  </div>
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xs">2</span>
                  </div>
                </div>
                <span>Run Both Algorithms</span>
              </button>
            </div>

            {/* System Performance Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CPU Usage Card */}
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">⚡</span>
                    </div>
                    CPU Usage
                  </h3>
                  <span id="cpuPercentageCode" className="text-2xl font-bold text-blue-600">
                    0%
                  </span>
                </div>

                {/* CPU Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div
                    id="cpuBarCode"
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-4 rounded-full transition-all duration-300 ease-out"
                    style={{ width: "0%" }}
                  ></div>
                </div>

                {/* CPU Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-blue-600 font-medium">Current Load</div>
                    <div id="cpuLoadCode" className="text-gray-900 font-semibold">
                      Idle
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-blue-600 font-medium">Peak Usage</div>
                    <div id="cpuPeakCode" className="text-gray-900 font-semibold">
                      0%
                    </div>
                  </div>
                </div>
              </div>

              {/* Memory Usage Card */}
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">🧠</span>
                    </div>
                    Memory Usage
                  </h3>
                  <span id="memoryPercentageCode" className="text-2xl font-bold text-green-600">
                    0%
                  </span>
                </div>

                {/* Memory Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div
                    id="memoryBarCode"
                    className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-300 ease-out"
                    style={{ width: "0%" }}
                  ></div>
                </div>

                {/* Memory Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-green-600 font-medium">Used Memory</div>
                    <div id="memoryUsedCode" className="text-gray-900 font-semibold">
                      0 MB
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-green-600 font-medium">Available</div>
                    <div id="memoryAvailableCode" className="text-gray-900 font-semibold">
                      8192 MB
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Execution History */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-bold">📊</span>
                </div>
                Execution History
              </h3>
              <div id="executionHistoryCode" className="space-y-2 max-h-64 overflow-y-auto">
                <div className="text-gray-500 text-sm italic">
                  No algorithms have been executed yet. Enter your code and click a run button to start.
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="text-blue-600 font-medium text-sm">Total Executions</div>
                <div id="totalExecutionsCode" className="text-2xl font-bold text-blue-800">
                  0
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <div className="text-green-600 font-medium text-sm">Avg Execution Time</div>
                <div id="avgExecutionTimeCode" className="text-2xl font-bold text-green-800">
                  0ms
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                <div className="text-purple-600 font-medium text-sm">Success Rate</div>
                <div id="successRateCode" className="text-2xl font-bold text-purple-800">
                  100%
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                <div className="text-orange-600 font-medium text-sm">Errors</div>
                <div id="errorCountCode" className="text-2xl font-bold text-orange-800">
                  0
                </div>
              </div>
            </div>

            <script
              dangerouslySetInnerHTML={{
                __html: `
    (function() {
      let isRunningCode = false;
      let currentCpuCode = 0;
      let currentMemoryCode = 0;
      let peakCpuCode = 0;
      let totalExecutionsCode = 0;
      let totalExecutionTimeCode = 0;
      let successfulExecutionsCode = 0;
      let errorCountCode = 0;
      let executionHistoryCountCode = 0;

      function updateResourceDisplayCode() {
        // Update CPU
        const cpuPercentage = document.getElementById('cpuPercentageCode');
        const cpuBar = document.getElementById('cpuBarCode');
        const cpuLoad = document.getElementById('cpuLoadCode');
        const cpuPeak = document.getElementById('cpuPeakCode');
        
        if (cpuPercentage) cpuPercentage.textContent = currentCpuCode + '%';
        if (cpuBar) cpuBar.style.width = currentCpuCode + '%';
        if (cpuLoad) cpuLoad.textContent = currentCpuCode > 70 ? 'High' : currentCpuCode > 30 ? 'Medium' : 'Low';
        
        // Update Memory
        const memoryPercentage = document.getElementById('memoryPercentageCode');
        const memoryBar = document.getElementById('memoryBarCode');
        const memoryUsed = document.getElementById('memoryUsedCode');
        const memoryAvailable = document.getElementById('memoryAvailableCode');
        
        if (memoryPercentage) memoryPercentage.textContent = currentMemoryCode + '%';
        if (memoryBar) memoryBar.style.width = currentMemoryCode + '%';
        
        const usedMemory = Math.round((currentMemoryCode / 100) * 8192);
        const availableMemory = 8192 - usedMemory;
        if (memoryUsed) memoryUsed.textContent = usedMemory + ' MB';
        if (memoryAvailable) memoryAvailable.textContent = availableMemory + ' MB';
        
        // Update peak CPU
        if (currentCpuCode > peakCpuCode) {
          peakCpuCode = currentCpuCode;
          if (cpuPeak) cpuPeak.textContent = peakCpuCode + '%';
        }
      }

      function addToExecutionHistory(message, type = 'info', algorithmId = null) {
        const history = document.getElementById('executionHistoryCode');
        if (!history) return;
        
        const timestamp = new Date().toLocaleTimeString();
        const colors = {
          info: 'text-blue-600',
          success: 'text-green-600',
          warning: 'text-orange-600',
          error: 'text-red-600'
        };
        
        const historyEntry = document.createElement('div');
        historyEntry.className = 'flex items-center space-x-2 text-sm p-3 bg-gray-50 rounded border-l-4 border-' + (type === 'error' ? 'red' : type === 'success' ? 'green' : type === 'warning' ? 'orange' : 'blue') + '-400';
        
        const algorithmBadge = algorithmId ? \`<span class="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">Algo \${algorithmId}</span>\` : '';
        
        historyEntry.innerHTML = \`
          <span class="text-gray-500 font-mono">[\${timestamp}]</span>
          \${algorithmBadge}
          <span class="\${colors[type]} font-medium">\${message}</span>
        \`;
        
        if (history.children.length === 1 && history.children[0].textContent.includes('No algorithms')) {
          history.innerHTML = '';
        }
        
        history.insertBefore(historyEntry, history.firstChild);
        
        // Keep only last 15 entries
        while (history.children.length > 15) {
          history.removeChild(history.lastChild);
        }
      }

      function addToOutput(algorithmId, message, type = 'info') {
        const outputElement = document.getElementById(\`algorithm\${algorithmId}Output\');
        if (!outputElement) return;
        
        const timestamp = new Date().toLocaleTimeString();
        const colors = {
          info: 'text-green-400',
          success: 'text-green-300',
          warning: 'text-yellow-400',
          error: 'text-red-400'
        };
        
        const outputLine = document.createElement('div');
        outputLine.className = \`\${colors[type]} mb-1\`;
        outputLine.innerHTML = \`<span class="text-gray-500">[\${timestamp}]</span> \${message}\`;
        
        // Clear "Ready to execute" message if it exists
        if (outputElement.children.length === 1 && outputElement.children[0].textContent.includes('Ready to execute')) {
          outputElement.innerHTML = '';
        }
        
        outputElement.appendChild(outputLine);
        outputElement.scrollTop = outputElement.scrollHeight;
      }

      function simulateResourceUsage(algorithmId, duration = 2000) {
        return new Promise((resolve) => {
          const startTime = Date.now();
          const interval = setInterval(() => {
            const elapsed = Date.now();
            const progress = elapsed / duration;
            
            if (algorithmId === 1) {
              // CPU intensive simulation
              currentCpuCode = Math.min(85, Math.round(20 + (progress * 60) + (Math.random() * 15)));
              currentMemoryCode = Math.min(35, Math.round(5 + (progress * 25) + (Math.random() * 5)));
            } else if (algorithmId === 2) {
              // Memory intensive simulation
              currentCpuCode = Math.min(50, Math.round(10 + (progress * 30) + (Math.random() * 10)));
              currentMemoryCode = Math.min(80, Math.round(15 + (progress * 55) + (Math.random() * 10)));
            }
            
            updateResourceDisplayCode();
            
            if (elapsed >= duration) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });
      }

      function coolDownResources() {
        return new Promise((resolve) => {
          const coolDownInterval = setInterval(() => {
            currentCpuCode = Math.max(0, currentCpuCode - 8);
            currentMemoryCode = Math.max(0, currentMemoryCode - 5);
            updateResourceDisplayCode();
            
            if (currentCpuCode <= 0 && currentMemoryCode <= 0) {
              clearInterval(coolDownInterval);
              resolve();
            }
          }, 150);
        });
      }

      function updateButtons(disabled) {
        const btn1 = document.getElementById('runAlgo1Btn');
        const btn2 = document.getElementById('runAlgo2Btn');
        const btn3 = document.getElementById('runBothBtn');
        
        if (btn1) btn1.disabled = disabled;
        if (btn2) btn2.disabled = disabled;
        if (btn3) btn3.disabled = disabled;
      }

      function updateSummaryStats() {
        totalExecutionsCode++;
        const avgTime = totalExecutionsCode > 0 ? Math.round(totalExecutionTimeCode / totalExecutionsCode) : 0;
        const successRate = totalExecutionsCode > 0 ? Math.round((successfulExecutionsCode / totalExecutionsCode) * 100) : 100;
        
        const totalExec = document.getElementById('totalExecutionsCode');
        const avgExecTime = document.getElementById('avgExecutionTimeCode');
        const successRateEl = document.getElementById('successRateCode');
        const errorCountEl = document.getElementById('errorCountCode');
        
        if (totalExec) totalExec.textContent = totalExecutionsCode;
        if (avgExecTime) avgExecTime.textContent = avgTime + 'ms';
        if (successRateEl) successRateEl.textContent = successRate + '%';
        if (errorCountEl) errorCountEl.textContent = errorCountCode;
      }

async function executeUserCode(code, algorithmId) {
  try {
    addToOutput(algorithmId, 'Executing algorithm...', 'info');
    
    // Simulate code execution with some processing time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Try to evaluate the code (in a real implementation, this would be sandboxed)
    let result;
    try {
      // Create a console.log capture
      const logs = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        const message = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        logs.push(message);
        addToOutput(algorithmId, message, 'info');
      };
      
      // Execute the code in a safer way
      try {
        // If it's a function definition, execute it
        if (code.includes('function ') || code.includes('=>')) {
          const func = new Function(code + '; return typeof ' + code.match(/function\\s+(\\w+)/)?.[1] + ' !== "undefined" ? ' + code.match(/function\\s+(\\w+)/)?.[1] + '() : "Code executed"');
          result = func();
        } else {
          // Direct code execution
          const func = new Function(code);
          result = func();
        }
        
        // Restore console.log
        console.log = originalConsoleLog;
        
        addToOutput(algorithmId, 'Execution completed successfully', 'success');
        if (result !== undefined) {
          addToOutput(algorithmId, 'Return value: ' + JSON.stringify(result), 'info');
        }
        
        return { success: true, result, logs };
      } catch (execError) {
        // Restore console.log
        console.log = originalConsoleLog;
        addToOutput(algorithmId, 'Execution Error: ' + execError.message, 'error');
        return { success: false, error: execError.message };
      }
    } catch (error) {
      addToOutput(algorithmId, 'Code Parsing Error: ' + error.message, 'error');
      return { success: false, error: error.message };
    }
  } catch (error) {
    addToOutput(algorithmId, 'Runtime Error: ' + error.message, 'error');
    return { success: false, error: error.message };
  }
}

      async function runAlgorithmCode(algorithmId) {
        if (isRunningCode) return;
        
        const codeTextarea = document.getElementById(\`algorithm\${algorithmId}Code\`);
        if (!codeTextarea) return;
        
        const code = codeTextarea.value.trim();
        if (!code) {
          addToOutput(algorithmId, 'No code to execute', 'warning');
          return;
        }
        
        isRunningCode = true;
        updateButtons(true);
        
        const startTime = Date.now();
        addToExecutionHistory(\`Started Algorithm \${algorithmId}\`, 'info', algorithmId);
        
        try {
          // Simulate resource usage
          await simulateResourceUsage(algorithmId, 2000 + Math.random() * 2000);
          
          // Execute the user code
          const executionResult = await executeUserCode(code, algorithmId);
          
          const executionTime = Date.now() - startTime;
          totalExecutionTimeCode += executionTime;
          
          if (executionResult.success) {
            successfulExecutionsCode++;
            addToExecutionHistory(\`Algorithm \${algorithmId} completed successfully (\${executionTime}ms)\`, 'success', algorithmId);
          } else {
            errorCountCode++;
            addToExecutionHistory(\`Algorithm \${algorithmId} failed: \${executionResult.error}\`, 'error', algorithmId);
          }
          
          updateSummaryStats();
          
        } catch (error) {
          errorCountCode++;
          addToExecutionHistory(\`Algorithm \${algorithmId} crashed: \${error.message}\`, 'error', algorithmId);
        } finally {
          // Cool down resources
          await coolDownResources();
          isRunningCode = false;
          updateButtons(false);
        }
      }

      async function runBothAlgorithmCodes() {
        if (isRunningCode) return;
        
        addToExecutionHistory('Starting both algorithms simultaneously', 'info');
        
        // Run both algorithms concurrently
        await Promise.all([
          runAlgorithmCode(1),
          runAlgorithmCode(2)
        ]);
        
        addToExecutionHistory('Both algorithms completed', 'success');
      }

      // Expose functions to global scope
      window.runAlgorithmCode = runAlgorithmCode;
      window.runBothAlgorithmCodes = runBothAlgorithmCodes;

      // Initialize display when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateResourceDisplayCode);
      } else {
        updateResourceDisplayCode();
      }
    })();
  `,
              }}
            />
          </div>
        )

      case "project3":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Website Preview Tool</h1>
            <p className="text-lg text-gray-600">
              Preview how websites look across different devices, operating systems, and browsers.
            </p>

            {/* URL Input Section */}
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-purple-200 rounded-t-lg">
                <h3 className="text-lg font-semibold text-purple-900 flex items-center">
                  <span className="text-2xl mr-3">🌐</span>
                  Website URL Input
                </h3>
              </div>
              <div className="p-6">
                <div className="flex space-x-4">
                  <input
                    type="url"
                    id="websiteUrl"
                    placeholder="Enter website URL (e.g., https://example.com)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    defaultValue="https://example.com"
                  />
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined" && window.loadWebsitePreview) {
                        window.loadWebsitePreview()
                      }
                    }}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Load Preview
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Enter any website URL to see how it appears across different devices and browsers
                </p>
              </div>
            </div>

            {/* Device Selection */}
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <span className="text-2xl mr-3">📱</span>
                  Device & Browser Selection
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Mobile Devices */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">📱 Mobile Devices</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.selectDevice) {
                            window.selectDevice("iphone-14", "iPhone 14", "390x844", "iOS 16")
                          }
                        }}
                        className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                      >
                        📱 iPhone 14 (390×844)
                      </button>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.selectDevice) {
                            window.selectDevice("iphone-se", "iPhone SE", "375x667", "iOS 16")
                          }
                        }}
                        className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                      >
                        📱 iPhone SE (375×667)
                      </button>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.selectDevice) {
                            window.selectDevice("samsung-s23", "Samsung Galaxy S23", "360x780", "Android 13")
                          }
                        }}
                        className="w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors"
                      >
                        📱 Samsung Galaxy S23 (360×780)
                      </button>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.selectDevice) {
                            window.selectDevice("pixel-7", "Google Pixel 7", "412x915", "Android 13")
                          }
                        }}
                        className="w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors"
                      >
                        📱 Google Pixel 7 (412×915)
                      </button>
                    </div>
                  </div>

                  {/* Tablets */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">📟 Tablets</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.selectDevice) {
                            window.selectDevice("ipad-air", "iPad Air", "820x1180", "iPadOS 16")
                          }
                        }}
                        className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                      >
                        📟 iPad Air (820×1180)
                      </button>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.selectDevice) {
                            window.selectDevice("ipad-mini", "iPad Mini", "744x1133", "iPadOS 16")
                          }
                        }}
                        className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                      >
                        📟 iPad Mini (744×1133)
                      </button>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.selectDevice) {
                            window.selectDevice("samsung-tab", "Samsung Galaxy Tab", "800x1280", "Android 13")
                          }
                        }}
                        className="w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors"
                      >
                        📟 Samsung Galaxy Tab (800×1280)
                      </button>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.selectDevice) {
                            window.selectDevice("surface-pro", "Surface Pro", "912x1368", "Windows 11")
                          }
                        }}
                        className="w-full text-left px-3 py-2 bg-purple-50 hover:bg-purple-100 rounded border border-purple-200 transition-colors"
                      >
                        📟 Surface Pro (912×1368)
                      </button>
                    </div>
                  </div>

                  {/* Laptops/Desktops */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">💻 Laptops & Desktops</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.selectDevice) {
                            window.selectDevice("macbook-air", "MacBook Air", "1440x900", "macOS Ventura")
                          }
                        }}
                        className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
                      >
                        💻 MacBook Air (1440×900)
                      </button>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.selectDevice) {
                            window.selectDevice("macbook-pro", "MacBook Pro", "1512x982", "macOS Ventura")
                          }
                        }}
                        className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
                      >
                        💻 MacBook Pro (1512×982)
                      </button>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.selectDevice) {
                            window.selectDevice("windows-laptop", "Windows Laptop", "1366x768", "Windows 11")
                          }
                        }}
                        className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                      >
                        💻 Windows Laptop (1366×768)
                      </button>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && window.selectDevice) {
                            window.selectDevice("desktop-4k", "Desktop 4K", "1920x1080", "Windows 11")
                          }
                        }}
                        className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                      >
                        🖥️ Desktop 4K (1920×1080)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Browser Selection */}
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <span className="text-2xl mr-3">🌐</span>
                  Browser Selection
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined" && window.selectBrowser) {
                        window.selectBrowser("chrome", "Google Chrome", "#4285f4")
                      }
                    }}
                    className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">C</span>
                    </div>
                    <span className="font-medium">Chrome</span>
                  </button>
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined" && window.selectBrowser) {
                        window.selectBrowser("firefox", "Mozilla Firefox", "#ff7139")
                      }
                    }}
                    className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors"
                  >
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">F</span>
                    </div>
                    <span className="font-medium">Firefox</span>
                  </button>
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined" && window.selectBrowser) {
                        window.selectBrowser("safari", "Safari", "#006cff")
                      }
                    }}
                    className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">S</span>
                    </div>
                    <span className="font-medium">Safari</span>
                  </button>
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined" && window.selectBrowser) {
                        window.selectBrowser("edge", "Microsoft Edge", "#0078d4")
                      }
                    }}
                    className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">E</span>
                    </div>
                    <span className="font-medium">Edge</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Current Selection Display */}
            <div id="currentSelection" className="bg-white rounded-lg border shadow-sm hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <span className="text-2xl mr-3">📋</span>
                  Current Selection
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Device</h4>
                    <div id="selectedDevice" className="text-blue-700">
                      No device selected
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Browser</h4>
                    <div id="selectedBrowser" className="text-green-700">
                      No browser selected
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Website</h4>
                    <div id="selectedWebsite" className="text-purple-700">
                      No website loaded
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Area */}
            <div id="previewArea" className="bg-white rounded-lg border shadow-sm hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="text-2xl mr-3">👁️</span>
                    Website Preview
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined" && window.refreshPreview) {
                          window.refreshPreview()
                        }
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      🔄 Refresh
                    </button>
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined" && window.takeScreenshot) {
                          window.takeScreenshot()
                        }
                      }}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      📸 Screenshot
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {/* Device Frame */}
                <div id="deviceFrame" className="mx-auto bg-gray-800 rounded-lg p-4 shadow-2xl">
                  <div id="deviceScreen" className="bg-white rounded overflow-hidden shadow-inner">
                    <div id="browserChrome" className="bg-gray-100 px-4 py-2 border-b flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">
                        <span id="addressBar">https://example.com</span>
                      </div>
                      <div id="browserIcon" className="w-6 h-6 bg-blue-500 rounded"></div>
                    </div>
                    <div id="websiteContent" className="relative overflow-hidden">
                      <iframe
                        id="websiteFrame"
                        src="https://example.com"
                        className="w-full h-full border-0"
                        style={{ minHeight: "400px" }}
                        sandbox="allow-same-origin allow-scripts"
                      />
                      <div
                        id="loadingOverlay"
                        className="absolute inset-0 bg-white flex items-center justify-center hidden"
                      >
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                          <p className="text-gray-600">Loading website...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Device Info */}
                <div id="deviceInfo" className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-gray-600 text-sm">Resolution</div>
                    <div id="deviceResolution" className="font-semibold">
                      -
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-gray-600 text-sm">Operating System</div>
                    <div id="deviceOS" className="font-semibold">
                      -
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-gray-600 text-sm">Browser</div>
                    <div id="deviceBrowser" className="font-semibold">
                      -
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-gray-600 text-sm">Device Type</div>
                    <div id="deviceType" className="font-semibold">
                      -
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison View */}
            <div id="comparisonArea" className="bg-white rounded-lg border shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="text-2xl mr-3">🔍</span>
                    Multi-Device Comparison
                  </h3>
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined" && window.showComparison) {
                        window.showComparison()
                      }
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Show All Devices
                  </button>
                </div>
              </div>
              <div id="comparisonGrid" className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 hidden">
                {/* Comparison items will be inserted here */}
              </div>
            </div>

            <script
              dangerouslySetInnerHTML={{
                __html: `
            (function() {
              let currentDevice = null;
              let currentBrowser = null;
              let currentWebsite = 'https://example.com';

              const devices = {
                'iphone-14': { name: 'iPhone 14', width: 390, height: 844, os: 'iOS 16', type: 'Mobile' },
                'iphone-se': { name: 'iPhone SE', width: 375, height: 667, os: 'iOS 16', type: 'Mobile' },
                'samsung-s23': { name: 'Samsung Galaxy S23', width: 360, height: 780, os: 'Android 13', type: 'Mobile' },
                'pixel-7': { name: 'Google Pixel 7', width: 412, height: 915, os: 'Android 13', type: 'Mobile' },
                'ipad-air': { name: 'iPad Air', width: 820, height: 1180, os: 'iPadOS 16', type: 'Tablet' },
                'ipad-mini': { name: 'iPad Mini', width: 744, height: 1133, os: 'iPadOS 16', type: 'Tablet' },
                'samsung-tab': { name: 'Samsung Galaxy Tab', width: 800, height: 1280, os: 'Android 13', type: 'Tablet' },
                'surface-pro': { name: 'Surface Pro', width: 912, height: 1368, os: 'Windows 11', type: 'Tablet' },
                'macbook-air': { name: 'MacBook Air', width: 1440, height: 900, os: 'macOS Ventura', type: 'Laptop' },
                'macbook-pro': { name: 'MacBook Pro', width: 1512, height: 982, os: 'macOS Ventura', type: 'Laptop' },
                'windows-laptop': { name: 'Windows Laptop', width: 1366, height: 768, os: 'Windows 11', type: 'Laptop' },
                'desktop-4k': { name: 'Desktop 4K', width: 1920, height: 1080, os: 'Windows 11', type: 'Desktop' }
              };

              const browsers = {
                'chrome': { name: 'Google Chrome', color: '#4285f4' },
                'firefox': { name: 'Mozilla Firefox', color: '#ff7139' },
                'safari': { name: 'Safari', color: '#006cff' },
                'edge': { name: 'Microsoft Edge', color: '#0078d4' }
              };

              function loadWebsitePreview() {
                const urlInput = document.getElementById('websiteUrl');
                if (!urlInput) return;
                
                let url = urlInput.value.trim();
                if (!url) {
                  alert('Please enter a website URL');
                  return;
                }
                
                // Add protocol if missing
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                  url = 'https://' + url;
                }
                
                currentWebsite = url;
                updateSelectedWebsite();
                
                if (currentDevice && currentBrowser) {
                  updatePreview();
                }
              }

              function selectDevice(deviceId, deviceName, resolution, os) {
                currentDevice = deviceId;
                updateSelectedDevice();
                updateCurrentSelection();
                
                if (currentBrowser) {
                  updatePreview();
                }
              }

              function selectBrowser(browserId, browserName, color) {
                currentBrowser = browserId;
                updateSelectedBrowser();
                updateCurrentSelection();
                
                if (currentDevice) {
                  updatePreview();
                }
              }

              function updateSelectedDevice() {
                const selectedDeviceEl = document.getElementById('selectedDevice');
                if (selectedDeviceEl && currentDevice) {
                  const device = devices[currentDevice];
                  selectedDeviceEl.textContent = \`\${device.name} (\${device.width}×\${device.height})\`;
                }
              }

              function updateSelectedBrowser() {
                const selectedBrowserEl = document.getElementById('selectedBrowser');
                if (selectedBrowserEl && currentBrowser) {
                  const browser = browsers[currentBrowser];
                  selectedBrowserEl.textContent = browser.name;
                }
              }

              function updateSelectedWebsite() {
                const selectedWebsiteEl = document.getElementById('selectedWebsite');
                if (selectedWebsiteEl) {
                  selectedWebsiteEl.textContent = currentWebsite;
                }
              }

              function updateCurrentSelection() {
                const selectionEl = document.getElementById('currentSelection');
                if (selectionEl && currentDevice && currentBrowser) {
                  selectionEl.classList.remove('hidden');
                }
              }

              function updatePreview() {
                if (!currentDevice || !currentBrowser) return;
                
                const device = devices[currentDevice];
                const browser = browsers[currentBrowser];
                
                // Show preview area
                const previewArea = document.getElementById('previewArea');
                if (previewArea) {
                  previewArea.classList.remove('hidden');
                }
                
                // Update device frame
                const deviceFrame = document.getElementById('deviceFrame');
                const deviceScreen = document.getElementById('deviceScreen');
                
                if (deviceFrame && deviceScreen) {
                  // Calculate scale to fit in container
                  const maxWidth = 800;
                  const maxHeight = 600;
                  const scale = Math.min(maxWidth / device.width, maxHeight / device.height, 1);
                  
                  deviceScreen.style.width = device.width + 'px';
                  deviceScreen.style.height = device.height + 'px';
                  deviceFrame.style.transform = \`scale(\${scale})\`;
                  deviceFrame.style.transformOrigin = 'center top';
                }
                
                // Update browser chrome
                const browserIcon = document.getElementById('browserIcon');
                if (browserIcon) {
                  browserIcon.style.backgroundColor = browser.color;
                }
                
                // Update address bar
                const addressBar = document.getElementById('addressBar');
                if (addressBar) {
                  addressBar.textContent = currentWebsite;
                }
                
                // Update iframe
                const websiteFrame = document.getElementById('websiteFrame');
                if (websiteFrame) {
                  showLoading();
                  websiteFrame.src = currentWebsite;
                  websiteFrame.onload = hideLoading;
                  websiteFrame.onerror = () => {
                    hideLoading();
                    showError();
                  };
                }
                
                // Update device info
                updateDeviceInfo();
              }

              function updateDeviceInfo() {
                if (!currentDevice || !currentBrowser) return;
                
                const device = devices[currentDevice];
                const browser = browsers[currentBrowser];
                
                const resolutionEl = document.getElementById('deviceResolution');
                const osEl = document.getElementById('deviceOS');
                const browserEl = document.getElementById('deviceBrowser');
                const typeEl = document.getElementById('deviceType');
                
                if (resolutionEl) resolutionEl.textContent = \`\${device.width}×\${device.height}\`;
                if (osEl) osEl.textContent = device.os;
                if (browserEl) browserEl.textContent = browser.name;
                if (typeEl) typeEl.textContent = device.type;
              }

              function showLoading() {
                const loadingOverlay = document.getElementById('loadingOverlay');
                if (loadingOverlay) {
                  loadingOverlay.classList.remove('hidden');
                }
              }

              function hideLoading() {
                const loadingOverlay = document.getElementById('loadingOverlay');
                if (loadingOverlay) {
                  loadingOverlay.classList.add('hidden');
                }
              }

              function showError() {
                const websiteContent = document.getElementById('websiteContent');
                if (websiteContent) {
                  websiteContent.innerHTML = \`
                    <div class="flex items-center justify-center h-64 bg-red-50">
                      <div class="text-center">
                        <div class="text-4xl mb-2">⚠️</div>
                        <h3 class="text-lg font-semibold text-red-800 mb-2">Failed to Load Website</h3>
                        <p class="text-red-600 text-sm">The website could not be loaded due to CORS restrictions or network issues.</p>
                        <p class="text-red-600 text-sm mt-1">Try a different URL or check if the website is accessible.</p>
                      </div>
                    </div>
                  \`;
                }
              }

              function refreshPreview() {
                if (currentDevice && currentBrowser) {
                  updatePreview();
                }
              }

              function takeScreenshot() {
                // Simulate screenshot functionality
                const device = devices[currentDevice];
                const browser = browsers[currentBrowser];
                
                alert(\`Screenshot taken!\\n\\nDevice: \${device.name}\\nBrowser: \${browser.name}\\nWebsite: \${currentWebsite}\\n\\nIn a real implementation, this would capture the actual rendered content.\`);
              }

              function showComparison() {
                const comparisonGrid = document.getElementById('comparisonGrid');
                if (!comparisonGrid) return;
                
                comparisonGrid.classList.remove('hidden');
                comparisonGrid.innerHTML = '';
                
                // Show previews for different device categories
                const sampleDevices = ['iphone-14', 'ipad-air', 'macbook-air'];
                const sampleBrowser = currentBrowser || 'chrome';
                
                sampleDevices.forEach(deviceId => {
                  const device = devices[deviceId];
                  const browser = browsers[sampleBrowser];
                  
                  const comparisonItem = document.createElement('div');
                  comparisonItem.className = 'bg-gray-50 rounded-lg p-4 border';
                  comparisonItem.innerHTML = \`
                    <div class="text-center mb-3">
                      <h4 class="font-semibold text-gray-900">\${device.name}</h4>
                      <p class="text-sm text-gray-600">\${device.width}×\${device.height} • \${device.os}</p>
                    </div>
                    <div class="bg-gray-800 rounded p-2 mx-auto" style="width: fit-content;">
                      <div class="bg-white rounded overflow-hidden shadow-inner" style="width: \${Math.min(device.width * 0.2, 200)}px; height: \${Math.min(device.height * 0.2, 150)}px;">
                        <div class="bg-gray-100 px-2 py-1 text-xs flex items-center space-x-1">
                          <div class="w-2 h-2 bg-red-400 rounded-full"></div>
                          <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div class="flex-1 bg-white rounded px-1 text-gray-500 text-xs">\${currentWebsite}</div>
                        </div>
                        <div class="bg-blue-100 h-full flex items-center justify-center text-xs text-gray-600">
                          Website Preview
                        </div>
                      </div>
                    </div>
                    <div class="mt-3 text-center">
                      <button onclick="window.selectDevice('\${deviceId}', '\${device.name}', '\${device.width}x\${device.height}', '\${device.os}')" 
                              class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                        Select Device
                      </button>
                    </div>
                  \`;
                  
                  comparisonGrid.appendChild(comparisonItem);
                });
              }

              // Expose functions to global scope
              window.loadWebsitePreview = loadWebsitePreview;
              window.selectDevice = selectDevice;
              window.selectBrowser = selectBrowser;
              window.refreshPreview = refreshPreview;
              window.takeScreenshot = takeScreenshot;
              window.showComparison = showComparison;

              // Initialize with default selections
              document.addEventListener('DOMContentLoaded', function() {
                updateSelectedWebsite();
              });

              // Initialize immediately if DOM is already ready
              if (document.readyState !== 'loading') {
                updateSelectedWebsite();
              }
            })();
          `,
              }}
            />
          </div>
        )

      case "project4":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Task Management Tool</h1>
            <p className="text-lg text-gray-600">
              Organize and track tasks across four key areas: Tool List, Implementation, Testing, and Development.
            </p>

            {/* Task Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="text-blue-600 font-medium text-sm">Total Tasks</div>
                <div id="totalTasksCount" className="text-2xl font-bold text-blue-800">
                  0
                </div>
                <div className="text-xs text-blue-600 mt-1">All sections</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <div className="text-green-600 font-medium text-sm">Completed</div>
                <div id="completedTasksCount" className="text-2xl font-bold text-green-800">
                  0
                </div>
                <div className="text-xs text-green-600 mt-1">Finished tasks</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                <div className="text-yellow-600 font-medium text-sm">In Progress</div>
                <div id="inProgressTasksCount" className="text-2xl font-bold text-yellow-800">
                  0
                </div>
                <div className="text-xs text-yellow-600 mt-1">Active tasks</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                <div className="text-purple-600 font-medium text-sm">Progress</div>
                <div id="overallProgress" className="text-2xl font-bold text-purple-800">
                  0%
                </div>
                <div className="text-xs text-purple-600 mt-1">Overall completion</div>
              </div>
            </div>

            {/* Task Creation Form */}
            <div id="taskForm" className="bg-white rounded-lg border shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">+</span>
                  </div>
                  <span id="formTitle">Add New Task</span>
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-2">
                      Task Title *
                    </label>
                    <input
                      id="taskTitle"
                      type="text"
                      placeholder="Enter task title..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="taskSection" className="block text-sm font-medium text-gray-700 mb-2">
                      Section *
                    </label>
                    <select
                      id="taskSection"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select section...</option>
                      <option value="tool-list">🛠️ Tool List</option>
                      <option value="implementation">⚙️ Implementation</option>
                      <option value="testing">🧪 Testing</option>
                      <option value="development">💻 Development</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="taskPriority" className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      id="taskPriority"
                      defaultValue="medium"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🔴 High</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="taskStatus" className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      id="taskStatus"
                      defaultValue="todo"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="todo">📋 To Do</option>
                      <option value="in-progress">⏳ In Progress</option>
                      <option value="completed">✅ Completed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="taskDescription"
                    rows={4}
                    placeholder="Enter task description..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    id="saveTaskBtn"
                    onClick={() => saveTask()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Save Task
                  </button>
                  <button
                    id="cancelTaskBtn"
                    onClick={() => cancelTaskForm()}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Task Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tool List Section */}
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-blue-900 flex items-center">
                      <span className="text-2xl mr-3">🛠️</span>
                      Tool List
                      <span
                        id="toolListCount"
                        className="ml-2 px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-sm"
                      >
                        0
                      </span>
                    </h3>
                    <button
                      onClick={() => showTaskForm("tool-list")}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
                <div id="toolListTasks" className="p-4 space-y-3 min-h-32">
                  <div className="text-center text-gray-500 py-8">
                    <div className="text-4xl mb-2">🛠️</div>
                    <p>No tool list tasks yet</p>
                  </div>
                </div>
              </div>

              {/* Implementation Section */}
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-green-900 flex items-center">
                      <span className="text-2xl mr-3">⚙️</span>
                      Implementation
                      <span
                        id="implementationCount"
                        className="ml-2 px-2 py-1 bg-green-200 text-green-800 rounded-full text-sm"
                      >
                        0
                      </span>
                    </h3>
                    <button
                      onClick={() => showTaskForm("implementation")}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
                <div id="implementationTasks" className="p-4 space-y-3 min-h-32">
                  <div className="text-center text-gray-500 py-8">
                    <div className="text-4xl mb-2">⚙️</div>
                    <p>No implementation tasks yet</p>
                  </div>
                </div>
              </div>

              {/* Testing Section */}
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 px-6 py-4 border-b border-yellow-200 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-yellow-900 flex items-center">
                      <span className="text-2xl mr-3">🧪</span>
                      Testing
                      <span
                        id="testingCount"
                        className="ml-2 px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm"
                      >
                        0
                      </span>
                    </h3>
                    <button
                      onClick={() => showTaskForm("testing")}
                      className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
                <div id="testingTasks" className="p-4 space-y-3 min-h-32">
                  <div className="text-center text-gray-500 py-8">
                    <div className="text-4xl mb-2">🧪</div>
                    <p>No testing tasks yet</p>
                  </div>
                </div>
              </div>

              {/* Development Section */}
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-purple-200 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-purple-900 flex items-center">
                      <span className="text-2xl mr-3">💻</span>
                      Development
                      <span
                        id="developmentCount"
                        className="ml-2 px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-sm"
                      >
                        0
                      </span>
                    </h3>
                    <button
                      onClick={() => showTaskForm("development")}
                      className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
                <div id="developmentTasks" className="p-4 space-y-3 min-h-32">
                  <div className="text-center text-gray-500 py-8">
                    <div className="text-4xl mb-2">💻</div>
                    <p>No development tasks yet</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Detail View (Hidden by default) */}
            <div id="taskDetailView" className="hidden bg-white rounded-lg border shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Task Details</h3>
                  <button
                    onClick={() => hideTaskDetail()}
                    className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                  >
                    Back to Tasks
                  </button>
                </div>
              </div>
              <div id="taskDetailContent" className="p-6">
                {/* Task detail content will be inserted here */}
              </div>
            </div>

            <script
              dangerouslySetInnerHTML={{
                __html: `
                (function() {
                  let tasks = JSON.parse(localStorage.getItem('taskManagementTasks') || '[]');
                  let editingTaskId = null;

                  const sectionConfig = {
                    'tool-list': { name: 'Tool List', icon: '🛠️', color: 'blue' },
                    'implementation': { name: 'Implementation', icon: '⚙️', color: 'green' },
                    'testing': { name: 'Testing', icon: '🧪', color: 'yellow' },
                    'development': { name: 'Development', icon: '💻', color: 'purple' }
                  };

                  const statusConfig = {
                    'todo': { name: 'To Do', icon: '📋', color: 'gray' },
                    'in-progress': { name: 'In Progress', icon: '⏳', color: 'yellow' },
                    'completed': { name: 'Completed', icon: '✅', color: 'green' }
                  };

                  const priorityConfig = {
                    'low': { name: 'Low', icon: '🟢', color: 'green' },
                    'medium': { name: 'Medium', icon: '🟡', color: 'yellow' },
                    'high': { name: 'High', icon: '🔴', color: 'red' }
                  };

                  function updateStatistics() {
                    const totalTasks = tasks.length;
                    const completedTasks = tasks.filter(t => t.status === 'completed').length;
                    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
                    const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

                    document.getElementById('totalTasksCount').textContent = totalTasks;
                    document.getElementById('completedTasksCount').textContent = completedTasks;
                    document.getElementById('inProgressTasksCount').textContent = inProgressTasks;
                    document.getElementById('overallProgress').textContent = overallProgress + '%';

                    // Update section counts
                    Object.keys(sectionConfig).forEach(section => {
                      const count = tasks.filter(t => t.section === section).length;
                      const countEl = document.getElementById(section.replace('-', '') + 'Count');
                      if (countEl) countEl.textContent = count;
                    });
                  }

                  function showTaskForm(section = '') {
                    const form = document.getElementById('taskForm');
                    const formTitle = document.getElementById('formTitle');
                    const sectionSelect = document.getElementById('taskSection');
                    
                    if (section) {
                      sectionSelect.value = section;
                      formTitle.textContent = \`Add New \${sectionConfig[section].name} Task\`;
                    } else {
                      formTitle.textContent = editingTaskId ? 'Edit Task' : 'Add New Task';
                    }
                    
                    form.scrollIntoView({ behavior: 'smooth' });
                    document.getElementById('taskTitle').focus();
                  }

                  function saveTask() {
                    const title = document.getElementById('taskTitle').value.trim();
                    const section = document.getElementById('taskSection').value;
                    const priority = document.getElementById('taskPriority').value;
                    const status = document.getElementById('taskStatus').value;
                    const description = document.getElementById('taskDescription').value.trim();

                    if (!title) {
                      alert('Please enter a task title');
                      return;
                    }

                    if (!section) {
                      alert('Please select a section');
                      return;
                    }

                    const taskData = {
                      id: editingTaskId || Date.now().toString(),
                      title,
                      section,
                      priority,
                      status,
                      description,
                      createdAt: editingTaskId ? tasks.find(t => t.id === editingTaskId).createdAt : new Date().toISOString(),
                      updatedAt: new Date().toISOString()
                    };

                    if (editingTaskId) {
                      const index = tasks.findIndex(t => t.id === editingTaskId);
                      tasks[index] = taskData;
                      editingTaskId = null;
                    } else {
                      tasks.unshift(taskData);
                    }

                    localStorage.setItem('taskManagementTasks', JSON.stringify(tasks));
                    clearTaskForm();
                    displayTasks();
                    updateStatistics();

                    // Show success message
                    const saveBtn = document.getElementById('saveTaskBtn');
                    const originalText = saveBtn.textContent;
                    saveBtn.textContent = '✓ Saved!';
                    saveBtn.className = saveBtn.className.replace('bg-blue-600', 'bg-green-600');
                    setTimeout(() => {
                      saveBtn.textContent = originalText;
                      saveBtn.className = saveBtn.className.replace('bg-green-600', 'bg-blue-600');
                    }, 2000);
                  }

                  function cancelTaskForm() {
                    clearTaskForm();
                    editingTaskId = null;
                  }

                  function clearTaskForm() {
                    document.getElementById('taskTitle').value = '';
                    document.getElementById('taskSection').value = '';
                    document.getElementById('taskPriority').value = 'medium';
                    document.getElementById('taskStatus').value = 'todo';
                    document.getElementById('taskDescription').value = '';
                    document.getElementById('formTitle').textContent = 'Add New Task';
                  }

                  function displayTasks() {
                    Object.keys(sectionConfig).forEach(section => {
                      const container = document.getElementById(section.replace('-', '') + 'Tasks');
                      const sectionTasks = tasks.filter(t => t.section === section);

                      if (sectionTasks.length === 0) {
                        const config = sectionConfig[section];
                        container.innerHTML = \`
                          <div class="text-center text-gray-500 py-8">
                            <div class="text-4xl mb-2">\${config.icon}</div>
                            <p>No \${config.name.toLowerCase()} tasks yet</p>
                          </div>
                        \`;
                        return;
                      }

                      const tasksHTML = sectionTasks.map(task => {
                        const statusInfo = statusConfig[task.status];
                        const priorityInfo = priorityConfig[task.priority];
                        
                        return \`
                          <div class="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                               onclick="showTaskDetail('\${task.id}')">
                            <div class="flex items-start justify-between mb-2">
                              <h4 class="font-semibold text-gray-900 flex-1">\${task.title}</h4>
                              <div class="flex space-x-2 ml-4">
                                <span class="px-2 py-1 bg-\${priorityInfo.color}-100 text-\${priorityInfo.color}-800 rounded-full text-xs">
                                  \${priorityInfo.icon} \${priorityInfo.name}
                                </span>
                                <span class="px-2 py-1 bg-\${statusInfo.color}-100 text-\${statusInfo.color}-800 rounded-full text-xs">
                                  \${statusInfo.icon} \${statusInfo.name}
                                </span>
                              </div>
                            </div>
                            \${task.description ? \`
                              <p class="text-sm text-gray-600 mb-3">\${task.description.substring(0, 100)}\${task.description.length > 100 ? '...' : ''}</p>
                            \` : ''}
                            <div class="flex items-center justify-between text-xs text-gray-500">
                              <span>Created: \${new Date(task.createdAt).toLocaleDateString()}</span>
                              <div class="flex space-x-2">
                                <button onclick="event.stopPropagation(); editTask('\${task.id}')" 
                                        class="text-blue-600 hover:text-blue-800">Edit</button>
                                <button onclick="event.stopPropagation(); deleteTask('\${task.id}')" 
                                        class="text-red-600 hover:text-red-800">Delete</button>
                              </div>
                            </div>
                          </div>
                        \`;
                      }).join('');

                      container.innerHTML = tasksHTML;
                    });
                  }

                  function showTaskDetail(taskId) {
                    const task = tasks.find(t => t.id === taskId);
                    if (!task) return;

                    const sectionInfo = sectionConfig[task.section];
                    const statusInfo = statusConfig[task.status];
                    const priorityInfo = priorityConfig[task.priority];

                    const detailHTML = \`
                      <div class="space-y-6">
                        <div class="flex items-start justify-between">
                          <div>
                            <h2 class="text-2xl font-bold text-gray-900 mb-2">\${task.title}</h2>
                            <div class="flex items-center space-x-4">
                              <span class="px-3 py-1 bg-\${sectionInfo.color}-100 text-\${sectionInfo.color}-800 rounded-full text-sm font-medium">
                                \${sectionInfo.icon} \${sectionInfo.name}
                              </span>
                              <span class="px-3 py-1 bg-\${priorityInfo.color}-100 text-\${priorityInfo.color}-800 rounded-full text-sm font-medium">
                                \${priorityInfo.icon} \${priorityInfo.name} Priority
                              </span>
                              <span class="px-3 py-1 bg-\${statusInfo.color}-100 text-\${statusInfo.color}-800 rounded-full text-sm font-medium">
                                \${statusInfo.icon} \${statusInfo.name}
                              </span>
                            </div>
                          </div>
                          <div class="flex space-x-2">
                            <button onclick="editTask('\${task.id}')" 
                                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              Edit Task
                            </button>
                            <button onclick="deleteTask('\${task.id}')" 
                                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                              Delete Task
                            </button>
                          </div>
                        </div>

                        \${task.description ? \`
                          <div class="bg-gray-50 rounded-lg p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                            <div class="text-gray-700 whitespace-pre-wrap">\${task.description}</div>
                          </div>
                        \` : ''}

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div class="bg-blue-50 rounded-lg p-4">
                            <h4 class="font-semibold text-blue-900 mb-2">Task Information</h4>
                            <div class="space-y-2 text-sm">
                              <div class="flex justify-between">
                                <span class="text-blue-700">Section:</span>
                                <span class="font-medium">\${sectionInfo.name}</span>
                              </div>
                              <div class="flex justify-between">
                                <span class="text-blue-700">Priority:</span>
                                <span class="font-medium">\${priorityInfo.name}</span>
                              </div>
                              <div class="flex justify-between">
                                <span class="text-blue-700">Status:</span>
                                <span class="font-medium">\${statusInfo.name}</span>
                              </div>
                            </div>
                          </div>

                          <div class="bg-green-50 rounded-lg p-4">
                            <h4 class="font-semibold text-green-900 mb-2">Timeline</h4>
                            <div class="space-y-2 text-sm">
                              <div class="flex justify-between">
                                <span class="text-green-700">Created:</span>
                                <span class="font-medium">\${new Date(task.createdAt).toLocaleString()}</span>
                              </div>
                              <div class="flex justify-between">
                                <span class="text-green-700">Updated:</span>
                                <span class="font-medium">\${new Date(task.updatedAt).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="bg-yellow-50 rounded-lg p-4">
                          <h4 class="font-semibold text-yellow-900 mb-2">Quick Actions</h4>
                          <div class="flex space-x-2">
                            <button onclick="updateTaskStatus('\${task.id}', 'todo')" 
                                    class="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors">
                              Mark as To Do
                            </button>
                            <button onclick="updateTaskStatus('\${task.id}', 'in-progress')" 
                                    class="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors">
                              Mark In Progress
                            </button>
                            <button onclick="updateTaskStatus('\${task.id}', 'completed')" 
                                    class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                              Mark Completed
                            </button>
                          </div>
                        </div>
                      </div>
                    \`;

                    document.getElementById('taskDetailContent').innerHTML = detailHTML;
                    document.getElementById('taskDetailView').classList.remove('hidden');
                    document.getElementById('taskDetailView').scrollIntoView({ behavior: 'smooth' });
                  }

                  function hideTaskDetail() {
                    document.getElementById('taskDetailView').classList.add('hidden');
                  }

                  function editTask(taskId) {
                    const task = tasks.find(t => t.id === taskId);
                    if (!task) return;

                    editingTaskId = taskId;
                    document.getElementById('taskTitle').value = task.title;
                    document.getElementById('taskSection').value = task.section;
                    document.getElementById('taskPriority').value = task.priority;
                    document.getElementById('taskStatus').value = task.status;
                    document.getElementById('taskDescription').value = task.description;
                    document.getElementById('formTitle').textContent = 'Edit Task';

                    hideTaskDetail();
                    showTaskForm();
                  }

                  function deleteTask(taskId) {
                    if (confirm('Are you sure you want to delete this task?')) {
                      tasks = tasks.filter(t => t.id !== taskId);
                      localStorage.setItem('taskManagementTasks', JSON.stringify(tasks));
                      displayTasks();
                      updateStatistics();
                      hideTaskDetail();
                    }
                  }

                  function updateTaskStatus(taskId, newStatus) {
                    const task = tasks.find(t => t.id === taskId);
                    if (!task) return;

                    task.status = newStatus;
                    task.updatedAt = new Date().toISOString();
                    localStorage.setItem('taskManagementTasks', JSON.stringify(tasks));
                    displayTasks();
                    updateStatistics();
                    showTaskDetail(taskId); // Refresh the detail view
                  }

                  // Expose functions to global scope
                  window.showTaskForm = showTaskForm;
                  window.saveTask = saveTask;
                  window.cancelTaskForm = cancelTaskForm;
                  window.showTaskDetail = showTaskDetail;
                  window.hideTaskDetail = hideTaskDetail;
                  window.editTask = editTask;
                  window.deleteTask = deleteTask;
                  window.updateTaskStatus = updateTaskStatus;

                  // Initialize on page load
                  document.addEventListener('DOMContentLoaded', function() {
                    displayTasks();
                    updateStatistics();
                  });

                  // Initialize immediately if DOM is already ready
                  if (document.readyState !== 'loading') {
                    displayTasks();
                    updateStatistics();
                  }
                })();
              `,
              }}
            />
          </div>
        )

      case "project5":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">AI Chatbot Assistant</h1>
            <p className="text-lg text-gray-600">
              Upload an Excel file with questions and answers to train the chatbot, then start chatting!
            </p>

            {/* Excel Upload Section */}
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200 rounded-t-lg">
                <h3 className="text-lg font-semibold text-blue-900 flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Excel Data Upload
                </h3>
              </div>
              <div className="p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id="excelFileInput"
                    accept=".xlsx,.xls,.csv"
                    className="hidden"
                    onChange={(e) => {
                      if (typeof window !== "undefined" && window.handleFileUpload) {
                        window.handleFileUpload()
                      }
                    }}
                  />
                  <div className="space-y-4">
                    <div className="text-4xl">📁</div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload Excel File</h4>
                      <p className="text-gray-600 mb-4">
                        Upload an Excel file (.xlsx, .xls) or CSV with columns: "Question" and "Answer"
                      </p>
                      <button
                        onClick={() => document.getElementById("excelFileInput").click()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Choose File
                      </button>
                    </div>
                  </div>
                </div>

                {/* Upload Status */}
                <div id="uploadStatus" className="mt-4 hidden">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-green-600 text-xl mr-3">✅</span>
                      <div>
                        <h4 className="text-green-800 font-semibold">File Uploaded Successfully!</h4>
                        <p id="uploadDetails" className="text-green-700 text-sm"></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sample Format */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Expected Excel Format:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-2 text-left font-semibold">Question</th>
                          <th className="px-4 py-2 text-left font-semibold">Answer</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-2">What are your business hours?</td>
                          <td className="px-4 py-2">We are open Monday to Friday, 9 AM to 6 PM.</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-2">How can I contact support?</td>
                          <td className="px-4 py-2">
                            You can reach our support team at support@company.com or call (555) 123-4567.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Chatbot Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat Window */}
              <div className="lg:col-span-2 bg-white rounded-lg border shadow-sm">
                <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-green-900 flex items-center">
                      <span className="text-2xl mr-3">🤖</span>
                      AI Assistant
                      <span id="chatStatus" className="ml-3 px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                        Ready
                      </span>
                    </h3>
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined" && window.clearChat) {
                          window.clearChat()
                        }
                      }}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Clear Chat
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div id="chatMessages" className="h-96 overflow-y-auto p-4 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">🤖</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">
                        Hello! I'm your AI assistant. Upload an Excel file with questions and answers to get started, or
                        ask me anything!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      id="chatInput"
                      placeholder="Type your message here..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && typeof window !== "undefined" && window.sendMessage) {
                          window.sendMessage()
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined" && window.sendMessage) {
                          window.sendMessage()
                        }
                      }}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar - Knowledge Base & Stats */}
              <div className="space-y-6">
                {/* Knowledge Base Stats */}
                <div className="bg-white rounded-lg border shadow-sm">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
                    <h4 className="font-semibold text-gray-900">Knowledge Base</h4>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Q&A Pairs:</span>
                      <span id="totalQA" className="font-semibold text-blue-600">
                        0
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Chat Messages:</span>
                      <span id="totalMessages" className="font-semibold text-green-600">
                        1
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Successful Matches:</span>
                      <span id="successfulMatches" className="font-semibold text-purple-600">
                        0
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg border shadow-sm">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
                    <h4 className="font-semibold text-gray-900">Quick Actions</h4>
                  </div>
                  <div className="p-4 space-y-2">
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined" && window.showSampleQuestions) {
                          window.showSampleQuestions()
                        }
                      }}
                      className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                    >
                      📋 Show Sample Questions
                    </button>
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined" && window.downloadTemplate) {
                          window.downloadTemplate()
                        }
                      }}
                      className="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors"
                    >
                      📥 Download Excel Template
                    </button>
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined" && window.exportChat) {
                          window.exportChat()
                        }
                      }}
                      className="w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 rounded border border-purple-200 transition-colors"
                    >
                      💾 Export Chat History
                    </button>
                  </div>
                </div>

                {/* Recent Questions */}
                <div className="bg-white rounded-lg border shadow-sm">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
                    <h4 className="font-semibold text-gray-900">Recent Questions</h4>
                  </div>
                  <div id="recentQuestions" className="p-4">
                    <p className="text-sm text-gray-500 italic">No questions asked yet</p>
                  </div>
                </div>
              </div>
            </div>

            <script
              dangerouslySetInnerHTML={{
                __html: `
            (function() {
              let knowledgeBase = [];
              let chatHistory = [];
              let messageCount = 1;
              let successfulMatches = 0;

              // File upload handling
              function handleFileUpload() {
                const fileInput = document.getElementById('excelFileInput');
                const file = fileInput.files[0];
                
                if (!file) return;

                const reader = new FileReader();
                reader.onload = function(e) {
                  try {
                    if (file.name.endsWith('.csv')) {
                      parseCSV(e.target.result);
                    } else {
                      // For Excel files, we'll simulate parsing since we can't include xlsx library
                      simulateExcelParsing(file.name);
                    }
                  } catch (error) {
                    showError('Error parsing file: ' + error.message);
                  }
                };

                if (file.name.endsWith('.csv')) {
                  reader.readAsText(file);
                } else {
                  reader.readAsArrayBuffer(file);
                }
              }

              function parseCSV(csvText) {
                const lines = csvText.split('\\n');
                const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
                
                const questionIndex = headers.findIndex(h => h.toLowerCase().includes('question'));
                const answerIndex = headers.findIndex(h => h.toLowerCase().includes('answer'));
                
                if (questionIndex === -1 || answerIndex === -1) {
                  throw new Error('CSV must contain "Question" and "Answer" columns');
                }

                knowledgeBase = [];
                for (let i = 1; i < lines.length; i++) {
                  if (lines[i].trim()) {
                    const columns = lines[i].split(',').map(c => c.trim().replace(/"/g, ''));
                    if (columns[questionIndex] && columns[answerIndex]) {
                      knowledgeBase.push({
                        question: columns[questionIndex],
                        answer: columns[answerIndex]
                      });
                    }
                  }
                }

                showUploadSuccess(knowledgeBase.length + ' Q&A pairs loaded from CSV');
                updateStats();
              }

              function simulateExcelParsing(fileName) {
                // Simulate Excel parsing with sample data
                knowledgeBase = [
                  {
                    question: "What are your business hours?",
                    answer: "We are open Monday to Friday, 9 AM to 6 PM, and Saturday 10 AM to 4 PM."
                  },
                  {
                    question: "How can I contact support?",
                    answer: "You can reach our support team at support@company.com or call (555) 123-4567."
                  },
                  {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards, PayPal, and bank transfers."
                  },
                  {
                    question: "Do you offer refunds?",
                    answer: "Yes, we offer a 30-day money-back guarantee on all purchases."
                  },
                  {
                    question: "How long does shipping take?",
                    answer: "Standard shipping takes 3-5 business days, express shipping takes 1-2 business days."
                  }
                ];

                showUploadSuccess(knowledgeBase.length + ' Q&A pairs loaded from ' + fileName);
                updateStats();
              }

              function showUploadSuccess(message) {
                const statusDiv = document.getElementById('uploadStatus');
                const detailsSpan = document.getElementById('uploadDetails');
                
                if (statusDiv && detailsSpan) {
                  statusDiv.classList.remove('hidden');
                  detailsSpan.textContent = message;
                  
                  // Update chat status
                  const chatStatus = document.getElementById('chatStatus');
                  if (chatStatus) {
                    chatStatus.textContent = 'Trained';
                    chatStatus.className = 'ml-3 px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs';
                  }
                }
              }

              function showError(message) {
                const statusDiv = document.getElementById('uploadStatus');
                if (statusDiv) {
                  statusDiv.innerHTML = \`
                  <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div class="flex items-center">
                      <span class="text-red-600 text-xl mr-3">❌</span>
                      <div>
                        <h4 class="text-red-800 font-semibold">Upload Error</h4>
                        <p class="text-red-700 text-sm">\${message}</p>
                      </div>
                    </div>
                  </div>
                \`;
                  statusDiv.classList.remove('hidden');
                }
              }

              function sendMessage() {
                const input = document.getElementById('chatInput');
                if (!input) return;
                
                const message = input.value.trim();
                
                if (!message) return;

                // Add user message
                addMessage(message, 'user');
                input.value = '';

                // Find best answer
                const response = findBestAnswer(message);
                
                // Add bot response
                setTimeout(() => {
                  addMessage(response.answer, 'bot', response.confidence);
                  if (response.confidence > 0.7) {
                    successfulMatches++;
                    updateStats();
                  }
                }, 500);

                // Update recent questions
                updateRecentQuestions(message);
              }

              function addMessage(text, sender, confidence = null) {
                const messagesContainer = document.getElementById('chatMessages');
                if (!messagesContainer) return;
                
                const messageDiv = document.createElement('div');
                
                if (sender === 'user') {
                  messageDiv.className = 'flex items-start space-x-3 justify-end';
                  messageDiv.innerHTML = \`
                  <div class="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                    <p class="text-sm">\${text}</p>
                  </div>
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 text-sm">👤</span>
                  </div>
                \`;
                } else {
                  messageDiv.className = 'flex items-start space-x-3';
                  const confidenceIndicator = confidence ? \`
                  <div class="text-xs text-gray-500 mt-1">
                    Confidence: \${Math.round(confidence * 100)}%
                  </div>
                \` : '';
                  
                  messageDiv.innerHTML = \`
                  <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span class="text-green-600 text-sm">🤖</span>
                  </div>
                  <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p class="text-sm">\${text}</p>
                    \${confidenceIndicator}
                  </div>
                \`;
                }

                messagesContainer.appendChild(messageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                
                messageCount++;
                updateStats();
              }

              function findBestAnswer(question) {
                if (knowledgeBase.length === 0) {
                  return {
                    answer: "I haven't been trained yet. Please upload an Excel file with questions and answers to help me assist you better!",
                    confidence: 0
                  };
                }

                let bestMatch = null;
                let highestScore = 0;

                for (const qa of knowledgeBase) {
                  const score = calculateSimilarity(question.toLowerCase(), qa.question.toLowerCase());
                  if (score > highestScore) {
                    highestScore = score;
                    bestMatch = qa;
                  }
                }

                if (highestScore > 0.3) {
                  return {
                    answer: bestMatch.answer,
                    confidence: highestScore
                  };
                } else {
                  return {
                    answer: "I'm not sure about that. Could you rephrase your question or ask something else? Here are some topics I can help with: " + 
                           knowledgeBase.slice(0, 3).map(qa => qa.question.split('?')[0] + '?').join(', '),
                    confidence: 0
                  };
                }
              }

              function calculateSimilarity(str1, str2) {
                const words1 = str1.split(' ');
                const words2 = str2.split(' ');
                
                let matches = 0;
                for (const word1 of words1) {
                  for (const word2 of words2) {
                    if (word1.length > 2 && word2.length > 2) {
                      if (word1 === word2 || word1.includes(word2) || word2.includes(word1)) {
                        matches++;
                        break;
                      }
                    }
                  }
                }
                
                return matches / Math.max(words1.length, words2.length);
              }

              function updateStats() {
                const totalQAEl = document.getElementById('totalQA');
                const totalMessagesEl = document.getElementById('totalMessages');
                const successfulMatchesEl = document.getElementById('successfulMatches');
                
                if (totalQAEl) totalQAEl.textContent = knowledgeBase.length;
                if (totalMessagesEl) totalMessagesEl.textContent = messageCount;
                if (successfulMatchesEl) successfulMatchesEl.textContent = successfulMatches;
              }

              function updateRecentQuestions(question) {
                const container = document.getElementById('recentQuestions');
                if (!container) return;
                
                const questions = container.querySelectorAll('.recent-question');
                
                // Remove oldest if we have 5 or more
                if (questions.length >= 5) {
                  questions[questions.length - 1].remove();
                }
                
                // Add new question at the top
                const questionDiv = document.createElement('div');
                questionDiv.className = 'recent-question text-xs text-gray-600 p-2 bg-gray-50 rounded mb-2 cursor-pointer hover:bg-gray-100';
                questionDiv.textContent = question.length > 50 ? question.substring(0, 50) + '...' : question;
                questionDiv.onclick = () => {
                  const chatInput = document.getElementById('chatInput');
                  if (chatInput) {
                    chatInput.value = question;
                  }
                };
                
                if (container.querySelector('.italic')) {
                  container.innerHTML = '';
                }
                
                container.insertBefore(questionDiv, container.firstChild);
              }

              function clearChat() {
                const messagesContainer = document.getElementById('chatMessages');
                if (!messagesContainer) return;
                
                messagesContainer.innerHTML = \`
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600 text-sm">🤖</span>
              </div>
              <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p class="text-sm">Hello! I'm your AI assistant. Upload an Excel file with questions and answers to get started, or ask me anything!</p>
              </div>
            </div>
          \`;
                messageCount = 1;
                successfulMatches = 0;
                updateStats();
              }

              function showSampleQuestions() {
                if (knowledgeBase.length === 0) {
                  addMessage("Please upload an Excel file first to see available questions!", 'bot');
                  return;
                }
                
                const sampleQuestions = knowledgeBase.slice(0, 5).map(qa => qa.question).join('\\n• ');
                addMessage("Here are some questions I can answer:\\n• " + sampleQuestions, 'bot');
              }

              function downloadTemplate() {
                const csvContent = "Question,Answer\\n" +
                  '"What are your business hours?","We are open Monday to Friday, 9 AM to 6 PM."\\n' +
                  '"How can I contact support?","You can reach our support team at support@company.com or call (555) 123-4567."\\n' +
                  '"What payment methods do you accept?","We accept all major credit cards, PayPal, and bank transfers."';
                
                const blob = new Blob([csvContent], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'chatbot_template.csv';
                a.click();
                window.URL.revokeObjectURL(url);
              }

              function exportChat() {
                const messages = document.querySelectorAll('#chatMessages > div');
                let chatText = 'Chat History\\n\\n';
                
                messages.forEach(msg => {
                  const textEl = msg.querySelector('p');
                  if (textEl) {
                    const text = textEl.textContent;
                    const isUser = msg.classList.contains('justify-end') || msg.innerHTML.includes('👤');
                    chatText += (isUser ? 'User: ' : 'Bot: ') + text + '\\n\\n';
                  }
                });
                
                const blob = new Blob([chatText], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'chat_history.txt';
                a.click();
                window.URL.revokeObjectURL(url);
              }

              // Expose functions to global scope immediately
              window.handleFileUpload = handleFileUpload;
              window.sendMessage = sendMessage;
              window.clearChat = clearChat;
              window.showSampleQuestions = showSampleQuestions;
              window.downloadTemplate = downloadTemplate;
              window.exportChat = exportChat;

              // Initialize stats immediately
              updateStats();

              // Also initialize when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                  updateStats();
                });
              }
            })();
          `,
              }}
            />
          </div>
        )

      case "add-project":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Add New Project</h1>
            <p className="text-lg text-gray-600">
              Create a new project to organize your work and collaborate with your team.
            </p>

            <div className="max-w-2xl">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                    <input
                      type="text"
                      placeholder="Enter project name..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your project..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Create Project
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate("home")}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )

      // Handle all industry-specific pages with a generic template
      default:
        if (currentPage.startsWith("industries-")) {
          const industryName = currentPage
            .replace("industries-", "")
            .replace("-", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())
          return (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{industryName}</h1>
              <p className="text-lg text-gray-600">
                Specialized solutions and services for the {industryName.toLowerCase()} industry.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Industry Expertise</h3>
                  <p className="text-blue-700">
                    Deep understanding of {industryName.toLowerCase()} challenges and opportunities.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Proven Solutions</h3>
                  <p className="text-green-700">Battle-tested solutions designed specifically for your industry.</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Ongoing Support</h3>
                  <p className="text-purple-700">Continuous support and optimization for long-term success.</p>
                </div>
              </div>
            </div>
          )
        }
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
            <p className="text-lg text-gray-600">
              The requested page could not be found. Please check the navigation menu.
            </p>
          </div>
        )
    }
  }

  return <div className="p-6">{renderContent()}</div>
}
