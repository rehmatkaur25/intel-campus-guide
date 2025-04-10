
import React from 'react';
import { ChatbotProvider } from '@/context/ChatbotContext';
import ChatbotContainer from '@/components/ChatbotContainer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <header className="bg-college-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-xl">College Assistant</div>
          <div className="text-sm">Powered by Gemma 3</div>
        </div>
      </header>
      
      <main>
        <ChatbotProvider>
          <ChatbotContainer />
        </ChatbotProvider>
      </main>
    </div>
  );
};

export default Index;
