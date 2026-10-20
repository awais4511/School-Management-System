import { FaChalkboardTeacher, FaCheckCircle, FaUserGraduate } from "react-icons/fa";
import { MdAssignment, MdBarChart, MdCampaign, MdCheckCircle, MdCreditCard, MdDashboard, MdFamilyRestroom, MdGroups, MdHandshake, MdMenuBook, MdMessage, MdPerson, MdSchedule, MdSchool, MdSettings, MdSportsScore, MdTrendingUp } from "react-icons/md";

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const SHORT_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const periods = [
  { id: 1, label: "Period 1", start: "08:00", end: "08:45" },
  { id: 2, label: "Period 2", start: "08:50", end: "09:35" },
  { id: 3, label: "Break",    start: "09:35", end: "10:00", isBreak: true },
  { id: 4, label: "Period 3", start: "10:00", end: "10:45" },
  { id: 5, label: "Period 4", start: "10:50", end: "11:35" },
  { id: 6, label: "Lunch",    start: "11:35", end: "12:15", isBreak: true },
  { id: 7, label: "Period 5", start: "12:15", end: "13:00" },
  { id: 8, label: "Period 6", start: "13:05", end: "13:50" },
  { id: 9, label: "Period 7", start: "13:55", end: "14:40" },
];

export const subjectColors = {
  Mathematics:   "bg-violet-100 text-violet-800 border-violet-300",
  Physics:       "bg-blue-100 text-blue-800 border-blue-300",
  Chemistry:     "bg-emerald-100 text-emerald-800 border-emerald-300",
  Biology:       "bg-green-100 text-green-800 border-green-300",
  English:       "bg-amber-100 text-amber-800 border-amber-300",
  Urdu:          "bg-rose-100 text-rose-800 border-rose-300",
  "Pak Studies": "bg-teal-100 text-teal-800 border-teal-300",
  Islamiat:      "bg-lime-100 text-lime-800 border-lime-300",
  "Computer Sc": "bg-cyan-100 text-cyan-800 border-cyan-300",
  History:       "bg-orange-100 text-orange-800 border-orange-300",
  Geography:     "bg-indigo-100 text-indigo-800 border-indigo-300",
  Art:           "bg-pink-100 text-pink-800 border-pink-300",
};

export const timetable = {
  0: { 0: { subject: "Mathematics",   teacher: "Mr. Tariq",   room: "R-101" },
       1: { subject: "Physics",        teacher: "Ms. Zainab",  room: "R-202" },
       3: { subject: "English",        teacher: "Ms. Fatima",  room: "R-103" },
       4: { subject: "Chemistry",      teacher: "Mr. Asad",    room: "Lab-1" },
       6: { subject: "Urdu",           teacher: "Mr. Naveed",  room: "R-104" },
       7: { subject: "Islamiat",       teacher: "Mr. Usman",   room: "R-105" },
       8: { subject: "Computer Sc",    teacher: "Ms. Hira",    room: "Lab-2" } },
  1: { 0: { subject: "English",       teacher: "Ms. Fatima",  room: "R-103" },
       1: { subject: "Biology",        teacher: "Ms. Ayesha",  room: "Lab-3" },
       3: { subject: "Mathematics",    teacher: "Mr. Tariq",   room: "R-101" },
       4: { subject: "Urdu",           teacher: "Mr. Naveed",  room: "R-104" },
       6: { subject: "Physics",        teacher: "Ms. Zainab",  room: "R-202" },
       7: { subject: "Pak Studies",    teacher: "Mr. Bilal",   room: "R-106" },
       8: { subject: "Geography",      teacher: "Ms. Nadia",   room: "R-107" } },
  2: { 0: { subject: "Chemistry",     teacher: "Mr. Asad",    room: "Lab-1" },
       1: { subject: "Mathematics",    teacher: "Mr. Tariq",   room: "R-101" },
       3: { subject: "Biology",        teacher: "Ms. Ayesha",  room: "Lab-3" },
       4: { subject: "English",        teacher: "Ms. Fatima",  room: "R-103" },
       6: { subject: "Computer Sc",    teacher: "Ms. Hira",    room: "Lab-2" },
       7: { subject: "History",        teacher: "Mr. Kamran",  room: "R-108" },
       8: { subject: "Islamiat",       teacher: "Mr. Usman",   room: "R-105" } },
  3: { 0: { subject: "Urdu",          teacher: "Mr. Naveed",  room: "R-104" },
       1: { subject: "Chemistry",      teacher: "Mr. Asad",    room: "Lab-1" },
       3: { subject: "Physics",        teacher: "Ms. Zainab",  room: "R-202" },
       4: { subject: "Mathematics",    teacher: "Mr. Tariq",   room: "R-101" },
       6: { subject: "Art",            teacher: "Ms. Sara",    room: "Art-1" },
       7: { subject: "English",        teacher: "Ms. Fatima",  room: "R-103" },
       8: { subject: "Geography",      teacher: "Ms. Nadia",   room: "R-107" } },
  4: { 0: { subject: "Biology",       teacher: "Ms. Ayesha",  room: "Lab-3" },
       1: { subject: "Urdu",           teacher: "Mr. Naveed",  room: "R-104" },
       3: { subject: "Computer Sc",    teacher: "Ms. Hira",    room: "Lab-2" },
       4: { subject: "Physics",        teacher: "Ms. Zainab",  room: "R-202" },
       6: { subject: "Mathematics",    teacher: "Mr. Tariq",   room: "R-101" },
       7: { subject: "Chemistry",      teacher: "Mr. Asad",    room: "Lab-1" },
       8: { subject: "Pak Studies",    teacher: "Mr. Bilal",   room: "R-106" } },
  5: { 0: { subject: "Pak Studies",   teacher: "Mr. Bilal",   room: "R-106" },
       1: { subject: "History",        teacher: "Mr. Kamran",  room: "R-108" },
       3: { subject: "Art",            teacher: "Ms. Sara",    room: "Art-1" },
       4: { subject: "Geography",      teacher: "Ms. Nadia",   room: "R-107" },
       6: { subject: "Islamiat",       teacher: "Mr. Usman",   room: "R-105" },
       7: null,
       8: null },
};

export const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export const DAY_LABELS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

export const navItems = [
  { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard/admin" },
  { icon: <FaChalkboardTeacher />, label: "Teachers", path: "/dashboard/admin/teachers" },
  { icon: <FaUserGraduate />, label: "Students", path: "/dashboard/admin/students" },
  { icon: <MdFamilyRestroom />, label: "Parents", path: "/dashboard/admin/parents" },
  { icon: <MdSchedule />, label: "Timetable", path: "/dashboard/admin/timetable" },
  { icon: <MdCampaign/>, label: "Announcements", path: "/dashboard/admin/announcements" },
  { icon: <MdSettings />, label: "Settings", path: "/dashboard/admin/settings" },
];

export  const initialClasses = [
  {
    id: 1,
    name: "Grade 5-A",
    students: [
      { id: 1, name: "Ayesha Khan", rollNo: "501", status: "present" },
      { id: 2, name: "Bilal Ahmed", rollNo: "502", status: "present" },
      { id: 3, name: "Sara Noor", rollNo: "503", status: "absent" },
    ],
  },
  {
    id: 2,
    name: "Grade 7-B",
    students: [
      { id: 1, name: "Omar Farooq", rollNo: "701", status: "present" },
      { id: 2, name: "Nadia Hussain", rollNo: "702", status: "absent" },
      { id: 3, name: "Usman Ali", rollNo: "703", status: "present" },
    ],
  },
  {
    id: 3,
    name: "Grade 9-C",
    students: [
      { id: 1, name: "Sana Malik", rollNo: "901", status: "absent" },
      { id: 2, name: "Hamza Tariq", rollNo: "902", status: "present" },
    ],
  },
];

export const INITIAL_TEACHERS = [
  {
    id: "T001",
    first: "Sarah",
    last: "Mitchell",
    email: "s.mitchell@school.edu",
    phone: "+1 555 0101",
    subject: "Mathematics",
    qual: "M.Sc. Math",
    status: "Active",
    joined: "2021-08-15",
  },
  {
    id: "T002",
    first: "James",
    last: "Okafor",
    email: "j.okafor@school.edu",
    phone: "+1 555 0202",
    subject: "Physics",
    qual: "Ph.D. Physics",
    status: "Active",
    joined: "2019-01-10",
  },
  {
    id: "T003",
    first: "Priya",
    last: "Sharma",
    email: "p.sharma@school.edu",
    phone: "+1 555 0303",
    subject: "Chemistry",
    qual: "M.Sc. Chemistry",
    status: "Inactive",
    joined: "2020-03-22",
  },
  {
    id: "T004",
    first: "Chen",
    last: "Wei",
    email: "c.wei@school.edu",
    phone: "+1 555 0404",
    subject: "Computer Sci.",
    qual: "B.Tech CS",
    status: "Active",
    joined: "2022-07-01",
  },
  {
    id: "T005",
    first: "Amara",
    last: "Diallo",
    email: "a.diallo@school.edu",
    phone: "+1 555 0505",
    subject: "English",
    qual: "M.A. English Lit",
    status: "Active",
    joined: "2018-09-05",
  },
  {
    id: "T006",
    first: "Roberto",
    last: "Vega",
    email: "r.vega@school.edu",
    phone: "+1 555 0606",
    subject: "History",
    qual: "M.A. History",
    status: "Inactive",
    joined: "2021-02-14",
  },
  {
    id: "T007",
    first: "Fatima",
    last: "Hassan",
    email: "f.hassan@school.edu",
    phone: "+1 555 0707",
    subject: "Biology",
    qual: "M.Sc. Biology",
    status: "Active",
    joined: "2023-01-20",
  },
];

export const EMPTY_FORM = {
  first: "",
  last: "",
  email: "",
  phone: "",
  subject: "",
  qual: "",
  status: "Active",
  joined: new Date().toISOString().split("T")[0],
};

export const AVATAR_COLORS = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-blue-700",
  "from-rose-500 to-rose-700",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-sky-500 to-cyan-600",
  "from-pink-500 to-fuchsia-600",
];

export const initialClassData = [
  {
    grade: "Grade 5-A",
    classTeacher: "Mr. Imran Shah",
    students: [
      {
        name: "Bilal Ahmed",
        roll: "501",
        fatherName: "Ahmed Raza",
        motherName: "Fatima Ahmed",
        phone: "0300-1234567",
        email: "ahmed.raza@email.com",
        relation: "Father",
      },
      {
        name: "Zara Siddiqui",
        roll: "502",
        fatherName: "Tariq Siddiqui",
        motherName: "Amna Tariq",
        phone: "0321-9876543",
        email: "tariq.sid@email.com",
        relation: "Father",
      },
      {
        name: "Hassan Ali",
        roll: "503",
        fatherName: "Ali Nawaz",
        motherName: "Rukhsana Ali",
        phone: "0333-4567890",
        email: "ali.nawaz@email.com",
        relation: "Mother",
      },
    ],
  },
  {
    grade: "Grade 7-B",
    classTeacher: "Ms. Sobia Naz",
    students: [
      {
        name: "Omar Farooq",
        roll: "701",
        fatherName: "Farooq Ahmad",
        motherName: "Nadia Farooq",
        phone: "0312-3456789",
        email: "farooq.ahmad@email.com",
        relation: "Father",
      },
      {
        name: "Maham Iqbal",
        roll: "702",
        fatherName: "Iqbal Hussain",
        motherName: "Shazia Iqbal",
        phone: "0345-6789012",
        email: "iqbal.hussain@email.com",
        relation: "Father",
      },
      {
        name: "Usman Tariq",
        roll: "703",
        fatherName: "Tariq Mehmood",
        motherName: "Bushra Tariq",
        phone: "0300-7654321",
        email: "tariq.m@email.com",
        relation: "Mother",
      },
      {
        name: "Aleena Riaz",
        roll: "704",
        fatherName: "Riaz Akhtar",
        motherName: "Nasreen Riaz",
        phone: "0322-1234567",
        email: "riaz.akhtar@email.com",
        relation: "Father",
      },
    ],
  },
  {
    grade: "Grade 8-D",
    classTeacher: "Mr. Khalid Mehmood",
    students: [
      {
        name: "Nadia Hussain",
        roll: "801",
        fatherName: "Hussain Baig",
        motherName: "Saima Hussain",
        phone: "0311-2345678",
        email: "hussain.baig@email.com",
        relation: "Father",
      },
      {
        name: "Faisal Rehman",
        roll: "802",
        fatherName: "Abdul Rehman",
        motherName: "Zainab Rehman",
        phone: "0333-8765432",
        email: "abdulrehman@email.com",
        relation: "Father",
      },
      {
        name: "Sara Jamil",
        roll: "803",
        fatherName: "Jamil Akhtar",
        motherName: "Kiran Jamil",
        phone: "0344-5678901",
        email: "jamil.akhtar@email.com",
        relation: "Mother",
      },
    ],
  },
  {
    grade: "Grade 9-A",
    classTeacher: "Ms. Rabia Zafar",
    students: [
      {
        name: "Ayesha Khan",
        roll: "901",
        fatherName: "Imran Khan",
        motherName: "Sadia Imran",
        phone: "0300-9988776",
        email: "imran.khan@email.com",
        relation: "Father",
      },
      {
        name: "Hamza Sheikh",
        roll: "902",
        fatherName: "Shafique Sheikh",
        motherName: "Hina Sheikh",
        phone: "0321-6655443",
        email: "shafique.sheikh@email.com",
        relation: "Father",
      },
      {
        name: "Iqra Yousuf",
        roll: "903",
        fatherName: "Yousuf Mirza",
        motherName: "Asma Yousuf",
        phone: "0312-4433221",
        email: "yousuf.mirza@email.com",
        relation: "Mother",
      },
      {
        name: "Daniyal Aslam",
        roll: "904",
        fatherName: "Aslam Butt",
        motherName: "Shahnaz Aslam",
        phone: "0333-1122334",
        email: "aslam.butt@email.com",
        relation: "Father",
      },
    ],
  },
  {
    grade: "Grade 11-C",
    classTeacher: "Mr. Adnan Qureshi",
    students: [
      {
        name: "Sana Malik",
        roll: "1101",
        fatherName: "Malik Pervaiz",
        motherName: "Farah Malik",
        phone: "0345-9988001",
        email: "malik.pervaiz@email.com",
        relation: "Father",
      },
      {
        name: "Talha Noor",
        roll: "1102",
        fatherName: "Noor Ul Haq",
        motherName: "Samina Noor",
        phone: "0300-3344556",
        email: "noor.ul.haq@email.com",
        relation: "Father",
      },
      {
        name: "Maryam Zahid",
        roll: "1103",
        fatherName: "Zahid Abbas",
        motherName: "Lubna Zahid",
        phone: "0321-7788990",
        email: "zahid.abbas@email.com",
        relation: "Mother",
      },
    ],
  },
];

export const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-blue-700",
  "from-rose-500 to-rose-700",
  "from-amber-500 to-orange-600",
  "from-teal-500 to-teal-700",
  "from-pink-500 to-pink-700",
];

export const emptyForm = {
  studentName: "",
  roll: "",
  grade: "",
  fatherName: "",
  motherName: "",
  phone: "",
  email: "",
  relation: "Father",
};

export const stats = [
  { label: "Total Students", value: "1,284", change: "+12", Icon: FaUserGraduate, color: "from-violet-500 to-purple-600" },
  { label: "Total Teachers", value: "86", change: "+3", Icon: FaChalkboardTeacher, color: "from-blue-500 to-blue-700" },
  { label: "Parents Registered", value: "1,102", change: "+8", Icon: MdFamilyRestroom, color: "from-rose-500 to-rose-700" },
  { label: "Active Classes", value: "42", change: "0", Icon: MdMenuBook, color: "from-amber-500 to-orange-600" },
];

export const recentAdmissions = [
  { name: "Ayesha Khan", class: "Grade 9-A", date: "Today", status: "Active" },
  { name: "Omar Farooq", class: "Grade 7-B", date: "Yesterday", status: "Active" },
  { name: "Sana Malik", class: "Grade 11-C", date: "2 days ago", status: "Pending" },
  { name: "Bilal Ahmed", class: "Grade 5-A", date: "3 days ago", status: "Active" },
  { name: "Nadia Hussain", class: "Grade 8-D", date: "4 days ago", status: "Active" },
];

export const announcements = [
  { title: "Annual Sports Day — May 20", time: "2h ago" },
  { title: "Parent-Teacher Meeting on Friday", time: "5h ago" },
  { title: "Mid-term exam schedule released", time: "1d ago" },
];

export const announcement = [
  {
    id: 1,
    title: "Final Exam Schedule Released",
    time: "May 17, 2026 · 9:00 AM",
    author: "Principal Ahmed",
    role: "student",
    Icon: MdAssignment,
  },
  {
    id: 2,
    title: "Staff Meeting – Curriculum Review",
    time: "May 16, 2026 · 11:30 AM",
    author: "Vice Principal",
    role: "teacher",
    Icon: MdGroups,
  },
  {
    id: 3,
    title: "Parent-Teacher Conference – Next Week",
    time: "May 15, 2026 · 2:00 PM",
    author: "School Administration",
    role: "parent",
    Icon: MdHandshake,
  },
  {
    id: 4,
    title: "Library Books Due – End of Term",
    time: "May 14, 2026 · 8:00 AM",
    author: "Head Librarian",
    role: "student",
    Icon: MdMenuBook,
  },
  {
    id: 5,
    title: "Grade Submission Deadline",
    time: "May 13, 2026 · 10:00 AM",
    author: "Academic Director",
    role: "teacher",
    Icon: MdBarChart,
  },
  {
    id: 6,
    title: "Fee Payment Reminder – Q2 Term",
    time: "May 12, 2026 · 9:00 AM",
    author: "Finance Department",
    role: "parent",
    Icon: MdCreditCard,
  },
  {
    id: 7,
    title: "Sports Day – Participation Forms",
    time: "May 11, 2026 · 12:00 PM",
    author: "Sports Coordinator",
    role: "student",
    Icon: MdSportsScore,
  },
  {
    id: 8,
    title: "Student Progress Reports Available",
    time: "May 10, 2026 · 4:00 PM",
    author: "Academic Office",
    role: "parent",
    Icon: MdTrendingUp,
  },
];

export const ROLES = [
  { key: "all",     label: "All",     Icon: MdDashboard },
  { key: "student", label: "Student", Icon: MdSchool },
  { key: "teacher", label: "Teacher", Icon: MdPerson },
  { key: "parent",  label: "Parent",  Icon: MdFamilyRestroom },
];

export const ROLE_COLORS = {
  student: { badge: "bg-blue-100 text-blue-700",    iconBg: "bg-blue-50",    iconColor: "text-blue-500"   },
  teacher: { badge: "bg-violet-100 text-violet-700", iconBg: "bg-violet-50",  iconColor: "text-violet-500" },
  parent:  { badge: "bg-orange-100 text-orange-700", iconBg: "bg-orange-50",  iconColor: "text-orange-500" },
};

export const navItems_teacher = [
  { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard/teacher" },
  { icon: <FaChalkboardTeacher />, label: "My Classes", path: "/dashboard/teacher/classes" },
  { icon: <MdAssignment />, label: "Assignments", path: "/dashboard/teacher/assignments" },
  { icon: <MdCheckCircle />, label: "Attendance", path: "/dashboard/teacher/attendance" },
  { icon: <MdBarChart />, label: "Gradebook", path: "/dashboard/teacher/grades" },
  { icon: <MdSchedule />, label: "Schedule", path: "/dashboard/teacher/schedule" },
  { icon: <MdMessage />, label: "Messages", path: "/dashboard/teacher/messages" },
];

export const stats_teacher = [
  { label: "My Students", value: "142", Icon: FaUserGraduate, color: "from-teal-500 to-emerald-600" },
  { label: "Classes Today", value: "5", Icon: MdMenuBook, color: "from-blue-500 to-blue-700" },
  { label: "Pending Assignments", value: "8", Icon: MdAssignment, color: "from-amber-500 to-orange-500" },
  { label: "Avg. Attendance", value: "91%", Icon: FaCheckCircle, color: "from-green-500 to-teal-600" },
];

export const schedule_teacher = [
  { time: "08:00", subject: "Mathematics", class: "Grade 9-A", room: "Room 12", status: "done" },
  { time: "09:30", subject: "Mathematics", class: "Grade 10-B", room: "Room 12", status: "done" },
  { time: "11:00", subject: "Statistics", class: "Grade 11-C", room: "Lab 3", status: "now" },
  { time: "13:00", subject: "Mathematics", class: "Grade 8-A", room: "Room 12", status: "upcoming" },
  { time: "14:30", subject: "Algebra", class: "Grade 12-B", room: "Room 7", status: "upcoming" },
];

export const pendingWork_teacher = [
  { task: "Grade Math Test — 9A", due: "Today", priority: "high" },
  { task: "Mark Attendance — 10B", due: "Today", priority: "high" },
  { task: "Upload Lesson Plan — Week 20", due: "Tomorrow", priority: "medium" },
  { task: "Parent Remarks — 8A", due: "Fri", priority: "low" },
];

export const CLASS_LIST = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];

export const initialStudents = [
  { id: 1, name: "Aisha Malik", roll: "001", grade: "A", attendance: 95, currentClass: "Class 3", avatar: "AM" },
  { id: 2, name: "Bilal Hassan", roll: "002", grade: "B+", attendance: 88, currentClass: "Class 3", avatar: "BH" },
  { id: 3, name: "Fatima Noor", roll: "003", grade: "A+", attendance: 99, currentClass: "Class 3", avatar: "FN" },
  { id: 4, name: "Usman Tariq", roll: "004", grade: "C", attendance: 72, currentClass: "Class 3", avatar: "UT" },
  { id: 5, name: "Zara Ahmed", roll: "005", grade: "B", attendance: 81, currentClass: "Class 3", avatar: "ZA" },
  { id: 6, name: "Ali Raza", roll: "006", grade: "A", attendance: 93, currentClass: "Class 3", avatar: "AR" },
];