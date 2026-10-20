export const parentConversationsData = [
  {
    id: 1,
    name: "Principal - Dr. Ahmed",
    avatar: "PA",
    lastMessage: "We're pleased with Ali's progress",
    timestamp: "1 hour ago",
    unread: true,
    messages: [
      { id: 1, sender: "Principal", text: "We're pleased with Ali's progress", timestamp: "1 hour ago", isOwn: false },
      { id: 2, sender: "You", text: "Thank you, he's working hard", timestamp: "45 min ago", isOwn: true },
    ],
  },
  {
    id: 2,
    name: "Teacher - Mr. Hassan",
    avatar: "MH",
    lastMessage: "Midterm preparations are on track",
    timestamp: "3 hours ago",
    unread: false,
    messages: [
      { id: 1, sender: "Mr. Hassan", text: "How can we help with exam prep?", timestamp: "4 hours ago", isOwn: false },
      { id: 2, sender: "You", text: "He needs help with Chemistry", timestamp: "3 hours ago", isOwn: true },
      { id: 3, sender: "Mr. Hassan", text: "Midterm preparations are on track", timestamp: "3 hours ago", isOwn: false },
    ],
  },
  {
    id: 3,
    name: "School Admin",
    avatar: "SA",
    lastMessage: "Fee reminder for May 2026",
    timestamp: "1 day ago",
    unread: false,
    messages: [
      { id: 1, sender: "Admin", text: "Fee reminder for May 2026", timestamp: "1 day ago", isOwn: false },
    ],
  },
];
