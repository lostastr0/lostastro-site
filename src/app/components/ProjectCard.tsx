"use client";

import { useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  demoUrl?: string;
};

const projects: Project[] = [
  {
    id: "proj1",
    title: "Project One",
    description: "A modern web app built with React and TypeScript.",
    demoUrl: "https://example.com/demo1",
  },
  {
    id: "proj2",
    title: "Project Two",
    description: "An experimental AI demo leveraging OpenAI APIs.",
    demoUrl: "https://example.com/demo2",
  },
  {
    id: "proj3",
    title: "Project Three",
    description: "Static marketing site with Gatsby and TailwindCSS.",
  },
];

export default function ProjectCard() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
      {/* Left aligned subtext below Projects title on page */}
      <p className="text-sky-300 text-base mb-6 w-full text-left">
        Some projects I built during learning.
      </p>

      {/* Grid of square cards centered */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center w-full">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="
              bg-slate-900
              rounded-xl
              shadow-lg
              p-6
              text-left
              hover:shadow-2xl
              transition
              focus:outline-none
              focus:ring-2 focus:ring-sky-400
              aspect-square
              flex flex-col justify-center
              w-full max-w-xs
            "
          >
            <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400 text-sm">{project.description}</p>
          </button>
        ))}
      </div>

      {/* Modal on card click */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-slate-900 rounded-xl overflow-hidden max-w-lg w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">{selectedProject.title}</h3>
              <p className="mb-4 text-gray-300">{selectedProject.description}</p>
              {selectedProject.demoUrl ? (
                <div className="bg-black aspect-video rounded overflow-hidden mb-4">
                  <iframe
                    src={selectedProject.demoUrl}
                    title={`${selectedProject.title} Demo`}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className="text-gray-500 italic mb-4">No demo available</p>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="mt-2 px-4 py-2 bg-sky-600 rounded text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
