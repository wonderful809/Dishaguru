'use client';

import Link from 'next/link';
import { ArrowRight, MessageSquare, Plus } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DashboardPage() {
  const chatBotImage = PlaceHolderImages.find(
    (img) => img.id === 'chatbot-dashboard'
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center flex flex-col items-center gap-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline animate-fade-in-down">
          Welcome to <span className="text-primary">Disha</span>{' '}
          <span className="text-secondary-foreground">Guru</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl animate-fade-in-up">
          Your personal AI mentor for navigating the path to a successful career
          in India.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl animate-fade-in-up md:col-span-2 lg:col-span-3">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8">
              <div className="p-3 bg-primary/10 rounded-full border-4 border-primary/20 w-fit mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-headline mb-2">
                Chat with your Mentor
              </h2>
              <p className="text-muted-foreground mb-6">
                Get personalized career advice, ask questions, and explore your
                future possibilities with our AI-powered career mentor.
              </p>
              <Button asChild size="lg">
                <Link href="/career-chat">
                  Start a New Chat <ArrowRight />
                </Link>
              </Button>
            </div>
            {chatBotImage && (
              <div className="relative h-64 md:h-full w-full hidden md:block">
                <Image
                  src={chatBotImage.imageUrl}
                  alt={chatBotImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={chatBotImage.imageHint}
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
