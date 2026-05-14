export const DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export const SLOTS = [
  "8:00-10:00",
  "10:00-12:00",
  "14:00-16:00",
  "16:00-18:00",
  "18:00-19:30",
  "19:30-21:00",
  "Sau 21:00",
];

export const LOCATIONS = ["Times City", "Smart City", "Online", "Tại nhà"];

export const HINHTHUCS = [
  "Offline Times City",
  "Offline Smart City",
  "Online",
  "Tại nhà",
];

export const PROGRAMS = ["Checkpoint", "IGCSE", "AS", "A LEVEL", "IB"];

export const ALL_SUBJECTS = ["Math", "Science", "Biology", "Chemistry", "Physics"];

export const ROLES = ["Giáo Viên", "Trợ giảng", "Trợ giảng - Admin"];

export const gradesByProgram = {
  Checkpoint: [6, 7, 8],
  IGCSE: [9, 10],
  AS: [11],
  "A LEVEL": [12],
  IB: [11, 12],
};

export const subjectsByProgram = {
  Checkpoint: ["Math", "Science"],
  IGCSE: ["Math", "Biology", "Chemistry", "Physics"],
  AS: ["Math", "Biology", "Chemistry", "Physics"],
  "A LEVEL": ["Math", "Biology", "Chemistry", "Physics"],
  IB: ["Math", "Biology", "Chemistry", "Physics"],
};

export const TOKENS = {
  bg: "#F4EFE6",
  surface: "#FBF8F3",
  surfaceAlt: "#EFE8D9",
  ink: "#1A1A1A",
  inkSoft: "#4A4742",
  muted: "#8A8377",
  border: "#E0D5BD",
  borderStrong: "#C9BBA0",
  accent: "#B85C38",
  accentDark: "#8F3F22",
  teal: "#1E5F5F",
  tealLight: "#D4E2DE",
  sage: "#7A8B6F",
  sageLight: "#DDE5D3",
  amber: "#D4A056",
  amberLight: "#F4E5C3",
  danger: "#A63E2C",
  dangerLight: "#F0D5CE",
};

export const HINHTHUC_LABELS = {
  "Offline Times City": "Times City",
  "Offline Smart City": "Smart City",
  Online: "Online",
  "Tại nhà": "Tại nhà",
};
