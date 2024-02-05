export const dropdownContent = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sideBarContent = [
  {
    icon: "/assets/icons/home.svg",
    label: "Home",
    path: "/",
  },
  {
    icon: "/assets/icons/users.svg",
    label: "Community",
    path: "/community",
  },
  {
    icon: "/assets/icons/star.svg",
    label: "Collections",
    path: "/collections",
  },
  {
    icon: "/assets/icons/suitcase.svg",
    label: "Jobs",
    path: "/jobs",
  },
  {
    icon: "/assets/icons/tag.svg",
    label: "Tags",
    path: "/tags",
  },
  {
    icon: "/assets/icons/user.svg",
    label: "Profile",
    path: "/profile",
  },
  {
    icon: "/assets/icons/question.svg",
    label: "Ask a question",
    path: "/ask-question",
  },
];

export const topQuestions = [
  {
    id: 1,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)??",
  },
  { id: 2, title: "How to get started writing a machine learning algo?" },
  { id: 3, title: "Can i get this course for free?" },
  { id: 4, title: "Redux Toolkit Updating State as Expected?" },
  { id: 5, title: "Best practices for efficiency and performance in AI?" },
];

export const tags = [
  { id: 1, tagName: "Nextjs", count: 23 },
  { id: 2, tagName: "Gemini", count: 15 },
  { id: 3, tagName: "Open AI", count: 11 },
  { id: 4, tagName: "Javascript", count: 8 },
  { id: 5, tagName: "c++", count: 5 },
];

export const filters = [
  { id: 1, tagName: "newest", count: 23 },
  { id: 2, tagName: "frequent", count: 15 },
  { id: 3, tagName: "Unanswered", count: 11 },
  { id: 4, tagName: "Recommended", count: 8 },
];

export const userFilters = [
  { id: 1, tagName: "new users", count: 23 },
  { id: 2, tagName: "old users", count: 15 },
  { id: 3, tagName: "top contributors", count: 11 },
];

export const filtersForCollections = [
  { id: 1, tagName: "most recent", count: 23 },
  { id: 2, tagName: "oldest", count: 15 },
  { id: 3, tagName: "most voted", count: 11 },
  { id: 4, tagName: "most viewed", count: 27 },
  { id: 5, tagName: "most answered", count: 37 },
];

export const tagFilters = [
  { id: 1, tagName: "Top tags", count: 23 },
  { id: 2, tagName: "Oldest tags", count: 15 },
  { id: 3, tagName: "Newest tags", count: 11 },
];

export const answerFilters = [
  { id: 1, tagName: "Highest upvotes", count: 23 },
  { id: 2, tagName: "Newest", count: 15 },
  { id: 3, tagName: "Oldest", count: 11 },
  { id: 4, tagName: "Lowest Upvotes", count: 19 },
];

export const questions = [
  {
    _id: 1,
    title: "Cascading Deletes in SQLAlchemy",
    tags: [
      { _id: 1, name: "python" },
      { _id: 2, name: "sql" },
    ],
    author: {
      name: "John Doe",
      img: "/assets/images/testimg.png",
    },
    upvotes: 10,
    views: 245,
    answers: 2,
    createdAt: new Date(),
  },
  {
    _id: 2,
    title: "Cascading Deletes in SQLAlchemy",
    tags: [
      { _id: 1, name: "python" },
      { _id: 2, name: "sql" },
    ],
    author: {
      name: "John Doe",
      img: "/assets/images/testimg.png",
    },
    upvotes: 10,
    views: 245,
    answers: 2,
    createdAt: new Date(),
  },
  {
    _id: 3,
    title: "Cascading Deletes in SQLAlchemy",
    tags: [
      { _id: 1, name: "python" },
      { _id: 2, name: "sql" },
    ],
    author: {
      name: "John Doe",
      img: "/assets/images/testimg.png",
    },
    upvotes: 10,
    views: 245,
    answers: 2,
    createdAt: new Date(),
  },
  {
    _id: 4,
    title: "Cascading Deletes in SQLAlchemy",
    tags: [
      { _id: 1, name: "python" },
      { _id: 2, name: "sql" },
    ],
    author: {
      name: "John Doe",
      img: "/assets/images/testimg.png",
    },
    upvotes: 10,
    views: 245,
    answers: 2,
    createdAt: new Date(),
  },
];

export const globalFilters = [
  { name: "Question", value: "question" },
  { name: "Answer", value: "answer" },
  { name: "User", value: "user" },
  { name: "Tag", value: "tag" },
];

export interface BadgeCriteriaType {
  BRONZE: number;
  SILVER: number;
  GOLD: number;
}

export interface BadgeCriteriaObjectType {
  QUESTION_COUNT: BadgeCriteriaType;
  ANSWER_COUNT: BadgeCriteriaType;
  QUESTION_UPVOTES: BadgeCriteriaType;
  ANSWER_UPVOTES: BadgeCriteriaType;
  TOTAL_VIEWS: BadgeCriteriaType;
}

export const BADGE_CRITERIA: BadgeCriteriaObjectType = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
};

export type KeyType = keyof typeof BADGE_CRITERIA;

export type CriteriaKeyType = keyof (typeof BADGE_CRITERIA)[KeyType];

export const jobs = [
  {
    id: "UyxyLC4sICxXLGUsYiwgLEQsZSx2LGUsbCxvLHAsZSxyLCAsKCxGLHUsbCxsLCAscyx0LGEsYyxrLCk=",
    title: "Sr. Web Developer (Full stack) React/NodeJS",
    company: "Thinksys software Pvt Ltd",
    description:
      'Looking for immediate joine or 15 day NP\n\nAbout US:\n\nThinkSys, an award-winning technology company, is a leading provider of Software Development, QA and IT Service’s. headquartered in Sunnyvale, CA and offices in NOIDA, India. ThinkSys serves clients worldwide.\n\nWe have been recognized among the fastest growing private companies in the US (Inc5000 2016), the "Most Exciting"companies in Asia (Red Herring Asia 100) &amp; the "Best Emerging Software Company in Delhi NCR (India)”. ThinkSys delivers a wide variety of comprehensive end-to-end services that combine power, functionality, and reliability with flexibility, agility, and usability.\n\nOur journey began in 2012, marking the inception of our company with just 50 members &amp; now we are a team of 450+ highly skilled specialists who bring their expertise and passion to every software project, ensuring unparalleled quality and innovation.\n\nJob description\n\nWe are looking for a Full Stack Web Developer with 4-6 years’ experience as a web... developer in the latest of technologies. As a Full Stack Developer, you will be responsible for designing and implementing web applications that deliver a seamless user experience. You will work on both the front-end and back-end development, ensuring the entire application functions effectively.\n\nSkills Required\n\nü Good communication and client interfacing skills.\n\nü Solid fundamentals in core JavaScript concepts while working on web projects for 4-6 years.\n\nü Proficient with Frameworks like Node.js/Nest.js, Angular/React/Vue.js/Next.js along with related technologies &amp; frameworks like HTML, CSS, Bootstrap, Material UI.\n\nü Good experience with Relational and/or NoSQL databases.\n\nü Hands-on experience in building high-quality Web applications\n\nü Good knowledge of at least one major cloud service provider (AWS, Azure, Google Cloud)\n\nü Good knowledge of Docker, Docker Compose\n\nü Basic Understanding of Kubernetes\n\nü Good experience with Git and branching strategy (preferably GitFlow)\n\nü Good architectural &amp; design skills.\n\nü Strong analytical, problem solving, debugging and troubleshooting skills\n\nü Strong understanding of emerging technologies, standards, and best practices for development\n\nü Software development experience with significant time spent working on Cloud technologies preferred\n\nü Agile/Scrum methodology experience.\n\nRole &amp; Responsibilities:\n\nü Go to person of the Project lead for complex feature implementations.\n\nü Understand requirements on its own and implement them.\n\nü Create efficient, reusable, and scalable code for both front-end and back-end.\n\nü Optimize applications for maximum performance and responsiveness.\n\nü Troubleshoot and debug issues in a timely manner.\n\nü Write and maintain technical documentation.\n\nü Stay up to date with the latest industry trends and best practices in web development.\n\nü Participate in code reviews to maintain code quality and enhance team collaboration.\n\nü Guide junior members in the team to help them improve their skills.\n\nQualifications:\n\nü Bachelor or Masters’ degree in computer science or equivalent field with good scores throughout their academics',
    image: "",
    location: "Noida, Uttar Pradesh, India",
    employmentType: "Full-time",
    datePosted: "5 hours ago",
    salaryRange: "",
    jobProviders: [
      {
        jobProvider: "LinkedIn",
        url: "https://in.linkedin.com/jobs/view/sr-web-developer-full-stack-react-nodejs-at-thinksys-software-pvt-ltd-3728825228?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      },
    ],
  },
  {
    id: "VyxlLGIsICxELGUsdixlLGwsbyxwLGUscixCLHksdCxlLHMscCxhLHIsayxSLGEsbixjLGgsaSwsLCA=",
    title: "Web Developer",
    company: "Bytespark",
    description:
      "Company Description\n\nWe suggest you enter details here.\n\nRole Description\n\nThis is a full-time on-site role for a Web Developer located in Ranchi. The Web Developer will develop and maintain web applications to ensure maximum efficiency, security, and user experience. The Web Developer will also collaborate with cross-functional teams to define, design, and deploy new features.\n\nQualifications\n• Strong proficiency in HTML, CSS, and JavaScript\n• Experience with front-end frameworks such as React, Vue, or Angular\n• Experience with back-end frameworks such as Express, Django, or Ruby on Rails\n• Knowledge of databases such as MySQL, MongoDB, or PostgreSQL\n• Experience with version control tools such as Git or SVN\n• Experience with agile development methodologies\n• Bachelor's degree or higher in Computer Science, or a related field\n• Strong analytical and problem-solving skills\n• Excellent communication and teamwork skills",
    image: "",
    location: "Ranchi, Jharkhand, India",
    employmentType: "Full-time",
    datePosted: "1 day ago",
    salaryRange: "",
    jobProviders: [
      {
        jobProvider: "LinkedIn",
        url: "https://in.linkedin.com/jobs/view/web-developer-at-bytespark-3817219399?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      },
    ],
  },
  {
    id: "VyxlLGIsICxELGUsdixlLGwsbyxwLGUscixaLHMsYyxhLGwsZSxyLFUsbixpLHQsZSxkLCAsUyx0LGE=",
    title: "Web Developer",
    company: "Zscaler",
    description:
      "About Zscaler\n\nZscaler (NASDAQ: ZS) accelerates digital transformation so that customers can be more agile, efficient, resilient, and secure. The Zscaler Zero Trust Exchange is the company’s cloud-native platform that protects thousands of customers from cyberattacks and data loss by securely connecting users, devices, and applications in any location...\n\nWith more than 10 years of experience developing, operating, and scaling the cloud, Zscaler serves thousands of enterprise customers around the world, including 450 of the Forbes Global 2000 organizations. In addition to protecting customers from damaging threats, such as ransomware and data exfiltration, it helps them slash costs, reduce complexity, and improve the user experience by eliminating stacks of latency-creating gateway appliances.\n\nZscaler was founded in 2007 with a mission to make the cloud a safe place to do business and a more enjoyable experience for enterprise users. Zscaler’s purpose-built security platform puts a company’s defenses and controls where the connections occur—the internet—so that every connection is fast and secure, no matter how or where users connect or where their applications and workloads reside.\n\nJob Description:\n\nWe are seeking a skilled and proactive professional to join our team as a Developer with a focus on AWS management, EC2, S3 buckets, GitHub, and version management. The ideal candidate will possess a strong background in web development, PHP, and Codeigniter framework, along with expertise in various technologies such as HTML, MySQL, JavaScript, jQuery, CSS, Bootstrap, and REST APIs.\n\nResponsibilities:\n• Proficient in managing AWS resources, including EC2 instances and S3 buckets.\n• Comfortable working with Composer Packages for efficient code management.\n• Monitor, debug, and analyze issues, providing effective solutions for seamless system functionality.\n• Develop integrations between core business systems using both code and no-/low-code platforms, ensuring proper deployment and post-deployment support.\n• Maintain security, backup, and redundancy strategies for data protection and system resilience.\n• Plan and implement systems automation to enhance efficiency and minimize the need for manual intervention.\n• Monitor and test application performance, identifying potential bottlenecks and collaborating with the internal security team to implement fixes and patches.\n• Participate in the design of information and operational support systems to optimize overall performance.\n• Create and maintain technical documentation for clarity and future reference.\n• Demonstrate expertise in PHP (preferably CodeIgniter framework) development with a focus on test-driven methodologies and modern frameworks (OOPS Concept).\n• Integrate with REST APIs and handle dynamic data on the frontend for seamless user experiences.\n• Possess good knowledge of application and data security principles.\n• Proficient in versioning with Git and experienced in utilizing continuous integration tools and processes.\n• Familiarity with version management tools such as GitHub, Subversion, and Bitbucket.\n\nQualifications:\n• Strong background in HTML, MySQL, JavaScript, jQuery, CSS, Bootstrap, REST APIs, and Git.\n• Proficiency in delivering high-quality PHP code, employing test-driven methodologies and modern frameworks, with a preference for CodeIgniter.\n• Experience in integrating with REST APIs and managing dynamic data on the frontend.\n• Creating and maintaining comprehensive technical documentation.\n• Good understanding of application and data security.\n• Knowledgeable in versioning with Git and adept at continuous integration tools and processes.\n• Familiarity with GitHub, Subversion, and Bitbucket for efficient version management.\n\n#LI-NT1\n\nBy applying for this role, you adhere to applicable laws, regulations, and Zscaler policies, including those related to security and privacy standards and guidelines.\n\nZscaler is proud to be an equal opportunity and affirmative action employer. We celebrate diversity and are committed to creating an inclusive environment for all of our employees. All qualified applicants will receive consideration for employment without regard to race, color, religion, sex (including pregnancy or related medical conditions), age, national origin, sexual orientation, gender identity or expression, genetic information, disability status, protected veteran status or any other characteristics protected by federal, state, or local laws.\n\nSee more information by clicking on the Know Your Rights: Workplace Discrimination is Illegal link.\n\nPay Transparency\n\nZscaler complies with all applicable federal, state, and local pay transparency rules. For additional information about the federal requirements, click here.\n\nZscaler is committed to providing reasonable support (called accommodations or adjustments) in our recruiting processes for candidates who are differently abled, have long term conditions, mental health conditions or sincerely held religious beliefs, or who are neurodivergent or require pregnancy-related support",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy7xrhETuzXWg47L1av_V4csbnupXW1QeD7_Pi&s=0",
    location: "United States  (+1 other)",
    employmentType: "Full-time",
    datePosted: "2 days ago",
    salaryRange: "",
    jobProviders: [
      {
        jobProvider: "EchoJobs",
        url: "https://echojobs.io/job/zscaler-web-developer-us-shift-z6325?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      },
    ],
  },
  {
    id: "VyxlLGIsICxELGUsdixlLGwsbyxwLGUscixMLG8sbyxwLCAsUyx1LGIscyxjLHIsaSxwLHQsaSxvLG4=",
    title: "Web Developer",
    company: "Loop Subscriptions",
    description:
      "We are looking for an marketing engineer to manage our website and work on interesting projects to drive leads.\n\nKRAs\n• Work with design and marketing team to improve website conversion rate for different sign up processes\n• Work with the marketing team to improve main website KPIs - New users, average time on page, session duration are the main ones\n• Write automation scripts to help automate redundant manual processes of other marketing functions– SEO, Outbound, Content, Product Marketing\n• Work on our Shopify demo store to showcase new product releases and features. This is pretty interesting as you’ll get to play around with Shopify backend (the most popular eCommerce platform in the world)\n• Work on building integrations and workflows between different marketing automation platforms. Our current marketing tech stack involves Salesforce, HubSpot, Reply, Similarweb and more.\n• Web scraping for new growth initiatives\n\nIdeal profile\n• Has a solid understanding of Webflow.\n• Has 1-3... years of experience in front-end technologies and has worked with marketing teams before in a SaaS company\n• Eager to learn about Shopify and how it works. Loop is built on top of Shopify so this person would learn a lot about the Shopify ecosystem\n• Interested in working on automation (future of work) and integrating different marketing tools- Salesforce, Hubspot, Reply and more\n• A go getter\n\nWhat will you do?\n\nTake data from different marketing technologies and build data dashboards for the marketing team on Google Data Studio\n\nOversee management and execution on CMS\n\nTake charge of marketing automation (technical) workflows\n\nThis would be a role for someone who not only can help in improving the performance and usability of the website but wants to learn more about new technologies.\n\nLoop Subscriptions focuses on SaaS, E-Commerce, Payments, and Subscription. Their company has offices in Gurgaon. They have a small team that's between 11-50 employees. To date, Loop Subscriptions has raised $2M of funding; their latest round was closed on April 2022 at a valuation of $20M.\n\nYou can view their website at https://loopwork.co or find them on Twitter and LinkedIn",
    image:
      "https://fonts.gstatic.com/s/i/googlematerialicons/auto_stories/v8/gm_grey-24dp/1x/gm_auto_stories_gm_grey_24dp.png",
    location: "Gurugram, Haryana, India",
    employmentType: "Full-time",
    datePosted: "5 days ago",
    salaryRange: "",
    jobProviders: [
      {
        jobProvider: "Wellfound",
        url: "https://wellfound.com/jobs/2912880-web-developer?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      },
    ],
  },
  {
    id: "VyxlLGIsICxkLGUsdixlLGwsbyxwLGUsciwgLEYsYSxjLHUsbCx0LHksTyx4LGYsbyxyLGQsICxTLG8=",
    title: "Web developer Faculty",
    company: "Oxford Software Institute",
    description:
      "Oxford Software Institute, South Extension , New Delhi centre urgently required Full Time Web Developer Faculty.\n\nCandidate must have sound knowledge of HTML5, CSS3, Java Script, JQuery, Wordpress, Bootstrap, MySql, MongoDB, PHP, Java, Python, ReactJS, NodeJS Etc.\n\nCandidate must have minimum 1-2 year teaching experience.\n\nCandidate must have good communication skills and teaching skills.\n\nOxford Software Institute is the flagship offshoot of Hindustan Soft Education Ltd, An ISO 9001:2015 certified organization and NSDC partner company. With a mission to provide a high-quality, positive, and conducive learning environment, we have successfully trained more than 90,000 students over the past 26 years.\n\nJob Type: Full-time\n\nSalary: ₹20,000.00 - ₹35,000.00 per month\n\nSchedule:\n• Day shift\n\nTipe Lokasi:\n• In-person\n\nEducation:\n• Bachelor's (Preferred)\n\nExperience:\n• total work: 1 year (Preferred)\n\nWork Location: In person\n\nSpeak with the employer\n+91-XXXXXXXXXX",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnA_XV-WOkJshfm4H7fWsoeaC8G9dwhMx1O9qg&s=0",
    location: "India",
    employmentType: "Full-time",
    datePosted: "2 days ago",
    salaryRange: "",
    jobProviders: [
      {
        jobProvider: "Indeed",
        url: "https://in.indeed.com/viewjob?jk=9ed3521da56d5348&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      },
    ],
  },
  {
    id: "VyxlLGIsICxELGUsdixlLGwsbyxwLGUscixFLG4sZyxhLGcsZSxkLGwseSwsLCAsSSxuLGMsQSxuLHk=",
    title: "Web Developer",
    company: "Engagedly, Inc",
    description:
      "Company Overview\n\nEngagedly Inc. is a fast-paced growth provider and an award-winning Talent Management Software Solution provider. Built upon best practices and decades of research, Engagedly’s People + Strategy platform is evolving performance management, development, and engagement to drive successful global organizational outcomes. Engagedly’s E3 unified platform combines the power of business strategy execution, talent enablement, and employee engagement into one easy-to-use software solution. This niche HRTech space is attracting attention from candidates who love challenges and want to learn new things every day in a product R&amp;D environment.\n\nThe Opportunity\n\nWe are currently seeking a skilled Contract Website Developer with a strong focus on WordPress for short-term projects. The candidate will be responsible for comprehensive development tasks, including both front-end aesthetics and back-end functionality. This role is ideal for someone with an in-depth understanding of... WordPress, looking to apply their technical skills in a flexible and dynamic project-based environment.\n\nResponsibilities\n• Develop, implement, and manage WordPress websites from initial concept to completion.\n• Customize WordPress themes and plugins to meet project requirements.\n• Ensure high performance and availability of the site, managing all technical aspects.\n• Optimize website for speed and scalability.\n• Maintain, update, and troubleshoot existing WordPress websites as needed.\n• Collaborate with stakeholders to ensure the website aligns with brand strategy and meets the organization's needs.\n• Provide timely delivery of projects and technical support throughout.\n\nRequired Skills\n• Bachelor's degree with 3 to 5 years of relevant work experience.\n• Proven contract or freelance experience as a Website Developer with a strong focus on WordPress.\n• Proficiency in front-end technologies, including HTML5, CSS3, JavaScript, and jQuery.\n• Experience with PHP and understanding WordPress file structure and code.\n\nWhy should I join Engagedly?\n• You specialize in the domain that's fast-picking pace and becoming a need for many organizations today.\n• Work independently with your chosen methods to drive results.\n• Phenomenal learning experience with guaranteed self-development &amp; growth.\n• No dearth of growth within the business development track. Hence, you shape your career!\n• Competitive compensation with additional employee benefits.\n• Great people culture, work environment, and freedom of space to set forth your fullest potential.\n\nIf this role sounds exciting, challenging, and interesting, we look forward to hearing from you.\n\nAll aspects of employment at Engagedly are based on merit, competence, and performance. We are committed to embracing diversity and creating an inclusive environment for all employees. Engagedly is proud to be an equal opportunity employer",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjwKb3IffJQaG2jVXGKwnx37nOXQGArBn_YtZj&s=0",
    location: "Anywhere",
    employmentType: "Full-time",
    datePosted: "5 days ago",
    salaryRange: "",
    jobProviders: [
      {
        jobProvider: "Glassdoor",
        url: "https://www.glassdoor.co.in/job-listing/web-developer-engagedly-inc-JV_KO0,13_KE14,27.htm?jl=1009103699365&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      },
      {
        jobProvider: "Talentify",
        url: "https://www.talentify.io/job/web-developer-remote-bengaluru-karnataka-engagedly-fioapepd4wqt?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      },
    ],
  },
  {
    id: "VyxvLHIsaywgLGYscixvLG0sICxILG8sbSxlLCAsVyxlLGIsICxELGUsdixlLGwsbyxwLGUsciwgLEo=",
    title: "Work from Home Web Developer Jobs in Hyderabad",
    company: "Turing.com",
    description:
      "We, at Turing, are looking for experienced web developers who will be responsible for designing, developing, testing, publishing, and maintaining web applications and websites. Get the best web development jobs in Hyderabad and collaborate with industry veterans while working at top U.S. firms.",
    image:
      "https://fonts.gstatic.com/s/i/googlematerialicons/auto_stories/v8/gm_grey-24dp/1x/gm_auto_stories_gm_grey_24dp.png",
    location: "Anywhere",
    employmentType: "Full-time",
    datePosted: "9 days ago",
    salaryRange: "",
    jobProviders: [
      {
        jobProvider: "Turing",
        url: "https://www.turing.com/jobs/web-developer-jobs-in-hyderabad?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      },
    ],
  },
  {
    id: "VyxlLGIsICxELGUsdixlLGwsbyxwLGUscixELE8sVCwgLEMsbyxtLHAsdSx0LGUsciwgLFMsbyxsLHU=",
    title: "Web Developer",
    company: "DOT Computer Solutions",
    description:
      "• Skills required are\n• HTML/CSS/JS.\n• Git and GitHub.\n• Browser DevTools.\n• API (Application Programming Interface) .\n• Authentication.\n• MVC (Model, View, Controller) .\n• Programming Languages (Backend) .\n• Problem-Solving and Searching.\n\nJob Type: Full-time\n\nSalary: ₹10,000.00 - ₹25,000.00 per month\n\nSchedule:\n• Day shift\n\nSupplemental pay types:\n• Performance bonus\n\nEducation:\n• Bachelor's (Preferred)\n\nExperience:\n• CSS: 1 year (Required)\n• total work: 1 year (Required)\n• HTML5: 1 year (Required)\n\nWork Location: In person",
    image: "",
    location: "Kozhikode, Kerala, India",
    employmentType: "Full-time",
    datePosted: "2 days ago",
    salaryRange: "",
    jobProviders: [
      {
        jobProvider: "Glassdoor",
        url: "https://www.glassdoor.co.in/job-listing/web-developer-dot-computer-solutions-JV_IC2868442_KO0,13_KE14,36.htm?jl=1009109036985&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      },
    ],
  },
  {
    id: "Rix1LGwsbCwgLFMsdCxhLGMsaywgLFcsZSxiLCAsRCxlLHYsZSxsLG8scCxlLHIsTCxvLHIsZCwgLG8=",
    title: "Full Stack Web Developer",
    company: "Lord of the Inns, INC",
    description:
      "Company Description\n\nWe suggest you enter details here.\n\nRole Description\n\nThis is a remote contract role for a Full Stack Web Developer. The Full Stack Web Developer will be responsible for developing and maintaining web applications from concept to deployment. The role requires the ability to design, develop, and implement complex web applications, as well as to test and maintain code in a fast-paced environment.\n\nQualifications\n• 3+ years of professional experience in Full Stack Web Development using JavaScript, HTML, and CSS\n• Demonstrated expertise in one or more commonly used front-end frameworks such as React, Angular, or Vue, and back-end technologies such as Python, Ruby, or Node.js, as well as knowledge of databases such as SQL, MongoDB or PostgresSQL\n• Experience with RESTful APIs and version control using Git\n• Familiarity with Agile development methodologies, unit testing, and debugging\n• Experience with cloud computing platforms such as Amazon Web Services (AWS) or... Microsoft Azure and containerization technologies such as Docker is a plus\n• Bachelor's degree or higher in Computer Science, or a related field is preferred\n• Ability to work collaboratively in a team environment, as well as independently\n• Strong problem-solving skills and attention to detail",
    image: "",
    location: "Anywhere",
    employmentType: "Contractor",
    datePosted: "3 days ago",
    salaryRange: "",
    jobProviders: [
      {
        jobProvider: "LinkedIn",
        url: "https://in.linkedin.com/jobs/view/full-stack-web-developer-at-lord-of-the-inns-inc-3815653690?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      },
      {
        jobProvider: "Jobindia24h.com",
        url: "https://jobindia24h.com/fr/full-stack-web-developer-job206105?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      },
    ],
  },
  {
    id: "UyxlLG4saSxvLHIsICxXLGUsYixzLGksdCxlLCAsRCxlLHYsZSxsLG8scCxlLHIsICwoLCAsVyxlLGI=",
    title: "Senior Website Developer ( Web Development )",
    company: "Nium",
    description:
      "Nium, the Leader in Real-Time Global Payments\n\nAt Nium, we operate at the intersection of an increasingly interconnected world, where the traditional finance industry has been disrupted, and on-demand is in demand. Our payments infrastructure is leading a transformation in payments, enabling anyone, anywhere to make and receive payments instantly, regardless of the location or currency. We currently support:\n\n-Regulatory Licenses and Authorizations in 40+ Countries, enabling seamless onboarding, rapid integration, and compliance\n\n-190+ Pay Out Markets – 100+ in real time\n\n-35+ Pay In Markets\n\n-30+ Card Issuance Markets\n\n-100+ Supported Currencies\n\nToday, Nium is the leader in real-time global payments and the fastest way to send money across borders. We are co-headquartered in San Francisco and Singapore, with regional offices in Australia, Brazil, Hong Kong, India, Indonesia, Japan, Lithuania, London, Malaysia, Malta, Netherlands, and UAE.\n\nWhere do you come into the picture?\n\nWe are... seeking a talented web developer/designer with WordPress experience to work with our marketing team.\n\nWhat would a day in your life @ NIUM look like?\n\nYou'll work within a B2B in-house marketing department to:\n\n· Lead a team of webdev contractors\n\n· Manage Nium.com website and ensure proper performance\n\n· Produce web pages in WordPress\n\n· Build custom templates for email campaigns in Pardot\n\n· Ensure brand consistency on all projects across multiple marketing channels by working closely with the\n\nbrand and design team\n\n· Fulfill. other webdev/production duties as needed\n\nWhat experiences and expertise would you need to play this role?\n\n· Expertise in multiple CMS including Wordpress, Laravel / BusinessPress, etc.\n\n· Create and maintain Guetenberg blocks\n\nExtensive experience with Laravel framework and PHP/Full stack development\n\n· Write, create, and maintain plugin-based features (not theme-based changes)\n\n· Experience with WP GraphQL\n\n· Experience with Advanced Custom Fields\n\n· General Web Dev Knowledge\n\n· Expert-level knowledge of Git version control\n\n· Execute CI/CD best practices (and preferably Jenkins specifically)\n\n· Manage NextJS in a production environment at the Enterprise level\n\n· Work on React components driven by the Apollo client (or similar GraphQL interface)\n\n· Experience with marketing automation suite such as Pardot, Hubspot or Marketo for creating forms and email\n\ntemplates\n\n· Experience integrating sales &amp; marketing tech stacks to website, including but not limited to Salesforce, Salesloft, Pardot, Google Tag Manager, etc.\n\nWhat experiences and expertise would you need to play this role?\n• Expertise in multiple CMS including Wordpress, Laravel / BusinessPress, etc.\n• Create and maintain Guetenberg blocks\n• Extensive experience with Laravel framework and PHP/Full stack development\n• Write, create, and maintain plugin-based features (not theme-based changes)\n• Experience with WP GraphQL\n• Experience with Advanced Custom Fields\n• General Web Dev Knowledge\n• Expert-level knowledge of Git version control\n• Execute CI/CD best practices (and preferably Jenkins specifically)\n• Manage NextJS in a production environment at the Enterprise level\n• Work on React components driven by the Apollo client (or similar GraphQL interface)\n• Experience with marketing automation suite such as Pardot, Hubspot or Marketo for creating forms and email templates\n• Experience integrating sales &amp; marketing tech stacks to website, including but not limited to Salesforce, Salesloft, Pardot, Google Tag Manager, etc.\n\nWhat knowledge and skills do you need to have in order to be successful in this role?\n• 8-10 years experience in web, digital, email\n• Good handle on SEO best practices and front-end security\n• Extensive experience with Laravel framework and PHP/Full stack development\n• Strong skills in CSS, familiarity with SASS/LESS and CSS Modules preferred\n• Solid proficiency with Adobe Creative Cloud (Photoshop, Illustrator, Figma)\n• Deep understanding of GraphQL spec\n• Strong knowledge of HTML, CSS and PHP\n• Effectively communicate paths and trade-offs to accomplish design goals\n• Handling multiple priorities on tight deadlines without compromising quality\n• Positive attitude, easy-going personality, great work ethic, amazing communication skills\n• Ability to thrive in a fast paced, consistently evolving business environment with an engaged and upbeat nature.\n• **Include links to 3-5 websites you’ve built from the ground up\n\nWhat we offer at Nium\n\nWe Value Performance: Through competitive salaries, performance bonuses, uncapped sales commissions and robust performance reviews, we ensure that all employees are rewarded and incentivized for their hard work.\n\nWe Care for Our Employees: The wellness of Nium’ers is our #1 priority. In addition to many other benefits, we offer medical coverage, 24/7 employee assistance program, generous time off policies, and a year-end shut down. We also provide a hybrid working environment (3 days per week in the office).\n\nWe Upskill Ourselves: We are curious, always want to learn more and upskill ourselves. As well as role-specific training, we also offer a global learning stipend.\n\nWe Constantly Innovate: Nium continues to be globally recognized for its constant innovations, growth, and employee-centric mindset since our inception:\n\n-2022 Great Place To Work Certification\n\n-2023 CB Insights Fintech 100 List of Most Promising Fintech Companies.\n\nWe Celebrate Together: Work is also about having fun with your colleagues and forging deep relationships. We host company-wide social events onsite and virtually, provide team morale budget and bonding activities, happy hours, team offsites, and much more!\n\nWe Thrive with Diversity: Across 33 nationalities and 18+ countries, our diverse and multicultural team embodies our commitment to a safe and welcoming environment for everyone.\n\nWhat it’s like to be a Nium'er\n\nAt Nium we center our way of work around 3 core values globally:\n\n#KeepItSimple: We cut through complexity, simplify at speed and operate with scale in mind.\n\n#MakeItBetter: We build innovative solutions that make our customers' lives better.\n\n#WinItTogether: We win in this competitive market by collaborating as one team.\n\nFor more information, visit www.nium.com",
    image:
      "https://fonts.gstatic.com/s/i/googlematerialicons/auto_stories/v8/gm_grey-24dp/1x/gm_auto_stories_gm_grey_24dp.png",
    location: "Mumbai, Maharashtra, India   (+2 others)",
    employmentType: "Full-time",
    datePosted: "",
    salaryRange: "",
    jobProviders: [
      {
        jobProvider: "Lever",
        url: "https://jobs.lever.co/nium/b7b887f6-3c27-4311-83c2-677ddb9ca85a?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      },
      {
        jobProvider: "ZipRecruiter India",
        url: "https://www.ziprecruiter.in/jobs/301571023-senior-website-developer-web-development-at-nium?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
      },
    ],
  },
];
