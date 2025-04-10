
import React from 'react';
import { useChatbot } from '@/context/ChatbotContext';
import UserTypeSelector from './UserTypeSelector';
import RegistrationForm from './RegistrationForm';
import ChatInterface from './ChatInterface';
import LoadingSpinner from './LoadingSpinner';

const ChatbotContainer: React.FC = () => {
  const { userInfo, isAuthenticated, isLoading, setUserInfo } = useChatbot();

  // Handler to go back to user type selection
  const handleBackToTypeSelection = () => {
    setUserInfo(null);
  };

  // Render the appropriate component based on authentication state
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    
    if (isAuthenticated) {
      return <ChatInterface />;
    }
    
    if (userInfo?.userType) {
      return <RegistrationForm onBack={handleBackToTypeSelection} />;
    }
    
    return <UserTypeSelector />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-college-light to-white">
      {renderContent()}
    </div>
  );
};

export default ChatbotContainer;
