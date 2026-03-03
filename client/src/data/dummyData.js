export const dummyUser = {
  _id: 'user123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  token: 'dummy-jwt-token-12345'
};

export const dummyPortfolio = {
  _id: 'portfolio123',
  userId: 'user123',
  slug: 'john-doe-developer',
  isPublished: true,
  
  personalInfo: {
    name: 'John Doe',
    title: 'Full Stack Developer',
    bio: 'Passionate software developer with 5+ years of experience in building scalable web applications. Specializing in React, Node.js, and cloud technologies. I love turning complex problems into simple, beautiful solutions.',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    resume: 'https://example.com/resume.pdf'
  },
  
  contact: {
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    social: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      website: 'https://johndoe.dev'
    }
  },
  
  skills: [
    {
      title: 'Frontend',
      items: [
        { 
          name: 'HTML', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' 
        },
        { 
          name: 'CSS', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' 
        },
        { 
          name: 'JavaScript', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' 
        },
        { 
          name: 'React', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' 
        },
        { 
          name: 'Redux', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' 
        },
        { 
          name: 'TypeScript', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' 
        },
        { 
          name: 'Tailwind CSS', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' 
        },
        { 
          name: 'Next.js', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' 
        }
      ]
    },
    {
      title: 'Backend',
      items: [
        { 
          name: 'Node.js', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' 
        },
        { 
          name: 'Express', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' 
        },
        { 
          name: 'MongoDB', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' 
        },
        { 
          name: 'PostgreSQL', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' 
        },
        { 
          name: 'MySQL', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' 
        },
        { 
          name: 'Firebase', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' 
        }
      ]
    },
    {
      title: 'Languages',
      items: [
        { 
          name: 'JavaScript', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' 
        },
        { 
          name: 'TypeScript', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' 
        },
        { 
          name: 'Python', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' 
        },
        { 
          name: 'Java', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' 
        },
        { 
          name: 'C++', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' 
        }
      ]
    },
    {
      title: 'Tools',
      items: [
        { 
          name: 'Git', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' 
        },
        { 
          name: 'GitHub', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' 
        },
        { 
          name: 'VS Code', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' 
        },
        { 
          name: 'Docker', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' 
        },
        { 
          name: 'AWS', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' 
        },
        { 
          name: 'Figma', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' 
        }
      ]
    }
  ],
  
  experience: [
    {
      company: 'Tech Corp',
      role: 'Senior Full Stack Developer',
      companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&h=200&fit=crop',
      startDate: 'January 2022',
      endDate: 'Present',
      description: 'Leading development of microservices architecture using Node.js and React. Mentoring junior developers and conducting code reviews. Implemented CI/CD pipelines reducing deployment time by 60%. Architected scalable solutions serving 1M+ users.',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'TypeScript'],
      order: 0
    },
    {
      company: 'Digital Solutions Inc',
      role: 'Full Stack Developer',
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
      startDate: 'June 2020',
      endDate: 'December 2021',
      description: 'Developed and maintained multiple client-facing web applications. Collaborated with design team to implement responsive UIs. Optimized database queries improving performance by 40%. Built RESTful APIs serving mobile and web clients.',
      skills: ['React', 'Express', 'PostgreSQL', 'Redux', 'Material UI'],
      order: 1
    },
    {
      company: 'StartUp Labs',
      role: 'Frontend Developer',
      companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=200&fit=crop',
      startDate: 'March 2019',
      endDate: 'May 2020',
      description: 'Built responsive web applications using React and modern JavaScript. Implemented state management with Redux. Worked closely with UX designers to create intuitive user interfaces. Contributed to open-source projects.',
      skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Redux'],
      order: 2
    }
  ],
  
  education: [
    {
      school: 'Stanford University',
      degree: 'Master of Computer Science',
      schoolLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop',
      startDate: 'September 2017',
      endDate: 'June 2019',
      grade: '3.9 GPA',
      description: 'Specialized in Artificial Intelligence and Machine Learning. Completed thesis on distributed systems. Dean\'s List all semesters. Teaching Assistant for Data Structures course.',
      order: 0
    },
    {
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science',
      schoolLogo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop',
      startDate: 'September 2013',
      endDate: 'May 2017',
      grade: '3.8 GPA',
      description: 'Minor in Mathematics. President of Computer Science Club. Participated in multiple hackathons. Graduated with honors.',
      order: 1
    }
  ],
  
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard. Built with MERN stack and deployed on AWS. Supports real-time order tracking and email notifications.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Redux'],
      githubUrl: 'https://github.com/johndoe/ecommerce-platform',
      liveUrl: 'https://ecommerce-demo.example.com',
      order: 0
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates using WebSockets. Features include drag-and-drop kanban boards, team collaboration, notifications, and analytics dashboard.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      tags: ['React', 'Express', 'Socket.io', 'PostgreSQL', 'Material UI'],
      githubUrl: 'https://github.com/johndoe/task-manager',
      liveUrl: 'https://taskmanager-demo.example.com',
      order: 1
    },
    {
      title: 'Weather Dashboard',
      description: 'A beautiful weather dashboard that displays current weather and 7-day forecast for multiple locations. Features interactive maps, weather alerts, and historical data visualization.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop',
      tags: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API', 'Tailwind CSS'],
      githubUrl: 'https://github.com/johndoe/weather-dashboard',
      liveUrl: 'https://weather-demo.example.com',
      order: 2
    },
    {
      title: 'Blog Platform',
      description: 'A modern blogging platform with markdown support, code syntax highlighting, and SEO optimization. Features user authentication, comments, tags, and search functionality.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
      tags: ['Next.js', 'Node.js', 'MongoDB', 'Markdown', 'Vercel'],
      githubUrl: 'https://github.com/johndoe/blog-platform',
      liveUrl: 'https://blog-demo.example.com',
      order: 3
    },
    {
      title: 'Fitness Tracker',
      description: 'Mobile-responsive fitness tracking app with workout logging, progress tracking, and personalized workout plans. Includes charts for visualizing fitness progress over time.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
      tags: ['React', 'Firebase', 'Chart.js', 'PWA', 'Material UI'],
      githubUrl: 'https://github.com/johndoe/fitness-tracker',
      liveUrl: 'https://fitness-demo.example.com',
      order: 4
    },
    {
      title: 'Recipe Finder',
      description: 'Recipe discovery application that helps users find recipes based on ingredients they have. Features meal planning, shopping lists, and nutritional information.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop',
      tags: ['React', 'Node.js', 'Spoonacular API', 'Redux', 'Bootstrap'],
      githubUrl: 'https://github.com/johndoe/recipe-finder',
      liveUrl: 'https://recipes-demo.example.com',
      order: 5
    }
  ],
  
  theme: {
    primaryColor: '#3B82F6',
    template: 'modern',
    font: 'Inter'
  },
  
  analytics: {
    views: 1247,
    lastViewed: new Date()
  }
};

// Multiple portfolio examples
export const dummyPortfolios = {
  'john-doe-developer': dummyPortfolio,
  'jane-smith-designer': {
    ...dummyPortfolio,
    slug: 'jane-smith-designer',
    personalInfo: {
      ...dummyPortfolio.personalInfo,
      name: 'Jane Smith',
      title: 'UI/UX Designer',
      bio: 'Creative designer with a passion for crafting beautiful and intuitive user experiences.',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    contact: {
      ...dummyPortfolio.contact,
      email: 'jane.smith@example.com'
    }
  }
};