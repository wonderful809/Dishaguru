
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DashboardPage() {
  const bgImage = PlaceHolderImages.find(
    (img) => img.id === 'dashboard-background'
  );

  return (
    <div className="relative flex-grow flex flex-col justify-center items-center text-center -m-4 sm:-m-6 lg:-m-8 overflow-hidden">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt="Inspiring background"
          fill
          className="object-cover scale-105"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col items-center justify-center p-4">
        <div className="animate-in fade-in-up duration-1000">
          <Card className="w-full max-w-lg bg-transparent border-none shadow-none transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full border-4 border-primary/20 w-fit mb-4 animate-in zoom-in-50 duration-500">
                <MessageSquare className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-4xl font-bold font-headline text-white animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200">
                Chat with your Mentor
              </CardTitle>
              <CardDescription className="text-lg text-white/80 mt-2 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-300">
                Get personalized career advice, ask questions, and explore your
                future possibilities with our AI-powered career mentor.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-4 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-400">
              <Button
                asChild
                className="w-full max-w-xs mx-auto text-lg py-7 rounded-full font-bold animate-pulse hover:animate-none"
              >
                <Link href="/career-chat">Start Chat</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
