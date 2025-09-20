'use client';

import {useEffect, useRef, useState} from 'react';
import {
  MessageCircle,
  BrainCircuit,
  Send,
  User,
  Plus,
  Trash,
  MessageSquare,
} from 'lucide-react';
import {useChat} from '@/hooks/use-chat';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Skeleton} from '@/components/ui/skeleton';
import {cn} from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function CareerChatPage() {
  const {
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
  } = useChat({
    api: '/api/chat',
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-grow h-full">
      {/* Chat History Sidebar */}
      <Card className="w-64 flex flex-col mr-4">
        <CardHeader>
          <Button onClick={createNewChat} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </CardHeader>
        <CardContent className="flex-grow p-2 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {chats.map(chat => (
              <div
                key={chat.id}
                className={cn(
                  'flex items-center justify-between p-2 rounded-md cursor-pointer',
                  activeChat?.id === chat.id
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted'
                )}
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="flex items-center gap-2 truncate">
                  <MessageSquare className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate text-sm">
                    {chat.messages[0]?.content.substring(0, 25) || 'New Chat'}
                  </span>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-destructive"
                      onClick={e => e.stopPropagation()}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this chat.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteChat(chat.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Chat Window */}
      <Card className="flex-grow flex flex-col animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            AI Career Mentor
          </CardTitle>
        </CardHeader>
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
                <h1 className="text-2xl font-bold font-headline">
                  AI Career Mentor
                </h1>
                <p className="text-md text-muted-foreground">
                  Ask me anything about career paths in India!
                </p>
              </div>
            )}
            {messages.map(m => (
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
          <form
            onSubmit={e => {
              handleSubmit(e);
            }}
            className="flex items-center gap-2"
          >
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
  );
}
