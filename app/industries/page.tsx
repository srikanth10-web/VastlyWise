import WithCurrentUserHeader from "@/components/with-current-user-header";
import { Building2, Stethoscope, CreditCard, GraduationCap, Factory, Truck, ShoppingBag, Briefcase } from "lucide-react";

const industries = [
  {
    name: "Technology",
    icon: Building2,
    description: "Software, cloud, AI, and cybersecurity solutions driving innovation.",
  },
  {
    name: "Healthcare",
    icon: Stethoscope,
    description: "Hospitals, telemedicine, medical devices, and health insurance.",
  },
  {
    name: "Financial Services",
    icon: CreditCard,
    description: "Banking, investment, fintech, and payment processing.",
  },
  {
    name: "Education",
    icon: GraduationCap,
    description: "K-12, higher ed, online learning, and corporate training.",
  },
  {
    name: "Manufacturing",
    icon: Factory,
    description: "Automotive, aerospace, electronics, and food & beverage.",
  },
  {
    name: "Logistics",
    icon: Truck,
    description: "Supply chain, warehousing, transportation, and delivery.",
  },
  {
    name: "Retail & E-commerce",
    icon: ShoppingBag,
    description: "Online retail, fashion, consumer electronics, and marketplaces.",
  },
  {
    name: "Professional Services",
    icon: Briefcase,
    description: "Legal, consulting, accounting, marketing, and real estate.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <WithCurrentUserHeader />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Industries</h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore the industries we serve, each with tailored solutions and expertise.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div key={industry.name} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center p-6 text-center">
                <div className="mb-4">
                  <Icon className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{industry.name}</h2>
                <p className="text-gray-600 text-sm">{industry.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
} 