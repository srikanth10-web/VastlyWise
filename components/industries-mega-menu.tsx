"use client"

import { useState } from "react"
import {
  ChevronDown,
  Building2,
  Stethoscope,
  CreditCard,
  GraduationCap,
  Factory,
  Truck,
  ShoppingBag,
  Briefcase,
} from "lucide-react"

interface IndustriesMenuProps {
  onNavigate: (page: string) => void
}

export function IndustriesMegaMenu({ onNavigate }: IndustriesMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const industries = [
    {
      category: "Technology",
      icon: Building2,
      items: [
        { name: "Software Development", href: "industries-software" },
        { name: "Cloud Computing", href: "industries-cloud" },
        { name: "Artificial Intelligence", href: "industries-ai" },
        { name: "Cybersecurity", href: "industries-security" },
        { name: "Mobile Apps", href: "industries-mobile" },
        { name: "Web Development", href: "industries-web" },
      ],
    },
    {
      category: "Healthcare",
      icon: Stethoscope,
      items: [
        { name: "Hospitals & Clinics", href: "industries-hospitals" },
        { name: "Telemedicine", href: "industries-telemedicine" },
        { name: "Medical Devices", href: "industries-medical-devices" },
        { name: "Pharmaceuticals", href: "industries-pharma" },
        { name: "Health Insurance", href: "industries-health-insurance" },
        { name: "Mental Health", href: "industries-mental-health" },
      ],
    },
    {
      category: "Financial Services",
      icon: CreditCard,
      items: [
        { name: "Banking", href: "industries-banking" },
        { name: "Investment Management", href: "industries-investment" },
        { name: "Insurance", href: "industries-insurance" },
        { name: "Fintech", href: "industries-fintech" },
        { name: "Cryptocurrency", href: "industries-crypto" },
        { name: "Payment Processing", href: "industries-payments" },
      ],
    },
    {
      category: "Education",
      icon: GraduationCap,
      items: [
        { name: "K-12 Schools", href: "industries-k12" },
        { name: "Higher Education", href: "industries-higher-ed" },
        { name: "Online Learning", href: "industries-elearning" },
        { name: "Corporate Training", href: "industries-corporate-training" },
        { name: "Educational Technology", href: "industries-edtech" },
        { name: "Certification Programs", href: "industries-certification" },
      ],
    },
    {
      category: "Manufacturing",
      icon: Factory,
      items: [
        { name: "Automotive", href: "industries-automotive" },
        { name: "Aerospace", href: "industries-aerospace" },
        { name: "Electronics", href: "industries-electronics" },
        { name: "Food & Beverage", href: "industries-food" },
        { name: "Textiles", href: "industries-textiles" },
        { name: "Chemical", href: "industries-chemical" },
      ],
    },
    {
      category: "Logistics",
      icon: Truck,
      items: [
        { name: "Supply Chain", href: "industries-supply-chain" },
        { name: "Warehousing", href: "industries-warehousing" },
        { name: "Transportation", href: "industries-transportation" },
        { name: "Last Mile Delivery", href: "industries-delivery" },
        { name: "Freight Management", href: "industries-freight" },
        { name: "Inventory Management", href: "industries-inventory" },
      ],
    },
    {
      category: "Retail & E-commerce",
      icon: ShoppingBag,
      items: [
        { name: "Online Retail", href: "industries-online-retail" },
        { name: "Fashion & Apparel", href: "industries-fashion" },
        { name: "Consumer Electronics", href: "industries-consumer-electronics" },
        { name: "Home & Garden", href: "industries-home-garden" },
        { name: "Sports & Recreation", href: "industries-sports" },
        { name: "Marketplace Platforms", href: "industries-marketplace" },
      ],
    },
    {
      category: "Professional Services",
      icon: Briefcase,
      items: [
        { name: "Legal Services", href: "industries-legal" },
        { name: "Consulting", href: "industries-consulting" },
        { name: "Accounting", href: "industries-accounting" },
        { name: "Marketing Agencies", href: "industries-marketing" },
        { name: "Real Estate", href: "industries-real-estate" },
        { name: "Human Resources", href: "industries-hr" },
      ],
    },
  ]

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button
        className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium transition-colors"
        onClick={() => onNavigate("industries")}
      >
        <span>Industries</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Mega Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-6xl bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industries.map((industry) => {
                const IconComponent = industry.icon
                return (
                  <div key={industry.category} className="space-y-4">
                    <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">{industry.category}</h3>
                    </div>
                    <ul className="space-y-2">
                      {industry.items.map((item) => (
                        <li key={item.name}>
                          <button
                            onClick={() => {
                              onNavigate(item.href)
                              setIsOpen(false)
                            }}
                            className="text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors duration-150 w-full text-left"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            {/* Featured Section */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Industry Solutions</h4>
                  <p className="text-sm text-blue-700">Discover tailored solutions for your specific industry needs.</p>
                  <button
                    onClick={() => {
                      onNavigate("industry-solutions")
                      setIsOpen(false)
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2"
                  >
                    Learn More →
                  </button>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Case Studies</h4>
                  <p className="text-sm text-green-700">
                    See how we've helped businesses in various industries succeed.
                  </p>
                  <button
                    onClick={() => {
                      onNavigate("case-studies")
                      setIsOpen(false)
                    }}
                    className="text-sm text-green-600 hover:text-green-800 font-medium mt-2"
                  >
                    View Cases →
                  </button>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Industry Insights</h4>
                  <p className="text-sm text-purple-700">Stay updated with the latest trends and insights.</p>
                  <button
                    onClick={() => {
                      onNavigate("industry-insights")
                      setIsOpen(false)
                    }}
                    className="text-sm text-purple-600 hover:text-purple-800 font-medium mt-2"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
