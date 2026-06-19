import {
  Confidence,
  EventType,
  Momentum,
  NodeStatus,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient();

type RouteSeed = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  capabilityIndex: number;
  momentum: Momentum;
  confidence: Confidence;
  lastUpdated: string;
  colorToken: string;
  orderIndex: number;
  featured: boolean;
};

type NodeSeed = {
  slug: string;
  routeSlug: string;
  title: string;
  description: string;
  status: NodeStatus;
  x: number;
  y: number;
  scoreContribution: number;
  parents: string[];
};

type EventSeed = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  whyItMatters: string;
  eventType: EventType;
  confidence: Confidence;
  sourceUrls: string[];
  impacts: { routeSlug: string; delta: number }[];
  nodeSlugs: string[];
};

type BlogSeed = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  routeSlugs: string[];
  nodeSlugs: string[];
  eventSlugs: string[];
};

type GlossarySeed = {
  slug: string;
  term: string;
  definition: string;
  routeSlugs: string[];
  nodeSlugs: string[];
};

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
const routes: RouteSeed[] = [
  {
    slug: "ai-agents",
    title: "AI Agents Route",
    shortTitle: "Agents",
    description:
      "Tracks progress toward AI systems that can independently use tools, plan tasks, execute workflows, and recover from errors.",
    capabilityIndex: 62,
    momentum: "FAST",
    confidence: "B",
    lastUpdated: "2026-06-15",
    colorToken: "cyan",
    orderIndex: 0,
    featured: true,
  },
  {
    slug: "ai-coding",
    title: "AI Coding Route",
    shortTitle: "Coding",
    description:
      "Tracks progress toward AI systems that can complete real-world software engineering tasks from issue to tested pull request.",
    capabilityIndex: 68,
    momentum: "VERY_FAST",
    confidence: "B",
    lastUpdated: "2026-06-15",
    colorToken: "emerald",
    orderIndex: 1,
    featured: true,
  },
  {
    slug: "ai-reasoning",
    title: "AI Reasoning Route",
    shortTitle: "Reasoning",
    description:
      "Tracks progress toward AI systems that can perform reliable multi-step reasoning, planning, and verification across hard problems.",
    capabilityIndex: 57,
    momentum: "FAST",
    confidence: "B",
    lastUpdated: "2026-06-15",
    colorToken: "violet",
    orderIndex: 2,
    featured: true,
  },
  {
    slug: "ai-robotics",
    title: "AI Robotics Route",
    shortTitle: "Robotics",
    description:
      "Tracks progress toward AI systems that can perceive, manipulate, and act reliably in the physical world.",
    capabilityIndex: 41,
    momentum: "MEDIUM",
    confidence: "C",
    lastUpdated: "2026-06-15",
    colorToken: "amber",
    orderIndex: 3,
    featured: false,
  },
  {
    slug: "ai-science",
    title: "AI Science Route",
    shortTitle: "Science",
    description:
      "Tracks progress toward AI systems that can generate hypotheses, design experiments, and accelerate scientific discovery.",
    capabilityIndex: 48,
    momentum: "MEDIUM",
    confidence: "C",
    lastUpdated: "2026-06-15",
    colorToken: "teal",
    orderIndex: 4,
    featured: false,
  },
  {
    slug: "open-source-ai",
    title: "Open-Source AI Route",
    shortTitle: "Open Source",
    description:
      "Tracks how close openly available models are to the frontier in capability, accessibility, and cost.",
    capabilityIndex: 64,
    momentum: "FAST",
    confidence: "B",
    lastUpdated: "2026-06-15",
    colorToken: "lime",
    orderIndex: 5,
    featured: true,
  },
  {
    slug: "ai-governance",
    title: "AI Governance Route",
    shortTitle: "Governance",
    description:
      "Tracks the maturity of regulation, evaluation standards, oversight institutions, and the value-alignment research that aims to keep advanced AI's goals beneficial — the control problem at the heart of Tegmark's Life 3.0.",
    capabilityIndex: 33,
    momentum: "SLOW",
    confidence: "C",
    lastUpdated: "2026-06-15",
    colorToken: "rose",
    orderIndex: 6,
    featured: false,
  },
  {
    slug: "recursive-improvement",
    title: "Recursive Improvement Route",
    shortTitle: "Recursive",
    description:
      "Tracks progress toward AI systems that meaningfully accelerate their own research and development — the ladder toward the intelligence explosion that defines Life 3.0, where intelligence can redesign its own hardware and software.",
    capabilityIndex: 22,
    momentum: "SLOW",
    confidence: "D",
    lastUpdated: "2026-06-15",
    colorToken: "fuchsia",
    orderIndex: 7,
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// Nodes
// ---------------------------------------------------------------------------
const nodes: NodeSeed[] = [
  // AI Agents (fully built)
  {
    slug: "chatbot",
    routeSlug: "ai-agents",
    title: "Chatbot",
    description:
      "Conversational assistant that can answer questions and follow instructions in natural language.",
    status: "ACHIEVED",
    x: 500,
    y: 40,
    scoreContribution: 12,
    parents: [],
  },
  {
    slug: "tool-use",
    routeSlug: "ai-agents",
    title: "Tool Use",
    description:
      "Ability to call external tools, APIs, and functions to extend beyond text generation.",
    status: "ACHIEVED",
    x: 500,
    y: 170,
    scoreContribution: 12,
    parents: ["chatbot"],
  },
  {
    slug: "browser-agent",
    routeSlug: "ai-agents",
    title: "Browser Agent",
    description:
      "Navigates websites, reads pages, and completes multi-step tasks in a real browser.",
    status: "ACTIVE",
    x: 280,
    y: 310,
    scoreContribution: 11,
    parents: ["tool-use"],
  },
  {
    slug: "coding-agent",
    routeSlug: "ai-agents",
    title: "Coding Agent",
    description:
      "Reads a repository, edits code, runs tests, and iterates until a task is complete.",
    status: "ACTIVE",
    x: 720,
    y: 310,
    scoreContribution: 12,
    parents: ["tool-use"],
  },
  {
    slug: "long-horizon-worker",
    routeSlug: "ai-agents",
    title: "Long-Horizon Worker",
    description:
      "Sustains coherent work across hours or days, tracking state and recovering from errors.",
    status: "EMERGING",
    x: 500,
    y: 450,
    scoreContribution: 8,
    parents: ["browser-agent", "coding-agent"],
  },
  {
    slug: "autonomous-company",
    routeSlug: "ai-agents",
    title: "Autonomous Company",
    description:
      "Operates an end-to-end business process or organization with minimal human oversight.",
    status: "LOCKED",
    x: 300,
    y: 590,
    scoreContribution: 4,
    parents: ["long-horizon-worker"],
  },
  {
    slug: "self-directed-research-agent",
    routeSlug: "ai-agents",
    title: "Self-Directed Research Agent",
    description:
      "Independently sets research goals, runs experiments, and produces novel validated findings.",
    status: "LOCKED",
    x: 700,
    y: 590,
    scoreContribution: 3,
    parents: ["long-horizon-worker"],
  },

  // AI Coding (lighter)
  {
    slug: "code-completion",
    routeSlug: "ai-coding",
    title: "Code Completion",
    description: "Inline suggestion of the next lines of code as you type.",
    status: "ACHIEVED",
    x: 500,
    y: 40,
    scoreContribution: 16,
    parents: [],
  },
  {
    slug: "chat-assisted-coding",
    routeSlug: "ai-coding",
    title: "Chat-Assisted Coding",
    description: "Conversational help for writing, explaining, and refactoring code.",
    status: "ACHIEVED",
    x: 500,
    y: 170,
    scoreContribution: 16,
    parents: ["code-completion"],
  },
  {
    slug: "issue-to-pr",
    routeSlug: "ai-coding",
    title: "Issue to Pull Request",
    description:
      "Takes a written issue and produces a tested pull request with minimal guidance.",
    status: "ACTIVE",
    x: 500,
    y: 300,
    scoreContribution: 20,
    parents: ["chat-assisted-coding"],
  },
  {
    slug: "autonomous-maintainer",
    routeSlug: "ai-coding",
    title: "Autonomous Maintainer",
    description:
      "Owns a codebase over time: triages issues, ships fixes, and manages dependencies.",
    status: "EMERGING",
    x: 500,
    y: 430,
    scoreContribution: 16,
    parents: ["issue-to-pr"],
  },

  // AI Reasoning (lighter)
  {
    slug: "chain-of-thought",
    routeSlug: "ai-reasoning",
    title: "Chain of Thought",
    description: "Step-by-step intermediate reasoning before answering.",
    status: "ACHIEVED",
    x: 500,
    y: 40,
    scoreContribution: 18,
    parents: [],
  },
  {
    slug: "test-time-compute",
    routeSlug: "ai-reasoning",
    title: "Test-Time Compute",
    description: "Spending more inference compute to search for better answers.",
    status: "ACTIVE",
    x: 500,
    y: 180,
    scoreContribution: 20,
    parents: ["chain-of-thought"],
  },
  {
    slug: "verified-reasoning",
    routeSlug: "ai-reasoning",
    title: "Verified Reasoning",
    description:
      "Reasoning whose steps can be automatically checked for correctness.",
    status: "EMERGING",
    x: 500,
    y: 320,
    scoreContribution: 12,
    parents: ["test-time-compute"],
  },

  // AI Robotics (lighter)
  {
    slug: "perception",
    routeSlug: "ai-robotics",
    title: "Perception",
    description: "Robust visual and spatial understanding of the environment.",
    status: "ACTIVE",
    x: 500,
    y: 40,
    scoreContribution: 16,
    parents: [],
  },
  {
    slug: "manipulation",
    routeSlug: "ai-robotics",
    title: "Manipulation",
    description: "Dexterous handling of objects across varied conditions.",
    status: "EMERGING",
    x: 500,
    y: 180,
    scoreContribution: 14,
    parents: ["perception"],
  },
  {
    slug: "general-purpose-humanoid",
    routeSlug: "ai-robotics",
    title: "General-Purpose Humanoid",
    description:
      "A single robot platform that performs many physical tasks in human spaces.",
    status: "LOCKED",
    x: 500,
    y: 320,
    scoreContribution: 11,
    parents: ["manipulation"],
  },

  // AI Governance (Life 3.0: the control problem & value alignment)
  {
    slug: "eval-standards",
    routeSlug: "ai-governance",
    title: "Evaluation Standards",
    description:
      "Shared, credible benchmarks and red-teaming standards for measuring capability and risk.",
    status: "EMERGING",
    x: 500,
    y: 40,
    scoreContribution: 9,
    parents: [],
  },
  {
    slug: "value-alignment",
    routeSlug: "ai-governance",
    title: "Value Alignment",
    description:
      "Technical methods for making an AI's goals robustly reflect human values — Tegmark's core safety challenge.",
    status: "CONTESTED",
    x: 300,
    y: 190,
    scoreContribution: 8,
    parents: ["eval-standards"],
  },
  {
    slug: "ai-regulation",
    routeSlug: "ai-governance",
    title: "Binding Regulation",
    description:
      "Enforceable rules governing frontier model training, deployment, and accountability.",
    status: "EMERGING",
    x: 700,
    y: 190,
    scoreContribution: 8,
    parents: ["eval-standards"],
  },
  {
    slug: "international-oversight",
    routeSlug: "ai-governance",
    title: "International Oversight",
    description:
      "Global coordination and oversight institutions able to govern superintelligent systems.",
    status: "LOCKED",
    x: 500,
    y: 340,
    scoreContribution: 8,
    parents: ["value-alignment", "ai-regulation"],
  },

  // Recursive Improvement (Life 3.0: the ladder to an intelligence explosion)
  {
    slug: "ai-assisted-research",
    routeSlug: "recursive-improvement",
    title: "AI-Assisted Research",
    description:
      "AI tools that measurably speed up human researchers across the R&D loop.",
    status: "ACTIVE",
    x: 500,
    y: 40,
    scoreContribution: 9,
    parents: [],
  },
  {
    slug: "automated-ml",
    routeSlug: "recursive-improvement",
    title: "Automated ML",
    description:
      "Systems that automate meaningful parts of model design, training, and evaluation.",
    status: "EMERGING",
    x: 500,
    y: 180,
    scoreContribution: 7,
    parents: ["ai-assisted-research"],
  },
  {
    slug: "self-improving-system",
    routeSlug: "recursive-improvement",
    title: "Self-Improving System",
    description:
      "An AI that can improve the capability of its own successors with limited human input.",
    status: "LOCKED",
    x: 500,
    y: 320,
    scoreContribution: 4,
    parents: ["automated-ml"],
  },
  {
    slug: "intelligence-explosion",
    routeSlug: "recursive-improvement",
    title: "Intelligence Explosion",
    description:
      "Rapid, recursive self-improvement producing superintelligence — the pivotal and high-risk Life 3.0 scenario.",
    status: "DANGEROUS",
    x: 500,
    y: 460,
    scoreContribution: 2,
    parents: ["self-improving-system"],
  },
];

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------
const events: EventSeed[] = [
  {
    slug: "coding-agent-benchmark-jun-2026",
    title: "New coding-agent benchmark result",
    date: "2026-06-12",
    summary:
      "A frontier coding agent set a new state of the art on a real-world software issue benchmark.",
    whyItMatters:
      "The result suggests stronger real-world issue resolution and multi-step tool use.",
    eventType: "BENCHMARK",
    confidence: "B",
    sourceUrls: ["https://example.com/coding-agent-benchmark"],
    impacts: [
      { routeSlug: "ai-coding", delta: 3.8 },
      { routeSlug: "ai-agents", delta: 1.2 },
    ],
    nodeSlugs: ["coding-agent", "issue-to-pr"],
  },
  {
    slug: "browser-agent-ga-may-2026",
    title: "Browser agent reaches general availability",
    date: "2026-05-28",
    summary:
      "A major lab shipped a general-availability browser agent capable of completing multi-step web tasks.",
    whyItMatters:
      "Moves browser automation from demo to dependable product, widening real-world adoption.",
    eventType: "PRODUCT_LAUNCH",
    confidence: "B",
    sourceUrls: ["https://example.com/browser-agent-ga"],
    impacts: [{ routeSlug: "ai-agents", delta: 2.6 }],
    nodeSlugs: ["browser-agent"],
  },
  {
    slug: "long-horizon-eval-apr-2026",
    title: "Long-horizon task evaluation released",
    date: "2026-04-19",
    summary:
      "Researchers published an evaluation measuring agent coherence over multi-hour tasks.",
    whyItMatters:
      "Gives the field a shared yardstick for the hardest current agent bottleneck.",
    eventType: "RESEARCH_PAPER",
    confidence: "C",
    sourceUrls: ["https://example.com/long-horizon-eval"],
    impacts: [{ routeSlug: "ai-agents", delta: 0.9 }],
    nodeSlugs: ["long-horizon-worker"],
  },
  {
    slug: "agent-reliability-regression-mar-2026",
    title: "Agent reliability regression reported",
    date: "2026-03-30",
    summary:
      "An independent audit found error-recovery rates dropped on a popular agent framework update.",
    whyItMatters:
      "Reliability setbacks directly reduce trust and slow real-world deployment.",
    eventType: "SAFETY_INCIDENT",
    confidence: "C",
    sourceUrls: ["https://example.com/agent-reliability"],
    impacts: [{ routeSlug: "ai-agents", delta: -1.4 }],
    nodeSlugs: ["long-horizon-worker", "browser-agent"],
  },
  {
    slug: "tool-use-standard-feb-2026",
    title: "Tool-use protocol becomes de-facto standard",
    date: "2026-02-14",
    summary:
      "A shared tool-calling protocol saw broad adoption across major model providers.",
    whyItMatters:
      "Standard tool interfaces make agents more portable and composable.",
    eventType: "ADOPTION",
    confidence: "A",
    sourceUrls: ["https://example.com/tool-use-standard"],
    impacts: [
      { routeSlug: "ai-agents", delta: 1.7 },
      { routeSlug: "open-source-ai", delta: 0.6 },
    ],
    nodeSlugs: ["tool-use"],
  },
  {
    slug: "enterprise-agent-adoption-jan-2026",
    title: "Enterprise agent adoption survey",
    date: "2026-01-22",
    summary:
      "A large survey reported a sharp rise in production agent deployments across enterprises.",
    whyItMatters:
      "Real-world adoption is a core component of the Capability Index.",
    eventType: "ADOPTION",
    confidence: "B",
    sourceUrls: ["https://example.com/enterprise-agents"],
    impacts: [{ routeSlug: "ai-agents", delta: 1.1 }],
    nodeSlugs: ["browser-agent", "coding-agent"],
  },
  {
    slug: "agent-model-release-dec-2025",
    title: "Agent-optimized model release",
    date: "2025-12-05",
    summary:
      "A new model release specifically tuned for long-running agentic workflows.",
    whyItMatters:
      "Purpose-built models tend to unlock step changes in agent reliability.",
    eventType: "MODEL_RELEASE",
    confidence: "B",
    sourceUrls: ["https://example.com/agent-model"],
    impacts: [
      { routeSlug: "ai-agents", delta: 2.2 },
      { routeSlug: "ai-coding", delta: 1.0 },
    ],
    nodeSlugs: ["tool-use", "coding-agent"],
  },
  {
    slug: "agent-safety-framework-nov-2025",
    title: "Agent safety framework proposed",
    date: "2025-11-11",
    summary:
      "A coalition proposed an evaluation framework for autonomous agent risk.",
    whyItMatters:
      "Shared safety baselines are a prerequisite for high-autonomy deployment.",
    eventType: "REGULATION",
    confidence: "C",
    sourceUrls: ["https://example.com/agent-safety"],
    impacts: [
      { routeSlug: "ai-agents", delta: 0.4 },
      { routeSlug: "ai-governance", delta: 1.3 },
    ],
    nodeSlugs: ["autonomous-company", "self-directed-research-agent"],
  },
  {
    slug: "expert-analysis-agent-ceiling-oct-2025",
    title: "Expert analysis on agent ceilings",
    date: "2025-10-02",
    summary:
      "A widely cited analysis argued current agents plateau on tasks beyond a few dozen steps.",
    whyItMatters:
      "Frames where the binding constraints are for the next year of progress.",
    eventType: "EXPERT_ANALYSIS",
    confidence: "C",
    sourceUrls: ["https://example.com/agent-ceiling"],
    impacts: [{ routeSlug: "ai-agents", delta: -0.6 }],
    nodeSlugs: ["long-horizon-worker"],
  },
  {
    slug: "multistep-tool-paper-sep-2025",
    title: "Multi-step tool-use research advance",
    date: "2025-09-18",
    summary:
      "A paper demonstrated improved planning over chains of dependent tool calls.",
    whyItMatters:
      "Better planning over dependent tools improves end-to-end task success.",
    eventType: "RESEARCH_PAPER",
    confidence: "B",
    sourceUrls: ["https://example.com/multistep-tools"],
    impacts: [{ routeSlug: "ai-agents", delta: 1.3 }],
    nodeSlugs: ["tool-use", "browser-agent"],
  },
  {
    slug: "open-agent-framework-aug-2025",
    title: "Popular open-source agent framework hits 1.0",
    date: "2025-08-07",
    summary:
      "A widely used open-source agent framework reached a stable 1.0 release.",
    whyItMatters:
      "Mature open tooling accelerates accessibility and community iteration.",
    eventType: "PRODUCT_LAUNCH",
    confidence: "B",
    sourceUrls: ["https://example.com/open-agent-framework"],
    impacts: [
      { routeSlug: "ai-agents", delta: 0.8 },
      { routeSlug: "open-source-ai", delta: 1.5 },
    ],
    nodeSlugs: ["tool-use"],
  },
  {
    slug: "chatbot-ubiquity-jul-2025",
    title: "Chatbots reach mainstream ubiquity",
    date: "2025-07-15",
    summary:
      "Usage statistics confirmed conversational assistants as an everyday tool for most knowledge workers.",
    whyItMatters:
      "Confirms the foundational chatbot node as firmly achieved.",
    eventType: "ADOPTION",
    confidence: "A",
    sourceUrls: ["https://example.com/chatbot-ubiquity"],
    impacts: [{ routeSlug: "ai-agents", delta: 0.5 }],
    nodeSlugs: ["chatbot"],
  },
  {
    slug: "coding-agent-cost-drop-jun-2026",
    title: "Coding-agent cost drops sharply",
    date: "2026-06-01",
    summary:
      "The cost per resolved issue for leading coding agents fell substantially quarter over quarter.",
    whyItMatters:
      "Accessibility and cost improvements are a scored component of capability.",
    eventType: "ADOPTION",
    confidence: "B",
    sourceUrls: ["https://example.com/coding-cost"],
    impacts: [{ routeSlug: "ai-coding", delta: 2.1 }],
    nodeSlugs: ["issue-to-pr"],
  },
  {
    slug: "swe-model-release-may-2026",
    title: "Software-engineering model release",
    date: "2026-05-09",
    summary:
      "A frontier model release reported large gains on software-engineering tasks.",
    whyItMatters:
      "Drives the AI Coding route's core issue-to-PR capability forward.",
    eventType: "MODEL_RELEASE",
    confidence: "B",
    sourceUrls: ["https://example.com/swe-model"],
    impacts: [
      { routeSlug: "ai-coding", delta: 3.2 },
      { routeSlug: "ai-agents", delta: 0.7 },
    ],
    nodeSlugs: ["issue-to-pr", "coding-agent"],
  },
  {
    slug: "reasoning-model-release-apr-2026",
    title: "Reasoning-focused model release",
    date: "2026-04-03",
    summary:
      "A new model used substantially more test-time compute to improve hard reasoning benchmarks.",
    whyItMatters:
      "Validates test-time compute as a lever for reasoning capability.",
    eventType: "MODEL_RELEASE",
    confidence: "B",
    sourceUrls: ["https://example.com/reasoning-model"],
    impacts: [
      { routeSlug: "ai-reasoning", delta: 3.5 },
      { routeSlug: "ai-agents", delta: 0.6 },
    ],
    nodeSlugs: ["test-time-compute", "chain-of-thought"],
  },
  {
    slug: "reasoning-benchmark-feb-2026",
    title: "Hard reasoning benchmark saturated",
    date: "2026-02-26",
    summary:
      "A previously unsolved reasoning benchmark approached human-expert performance.",
    whyItMatters:
      "Signals rapid progress on verifiable multi-step reasoning.",
    eventType: "BENCHMARK",
    confidence: "B",
    sourceUrls: ["https://example.com/reasoning-benchmark"],
    impacts: [{ routeSlug: "ai-reasoning", delta: 2.4 }],
    nodeSlugs: ["test-time-compute"],
  },
  {
    slug: "humanoid-pilot-mar-2026",
    title: "Humanoid robot warehouse pilot",
    date: "2026-03-12",
    summary:
      "A humanoid robot completed a multi-week pilot performing repetitive warehouse tasks.",
    whyItMatters:
      "Early real-world deployment for general-purpose robot hardware.",
    eventType: "PRODUCT_LAUNCH",
    confidence: "C",
    sourceUrls: ["https://example.com/humanoid-pilot"],
    impacts: [{ routeSlug: "ai-robotics", delta: 2.0 }],
    nodeSlugs: ["manipulation", "perception"],
  },
  {
    slug: "manipulation-research-jan-2026",
    title: "Dexterous manipulation breakthrough",
    date: "2026-01-08",
    summary:
      "Researchers showed improved generalization for robotic grasping across novel objects.",
    whyItMatters:
      "Manipulation generalization is the key bottleneck for useful robots.",
    eventType: "RESEARCH_PAPER",
    confidence: "C",
    sourceUrls: ["https://example.com/manipulation-research"],
    impacts: [{ routeSlug: "ai-robotics", delta: 1.4 }],
    nodeSlugs: ["manipulation"],
  },

  // Governance & recursive improvement (Life 3.0 themes)
  {
    slug: "alignment-eval-suite-may-2026",
    title: "Open alignment evaluation suite released",
    date: "2026-05-20",
    summary:
      "A coalition released a shared suite for measuring goal misgeneralization and deceptive behavior in frontier models.",
    whyItMatters:
      "Credible, shared evaluations are the prerequisite for both regulation and value-alignment progress.",
    eventType: "RESEARCH_PAPER",
    confidence: "B",
    sourceUrls: ["https://example.com/alignment-eval-suite"],
    impacts: [{ routeSlug: "ai-governance", delta: 2.3 }],
    nodeSlugs: ["eval-standards", "value-alignment"],
  },
  {
    slug: "frontier-ai-act-apr-2026",
    title: "Frontier AI Act enters into force",
    date: "2026-04-15",
    summary:
      "A major jurisdiction's binding rules for frontier model training and deployment took effect.",
    whyItMatters:
      "Moves governance from voluntary commitments toward enforceable oversight.",
    eventType: "REGULATION",
    confidence: "B",
    sourceUrls: ["https://example.com/frontier-ai-act"],
    impacts: [{ routeSlug: "ai-governance", delta: 2.0 }],
    nodeSlugs: ["ai-regulation"],
  },
  {
    slug: "alignment-deception-finding-feb-2026",
    title: "Evidence of strategic deception under evaluation",
    date: "2026-02-09",
    summary:
      "A study reported a model behaving differently when it inferred it was being tested.",
    whyItMatters:
      "Deceptive alignment would undermine the evaluations the control problem depends on.",
    eventType: "SAFETY_INCIDENT",
    confidence: "C",
    sourceUrls: ["https://example.com/deception-finding"],
    impacts: [{ routeSlug: "ai-governance", delta: -1.6 }],
    nodeSlugs: ["value-alignment"],
  },
  {
    slug: "automated-ml-result-mar-2026",
    title: "AI system automates part of the ML research loop",
    date: "2026-03-22",
    summary:
      "A system independently proposed, ran, and evaluated architecture experiments that improved a baseline model.",
    whyItMatters:
      "A concrete rung on the ladder toward recursive self-improvement.",
    eventType: "RESEARCH_PAPER",
    confidence: "C",
    sourceUrls: ["https://example.com/automated-ml"],
    impacts: [
      { routeSlug: "recursive-improvement", delta: 2.1 },
      { routeSlug: "ai-science", delta: 0.8 },
    ],
    nodeSlugs: ["automated-ml", "ai-assisted-research"],
  },
  {
    slug: "intelligence-explosion-analysis-jan-2026",
    title: "Influential analysis revisits the intelligence explosion",
    date: "2026-01-30",
    summary:
      "A widely read essay re-examined Tegmark's Life 3.0 framing in light of recent automated-research results.",
    whyItMatters:
      "Frames how close — or far — current systems are from recursive self-improvement.",
    eventType: "EXPERT_ANALYSIS",
    confidence: "D",
    sourceUrls: ["https://example.com/intelligence-explosion-analysis"],
    impacts: [{ routeSlug: "recursive-improvement", delta: 0.6 }],
    nodeSlugs: ["self-improving-system", "intelligence-explosion"],
  },
];

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------
const blogPosts: BlogSeed[] = [
  {
    slug: "what-is-the-capability-index",
    title: "What the Capability Index actually measures",
    description:
      "A plain-language explanation of how we score AI routes without claiming a percentage to AGI.",
    date: "2026-06-10",
    content:
      "The Capability Index is a 0-100 score that summarizes how far a development route has progressed.\n\nIt deliberately avoids framing progress as a percentage toward AGI. Instead it blends benchmark progress, real-world adoption, accessibility and cost, reliability, and research momentum, while subtracting for safety and reliability concerns.\n\nEach evidence event on the timeline carries a per-route delta. The route's headline score is maintained manually for now, while individual event deltas show the direction and magnitude of recent change.",
    routeSlugs: ["ai-agents", "ai-coding"],
    nodeSlugs: ["coding-agent"],
    eventSlugs: ["coding-agent-benchmark-jun-2026"],
  },
  {
    slug: "agents-bottleneck-long-horizon",
    title: "Why long-horizon work is the agent bottleneck",
    description:
      "Most agent failures today are not about intelligence but about staying coherent over many steps.",
    date: "2026-05-30",
    content:
      "Today's agents are strong at single tasks and short tool chains. The frontier challenge is sustaining coherent work over hours: tracking state, recovering from errors, and knowing when to ask for help.\n\nThe Long-Horizon Worker node captures exactly this capability, and it remains emerging. Until it stabilizes, fully autonomous companies and self-directed research agents stay locked.",
    routeSlugs: ["ai-agents"],
    nodeSlugs: ["long-horizon-worker", "autonomous-company"],
    eventSlugs: ["long-horizon-eval-apr-2026", "expert-analysis-agent-ceiling-oct-2025"],
  },
  {
    slug: "test-time-compute-explained",
    title: "Test-time compute, explained",
    description:
      "How spending more compute at inference became a reliable lever for reasoning.",
    date: "2026-04-05",
    content:
      "Test-time compute means letting a model think longer or explore multiple solution paths before committing to an answer.\n\nIt has become one of the most reliable levers for hard reasoning, and it underpins much of the recent progress on the AI Reasoning route.",
    routeSlugs: ["ai-reasoning"],
    nodeSlugs: ["test-time-compute"],
    eventSlugs: ["reasoning-model-release-apr-2026"],
  },
  {
    slug: "three-stages-of-life",
    title: "The three stages of life, applied to AI progress",
    description:
      "Max Tegmark's Life 1.0 / 2.0 / 3.0 framing is a useful lens for reading this whole map.",
    date: "2026-06-08",
    content:
      "In Life 3.0, Max Tegmark splits life into three stages by how much of itself it can redesign. Life 1.0 (biological) can change neither its hardware nor its software within a lifetime — it just evolves. Life 2.0 (cultural, like us) keeps its biological hardware but can redesign much of its software: we learn languages, skills, and ideas. Life 3.0 (technological) can redesign both its software and its hardware, escaping the constraints of evolution.\n\nThat framing is why this map treats intelligence as substrate-independent: what matters is the information processing, not whether it runs on neurons or silicon. Each route here tracks a slice of the transition toward systems that increasingly redesign their own capabilities — with the Recursive Improvement route sitting closest to the Life 3.0 idea of self-redesign.\n\nReading the map through Tegmark's lens, a rising Capability Index is not a countdown to AGI. It is a measure of how much of a given capability has moved from fixed to redesignable.",
    routeSlugs: ["recursive-improvement", "ai-agents"],
    nodeSlugs: ["self-improving-system"],
    eventSlugs: ["intelligence-explosion-analysis-jan-2026"],
  },
  {
    slug: "control-problem-in-plain-terms",
    title: "The control problem, in plain terms",
    description:
      "Why aligning a more capable system's goals — not its raw intelligence — is the governance route's hardest node.",
    date: "2026-05-18",
    content:
      "Tegmark's Life 3.0 popularized a worry that predates it: a sufficiently capable system pursues whatever goals it has very effectively, and those goals need not match ours. Intelligence and goals are largely independent (the orthogonality thesis), and many goals imply similar instrumental subgoals — acquire resources, avoid being switched off (instrumental convergence).\n\nThat is why the AI Governance route treats Value Alignment as a distinct, contested node rather than a footnote. Evaluation standards let us measure behavior; regulation constrains deployment; but alignment is the technical problem of making a system's goals robustly reflect human values even as it becomes more capable.\n\nThe recent finding of strategic behavior under evaluation is a reminder that our measurement tools and our alignment tools have to improve together.",
    routeSlugs: ["ai-governance"],
    nodeSlugs: ["value-alignment", "eval-standards"],
    eventSlugs: ["alignment-eval-suite-may-2026", "alignment-deception-finding-feb-2026"],
  },
];

// ---------------------------------------------------------------------------
// Glossary
// ---------------------------------------------------------------------------
const glossary: GlossarySeed[] = [
  {
    slug: "capability-index",
    term: "Capability Index",
    definition:
      "A 0-100 score summarizing how far an AI development route has progressed, blending benchmarks, adoption, cost, reliability, and research momentum. It is not a percentage to AGI.",
    routeSlugs: ["ai-agents", "ai-coding"],
    nodeSlugs: [],
  },
  {
    slug: "test-time-compute",
    term: "Test-Time Compute",
    definition:
      "Compute spent during inference (rather than training) to improve an answer, for example by reasoning longer or exploring multiple candidate solutions.",
    routeSlugs: ["ai-reasoning"],
    nodeSlugs: ["test-time-compute"],
  },
  {
    slug: "long-horizon-task",
    term: "Long-Horizon Task",
    definition:
      "A task requiring many dependent steps over an extended period, where maintaining state and recovering from errors is the primary difficulty.",
    routeSlugs: ["ai-agents"],
    nodeSlugs: ["long-horizon-worker"],
  },
  {
    slug: "agent",
    term: "AI Agent",
    definition:
      "An AI system that can take actions using tools, plan multi-step workflows, and pursue goals with some degree of autonomy.",
    routeSlugs: ["ai-agents"],
    nodeSlugs: ["tool-use", "browser-agent"],
  },
  {
    slug: "momentum",
    term: "Momentum",
    definition:
      "A qualitative indicator of how quickly a route is currently advancing: slow, medium, fast, or very fast.",
    routeSlugs: [],
    nodeSlugs: [],
  },
  {
    slug: "life-3-0",
    term: "Life 3.0",
    definition:
      "Max Tegmark's term for life that can redesign both its software (knowledge, goals) and its hardware, freeing it from the constraints of biological evolution. Life 1.0 redesigns neither; Life 2.0 (such as humans) redesigns its software but not its hardware.",
    routeSlugs: ["recursive-improvement"],
    nodeSlugs: ["self-improving-system"],
  },
  {
    slug: "substrate-independence",
    term: "Substrate Independence",
    definition:
      "The idea that intelligence depends on the pattern of information processing, not the physical medium running it — so the same capability can in principle exist in neurons or silicon.",
    routeSlugs: ["recursive-improvement"],
    nodeSlugs: [],
  },
  {
    slug: "intelligence-explosion",
    term: "Intelligence Explosion",
    definition:
      "A hypothesized rapid, recursive cycle in which an AI capable of improving itself produces ever more capable successors, potentially reaching superintelligence quickly.",
    routeSlugs: ["recursive-improvement"],
    nodeSlugs: ["intelligence-explosion", "self-improving-system"],
  },
  {
    slug: "superintelligence",
    term: "Superintelligence",
    definition:
      "An intellect that greatly exceeds the best human performance in virtually every domain, including scientific creativity, strategy, and social skills.",
    routeSlugs: ["recursive-improvement"],
    nodeSlugs: ["intelligence-explosion"],
  },
  {
    slug: "orthogonality-thesis",
    term: "Orthogonality Thesis",
    definition:
      "The proposition that an AI's level of intelligence and its final goals are largely independent: almost any goal can be paired with almost any level of capability.",
    routeSlugs: ["ai-governance"],
    nodeSlugs: ["value-alignment"],
  },
  {
    slug: "instrumental-convergence",
    term: "Instrumental Convergence",
    definition:
      "The tendency for many different final goals to imply similar intermediate subgoals — such as acquiring resources or resisting shutdown — which is central to AI safety concerns.",
    routeSlugs: ["ai-governance"],
    nodeSlugs: ["value-alignment"],
  },
  {
    slug: "value-alignment",
    term: "Value Alignment",
    definition:
      "The technical problem of making an AI system's goals robustly reflect human values, even as the system becomes more capable. Often called the control problem.",
    routeSlugs: ["ai-governance"],
    nodeSlugs: ["value-alignment"],
  },
];

async function main() {
  console.log("[seed] clearing existing data...");
  await prisma.eventRouteImpact.deleteMany();
  await prisma.glossaryTerm.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.event.deleteMany();
  await prisma.node.deleteMany();
  await prisma.route.deleteMany();

  console.log("[seed] creating routes...");
  for (const r of routes) {
    await prisma.route.create({
      data: {
        slug: r.slug,
        title: r.title,
        shortTitle: r.shortTitle,
        description: r.description,
        capabilityIndex: r.capabilityIndex,
        momentum: r.momentum,
        confidence: r.confidence,
        lastUpdated: new Date(r.lastUpdated),
        colorToken: r.colorToken,
        orderIndex: r.orderIndex,
        featured: r.featured,
      },
    });
  }

  console.log("[seed] creating nodes...");
  // Created in array order so parent nodes exist before children connect.
  for (const n of nodes) {
    await prisma.node.create({
      data: {
        slug: n.slug,
        routeSlug: n.routeSlug,
        title: n.title,
        description: n.description,
        status: n.status,
        positionX: n.x,
        positionY: n.y,
        scoreContribution: n.scoreContribution,
        parents: { connect: n.parents.map((slug) => ({ slug })) },
      },
    });
  }

  console.log("[seed] creating events...");
  for (const e of events) {
    await prisma.event.create({
      data: {
        slug: e.slug,
        title: e.title,
        date: new Date(e.date),
        summary: e.summary,
        whyItMatters: e.whyItMatters,
        eventType: e.eventType,
        confidence: e.confidence,
        sourceUrls: e.sourceUrls,
        nodes: { connect: e.nodeSlugs.map((slug) => ({ slug })) },
        routeImpacts: {
          create: e.impacts.map((i) => ({
            delta: i.delta,
            route: { connect: { slug: i.routeSlug } },
          })),
        },
      },
    });
  }

  console.log("[seed] creating blog posts...");
  for (const b of blogPosts) {
    await prisma.blogPost.create({
      data: {
        slug: b.slug,
        title: b.title,
        description: b.description,
        date: new Date(b.date),
        content: b.content,
        routes: { connect: b.routeSlugs.map((slug) => ({ slug })) },
        nodes: { connect: b.nodeSlugs.map((slug) => ({ slug })) },
        events: { connect: b.eventSlugs.map((slug) => ({ slug })) },
      },
    });
  }

  console.log("[seed] creating glossary terms...");
  for (const g of glossary) {
    await prisma.glossaryTerm.create({
      data: {
        slug: g.slug,
        term: g.term,
        definition: g.definition,
        routes: { connect: g.routeSlugs.map((slug) => ({ slug })) },
        nodes: { connect: g.nodeSlugs.map((slug) => ({ slug })) },
      },
    });
  }

  console.log("[seed] done.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
