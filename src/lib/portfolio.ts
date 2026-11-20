export const profile = {
  name: "Tharshini J",
  email: "tharshnitharshni28@gmail.com",
  phone: "+91 7550362608",
  location: "Thoothukudi, Tamil Nadu, India",
  college: "Hindusthan College of Engineering and Technology",
  collegeLocation: "Coimbatore",
  github: "https://github.com/tharshini1773",
  linkedin: "https://www.linkedin.com/in/tharshini-j-a0ab4741b",
  objective: "To develop strong technical skills, gain practical experience through internships and projects, and build a successful career as a software developer in the IT industry.",
};
export const skills = [
  { name: "C", icon: "C", category: "Programming language", level: 80 },
  { name: "Java", icon: "java", category: "Programming language", level: 85 },
  { name: "Python", icon: "py", category: "Programming language", level: 85 },
  { name: "HTML", icon: "</>", category: "Web technology", level: 90 },
  { name: "CSS", icon: "#", category: "Web technology", level: 85 },
  { name: "JavaScript", icon: "JS", category: "Web technology", level: 80 },
];
export const interests = ["Programming and problem solving", "Web development", "Learning new technologies", "Building practical projects"];
export const project = {
  title: "Sweet Crumbs",
  subtitle: "Artisan bakery website",
  label: "My First Project",
  url: "https://tharshini-website.web.app/",
  features: ["Bakery product categories", "Product gallery", "Enquiry form", "WhatsApp ordering", "Responsive website design"],
};
export const navigation = [
  { label: "Home", to: "/" },
  { label: "About Me", to: "/about" },
  { label: "Education", to: "/education" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Career Objective", to: "/career-objective" },
  { label: "Contact", to: "/contact" },
] as const;
export function pageHead(title: string, description: string) {
  return { meta: [
    { title: `${title} | Tharshini J` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | Tharshini J` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] };
}