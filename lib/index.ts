export const PROJECTS = [
  {
    title: "InferLoop.AI – Test-Driven AI Companion for Competitive Programming",
    image: "/images/projectsImg/inferloop-ai-img.png",
    description:
      "A five-agent AI loop that reviews, rewrites, and re-tests DSA / competitive-programming solutions in Python or C++ — where measured sandbox pass-rate, not LLM opinion, decides the winning version.",
    highlights: [
      "Five-agent loop (Test Generator → Analyzer → Critic → Improver → Evaluator) where each rewrite is executed against generated test cases inside a real Vercel Sandbox.",
      "Failing cases feed forward as concrete fix signals; the loop ends on 100% pass-rate, stall, or iteration cap, then scores the best iteration.",
      "Vercel Sandbox (Firecracker microVMs) with a prebuilt g++ snapshot for fast C++ cold starts and a clean per-request VM lifecycle.",
      "Euri AI Gateway as the primary LLM layer (Gemini as direct provider, Ollama for local dev), with the full pipeline streamed live over Server-Sent Events.",
      "Production hardening: Argon2 + JOSE JWT auth, DB-backed refresh tokens, rate limiting, and transient-vs-persistent error classification for graceful cold-start UX.",
    ],
    technologies: [
      "Next.js 16",
      "React 19",
      "Express 5",
      "TypeScript",
      "Prisma",
      "PostgreSQL (Neon)",
      "Vercel Sandbox",
      "Euri AI Gateway",
      "Server-Sent Events",
      "Monaco",
      "Tailwind CSS",
    ],
    live: "https://inferloopai.vercel.app",
    github: "https://github.com/suveshpandey/inferloop-ai-server",
  },
  {
    title: "CodePilot – AI-Assisted Code Learning Platform",
    image: "/images/projectsImg/code-pilot.png",
    description:
      "An AI-assisted coding platform that pairs a multi-language editor with real-time AI guidance to help beginners learn faster.",
    highlights: [
      "Multi-language code editor with real-time AI hints, one-click fixes, debugging, and a concept-clarifying chatbot.",
      "Learning toolkit including interactive quizzes, personal notes, blogs, and cached YouTube videos.",
      "Secure access via email OTP and Google OAuth.",
      "Built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL, with caching for performance.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "NextAuth.js",
      "shadcn/ui",
      "Vercel (Deployment)",
      "Google Gemini",
      "Intersection Observer API (infinite scroll)",
      "Node-Cache",
    ],
    live: "https://code-pilot-kappa.vercel.app/",
    github: "https://github.com/suveshpandey/CodePilot",
  },
  {
    title:
      "Excaliboard - Real-time collaborative canvas app (excalidraw.com clone)",
    image: "/images/projectsImg/excaliboard-dashboard.png",
    description:
      "An Excalidraw-inspired real-time collaborative canvas where multiple users draw together on shared, persistent boards.",
    highlights: [
      "Real-time multi-user drawing powered by WebSockets.",
      "Google Auth, live room dashboards, and persistent canvas storage.",
      "Scalable monorepo architecture with a responsive Tailwind CSS UI.",
      "Built with Next.js, Node/Express, and PostgreSQL.",
    ],
    technologies: [
      "NextJS",
      "PostgreSQL",
      "NodeJS",
      "ExpressJS",
      "Typescript",
      "Tailwind",
      "WebSocket (ws)",
      "NextAuth.js",
      "Monorepo Structure",
    ],
    live: "https://excaliboard-frontend.vercel.app/",
    github: "https://github.com/suveshpandey/excalidraw.com",
  },
  {
    title: "Talkify - Real-time chat app",
    image: "/images/projectsImg/tailkify-img.png",
    description:
      "A real-time chat application for seamless text and image messaging with a polished, responsive interface.",
    highlights: [
      "Real-time text and image messaging via Socket.io.",
      "Profile customization and a dark/light theme toggle.",
      "Secure authentication to protect user data.",
      "Fully responsive UI built with the MERN stack and TypeScript.",
    ],
    technologies: [
      "ReactJS",
      "Mongodb",
      "NodeJS",
      "ExpressJS",
      "Typescript",
      "Tailwind",
      "Socket.io",
    ],
    live: "https://talkify-chat-app-kohl.vercel.app/",
    github: "https://github.com/suveshpandey/talkify-chat-app",
  },
  {
    title: "Google Gemini Fullstack Clone",
    image: "/images/projectsImg/gemini-clone-img.png",
    description:
      "A full-stack AI chatbot clone delivering instant, styled responses with persistent chat history.",
    highlights: [
      "Instant AI responses with cleanly styled output.",
      "Dark/light mode for comfortable usage.",
      "Secure authentication and recent chat history storage.",
      "Seamless database integration built on the MERN stack.",
    ],
    technologies: ["ReactJS", "Mongodb", "NodeJS", "ExpressJS", "Tailwind"],
    live: "https://gemini-clone-sp.vercel.app/",
    github: "https://github.com/suveshpandey/google-gemini-clone",
  },
  {
    title: "Neura-Notes",
    image: "/images/projectsImg/neura-notes-img.png",
    description:
      "A full-stack note-taking app with secure verification and rich, organized note management.",
    highlights: [
      "Secure email verification and authentication.",
      "Create, tag, and attach file uploads to notes.",
      "Track saved dates and manage user profiles.",
      "Responsive UI for seamless cross-device access.",
    ],
    technologies: ["ReactJS", "Mongodb", "NodeJS", "ExpressJS", "Tailwind"],
    live: "https://neura-notes-frontend.vercel.app/signup",
    github: "https://github.com/suveshpandey/notes-app",
  },
];

export const CONTACT = {
  phoneNo: "7224899871",
  email: "jpsuvesh29@gmail.com",
  location: "Madhya Pradesh, India",
  linkedin: "https://linkedin.com/in/suvesh-pandey",
  github: "https://github.com/suveshpandey",
  twitter: "https://twitter.com/suvesh_298"
};