export const site = {
  name: "Vipul Sharma",
  role: "React Native Developer",
  pitch:
    "React Native Developer with 3+ years building secure, cross-platform mobile apps, plus 6 months of React.js web development. Delivered projects for IIT Kanpur and DigiMantra Labs.",
  availability:
    "Open to remote freelance, part-time (10–20 hrs/week), or contract React Native work, flexible across time zones.",
  location: "Solan, Himachal Pradesh, India",
  email: "sharmavipul99999@gmail.com",
  phone: "+91 80917 88672",
  phoneHref: "tel:+918091788672",
  linkedin: "https://www.linkedin.com/in/vipul-sharma-2284621ab/",
  resume: "/resume.pdf",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const about = {
  eyebrow: "About",
  title: ["Secure apps,", "clear craft"] as [string, string],
  body: "I build production React Native apps with a focus on security, reliability, and polished UI — from campus-scale identity systems to family products. Based in Solan, Himachal Pradesh, I collaborate across time zones with designers, backend teams, and stakeholders.",
};

export const experience = [
  {
    id: "01",
    title: "React Native Developer",
    company: "C3IHUB",
    location: "Kanpur, India",
    period: "Oct 2024 – Present",
    bullets: [
      "Develops secure, cross-platform mobile apps using React Native, JavaScript, TypeScript, Expo for enterprise-grade solutions",
      "Led IITK App & Verifier: Expo Secure Store, biometric auth, DigiLocker API, QR scanning, Sentry.io",
      "Optimized performance — 20% reduction in load times for critical features",
      "Collaborated with designers, backend devs, and IIT Kanpur stakeholders on responsive UI + API integrations",
    ],
  },
  {
    id: "02",
    title: "React Native Developer",
    company: "DigiMantra Labs",
    location: "Mohali, India",
    period: "Mar 2023 – Oct 2024",
    bullets: [
      "Built and maintained cross-platform mobile/web apps (React Native, React.js, JS, TS)",
      "Led front-end for OSR Jobs (job-matching platform): Redux, Stripe API, Tailwind CSS",
      "Reduced crash rates by 15% across production apps through optimization",
      "Partnered cross-functionally to integrate third-party APIs and libraries",
    ],
  },
] as const;

export const projects = [
  {
    slug: "iitk-app",
    name: "IITK App",
    role: "Lead mobile engineer",
    tagline: "Campus identity, credentials, and notifications in one app.",
    description:
      "The primary mobile companion for IIT Kanpur’s digital identity ecosystem. Students and employees access blockchain-backed digital IDs, dependent credentials, degree-related documents, event passes, and campus notifications — with cryptographically verifiable signed QR for on-campus use. Actively used by IITK users at 10k+ on normal days and peaking at 30k+ during campus events.",
    highlights: [
      "10k+ daily active users; 30k+ on major events",
      "Verifiable signed QR for trusted campus identity",
      "Digital IDs, event passes & campus notifications",
    ],
    stack: [
      "React Native",
      "Expo",
      "Expo Secure Store",
      "Biometric Auth",
      "QR Scanning",
      "Sentry.io",
    ],
    image: "/images/iitk-app.webp",
  },
  {
    slug: "iitk-access",
    name: "IITK Access",
    role: "Lead mobile engineer",
    tagline: "Verify credentials and gate access in seconds.",
    description:
      "Companion verifier app used at campus gates and checkpoints. Staff authenticate IITK App holders via online/offline QR verification and BLE scanner devices — so the same active campus users get checked in quickly without oversharing sensitive details. Built for high-throughput verification where speed and trust matter most.",
    highlights: [
      "Verifies the same IITK users at gates & checkpoints",
      "Online/offline QR verification that keeps working",
      "BLE scanner device support for access hardware",
    ],
    stack: ["React Native", "Expo", "QR Verification", "BLE", "Offline-first"],
    image: "/images/iitk-verifier.webp",
  },
  {
    slug: "c3ihub-wallet",
    name: "C3iHub Wallet",
    role: "Lead mobile engineer",
    tagline: "Verified degrees you can download and prove — fully offline.",
    description:
      "Blockchain-secured credential wallet for graduates to access fraud-proof digital degrees and certificates, with DigiLocker credentials available for download and full offline use. Powers degree/certificate issuance for IIT Kanpur (up to ~3,500 students/year), IIT Jodhpur (~2,000), IIIT Lucknow (~2,500), and other institutes connected through C3iHub — plus SSL pinning, encryption, and secure local storage.",
    highlights: [
      "IITK · IITJ · IIITL & more institutes on one wallet",
      "DigiLocker credentials downloadable for offline use",
      "Offline-first credential storage with Expo SQLite",
    ],
    stack: [
      "React Native",
      "Expo",
      "Expo SQLite",
      "DigiLocker API",
      "SSL Pinning",
      "Encryption",
    ],
    image: "/images/c3iwallet.webp",
  },
  {
    slug: "weatherly",
    name: "Weatherly",
    role: "Solo developer",
    tagline:
      "Cross-platform weather app with MapLibre, MET Norway, and Skia atmospheres.",
    description:
      "Weather and location app for inspecting a place, seeing how conditions change, and deciding what to do. Current location, search, saved favorites, and map taps all feed one reading with hourly and daily forecasts. Privacy-first one-shot location, Skia weather atmospheres, deterministic rule-based insights, and a hexagonal architecture that keeps MET Norway and Nominatim behind clear boundaries.",
    highlights: [
      "Privacy-first one-shot location — no background tracking",
      "Skia atmospheres (rain, snow, fog, storm) with reduced motion",
      "Hexagonal boundary — UI never talks to MET or Nominatim directly",
    ],
    stack: [
      "React Native",
      "Expo",
      "Expo Router",
      "MapLibre",
      "MET Norway",
      "Shopify Skia",
      "Expo SQLite",
      "Reanimated",
    ],
    image: "/images/weather-1.webp",
  },
  {
    slug: "neemo",
    name: "Neemo",
    role: "React Native developer",
    tagline: "Stories and songs that keep families close.",
    description:
      "Family bonding app for parents, grandparents, and caregivers — especially across distance. Create and share interactive stories and nostalgic sing-alongs so kids recognize loved ones through familiar voices and content, not just random screens. Warm, kid-safe UX focused on connection.",
    highlights: [
      "Interactive stories curated by loved ones",
      "Nostalgic sing-along experiences",
      "Designed for long-distance family bonding",
    ],
    stack: ["React Native", "Redux", "Media"],
    image: "/images/neemo.webp",
  },
] as const;

export const skills = [
  {
    id: "01",
    title: "Languages & Frameworks",
    items: [
      "React Native",
      "React",
      "TypeScript",
      "JavaScript",
      "Expo",
      "React Native CLI",
    ],
  },
  {
    id: "02",
    title: "Mobile & Platform",
    items: [
      "Expo Router",
      "Redux Toolkit",
      "SQLite",
      "React Native Reanimated",
      "React Native Skia",
      "MapLibre",
      "Secure Storage",
      "Biometric Authentication",
      "Push Notifications",
      "QR / Barcode Scanning",
      "Location Services",
    ],
  },
  {
    id: "03",
    title: "Integrations & Tools",
    items: [
      "REST APIs",
      "DigiLocker Integration",
      "Stripe",
      "Sentry",
      "Git",
      "Tailwind CSS",
    ],
  },
  {
    id: "04",
    title: "Engineering",
    items: [
      "Offline-First Architecture",
      "State Management",
      "API Integration",
      "Performance Optimization",
      "Cross-Platform Development",
      "UI/UX",
      "Accessibility",
      "Privacy-First Architecture",
      "App Store & Play Store Deployment",
      "Hexagonal Architecture",
    ],
  },
] as const;

export const education = [
  {
    title: "B.Tech, Computer Science and Engineering",
    school: "Shoolini University, Solan, HP",
    period: "Aug 2019 – Jun 2023",
  },
  {
    title: "Senior Secondary",
    school: "St. Thomas School, Shimla, HP",
    period: "Mar 2017 – Mar 2018",
  },
] as const;

export const languages = [
  { name: "English", level: "Professional Working Proficiency" },
  { name: "Hindi", level: "Native" },
] as const;
