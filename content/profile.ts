export const profile = {
  name: "Krister Lloyd Magalso",
  shortName: "Krister",
  location: "Caloocan City, Philippines",
  headline: "I build practical software for real-world problems.",
  introduction:
    "Computer Science graduate focused on Android development, offline-first applications, and practical technology solutions.",
  github: "https://github.com/kristerlloyd23-netizen",
  targetRoles: [
    "Junior Android Developer",
    "Junior Software Developer",
    "Entry-level full-stack development",
    "IT Support",
  ],
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export const education = {
  degree: "Bachelor of Science in Computer Science",
  school: "Immaculada Concepcion College",
  graduation: "July 2025",
} as const;

export const experience = [
  {
    title: "IT Support – Administrative Support",
    organization: "Educational Resources and Interactive Events Services, Inc. (NCERIES)",
    start: "February 2025",
    end: "March 2026",
    summary:
      "Field-based technical support for 3D dome projection equipment used in educational presentations.",
    responsibilities: [
      "Installed, configured, and tested projection equipment at school sites.",
      "Assisted school personnel with equipment setup and basic technical troubleshooting.",
      "Provided on-site support during educational activities and helped maintain audiovisual equipment.",
    ],
  },
  {
    title: "IT Support Intern",
    organization: "Grace Medical General Center – IT Department",
    start: "January 2025",
    end: "April 2025",
    summary:
      "Entry-level IT department experience supporting users, workstations, and routine maintenance.",
    responsibilities: [
      "Assisted with basic hardware, software, and workstation troubleshooting.",
      "Helped users with common computer-related problems and technical guidance.",
      "Supported network connectivity checks and routine IT maintenance.",
    ],
  },
] as const;

export const certifications = [
  {
    title: "Contact Center Services NC II",
    provider: "TESDA Training Institute / Mindbank Training",
    date: "2023",
  },
  {
    title: "Data Analyst General Course",
    provider: "Refocus Digital Academy",
    date: "February 2022 – February 2023",
  },
] as const;
