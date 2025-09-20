// This hook is inspired by the Vercel AI SDK (https://sdk.vercel.ai/docs)
'use client';

import { useState, useCallback } from 'react';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export function useChat({ api }: { api: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    setIsLoading(true);
    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
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

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: "Sorry, I'm having a little trouble right now. Please try again in a moment.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
}
