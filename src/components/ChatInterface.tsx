
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizonal, LogOut } from 'lucide-react';
import { useChatbot } from '@/context/ChatbotContext';
import { format } from 'date-fns';

const ChatInterface: React.FC = () => {
  const { userInfo, messages, addMessage, logout } = useChatbot();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to the chat
    addMessage(input, 'user');
    
    // Clear input field
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // In a real implementation, we would make an API call to the Ollama/Gemma backend
    // For now, we'll simulate a response after a delay
    setTimeout(() => {
      setIsTyping(false);
      addMessage("This is a simulated response from the chatbot. In the actual implementation, this would be a response from the Ollama/Gemma3 model running on your Jupyter notebook.", 'bot');
    }, 1500);
  };

  // Get the first letter of the name for avatar fallback
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Format message timestamp
  const formatTime = (timestamp: Date) => {
    return format(timestamp, 'h:mm a');
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-2">
            <AvatarImage src="" /> 
            <AvatarFallback className="bg-college-primary text-white">
              {userInfo?.name ? getInitials(userInfo.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{userInfo?.name || 'User'}</h2>
            <p className="text-xs text-muted-foreground">
              {userInfo?.userType === 'faculty' && 'Faculty'}
              {userInfo?.userType === 'student' && 'Student'}
              {userInfo?.userType === 'visitor' && 'Visitor'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={logout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <Card
              className={`max-w-[80%] ${
                message.sender === 'user'
                  ? 'bg-college-primary text-white'
                  : 'bg-white'
              }`}
            >
              <CardContent className="p-3">
                <p>{message.content}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === 'user'
                      ? 'text-college-light'
                      : 'text-muted-foreground'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <Card className="max-w-[80%] bg-white">
              <CardContent className="p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-150"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Invisible element to scroll to */}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" className="bg-college-primary hover:bg-college-accent">
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
