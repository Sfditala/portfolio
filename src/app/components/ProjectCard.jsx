// src/components/ProjectCard.js
export default function ProjectCard({ project }) {
  return (
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col border border-gray-100 overflow-hidden">
      {/* حاوية الصورة */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
      </div>

      {/* محتوى النص */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#B06B6B] transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>

          {/* التقنيات (Tags) */}
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags &&
              project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-[#F5E0DC]/50 text-[#B06B6B] rounded-md border border-[#B06B6B]/10"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>

        {/* الأزرار */}
        <div className="flex gap-3 mt-auto pt-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#B06B6B] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#945656] shadow-md hover:shadow-lg transition-all text-center"
          >
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border-2 border-[#B06B6B] text-[#B06B6B] text-sm font-medium py-2.5 rounded-xl hover:bg-[#F5E0DC]/30 transition-all text-center"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
