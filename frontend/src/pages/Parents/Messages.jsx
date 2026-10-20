import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { MdDashboard, MdBarChart, MdCheckCircle, MdAssignment, MdAttachMoney, MdEvent, MdMessage, MdSend, MdAttachFile } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { parentConversationsData } from "../../mockdata/parentMessagesData";

const navItems = [
  { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard/parent" },
  { icon: <MdBarChart />, label: "Progress", path: "/dashboard/parent/progress" },
  { icon: <MdCheckCircle />, label: "Attendance", path: "/dashboard/parent/attendance" },
  { icon: <MdAssignment />, label: "Results", path: "/dashboard/parent/results" },
  { icon: <MdAttachMoney />, label: "Fees", path: "/dashboard/parent/fees" },
  { icon: <MdEvent />, label: "Events", path: "/dashboard/parent/events" },
  { icon: <MdMessage />, label: "Messages", path: "/dashboard/parent/messages" },
];

const conversationsData = [
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

export default function ParentMessages() {
  const [selectedConversation, setSelectedConversation] = useState(parentConversationsData[0]);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState(parentConversationsData);

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;

    const newMessage = {
      id: Math.max(...selectedConversation.messages.map((m) => m.id), 0) + 1,
      sender: "You",
      text: messageText,
      timestamp: "now",
      isOwn: true,
    };

    const updatedConversations = conversations.map((conv) =>
      conv.id === selectedConversation.id
        ? {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: messageText,
            timestamp: "now",
          }
        : conv
    );

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
    });
    setMessageText("");
  };

  const unreadCount = conversations.filter((conv) => conv.unread).length;

  return (
    <DashboardLayout role="Parent" navItems={navItems}>
      <div className="bg-gradient-to-r from-cyan-700 to-blue-600 rounded-2xl p-5 mb-6 text-white flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-2xl font-bold">Messages</h2>
          <p className="text-cyan-200 text-sm mt-1">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}` : "All caught up"}
          </p>
        </div>
        <MdMessage className="text-6xl opacity-20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-[calc(100vh-200px)]">
        <div className="lg:col-span-1 bg-white rounded-2xl shadow p-5 flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              />
              <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  selectedConversation.id === conv.id
                    ? "bg-cyan-50 border-l-4 border-cyan-500"
                    : "hover:bg-slate-50"
                } ${conv.unread ? "bg-slate-50" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold text-slate-800 truncate ${conv.unread ? "font-bold" : ""}`}>
                      {conv.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread && (
                    <div className="w-2 h-2 rounded-full bg-cyan-600 flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow flex flex-col overflow-hidden">
          {selectedConversation && (
            <>
              <div className="border-b border-slate-200 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                    {selectedConversation.avatar}
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800">{selectedConversation.name}</h2>
                    <p className="text-xs text-slate-500">Active now</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? "bg-cyan-600 text-white rounded-br-none"
                          : "bg-slate-100 text-slate-800 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? "text-cyan-100" : "text-slate-500"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 p-4">
                <div className="flex items-end gap-3">
                  <button className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors">
                    <MdAttachFile className="text-xl text-slate-600" />
                  </button>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="p-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                    disabled={messageText.trim() === ""}
                  >
                    <MdSend className="text-xl" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
