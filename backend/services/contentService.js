export const defaultResources = [
  {
    _id: 'seed-mdn-js',
    title: 'MDN JavaScript Guide',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
    topic: 'JavaScript',
    type: 'documentation',
    description: 'Clear language fundamentals and browser APIs from MDN.',
    tags: ['javascript', 'web'],
  },
  {
    _id: 'seed-react-docs',
    title: 'React Documentation',
    url: 'https://react.dev/learn',
    topic: 'React',
    type: 'documentation',
    description: 'Official React learning path with practical examples.',
    tags: ['react', 'frontend'],
  },
  {
    _id: 'seed-node-docs',
    title: 'Node.js Learn',
    url: 'https://nodejs.org/en/learn',
    topic: 'Backend',
    type: 'documentation',
    description: 'Official Node.js concepts, APIs, and server-side patterns.',
    tags: ['node', 'backend'],
  },
  {
    _id: 'seed-mongodb-university',
    title: 'MongoDB University',
    url: 'https://learn.mongodb.com/',
    topic: 'MongoDB',
    type: 'course',
    description: 'Free MongoDB courses from schema design to aggregation.',
    tags: ['database', 'mongodb'],
  },
];

const stacksByGoal = {
  'Web Development': ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
  'Data Science': ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'SQL'],
  'Machine Learning': ['Python', 'Scikit-learn', 'TensorFlow', 'APIs'],
  'Mobile Development': ['React Native', 'Expo', 'APIs', 'Firebase'],
  'DevOps & Cloud': ['Linux', 'Docker', 'CI/CD', 'AWS'],
  'UI/UX Design': ['Figma', 'Design Systems', 'Prototyping'],
  Cybersecurity: ['Networking', 'Linux', 'OWASP', 'Python'],
  Blockchain: ['Solidity', 'Web3.js', 'Smart Contracts'],
};

export const buildRoadmap = ({ goal, level, weeklyHours }) => {
  const stack = stacksByGoal[goal] || ['Fundamentals', 'Tools', 'Projects', 'Portfolio'];
  const intensity = weeklyHours >= 10 ? '1 week' : weeklyHours >= 5 ? '1-2 weeks' : '2 weeks';
  const phases = level === 'advanced'
    ? ['Audit fundamentals', 'Deepen architecture', 'Build production workflows', 'Optimize and test', 'Ship a capstone', 'Prepare portfolio']
    : level === 'intermediate'
      ? ['Refresh foundations', 'Practice core tools', 'Build guided projects', 'Learn production patterns', 'Create a capstone', 'Polish portfolio']
      : ['Learn the basics', 'Practice small exercises', 'Understand common tools', 'Build mini projects', 'Create a capstone', 'Review and publish'];

  const steps = phases.map((phase, index) => ({
    stepNumber: index + 1,
    title: `${phase}: ${stack[index % stack.length]}`,
    description: `Focus on ${goal} ${phase.toLowerCase()} with practical exercises, notes, and a small deliverable before moving ahead.`,
    duration: intensity,
    resources: [stack[index % stack.length], 'Practice', 'Project'],
  }));

  return {
    goal,
    level,
    weeklyHours,
    estimatedDuration: weeklyHours >= 10 ? '6 weeks' : weeklyHours >= 5 ? '8-10 weeks' : '12 weeks',
    aiGenerated: Boolean(process.env.GROQ_API_KEY),
    steps,
  };
};

export const buildProjects = ({ goal = 'Web Development', level = 'beginner' } = {}) => {
  const stack = stacksByGoal[goal] || stacksByGoal['Web Development'];
  return [
    {
      title: `${goal} Starter Dashboard`,
      description: `Create a focused dashboard that demonstrates your understanding of ${goal} fundamentals and clean UI/data flow.`,
      difficulty: level,
      techStack: stack.slice(0, 4),
      estimatedTime: '1-2 weeks',
    },
    {
      title: `AI Assisted ${goal} Planner`,
      description: 'Build a planner that accepts a user goal, breaks it into milestones, and tracks completion with useful feedback.',
      difficulty: level === 'beginner' ? 'intermediate' : level,
      techStack: [...stack.slice(0, 3), 'REST API'],
      estimatedTime: '2-3 weeks',
    },
    {
      title: `${goal} Portfolio Capstone`,
      description: 'Ship a polished project with authentication, persistence, deployment, and documentation suitable for your portfolio.',
      difficulty: level === 'advanced' ? 'advanced' : 'intermediate',
      techStack: [...stack.slice(0, 4), 'Deployment'],
      estimatedTime: '3-4 weeks',
    },
  ];
};

export const buildLesson = (topic, description = '') => `# ${topic}

## What to learn
${description || `Start by understanding why ${topic} matters, then learn the core concepts and practice them in a small project.`}

## Key ideas
- Define the concept in your own words.
- Identify the inputs, outputs, and common mistakes.
- Build one tiny example before reading more theory.
- Connect this topic to your current roadmap goal.

## Practice task
Create a small note or demo that explains ${topic}, shows one working example, and lists two things you still want to clarify.

## Checkpoint
You are ready to move forward when you can explain ${topic} without looking at notes and apply it in a simple project.`;

export const buildQuiz = (topic) => [
  {
    question: `What is the best first step when learning ${topic}?`,
    options: ['Memorize every term', 'Understand the core problem it solves', 'Skip straight to deployment', 'Avoid practice'],
    correctIndex: 1,
    explanation: 'A clear mental model makes practice and deeper study much easier.',
  },
  {
    question: `How should you verify your understanding of ${topic}?`,
    options: ['Only watch videos', 'Build and explain a small example', 'Read random snippets', 'Wait until the end of the course'],
    correctIndex: 1,
    explanation: 'Active recall plus a working example exposes gaps quickly.',
  },
  {
    question: `What makes ${topic} portfolio-ready?`,
    options: ['A polished practical use case', 'A private note only', 'No documentation', 'Unclear setup steps'],
    correctIndex: 0,
    explanation: 'Portfolio work should be usable, understandable, and connected to a real problem.',
  },
];
