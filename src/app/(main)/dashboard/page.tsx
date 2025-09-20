
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageSquare, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DashboardPage() {
  const bgImage = PlaceHolderImages.find(
    (img) => img.id === 'dashboard-background'
  );

  return (
    <div className="relative flex-grow flex flex-col justify-center items-center text-center -m-4 sm:-m-6 lg:-m-8">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt="Inspiring background"
          fill
          className="object-cover"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />

      <div className="relative z-10 flex flex-col gap-8 p-4">
        <div className="text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
            Welcome to <span className="text-primary">Disha</span>{' '}
            <span className="text-secondary-foreground">Guru</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            Your personal AI mentor for navigating the path to a successful
            career in India.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 animate-in fade-in-up duration-700">
          <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 bg-background/80 backdrop-blur-sm">
            <div className="p-8 flex flex-col items-center">
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
                  Start Chat <ArrowRight />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
