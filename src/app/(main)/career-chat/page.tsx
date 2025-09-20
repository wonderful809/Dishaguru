'use client';

import { useEffect, useRef } from 'react';
import { MessageCircle, BrainCircuit, Lightbulb, BookOpen, Send, User } from 'lucide-react';
import { useChat } from '@/hooks/use-chat';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function CareerChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat', // We will create this API route next
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      <div className="text-center flex flex-col items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-full border-4 border-primary/20">
          <MessageCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold font-headline">AI Career Mentor</h1>
        <p className="text-lg text-muted-foreground">
          Chat with our AI to get personalized career advice.
        </p>
      </div>

      <Card className="flex-grow flex flex-col animate-fade-in-up">
        <CardContent className="flex-grow p-6 flex flex-col gap-4 overflow-hidden">
          <div ref={scrollRef} className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-4">
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
                     <AvatarFallback><BrainCircuit size={18} /></AvatarFallback>
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
                     <AvatarFallback><User size={18} /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
               <div className="flex gap-3 text-foreground/90 justify-start">
                  <Avatar className="h-8 w-8 bg-primary/20 text-primary">
                     <AvatarFallback><BrainCircuit size={18} /></AvatarFallback>
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
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
