// src/app/projects/page.js
import ProjectCard from "./ProjectCard";
const projects = [
  {
    title: "Cafe Shop Landing",
    description:
      "A sleek front-end landing page for a café with smooth animations.",
    image: "/cafe.png",
    tags: ["Next.js 16", "Tailwind CSS"],
    link: "cafeshop-seven.vercel.app/",
    github: "https://github.com/Sfditala/cafeshop",
  },
  {
    title: "E-commerce Store",
    description:
      "A full-featured e-commerce store with cart management and checkout flow.",
    image: "/Maha.png",
    tags: ["Next.js 16", "Node js ", "MongoDB", "Tailwind CSS"],
    link: "https://mahastore-ecommerce.vercel.app/",
    github: "https://github.com/Sfditala/ecommerce",
  },
  {
    title: "Dashboard App",
    description:
      "Admin dashboard with interactive analytics, charts, and data tables. \n\n * Note: This project is private (Client Work), live demo is restricted. *",
    image: "/dash.png",
    tags: ["Next.js 16", "Node js ", "MongoDB", "Lucide Icons", "Tailwind CSS"],
    link: "https://deploy-link.com/dashboard",
    github: "https://github.com/Sfditala/dashboard",
  },

  {
    title: "Modavi",
    description: "A live messaging application with private rooms.",
    image: "/modavi.png",
    tags: [
      "Next.js 16",
      "Shadcn UI",
      "Lucide Icons",
      "Tailwind CSS",
      "supabase",
      "clerk",
      "motion-framer",
      "cloudinary",
    ],
    link: "https://modavi.vercel.app/",
    github: "https://github.com/Sfditala/modavi",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 md:px-20 py-20 ">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-[#C18A82] text-center">
        Projects
      </h2>

      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}
