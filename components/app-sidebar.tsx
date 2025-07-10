"use client"

import { useState } from "react"
import {
  Home,
  FileText,
  Settings,
  Users,
  BarChart,
  ShoppingCart,
  Globe,
  Zap,
  MessageSquare,
  ImageIcon,
  HelpCircle,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { MenuItem } from "@/types"

interface AppSidebarProps {
  onNavigate: (page: string) => void
  currentPage: string
}

// Enhanced menu structure with unlimited items and nested submenus
const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "dashboard",
    children: [
      { id: "overview", title: "Overview", href: "dashboard-overview" },
      { id: "analytics", title: "Analytics", href: "dashboard-analytics" },
      { id: "reports", title: "Reports", href: "dashboard-reports" },
      { id: "metrics", title: "Key Metrics", href: "dashboard-metrics" },
      { id: "performance", title: "Performance", href: "dashboard-performance" },
    ],
  },
  {
    id: "content",
    title: "Content Management",
    href: "content",
    children: [
      { id: "pages", title: "Pages", href: "content-pages" },
      { id: "posts", title: "Blog Posts", href: "content-posts" },
      { id: "media", title: "Media Library", href: "content-media" },
      { id: "categories", title: "Categories", href: "content-categories" },
      { id: "tags", title: "Tags", href: "content-tags" },
      { id: "comments", title: "Comments", href: "content-comments" },
      { id: "seo", title: "SEO Settings", href: "content-seo" },
    ],
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    href: "ecommerce",
    children: [
      { id: "products", title: "Products", href: "ecommerce-products" },
      { id: "orders", title: "Orders", href: "ecommerce-orders" },
      { id: "customers", title: "Customers", href: "ecommerce-customers" },
      { id: "inventory", title: "Inventory", href: "ecommerce-inventory" },
      { id: "shipping", title: "Shipping", href: "ecommerce-shipping" },
      { id: "payments", title: "Payments", href: "ecommerce-payments" },
      { id: "discounts", title: "Discounts", href: "ecommerce-discounts" },
      { id: "reviews", title: "Reviews", href: "ecommerce-reviews" },
    ],
  },
  {
    id: "users",
    title: "User Management",
    href: "users",
    children: [
      { id: "all-users", title: "All Users", href: "users-all" },
      { id: "roles", title: "Roles & Permissions", href: "users-roles" },
      { id: "activity", title: "User Activity", href: "users-activity" },
      { id: "groups", title: "User Groups", href: "users-groups" },
      { id: "profiles", title: "User Profiles", href: "users-profiles" },
      { id: "authentication", title: "Authentication", href: "users-auth" },
    ],
  },
  {
    id: "communication",
    title: "Communication",
    href: "communication",
    children: [
      { id: "messages", title: "Messages", href: "communication-messages" },
      { id: "notifications", title: "Notifications", href: "communication-notifications" },
      { id: "email-templates", title: "Email Templates", href: "communication-email" },
      { id: "newsletters", title: "Newsletters", href: "communication-newsletters" },
      { id: "chat", title: "Live Chat", href: "communication-chat" },
      { id: "announcements", title: "Announcements", href: "communication-announcements" },
    ],
  },
  {
    id: "media",
    title: "Media Center",
    href: "media",
    children: [
      { id: "images", title: "Images", href: "media-images" },
      { id: "videos", title: "Videos", href: "media-videos" },
      { id: "audio", title: "Audio Files", href: "media-audio" },
      { id: "documents", title: "Documents", href: "media-documents" },
      { id: "galleries", title: "Galleries", href: "media-galleries" },
      { id: "uploads", title: "File Uploads", href: "media-uploads" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Reports",
    href: "analytics",
    children: [
      { id: "traffic", title: "Traffic Analysis", href: "analytics-traffic" },
      { id: "conversion", title: "Conversion Tracking", href: "analytics-conversion" },
      { id: "user-behavior", title: "User Behavior", href: "analytics-behavior" },
      { id: "sales-reports", title: "Sales Reports", href: "analytics-sales" },
      { id: "custom-reports", title: "Custom Reports", href: "analytics-custom" },
      { id: "export", title: "Data Export", href: "analytics-export" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Utilities",
    href: "tools",
    children: [
      { id: "backup", title: "Backup & Restore", href: "tools-backup" },
      { id: "import-export", title: "Import/Export", href: "tools-import" },
      { id: "database", title: "Database Tools", href: "tools-database" },
      { id: "cache", title: "Cache Management", href: "tools-cache" },
      { id: "logs", title: "System Logs", href: "tools-logs" },
      { id: "maintenance", title: "Maintenance", href: "tools-maintenance" },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    href: "integrations",
    children: [
      { id: "api", title: "API Management", href: "integrations-api" },
      { id: "webhooks", title: "Webhooks", href: "integrations-webhooks" },
      { id: "third-party", title: "Third-party Apps", href: "integrations-apps" },
      { id: "social-media", title: "Social Media", href: "integrations-social" },
      { id: "payment-gateways", title: "Payment Gateways", href: "integrations-payments" },
      { id: "shipping-providers", title: "Shipping Providers", href: "integrations-shipping" },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    href: "settings",
    children: [
      { id: "general", title: "General Settings", href: "settings-general" },
      { id: "security", title: "Security", href: "settings-security" },
      { id: "privacy", title: "Privacy", href: "settings-privacy" },
      { id: "appearance", title: "Appearance", href: "settings-appearance" },
      { id: "localization", title: "Localization", href: "settings-localization" },
      { id: "advanced", title: "Advanced", href: "settings-advanced" },
    ],
  },
  {
    id: "support",
    title: "Help & Support",
    href: "support",
    children: [
      { id: "documentation", title: "Documentation", href: "support-docs" },
      { id: "tutorials", title: "Tutorials", href: "support-tutorials" },
      { id: "faq", title: "FAQ", href: "support-faq" },
      { id: "contact", title: "Contact Support", href: "support-contact" },
      { id: "tickets", title: "Support Tickets", href: "support-tickets" },
      { id: "feedback", title: "Feedback", href: "support-feedback" },
    ],
  },
]

export function AppSidebar({ onNavigate, currentPage }: AppSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["dashboard"])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const getIcon = (itemId: string) => {
    const icons: Record<string, any> = {
      dashboard: BarChart,
      content: FileText,
      ecommerce: ShoppingCart,
      users: Users,
      communication: MessageSquare,
      media: ImageIcon,
      analytics: BarChart,
      tools: Zap,
      integrations: Globe,
      settings: Settings,
      support: HelpCircle,
    }
    const IconComponent = icons[itemId] || Home
    return <IconComponent className="w-4 h-4" />
  }

  const isItemActive = (item: MenuItem): boolean => {
    if (item.href === currentPage) return true
    if (item.children) {
      return item.children.some((child) => child.href === currentPage)
    }
    return false
  }

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent className="overflow-y-auto pt-12">
        {/* Simple Navigation Items (from original design) */}
        <SidebarGroup className="pt-2">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {Array.from({ length: 10 }).map((_, index) => (
                <SidebarMenuItem key={`nav-item-${index}`}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(`navigation-item-${index + 1}`)}
                    isActive={currentPage === `navigation-item-${index + 1}`}
                    className="w-full justify-start hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span className="font-medium">Navigation Item</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
