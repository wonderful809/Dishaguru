'use client';

import { useState, useEffect } from 'react';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export type Chat = {
  id: string;
  messages: Message[];
};

const initialChat: Chat = {
  id: `chat-${Date.now()}`,
  messages: [],
};

export function useChat({
  api,
}: {
  api: string;
}) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedChats = localStorage.getItem('chat_history');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      if (parsedChats.length > 0) {
        setChats(parsedChats);
        setActiveChatId(parsedChats[0].id);
      } else {
        const newChat = { ...initialChat, id: `chat-${Date.now()}` };
        setChats([newChat]);
        setActiveChatId(newChat.id);
      }
    } else {
      const newChat = { ...initialChat, id: `chat-${Date.now()}` };
      setChats([newChat]);
      setActiveChatId(newChat.id);
    }
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('chat_history', JSON.stringify(chats));
    }
  }, [chats]);
  
  const activeChat = chats.find(chat => chat.id === activeChatId);
  const messages = activeChat?.messages ?? [];
  
  const setActiveChat = (id: string) => {
    setActiveChatId(id);
  };

  const createNewChat = () => {
    const newChat: Chat = { id: `chat-${Date.now()}`, messages: [] };
    setChats(prevChats => [newChat, ...prevChats]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (id: string) => {
    setChats(prevChats => {
      const remainingChats = prevChats.filter(chat => chat.id !== id);
      if (remainingChats.length === 0) {
        const newChat: Chat = { id: `chat-${Date.now()}`, messages: [] };
        setActiveChatId(newChat.id);
        return [newChat];
      }
      if (activeChatId === id) {
        setActiveChatId(remainingChats[0].id);
      }
      return remainingChats;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !activeChatId) return;

    setIsLoading(true);
    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: input };
    const newMessages = [...messages, userMessage];

    setChats(prevChats => prevChats.map(chat => 
      chat.id === activeChatId ? { ...chat, messages: newMessages } : chat
    ));
    setInput('');

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      
      const result = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: result.response,
      };

      setChats(prevChats => prevChats.map(chat => 
        chat.id === activeChatId ? { ...chat, messages: [...newMessages, assistantMessage] } : chat
      ));

    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: "Sorry, I'm having a little trouble right now. Please try again in a moment.",
      };
      setChats(prevChats => prevChats.map(chat => 
        chat.id === activeChatId ? { ...chat, messages: [...newMessages, errorMessage] } : chat
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chats,
    activeChat,
    setActiveChat,
    createNewChat,
    deleteChat,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
}
