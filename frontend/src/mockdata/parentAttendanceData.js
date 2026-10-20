export const parentChildren = [
  { id: 1, name: "Ali Ahmed", class: "Grade 9-A" },
  { id: 2, name: "Aisha Ahmed", class: "Grade 7-B" },
];

export const parentAttendanceData = {
  1: {
    name: "Ali Ahmed",
    currentMonth: { present: 22, total: 22, percentage: 100 },
    months: {
      January: { present: 20, total: 22, percentage: 91 },
      February: { present: 21, total: 21, percentage: 100 },
      March: { present: 19, total: 22, percentage: 86 },
      April: { present: 22, total: 22, percentage: 100 },
      May: { present: 22, total: 22, percentage: 100 },
    },
  },
  2: {
    name: "Aisha Ahmed",
    currentMonth: { present: 20, total: 21, percentage: 95 },
    months: {
      January: { present: 21, total: 22, percentage: 95 },
      February: { present: 20, total: 21, percentage: 95 },
      March: { present: 22, total: 22, percentage: 100 },
      April: { present: 20, total: 22, percentage: 91 },
      May: { present: 20, total: 21, percentage: 95 },
    },
  },
};
