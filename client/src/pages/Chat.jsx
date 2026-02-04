import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, User, Dog, ChevronLeft, MessageSquare, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

const Chat = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const userId = user._id || user.id;
        const response = await axios.get(`${API_URL}/messages/${userId}`);
        
        // Group messages by pet and the other person
        const groups = {};
        response.data.forEach(msg => {
          if (!msg.sender || !msg.receiver) return; // Skip messages with deleted users
          
          const otherPerson = msg.sender._id === userId ? msg.receiver : msg.sender;
          if (!otherPerson) return;
          
          const petId = msg.pet?._id || 'unknown';
          const groupId = `${petId}-${otherPerson._id}`;
          
          if (!groups[groupId]) {
            groups[groupId] = {
              id: groupId,
              otherPerson,
              pet: msg.pet,
              lastMessage: msg,
              allMessages: []
            };
          }
          groups[groupId].allMessages.push(msg);
          
          // Ensure lastMessage is actually the latest
          if (new Date(msg.createdAt) > new Date(groups[groupId].lastMessage.createdAt)) {
            groups[groupId].lastMessage = msg;
          }
        });

        const sortedConversations = Object.values(groups).sort((a, b) => 
          new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
        );

        setConversations(sortedConversations);
        
        // If there's a selected chat, update its messages
        if (selectedChat) {
          const updatedSelectedChat = sortedConversations.find(c => c.id === selectedChat.id);
          if (updatedSelectedChat) {
            setMessages(updatedSelectedChat.allMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
          }
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    const interval = setInterval(fetchConversations, 5000); // Poll for new messages
    return () => clearInterval(interval);
  }, [user, selectedChat?.id]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setMessages(chat.allMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat || sending) return;

    setSending(true);
    try {
      const userId = user._id || user.id;
      const response = await axios.post(`${API_URL}/messages`, {
        senderId: userId,
        receiverId: selectedChat.otherPerson._id,
        petId: selectedChat.pet._id,
        content: newMessage
      });

      const sentMsg = response.data.data;
      setMessages([...messages, sentMsg]);
      setNewMessage('');
      
      // Update conversations list immediately
      setConversations(prev => {
        const updated = prev.map(c => {
          if (c.id === selectedChat.id) {
            return {
              ...c,
              lastMessage: sentMsg,
              allMessages: [...c.allMessages, sentMsg]
            };
          }
          return c;
        });
        return updated.sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt));
      });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (loading && conversations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf2f8]">
        <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf2f8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto h-[calc(100vh-160px)] bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white flex">
        
        {/* Sidebar - Conversation List */}
        <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-col border-r border-gray-100 bg-gray-50/50`}>
          <div className="p-6 border-b border-gray-100 bg-white">
            <h2 className="text-2xl font-black text-gray-900 flex items-center">
              <MessageSquare className="mr-3 text-pink-500" />
              Messages
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {conversations.length === 0 ? (
              <div className="text-center py-10">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-pink-500" />
                </div>
                <p className="text-gray-500 font-bold">No conversations yet</p>
                <button 
                  onClick={() => navigate('/')}
                  className="mt-4 text-pink-600 font-black hover:underline"
                >
                  Find a pet to adopt
                </button>
              </div>
            ) : (
              conversations.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectChat(chat)}
                  className={`w-full text-left p-4 rounded-[2rem] transition-all flex items-center space-x-4 border-2 ${
                    selectedChat?.id === chat.id 
                      ? 'bg-white border-pink-500 shadow-lg shadow-pink-100 scale-[1.02]' 
                      : 'bg-white border-transparent hover:border-pink-200 hover:scale-[1.01]'
                  }`}
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                      {chat.pet?.image ? (
                        <img src={chat.pet.image} alt={chat.pet.name} className="w-full h-full object-cover" />
                      ) : (
                        <Dog className="text-pink-500" />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-gray-900 flex items-center justify-center border-2 border-white">
                      <User size={12} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-black text-gray-900 truncate">{chat.pet?.name || 'Deleted Pet'}</h3>
                      <span className="text-[10px] font-black text-gray-400 uppercase">
                        {new Date(chat.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-pink-600 mb-1">with {chat.otherPerson.username}</p>
                    <p className="text-sm text-gray-500 truncate font-medium">
                      {chat.lastMessage.sender._id === (user._id || user.id) ? 'You: ' : ''}
                      {chat.lastMessage.content}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${!selectedChat ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-white relative`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setSelectedChat(null)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-xl"
                  >
                    <ChevronLeft />
                  </button>
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center overflow-hidden border border-pink-100">
                    {selectedChat.pet?.image ? (
                      <img src={selectedChat.pet.image} alt={selectedChat.pet.name} className="w-full h-full object-cover" />
                    ) : (
                      <Dog className="text-pink-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-gray-900">{selectedChat.pet?.name}</h3>
                    <div className="flex items-center text-pink-600">
                      <User size={14} className="mr-1" />
                      <span className="text-sm font-bold">{selectedChat.otherPerson.username}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/pet/${selectedChat.pet._id}`)}
                  className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-black hover:bg-pink-500 transition-all"
                >
                  View Pet
                </button>
              </div>

              {/* Messages Display */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
                {messages.map((msg, idx) => {
                  const isMe = msg.sender._id === (user._id || user.id) || msg.sender === (user._id || user.id);
                  const showDate = idx === 0 || 
                    new Date(messages[idx-1].createdAt).toDateString() !== new Date(msg.createdAt).toDateString();
                  
                  return (
                    <React.Fragment key={msg._id || idx}>
                      {showDate && (
                        <div className="flex justify-center my-4">
                          <span className="bg-white px-4 py-1 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100 shadow-sm">
                            {new Date(msg.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      )}
                      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-6 py-4 rounded-[2rem] shadow-sm relative group ${
                          isMe 
                            ? 'bg-gray-900 text-white rounded-tr-none' 
                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                        }`}>
                          <p className="text-base font-medium leading-relaxed">{msg.content}</p>
                          <div className={`flex items-center mt-2 ${isMe ? 'justify-end text-gray-400' : 'justify-start text-gray-400'}`}>
                            <Clock size={10} className="mr-1" />
                            <span className="text-[10px] font-bold">
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-6 bg-white border-t border-gray-100">
                <form onSubmit={handleSendMessage} className="flex space-x-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-pink-500 outline-none font-medium transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || sending}
                    className="bg-pink-500 text-white p-4 rounded-[1.5rem] hover:bg-pink-600 transition-all shadow-lg shadow-pink-200 disabled:opacity-50 disabled:shadow-none active:scale-95"
                  >
                    {sending ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Send size={24} />
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="bg-pink-50 w-32 h-32 rounded-[3rem] flex items-center justify-center mb-8 rotate-12">
                <MessageSquare size={48} className="text-pink-500 -rotate-12" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">Your Inbox</h3>
              <p className="text-gray-500 max-w-sm font-medium text-lg">
                Select a conversation from the list to start messaging with pet owners or adopters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
