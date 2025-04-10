
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { sendMessageToJupyter } from '@/services/jupyterService';

// Define user types
export type UserType = 'faculty' | 'student' | 'visitor' | null;

// Define user information structure
export interface UserInfo {
  userType: UserType;
  name: string;
  regNumber?: string; // For faculty and students
  email?: string;     // For visitors
  phone?: string;     // For visitors (alternative to email)
}

// Define chat message structure
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Define the context type
interface ChatbotContextType {
  userInfo: UserInfo | null;
  messages: ChatMessage[];
  isAuthenticated: boolean;
  isLoading: boolean;
  setUserType: (type: UserType) => void;
  setUserInfo: (info: UserInfo) => void;
  addMessage: (content: string, sender: 'user' | 'bot') => void;
  sendMessage: (content: string) => Promise<void>;
  authenticate: () => void;
  resetChat: () => void;
  logout: () => void;
}

// Create the context with default values
const ChatbotContext = createContext<ChatbotContextType>({
  userInfo: null,
  messages: [],
  isAuthenticated: false,
  isLoading: false,
  setUserType: () => {},
  setUserInfo: () => {},
  addMessage: () => {},
  sendMessage: async () => {},
  authenticate: () => {},
  resetChat: () => {},
  logout: () => {},
});

// Provider component
export const ChatbotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setUserType = (type: UserType) => {
    setUserInfoState(prev => ({ ...prev as UserInfo, userType: type }));
  };

  const setUserInfo = (info: UserInfo) => {
    setUserInfoState(info);
  };

  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // New function to send messages to Jupyter and handle the response
  const sendMessage = async (content: string) => {
    // Add user message to the chat
    addMessage(content, 'user');
    
    try {
      // Send message to Jupyter and get response
      const response = await sendMessageToJupyter(content);
      
      // Add bot response to the chat
      addMessage(response.response, 'bot');
    } catch (error) {
      console.error('Error handling message:', error);
      addMessage('Sorry, something went wrong. Please try again.', 'bot');
    }
  };

  // In a real implementation, this would actually verify credentials with a backend
  const authenticate = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoading(false);
      // Updated welcome message to use V-BOT
      addMessage(`Hello ${userInfo?.name}! I'm V-BOT, your AI assistant. How can I help you today?`, 'bot');
    }, 1500);
  };

  const resetChat = () => {
    setMessages([]);
  };

  const logout = () => {
    setUserInfoState(null);
    setMessages([]);
    setIsAuthenticated(false);
  };

  const value = {
    userInfo,
    messages,
    isAuthenticated,
    isLoading,
    setUserType,
    setUserInfo,
    addMessage,
    sendMessage,
    authenticate,
    resetChat,
    logout,
  };

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
