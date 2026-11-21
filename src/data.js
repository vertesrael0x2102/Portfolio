import ccnaIntro from "./assets/badges/ccna-intro.webp";
import ccnaSwitching from "./assets/badges/ccna-switching.webp";
import ccnaEnterprise from "./assets/badges/ccna-enterprise.webp";
import cyberThreat from "./assets/badges/cyber-threat-management.webp";

import routeImg from "./assets/timeline/route.webp";
import therapyImg from "./assets/timeline/therapy.webp";
import graduationImg from "./assets/timeline/graduation.webp";
import internshipImg from "./assets/timeline/internship.webp";

export const profile = {
  firstLine: "Vert Esrael",
  secondLine: "Gumera",
  fullName: "Vert Esrael Gumera",
  place: "Iligan City, Philippines",
  email: "vertesraelg@gmail.com",
  github: "https://github.com/vertesrael0x2102",
  githubName: "vertesrael0x2102",
  linkedin: "https://www.linkedin.com/in/vert-esrael-gumera-10669a429/",
  openTo: "Open to IT, cybersecurity or any tech related works, in Iligan City or remote.",
  intro:
    "I work in information technology, with experience in data analysis, cybersecurity and project management. I like making systems run more efficiently and keeping data accurate.",
  about:
    "I'm a BSIT graduate from MSU-IIT. I've worked on AI data analysis, route optimization and cybersecurity awareness, and I like work where the details matter.",
  school: "Mindanao State University - Iligan Institute of Technology, Iligan City.",
};

export const sections = [
  { id: "about", label: "About" },
  { id: "timeline", label: "Timeline" },
  { id: "certificates", label: "Certificates" },
  { id: "skills", label: "Skills" },
  { id: "tools", label: "Tools" },
  { id: "find", label: "Find me" },
  { id: "contact", label: "Contact" },
];

export const tickerWords = [
  "Information technology", "Data analysis", "Cybersecurity", "Project management",
  "Networking", "AI training", "Web development", "Problem solving",
];

export const chips = [
  "Cybersecurity", "Data analysis", "Project management", "Networking (CCNA)",
  "AI training", "Web development", "Problem solving",
];

export const timeline = [
  { year: "2022", kind: "edu", label: "Education", title: "Started BS Information Technology", text: profile.school },
  {
    year: "2024", kind: "proj", label: "Project", image: therapyImg,
    link: { href: "https://github.com/vertesrael0x2102/Artificial-Intelligence-Project-Understanding-Factors-Influencing-the-Decision-to-Undergo-Therapy", label: "View on GitHub" },
    title: "Artificial Intelligence Project: Understanding Factors Influencing the Decision to Undergo Therapy",
    text: "I analyzed complex datasets with AI techniques to find the factors that influence a person's decision to start therapy, which points to ways of improving patient engagement.",
  },
  {
    year: "2025", kind: "proj", label: "Project", image: routeImg,
    title: "Optimizing Route Efficiency for Electric Meter Readers",
    text: "I applied the Traveling Salesman Problem algorithm to plan more efficient meter reading routes, which supports lower operating costs and better service.",
  },
  {
    year: "2026", kind: "job", label: "Internship", image: internshipImg,
    title: "Intern, Cyber Information Security",
    sub: "Information and Communications Technology Center, Iligan City",
    bullets: [
      "Took inventory of IT assets across all LGU departments and kept the records accurate and up to date.",
      "Gave cybersecurity awareness training to employees.",
      "Joined cybersecurity trainings on current threats and how to reduce them.",
    ],
  },
  { year: "2026", kind: "edu", label: "Education", image: graduationImg, title: "Graduated, BS Information Technology", text: profile.school },
];

// group is the filter it belongs to. Leave badge and file out when you don't have them.
export const certs = [
  { group: "ccna", tag: "CCNA", name: "Introduction to Networks", date: "May 2025", badge: ccnaIntro, file: "certificates/ccna-intro.pdf" },
  { group: "ccna", tag: "CCNA", name: "Switching, Routing, and Wireless Essentials", date: "Dec 2024", badge: ccnaSwitching, file: "certificates/ccna-switching.pdf" },
  { group: "ccna", tag: "CCNA", name: "Enterprise Networking, Security, and Automation", date: "Dec 2025", badge: ccnaEnterprise, file: "certificates/ccna-enterprise.pdf" },
  { group: "security", tag: "Security", name: "Introduction to Cybersecurity" },
  { group: "security", tag: "Security", name: "Cyber Threat Management", date: "Jun 2025", badge: cyberThreat, file: "certificates/cyber-threat-management.pdf" },
  { group: "response", tag: "Response", name: "Computer Emergency Response Team Training" },
];

export const filters = [
  { key: "all", label: "All" },
  { key: "ccna", label: "CCNA" },
  { key: "security", label: "Security" },
  { key: "response", label: "Response" },
];

export const skills = [
  { tab: "Security", text: "Network basics, password security, solving CTF challenges" },
  { tab: "Web", text: "HTML, CSS, JavaScript, basic React" },
  { tab: "Analysis", text: "AI training, algorithms and problem solving, attention to detail" },
  { tab: "Support", text: "Hardware diagnostics, software installation, system optimization, operating systems" },
];

// Update these with the software you use regularly.
export const tools = [
  { name: "Visual Studio Code", category: "Development", description: "Writing and editing code." },
  { name: "GitHub", category: "Development", description: "Managing projects and sharing code." },
  { name: "Cisco Packet Tracer", category: "Networking", description: "Building and testing network topologies." },
  { name: "Microsoft Excel", category: "Data analysis", description: "Organizing data and working with spreadsheets." },
  { name: "Python", category: "Programming", description: "Scripting, data work and automation." },
  { name: "GeoJSON", category: "Geospatial data", description: "Representing geographic features and route data in a lightweight format." },
  { name: "My Google Drive", category: "Resources", description: "Open my shared software and resources folder.", href: "https://drive.google.com/drive/folders/11Y7vh8tH2PcgahapHzcJlb8M-VGa4wE5?usp=sharing" },
];

// Change the second text to your username if you want it shown under the platform name.
export const socials = [
  { name: "Discord", handle: "View profile", href: "https://discord.com/users/796950556451012631" },
  { name: "Steam", handle: "View profile", href: "https://steamcommunity.com/profiles/76561198351689475/" },
  { name: "Facebook", handle: "Generux00", href: "https://www.facebook.com/Generux00" },
  { name: "Instagram", handle: "@isreaaaaaal", href: "https://www.instagram.com/isreaaaaaal/" },
  { name: "Roblox", handle: "View profile", href: "https://www.roblox.com/users/11438895087/profile" },
];
