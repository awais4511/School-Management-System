import { create } from "zustand";

const assignmentStore = create((set) => ({
  assignments: [
    {
      id: 1,
      title: "Chapter 5 Exercises",
      subject: "Mathematics",
      class: "10-A",
      dueDate: "2026-05-25",
      description: "Complete all exercises from Chapter 5, questions 1-50",
      maxMarks: 100,
      createdAt: "2026-05-19",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics",
      class: "10-A",
      dueDate: "2026-05-22",
      description: "Write a detailed lab report on Ohm's Law experiment",
      maxMarks: 50,
      createdAt: "2026-05-19",
    },
    {
      id: 3,
      title: "English Essay",
      subject: "English",
      class: "9-A",
      dueDate: "2026-05-28",
      description: "Write an essay on 'The Importance of Education' (2000 words)",
      maxMarks: 100,
      createdAt: "2026-05-19",
    },
  ],

  addAssignment: (assignment) =>
    set((state) => ({
      assignments: [
        ...state.assignments,
        {
          ...assignment,
          id: Math.max(...state.assignments.map((a) => a.id), 0) + 1,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ],
    })),

  updateAssignment: (id, assignment) =>
    set((state) => ({
      assignments: state.assignments.map((a) =>
        a.id === id ? { ...a, ...assignment } : a
      ),
    })),

  deleteAssignment: (id) =>
    set((state) => ({
      assignments: state.assignments.filter((a) => a.id !== id),
    })),

  getAssignmentById: (id) => {
    const state = assignmentStore.getState();
    return state.assignments.find((a) => a.id === id);
  },

  getAssignmentsByClass: (className) => {
    const state = assignmentStore.getState();
    return state.assignments.filter((a) => a.class === className);
  },

  getAssignmentsBySubject: (subject) => {
    const state = assignmentStore.getState();
    return state.assignments.filter((a) => a.subject === subject);
  },
}));

export default assignmentStore;
