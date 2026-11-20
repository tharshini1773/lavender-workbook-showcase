export const profile = {
  name: "Tharshini J",
  role: "Computer Science Engineering Student",
  focus: "Web Development & Software Development",
  headline: "Computer Science Student | Aspiring Software Developer | Web Development Enthusiast",
  email: "tharshnitharshni28@gmail.com",
  phone: "+91 7550362608",
  location: "Thoothukudi, Tamil Nadu, India",
  college: "Hindusthan College of Engineering and Technology",
  collegeLocation: "Coimbatore",
  github: "https://github.com/tharshini1773",
  linkedin: "https://www.linkedin.com/in/tharshini-j-a0ab4741b",
  objective: "To develop strong technical skills, gain practical experience through internships and projects, and build a successful career as a software developer in the IT industry.",
};

export const education = {
  degree: "Bachelor of Engineering",
  department: "Computer Science and Engineering",
  college: "Hindusthan College of Engineering and Technology",
  location: "Coimbatore, Tamil Nadu",
  year: "2nd Year",
  duration: "2024 – Present",
  highlights: [
    "Core Computer Science fundamentals and algorithmic problem solving",
    "Object-Oriented Programming in Java and system development",
    "Web development fundamentals (HTML5, CSS3, JavaScript ES6+)",
    "Cloud database integration with Firebase Firestore & cloud hosting",
  ],
};

// Maintained for backward compatibility and test assertion
export const skills = [
  { name: "C", icon: "C", category: "Programming language", level: 80 },
  { name: "Java", icon: "java", category: "Programming language", level: 85 },
  { name: "Python", icon: "py", category: "Programming language", level: 85 },
  { name: "HTML", icon: "</>", category: "Web technology", level: 90 },
  { name: "CSS", icon: "#", category: "Web technology", level: 85 },
  { name: "JavaScript", icon: "JS", category: "Web technology", level: 80 },
];

export const skillCategories = [
  {
    category: "Programming Languages",
    tag: "Languages",
    description: "Core algorithmic problem solving and computational logic",
    items: [
      { name: "C", badge: "Systems Programming", status: "Proficient", icon: "C" },
      { name: "Java", badge: "Object-Oriented Programming", status: "Proficient", icon: "Java" },
      { name: "Python", badge: "Scripting & Algorithms", status: "Proficient", icon: "Python" },
    ],
  },
  {
    category: "Frontend Development",
    tag: "Frontend",
    description: "Building responsive, modern, and accessible user interfaces",
    items: [
      { name: "HTML5", badge: "Semantic Structure & SEO", status: "Advanced", icon: "HTML5" },
      { name: "CSS3", badge: "Modern Flexbox, Grid & Animations", status: "Advanced", icon: "CSS3" },
      { name: "JavaScript (ES6+)", badge: "Interactive Logic & DOM", status: "Proficient", icon: "JS" },
    ],
  },
  {
    category: "Backend Development",
    tag: "Backend",
    description: "Core server concepts and object-oriented application design",
    items: [
      { name: "Java OOP", badge: "Classes, Inheritance & Design", status: "Proficient", icon: "OOP" },
      { name: "Python Scripting", badge: "Automation & Problem Solving", status: "Proficient", icon: "Scripting" },
    ],
  },
  {
    category: "Database Technologies",
    tag: "Database",
    description: "Cloud database storage and persistent data modeling",
    items: [
      { name: "Firebase Firestore", badge: "Cloud NoSQL Database", status: "Active Integration", icon: "Firestore" },
      { name: "Cloud Storage", badge: "Secure Document & Asset Storage", status: "Integrated", icon: "Cloud" },
    ],
  },
  {
    category: "Development Tools",
    tag: "Tools",
    description: "Version control workflows, build tooling, and code editors",
    items: [
      { name: "Git", badge: "Version Control", status: "Proficient", icon: "Git" },
      { name: "GitHub", badge: "Remote Collaboration & Repositories", status: "Proficient", icon: "GitHub" },
      { name: "VS Code", badge: "Modern Developer IDE", status: "Primary IDE", icon: "VSCode" },
      { name: "Vite", badge: "Next-Gen Frontend Tooling", status: "Hands-on Experience", icon: "Vite" },
    ],
  },
  {
    category: "Currently Learning",
    tag: "Learning",
    description: "Active self-directed learning and continuous skill expansion",
    items: [
      { name: "React", badge: "Component-Based Architecture", status: "Actively Learning", icon: "React" },
      { name: "Full Stack Development", badge: "End-to-End Modern Web Apps", status: "In Progress", icon: "FullStack" },
    ],
  },
];

export const interests = [
  "Programming and problem solving",
  "Web development",
  "Learning new technologies",
  "Building practical projects",
];

export const project = {
  title: "Sweet Crumbs",
  subtitle: "Artisan bakery website",
  label: "My First Project",
  url: "https://tharshini-website.web.app/",
  github: "https://github.com/tharshini1773",
  description: "A modern, responsive bakery website designed to showcase handcrafted cakes and pastries with interactive enquiry features and one-click WhatsApp ordering.",
  tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "WhatsApp API", "Firebase Hosting"],
  features: [
    "Bakery product categories",
    "Product gallery",
    "Enquiry form",
    "WhatsApp ordering",
    "Responsive website design",
  ],
  architecture: [
    "Clean semantic markup with accessible design",
    "Responsive mobile-first styling with smooth interactive effects",
    "Instant WhatsApp enquiry integration with pre-formatted message payload",
    "Worldwide high-speed CDN delivery via Firebase Hosting",
  ],
};

export const navigation = [
  { label: "Home", to: "/" },
  { label: "About Me", to: "/about" },
  { label: "Education", to: "/education" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Certificates", to: "/certificates" },
  { label: "Career Objective", to: "/career-objective" },
  { label: "Contact", to: "/contact" },
] as const;

export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | Tharshini J` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Tharshini J` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
