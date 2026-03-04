import React from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatAssistantButton = ({ onClick, isOpen }) => {
  return (
    <button
      className={`chat-assistant-button ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      title={isOpen ? 'Close chat' : 'Open AI Assistant'}
      aria-label={isOpen ? 'Close chat assistant' : 'Open AI assistant'}
    >
      {isOpen ? (
        <X size={24} />
      ) : (
        <MessageCircle size={24} />
      )}
      {!isOpen && <span className="chat-badge">AI</span>}
    </button>
  );
};

export default ChatAssistantButton;
