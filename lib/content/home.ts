export const home = {
  hero: {
    eyebrow: "Ahmedabad, Gujarat",
    title: "We build\nwhat works.",
    body: "Websites, software and AI — built for real problems, not portfolios.",
    primary: { href: "/contact", label: "Start a project" },
    secondary: { href: "/projects", label: "See our work" },
  },
  projects: {
    label: "Projects",
    title: "Websites and software, built to be used.",
    muted: "Digital products that solve real business problems.",
    // Mock entries adapted from the brand guidelines' examples. Replace with real case studies.
    items: [
      { name: "Client portal", type: "Web application", summary: "A customer portal for a manufacturing team." },
      { name: "Support assistant", type: "AI solution", summary: "Search across your documents and answer common questions." },
      { name: "Invoice routing", type: "Automation", summary: "Automation that removes repeat work from accounts." },
      { name: "Lead intake", type: "Website", summary: "One form that sends every enquiry to the right person." },
      { name: "Weekly report", type: "Custom software", summary: "A report that builds itself before Monday starts." },
      { name: "Ops automation", type: "Automation", summary: "From six steps to one, with a clear system behind it." },
    ],
  },
  services: [
    {
      id: "web",
      title: "Web\nDesign",
      tags: ["Next.js", "React", "TypeScript", "CMS", "Performance"],
      body: "We build fast, conversion-focused websites rooted in your brand — no templates, no shortcuts.",
    },
    {
      id: "software",
      title: "Custom\nSoftware",
      tags: ["Backend", "Frontend", "API Design", "Databases", "DevOps"],
      body: "Full-stack products built with the discipline of engineers and the judgement of designers.",
    },
    {
      id: "ai",
      title: "AI &\nAutomation",
      tags: ["LLMs", "RAG", "Agents", "Workflows", "Integration"],
      body: "Intelligent systems that save real time — only where automation genuinely outperforms people.",
    },
    {
      id: "growth",
      title: "Strategy\n& Growth",
      tags: ["SEO", "Analytics", "CRO", "Content", "Positioning"],
      body: "Business thinking embedded at every layer — so your digital presence drives measurable growth.",
    },
  ],
};
