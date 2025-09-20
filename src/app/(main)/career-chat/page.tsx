'use client';

import { useEffect, useRef, useState } from 'react';
import {
  MessageCircle,
  BrainCircuit,
  Send,
  User,
  Plus,
  Trash2,
} from 'lucide-react';
import { useChat } from '@/hooks/use-chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

export type ChatSession = {
  id: string;
  title: string;
  messages: ReturnType<typeof useChat>['messages'];
};

export default function CareerChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    if (savedSessions) {
      const parsedSessions = JSON.parse(savedSessions);
      setSessions(parsedSessions);
      if (parsedSessions.length > 0) {
        setActiveSessionId(parsedSessions[0].id);
      } else {
        startNewChat();
      }
    } else {
      startNewChat();
    }
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: '/api/chat',
    initialMessages: activeSession?.messages,
    onFinish: (message) => {
      updateActiveSession(message);
    },
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (activeSession) {
      setMessages(activeSession.messages);
    }
  }, [activeSessionId, sessions]);

  const updateActiveSession = (lastMessage: { content: string }) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          const updatedMessages = [...s.messages, lastMessage];
          const newTitle =
            s.messages.length === 0
              ? lastMessage.content.substring(0, 30) + '...'
              : s.title;
          return { ...s, messages: updatedMessages, title: newTitle };
        }
        return s;
      })
    );
  };

  const startNewChat = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newSessionId,
      title: 'New Chat',
      messages: [],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
  };

  const deleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      if (sessions.length > 1) {
        setActiveSessionId(sessions.find((s) => s.id !== sessionId)!.id);
      } else {
        startNewChat();
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Sidebar for chat history */}
      <Card className="w-1/4 hidden md:flex flex-col">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-lg">Chat History</CardTitle>
          <Button variant="ghost" size="icon" onClick={startNewChat}>
            <Plus className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto">
          <div className="flex flex-col gap-2">
            {sessions.map((session) => (
              <div key={session.id} className="group relative">
                <Button
                  variant={
                    activeSessionId === session.id ? 'secondary' : 'ghost'
                  }
                  className="w-full justify-start truncate"
                  onClick={() => setActiveSessionId(session.id)}
                >
                  {session.title}
                </Button>
                <div className="absolute right-1 top-1/2 -translate-y-1/2">
                   <Dialog>
                    <DialogTrigger asChild>
                       <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This will permanently delete this chat session.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() => deleteSession(session.id)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main chat window */}
      <div className="flex flex-col flex-grow">
        <Card className="flex-grow flex flex-col animate-fade-in-up">
          <CardContent className="flex-grow p-6 flex flex-col gap-4 overflow-hidden">
            <div
              ref={scrollRef}
              className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-4"
            >
              {messages.length === 0 && !isLoading && (
                 <div className="text-center flex flex-col items-center gap-4 mt-16">
                  <div className="p-3 bg-primary/10 rounded-full border-4 border-primary/20">
                    <MessageCircle className="h-10 w-10 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold font-headline">AI Career Mentor</h1>
                  <p className="text-md text-muted-foreground">
                    Ask me anything about career paths in India!
                  </p>
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    'flex gap-3 text-foreground/90',
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {m.role !== 'user' && (
                    <Avatar className="h-8 w-8 bg-primary/20 text-primary">
                      <AvatarFallback>
                        <BrainCircuit size={18} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'rounded-lg px-4 py-2 max-w-sm',
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                  {m.role === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User size={18} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 text-foreground/90 justify-start">
                  <Avatar className="h-8 w-8 bg-primary/20 text-primary">
                    <AvatarFallback>
                      <BrainCircuit size={18} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 max-w-sm bg-muted flex items-center">
                    <Skeleton className="h-4 w-4 rounded-full bg-primary/40 mr-2 animate-bounce" />
                    <Skeleton className="h-4 w-4 rounded-full bg-primary/40 mr-2 animate-bounce delay-150" />
                    <Skeleton className="h-4 w-4 rounded-full bg-primary/40 animate-bounce delay-300" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <div className="p-4 border-t bg-background/95">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="What are your interests?"
                className="flex-grow"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
