import WithCurrentUserHeader from "@/components/with-current-user-header";

const pressReleases = [
  {
    id: 1,
    title: "VastlyWise Launches New AI Platform",
    summary: "VastlyWise announces the launch of its next-generation AI platform, designed to help businesses accelerate digital transformation.",
    date: "2024-06-10",
  },
  {
    id: 2,
    title: "VastlyWise Partners with Tech Innovators",
    summary: "A new partnership with leading tech companies will expand VastlyWise's reach in the enterprise market.",
    date: "2024-05-22",
  },
  {
    id: 3,
    title: "VastlyWise Receives Industry Award",
    summary: "Recognized for excellence in AI-driven solutions, VastlyWise receives the 2024 Innovation Award.",
    date: "2024-04-15",
  },
];

export default function PressReleasePage() {
  return (
    <>
      <WithCurrentUserHeader />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Press Releases</h1>
        <p className="text-lg text-gray-600 mb-8">
          Stay up to date with the latest news and announcements from VastlyWise.
        </p>
        <div className="space-y-8">
          {pressReleases.map((release) => (
            <div key={release.id} className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-blue-900 mb-2">{release.title}</h2>
              <p className="text-gray-700 mb-2">{release.summary}</p>
              <span className="text-xs text-gray-500">{new Date(release.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 