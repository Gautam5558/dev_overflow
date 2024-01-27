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
  { id: 4, tagName: "recent", count: 8 },
];

export const userFilters = [
  { id: 1, tagName: "new users", count: 23 },
  { id: 2, tagName: "old users", count: 15 },
  { id: 3, tagName: "top contributors", count: 11 },
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
