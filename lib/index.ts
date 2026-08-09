/** A bullet on a project card. `label` is the bolded lead-in before the em dash. */
export type ProjectHighlight = { label?: string; text: string };

export const PROJECTS = [
  {
    title: "InferLoop.AI – Test-Driven AI Companion for Competitive Programming",
    image: "/images/projectsImg/inferloop-ai-img.png",
    description:
      "An AI companion for DSA and competitive programming that proves its own suggestions. Every rewrite of your Python or C++ solution is executed against generated test cases inside a real sandbox, so the version you get back is the one with the highest measured pass-rate — not the one the model liked best.",
    highlights: [
      {
        label: "Five-agent loop",
        text: "A Test Generator drafts ~6 cases up front (samples, edges, overflow), then every iteration runs Analyzer → Critic → Improver to produce a rewritten version.",
      },
      {
        label: "Measured, not guessed",
        text: "Each rewrite executes against those cases inside a Vercel Sandbox, and failing cases feed forward as concrete fix signals for the next pass. The loop ends on a 100% pass-rate, a stall, or the iteration cap, and a final Evaluator scores the winning version and writes the verdict.",
      },
      {
        label: "Watch it think",
        text: "The whole pipeline streams over Server-Sent Events, so every agent and every test result appears live instead of after a long silence.",
      },
      {
        label: "Isolated execution",
        text: "Vercel Sandbox (Firecracker microVMs) runs untrusted code with a clean per-request VM, using a prebuilt g++ snapshot to keep C++ cold starts fast.",
      },
      {
        label: "Model layer",
        text: "Euri AI Gateway fronts many models behind a single key, with Gemini wired in as a direct provider and Ollama running locally for development.",
      },
      {
        label: "Production hardening",
        text: "Argon2 password hashes, JOSE-signed JWTs and DB-backed refresh tokens; rate limits on LLM endpoints to cap credit burn; and transient-vs-persistent error classification that turns a cold start into a “waking up — retry” panel rather than a generic failure, backed by a SELECT 1 warmup on Neon at boot.",
      },
    ] as ProjectHighlight[],
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
      "A learning environment where beginners write code and get unstuck in the same place. CodePilot pairs a six-language editor with an AI layer that explains errors, offers hints and fixes code in one click, wrapped in notes, blogs, quizzes and curated video so a stuck learner never has to leave the tab.",
    highlights: [
      {
        label: "AI pair-programmer",
        text: "A chatbot for debugging, explanations and guidance sits beside the editor, alongside intelligent hints and one-click AI code fixes.",
      },
      {
        label: "Six-language editor",
        text: "C, C++, Java, JavaScript, TypeScript and Python, in resizable panels that adapt to how you want to work.",
      },
      {
        label: "Generated practice",
        text: "AI-built quizzes targeted at a chosen topic and difficulty level.",
      },
      {
        label: "Learning library",
        text: "Blogs and personal notes with full CRUD, plus YouTube integration with infinite scrolling and caching to keep loads fast.",
      },
      {
        label: "Authentication",
        text: "NextAuth with email OTP and Google OAuth.",
      },
    ] as ProjectHighlight[],
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
      "A real-time collaborative canvas in the spirit of Excalidraw: share a room URL and everyone draws on the same board at once, with every stroke persisted so the work is still there when you come back.",
    highlights: [
      {
        label: "Full drawing toolkit",
        text: "Pencil, rectangle, rhombus, circle, line, arrow and text, with undo and clear-canvas.",
      },
      {
        label: "Live collaboration",
        text: "URL-based room sharing over WebSockets — authenticated users draw simultaneously and see each other's updates as they happen, across multiple rooms.",
      },
      {
        label: "Persistent boards",
        text: "Google Sign-In and a connected database keep user sessions and canvas state intact between visits, with a dashboard of your live rooms.",
      },
      {
        label: "Architecture",
        text: "A monorepo splitting the Next.js client, Express API and WebSocket server, with a responsive Tailwind CSS UI.",
      },
    ] as ProjectHighlight[],
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
      { text: "Real-time text and image messaging via Socket.io." },
      { text: "Profile customization and a dark/light theme toggle." },
      { text: "Secure authentication to protect user data." },
      { text: "Fully responsive UI built with the MERN stack and TypeScript." },
    ] as ProjectHighlight[],
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
      { text: "Instant AI responses with cleanly styled output." },
      { text: "Dark/light mode for comfortable usage." },
      { text: "Secure authentication and recent chat history storage." },
      { text: "Seamless database integration built on the MERN stack." },
    ] as ProjectHighlight[],
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
      { text: "Secure email verification and authentication." },
      { text: "Create, tag, and attach file uploads to notes." },
      { text: "Track saved dates and manage user profiles." },
      { text: "Responsive UI for seamless cross-device access." },
    ] as ProjectHighlight[],
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
  twitter: "https://twitter.com/suvesh_298",
  resume:
    "https://drive.google.com/file/d/1pEFJDx1ZaM6UeOMJRgsIoL74ZtGhAlFl/view"
};