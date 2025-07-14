"use client"

import { Folder, Plus } from "lucide-react"

interface ContentSidebarProps {
  currentUser: any
  onNavigate: (page: string) => void
}

export function ContentSidebar({ currentUser, onNavigate }: ContentSidebarProps) {
  // Projects list - easily expandable for future projects
  const projects = [
    { id: "project1", name: "Project 1", description: "First project description" },
    { id: "project2", name: "Project 2", description: "Second project description" },
    { id: "project3", name: "Project 3", description: "Third project description" },
    { id: "project4", name: "Project 4", description: "Fourth project description" },
    { id: "project5", name: "Project 5", description: "Fifth project description" },
    { id: "project6", name: "Project 6", description: "Add blog content" },
  ]

  return (
    <>
      <div className="w-80 bg-white border-r border-gray-200 shadow-lg">
        <div className="h-full overflow-y-auto">
          <div className="p-4">
            {/* Projects Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Folder className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Projects</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600" title="Add New Project">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <div className="space-y-2">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => onNavigate(project.id)}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors group border border-transparent hover:border-blue-200"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200">
                        <Folder className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{project.name}</div>
                        <div className="text-xs text-gray-500 truncate">{project.description}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Add New Project Button */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => onNavigate("add-project")}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Add New Project</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
