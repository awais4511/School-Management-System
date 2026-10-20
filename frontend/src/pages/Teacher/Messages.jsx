import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { navItems_teacher } from "../../mockdata/data";
import { MdMessage, MdSend, MdSearch, MdAttachFile } from "react-icons/md";

const conversationsData = [
  {
    id: 1,
    name: "Principal - Dr. Ahmed",
    avatar: "PA",
    lastMessage: "Please submit your grades by Friday",
    timestamp: "2 hours ago",
    unread: true,
    messages: [
      { id: 1, sender: "Principal", text: "Please submit your grades by Friday", timestamp: "2 hours ago", isOwn: false },
      { id: 2, sender: "You", text: "Will do, sir", timestamp: "1 hour ago", isOwn: true },
    ],
  },
  {
    id: 2,
    name: "Parent - Mrs. Khan",
    avatar: "MK",
    lastMessage: "Thank you for the update about Fatima",
    timestamp: "5 hours ago",
    unread: false,
    messages: [
      { id: 1, sender: "Mrs. Khan", text: "How is Fatima doing in class?", timestamp: "6 hours ago", isOwn: false },
      { id: 2, sender: "You", text: "She is doing very well, top in the class", timestamp: "5 hours ago", isOwn: true },
      { id: 3, sender: "Mrs. Khan", text: "Thank you for the update about Fatima", timestamp: "5 hours ago", isOwn: false },
    ],
  },
  {
    id: 3,
    name: "Staff Group",
    avatar: "SG",
    lastMessage: "Staff meeting tomorrow at 3 PM",
    timestamp: "1 day ago",
    unread: false,
    messages: [
      { id: 1, sender: "Admin", text: "Staff meeting tomorrow at 3 PM", timestamp: "1 day ago", isOwn: false },
    ],
  },
  {
    id: 4,
    name: "Parent - Mr. Hassan",
    avatar: "MH",
    lastMessage: "Can you help with math homework?",
    timestamp: "2 days ago",
    unread: false,
    messages: [
      { id: 1, sender: "Mr. Hassan", text: "Can you help with math homework?", timestamp: "2 days ago", isOwn: false },
    ],
  },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversationsData[0]);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState(conversationsData);

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
    <DashboardLayout role="Teacher" navItems={navItems_teacher}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <MdMessage className="text-teal-500 text-2xl" /> Messages
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}` : "All caught up"}
          </p>
        </div>
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
                className="w-full border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
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
                    ? "bg-teal-50 border-l-4 border-teal-500"
                    : "hover:bg-slate-50"
                } ${conv.unread ? "bg-slate-50" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold text-slate-800 truncate ${conv.unread ? "font-bold" : ""}`}>
                      {conv.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread && (
                    <div className="w-2 h-2 rounded-full bg-teal-600 flex-shrink-0" />
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center font-semibold text-sm">
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
                          ? "bg-teal-600 text-white rounded-br-none"
                          : "bg-slate-100 text-slate-800 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? "text-teal-100" : "text-slate-500"}`}>
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
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="p-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
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
