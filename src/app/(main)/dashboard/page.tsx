
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
  CardContent,
  CardFooter,
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
      <div className="absolute inset-0 bg-background/60" />

      <div className="relative z-10 flex flex-col items-center justify-center p-4">
        <div className="animate-in fade-in-up duration-700">
          <Card className="w-full max-w-md bg-background/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full border-4 border-primary/20 w-fit mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold font-headline">
                Chat with your Mentor
              </CardTitle>
              <CardDescription className="text-base">
                Get personalized career advice, ask questions, and explore your
                future possibilities with our AI-powered career mentor.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full text-lg py-6">
                <Link href="/career-chat">Start Chat</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
