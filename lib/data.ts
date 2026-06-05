export const portfolioData = {
  personalInfo: {
    name: "Mohamed Wageh",
    title: "Data Scientist & AI Engineer",
    bio: "Computer Science Undergraduate specializing in Data Science and Machine Learning. Proven expertise in building predictive models and analyzing complex datasets using Python, SQL, and Scikit-learn. Committed to delivering data-driven insights and deploying statistical models.",
    profileImage: "/images/Mohamed_wageh.jpg",
    cvFile: "/Mohamed_Wageh_CV.pdf"
  },
  contact: {
    phone: "+201015547839",
    email: "engwagehii@gmail.com",
    linkedin: "https://www.linkedin.com/in/wagehii",
    github: "https://github.com/wagehii",
    codewars: "https://www.codewars.com/users/wagehii"
  },
  timeline: [
    {
      id: 1,
      type: "education",
      title: "Bachelor of Computer Science",
      organization: "Mansoura University, Egypt",
      date: "Expected Graduation: 2027",
      description: "Undergraduate student specializing in Computer Science, laying a strong foundation in programming and algorithms."
    },
    {
      id: 2,
      type: "experience",
      title: "Data Science Team Leader & Trainee",
      organization: "Digital Egypt Pioneers Initiative (DEPI)",
      date: "Nov 2025 - Jul 2026",
      description: "Selected as a Team Leader for 32 trainees. Led the development of a capstone project: Enterprise Healthcare Risk Prediction Platform with Feature Store & MLOps."
    },
    {
      id: 3,
      type: "experience",
      title: "Data Science Committee Member",
      organization: "CAT Reloaded",
      date: "Aug 2024 - Present",
      description: "Collaborated to engineer machine learning models for internal hackathons and co-organized technical events for over 250+ students."
    }
  ],
  projects: [
    {
      id: 1,
      title: "AI Virtual Hand Controller",
      description: "An interactive AI system allowing full PC control using hand gestures via webcam. Built with Computer Vision to track hand joints and translate them into OS commands like mouse movement, clicking, and scrolling.",
      image: "/images/project1.jpg",
      githubUrl: "https://github.com/wagehii/AI_Virtual_Hand_Controller",
      techStack: ["Computer Vision", "Python", "AI"]
    },
    {
      id: 2,
      title: "Person Classifier",
      description: "Developed a robust classification model identifying individuals based on biometric features, achieving 92% validation accuracy. Reduced dataset noise by 20% through advanced preprocessing.",
      image: "/images/project2.jpg",
      githubUrl: "https://github.com/wagehii/Person_Classifier",
      techStack: ["Python", "Scikit-learn", "Classification"]
    },
    {
      id: 3,
      title: "Home Prices Prediction",
      description: "Engineered a linear regression model predicting real estate prices from 1000+ records. Improved accuracy by 12% by removing outliers and visualized 50+ feature correlations via Seaborn.",
      image: "/images/project3.jpg",
      githubUrl: "https://github.com/wagehii/HomePrices",
      techStack: ["Linear Regression", "Pandas", "Seaborn"]
    },
    {
      id: 4,
      title: "Disease Prediction App",
      description: "Deployed an end-to-end ML web app processing 100+ real-time requests for disease prediction. Processed over 5,000+ records of raw medical data into a structured format.",
      image: "/images/project4.jpg",
      githubUrl: "https://github.com/wagehii/Desease_Prediction",
      techStack: ["Streamlit", "Machine Learning", "Deployment"]
    }
  ]
};
